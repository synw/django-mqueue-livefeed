# -*- coding: utf-8 -*-

from django import template
from mqueue.utils import format_event_class, get_admin_url
from mqueue_livefeed.conf import CHANNEL


register = template.Library()

@register.filter
def get_badge(event):
    return format_event_class(event)

@register.simple_tag
def event_admin_url(event):
    return get_admin_url(event)

@register.simple_tag
def mqchannel():
    return CHANNEL