# -*- coding: utf-8 -*-
from django.http.response import Http404
from django.views.generic import TemplateView
from .models import MonitoredSite


class MQueueLiveView(TemplateView):
    template_name = 'mql/index.html'
    context_object_name = 'events'

    def dispatch(self, request, *args, **kwargs):
        if not self.request.user.is_superuser:
            raise Http404
        return super(MQueueLiveView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(MQueueLiveView, self).get_context_data(**kwargs)
        sites = MonitoredSite.objects.all()
        context['sites'] = sites
        return context
