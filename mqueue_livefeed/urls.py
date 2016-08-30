# -*- coding: utf-8 -*-

from django.conf.urls import patterns, url
from mqueue_livefeed.views import MQueueLiveView


urlpatterns = patterns('',
    url(r'^', MQueueLiveView.as_view(), name="mqueue-livefeed"),
)
