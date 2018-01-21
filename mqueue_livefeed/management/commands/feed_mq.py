# -*- coding: utf-8 -*-
from __future__ import print_function
from time import sleep
import random
from django.core.management.base import BaseCommand
from mqueue_livefeed.models import MonitoredSite
from mqueue.models import MEvent


class Command(BaseCommand):
    help = "Feed mqueue with test events"

    def handle(self, *args, **options):
        ecs = ["error", "warning", "created", "edited", "deleted",
               "info", "important", "ok"]
        sites = ["site1", "site2", "site3", "site4", "site5", "site6"]
        titles = ["Site 1", "Site 2", "Site 3", "Site 4", "Site 5", "Site 6"]
        # enure that the monitored site objects exist
        i = 0
        for slug in sites:
            title = titles[i]
            _, created = MonitoredSite.objects.get_or_create(
                slug=slug, name=title)
            if created is True:
                print("Created monitored site ", title)
            i += 1
        # feed with events
        while True:
            site = random.choice(sites)
            ec = random.choice(ecs)
            data = dict(site=site)
            MEvent.objects.create(name="An event has occured", event_class=ec,
                                  data=data)
            delay = random.uniform(0.2, 3)
            sleep(delay)
