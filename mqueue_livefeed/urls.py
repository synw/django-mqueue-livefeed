# -*- coding: utf-8 -*-

from django.conf.urls import url
from mqueue_livefeed.views import MQueueLiveView


urlpatterns = [
    url(r'^', MQueueLiveView.as_view(), name="mqueue-livefeed"),
]