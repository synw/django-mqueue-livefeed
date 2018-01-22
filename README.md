Django Mqueue Livefeed
======================

Realtime feed and dashboard for monitoring events from multiple sites. This watches events coming from multiple sites 
via websockets.

Dependencies
------------

- [Django Mqueue](https://github.com/synw/django-mqueue): the events queue for Django.

- [Centrifugo](https://github.com/centrifugal/centrifugo): the websockets server.

- [Django Instant](https://github.com/synw/django-instant): the Centrifugo <-> Django layer

Install
-------

``pip install django-mqueue-livefeed``

Add `"mqueue_livefeed",` to INSTALLED_APPS

In settings.py:
  
  ```python
SITE_SLUG = "mysite"
SITE_NAME = "My site"
MQUEUE_HOOKS = {
    "centrifugo": {
        "path": "mqueue.hooks.centrifugo",
        "channel": "$livefeed",
    },
}
INSTANT_SUPERUSER_CHANNELS = (
    ("$livefeed",),
)
  ```
  
Set the urls:

  ```python
  url(r'^events/', include('mqueue_livefeed.urls')),
  ```
  
Create your monitored sites in the admin.

Test events
-----------

Go to `/events/'

To generate test events it a management command is available:

   ```
   python3 manage.py feed_mq
   ```
  
It will generate 6 sites in the admin and feed them with events
