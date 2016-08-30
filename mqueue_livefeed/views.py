# -*- coding: utf-8 -*-

import json
from django.http import JsonResponse
from django.http.response import Http404
from django.views.generic import ListView
from django.views.decorators.csrf import csrf_exempt
from cent.core import generate_channel_sign
from mqueue.models import MEvent
from instant.conf import SECRET_KEY


class MQueueLiveView(ListView):
    template_name = 'mqueue_livefeed/index.html'
    context_object_name = 'events'
    
    def dispatch(self, request, *args, **kwargs):
        if not self.request.user.is_superuser:
            raise Http404
        return super(MQueueLiveView, self).dispatch(request, *args, **kwargs)
    
    def get_queryset(self):
        qs = MEvent.objects.all()[:30]
        return qs

@csrf_exempt
def mqueue_livefeed_auth(request):
    if not request.is_ajax() or not request.method == "POST":
        raise Http404
    data = json.loads(request.body)
    channels = data["channels"]
    client = data['client']
    channel = channels[0]
    payload = {channel:{"status",403}}
    if request.user.is_superuser:
        signature = generate_channel_sign(SECRET_KEY, client, channel, info="")
        payload = {channel:{"sign": signature}}
    return JsonResponse(payload)

    