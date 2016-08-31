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

Install the dependencies and clone the repository.

Add `"mqueue_livefeed",` to INSTALLED_APPS

Add `url(r'^events/', include('mqueue_livefeed.urls')),` to the urls.

In settings.py:
  
  ```python

SITE_NAME = "My site"
INSTANT_SUPERUSER_CHANNELS = ["$mqfeed"]
  ```
  
Make a `instant/extra_clients.js` template with this content:

  ```django

{% if user.is_superuser and request.path == "/events/" %}
	{% include "mqueue_livefeed/js/client.js" %}
{% endif %}
  ```

This app is phone friendly. Note: the templates use bootstrap, jquery and font-awesome: you must load these in your
main template, at least jquery.

Usage
-----

Once the livefeed component installed Mqueue will deliver the events and logs to a feed reserved to the superuser. 
The default channel used is `$mqfeed`: if you wish to change this use the setting `MQL_CHANNEL="$myprivatechannel"`.

All the registered models events as well as the log events (if the mqueue log handler is used) will be 
broadcasted to the feed. To change this: in settings.py:

  ```python

MQUEUE_STREAM_MODELS = False
MQUEUE_STREAM_LOGS = False
  ```
  
Go to `/events/` to see your live feed in action. 

Note: only the superuser can see the dashboard and connect to the events feed channel.

![Dashboard screenshot](https://raw.githubusercontent.com/synw/django-mqueue-livefeed/master/docs/img/mqueue-livefeed-dashboard.png)
