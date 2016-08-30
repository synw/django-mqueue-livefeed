Django Mqueue Livefeed
======================

Realtime feed for Django Mqueue events.

- Push Django Mqueue events and log to a private channel

- See the events real time in a dashboard

Dependencies
------------

- [Django Mqueue](https://github.com/synw/django-mqueue): the events queue for Django.

- [Centrifugo](https://github.com/centrifugal/centrifugo): the websockets server.

- [Django Instant](https://github.com/synw/django-instant): the Centrifugo <-> Django layer

Install
-------

Install the dependencies and clone the repository.

Add `"mqueue_livefeed",` to INSTALLED_APPS

Add `url(r'^events/', include('mqueue_livefeed.urls')),` to the urls.

In settings.py:
  
  ```python

SITE_NAME = "My site"
  ```

Usage
-----

Once installed Django Mqueue will be able to deliver the events to a private channel. The default channel used is
`$mqfeed`: if you wish to change this use the setting `MQL_CHANNEL="$myprivatechannel"`.

All the registered models events as well as the log events (if the mqueue log handler is used) will be 
broadcasted to the feed. To change this: in settings.py:

  ```python

MQUEUE_STREAM_MODELS = False
MQUEUE_STREAM_LOGS = False
  ```
