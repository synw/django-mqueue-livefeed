Django Mqueue Livefeed
======================

Monitor events coming from multiple sites via websockets

Dependencies
------------

- [Django Mqueue](https://github.com/synw/django-mqueue): the events queue for Django.
- [Centrifugo](https://github.com/centrifugal/centrifugo): the websockets server.
- [Django Instant](https://github.com/synw/django-instant): the Centrifugo <-> Django layer

Install
-------

Install Django Instant ([docs](http://django-instant.readthedocs.io/en/latest/src/install.html)) first then:

``pip install django-mqueue-livefeed``

Add to INSTALLED_APPS:

   ```
   "mqueue",
   "mqueue_livefeed",
   ```

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
  
Note: you can apply the settings above to as much sites as you want to emit their events in the feed. Just create 
a site object in the admin for each of the sites to have them in the dashboard.
  
Set the urls:

  ```python
  url(r'^events/', include('mqueue_livefeed.urls')),
  ```
  
Create your monitored sites in the admin. And go to `/events/`

Test events
-----------

To generate test events a management command is available:

   ```
   python3 manage.py feed_mq
   ```
  
It will generate 6 sites in the admin and feed them with events: run, go to `/events/` and watch

Screenshot
----------

![Lvefeed screenshot](https://raw.githubusercontent.com/synw/django-mqueue-livefeed/master/docs/img/screenshot.png)

Todo
----

- [ ] Add links to the admin interfaces from the dashboard events
- [ ] Better layouts when there is a small number of sites
- [ ] Multiple dashboards and group permissions
- [ ] Rework the algorithm that calculates the timeline
- [ ] Maybe some basic stats like messages rates, event classes ratios
