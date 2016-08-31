# -*- coding: utf-8 -*-

from django.http.response import Http404
from django.views.generic import ListView
from mqueue.models import MEvent


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

    