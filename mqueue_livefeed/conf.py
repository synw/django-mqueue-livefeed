# -*- coding: utf-8 -*-
from django.core.exceptions import ImproperlyConfigured
from django.conf import settings


try:
    SITE_NAME = getattr(settings, 'SITE_NAME')
except ImportError:
    raise ImproperlyConfigured(
        u'Mqueue Livefeed: Please set a SITE_NAME in settings.py')
try:
    SITE_SLUG = getattr(settings, 'SITE_SLUG')
except ImportError:
    raise ImproperlyConfigured(
        u'Mqueue Livefeed: Please set a SITE_SLUG in settings.py')
try:
    CHANNEL = getattr(settings, 'MQL_CHANNEL', "$livefeed")
except ImportError:
    raise ImproperlyConfigured(
        u'Mqueue Livefeed: Please set a MQL_CHANNEL in settings.py')

# ensure that Centrifugo will use a private channel
if not CHANNEL.startswith("$"):
    CHANNEL = "$" + CHANNEL

STREAM_MODELS = getattr(settings, "MQUEUE_STREAM_MODELS", True)

STREAM_LOGS = getattr(settings, "MQUEUE_STREAM_MODELS", True)
