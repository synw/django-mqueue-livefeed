Django Mqueue Livefeed
======================

Realtime feed for Django Mqueue events. Features:

- Push Django Mqueue events and logs to a private channel
- See the events real time in a dashboard

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

SITE_NAME = "My site"
INSTANT_SUPERUSER_CHANNELS = ["$mqfeed"]
  ```
  
Make a `instant/extra_clients.js` template with this content:

  ```django

{% if user.is_superuser %}
	{% include "mqueue_livefeed/js/client.js" %}
{% endif %}
  ```

Usage
-----

Once the livefeed component installed Mqueue will deliver the events and logs to a feed reserved to the superuser. 
The default channel used is `$mqfeed`: if you wish to change this use the setting `MQL_CHANNEL="$myprivatechannel"`.

All the registered models events as well as the log events (if the mqueue log handler is used) will be 
published to the feed. To change this: in settings.py:

  ```python
MQUEUE_STREAM_MODELS = False
MQUEUE_STREAM_LOGS = False
  ```

Use `stream = True` when creating events if you want them published into the feed. 

  ```python
MEvent.objects.create('Something happened!', event_class="debug", channel="public:site", stream=True)
  ```
  
Events handling
---------------

Define your client-side behaviors in `instant/extra_handlers.js`.

A ready to use user interface is available: the [Django Instant UI](https://github.com/synw/django-vvinstant). 
Using this the events will be displayed as messages. 
  