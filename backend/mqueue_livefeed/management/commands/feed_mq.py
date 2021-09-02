from time import sleep
import random

from django.core.management.base import BaseCommand

from mqueue.models import MEvent
from mqueue_livefeed.models import MonitoredSite


class Command(BaseCommand):
    help = "Feed mqueue with test events"

    def handle(self, *args, **options):
        ecs = [
            "error",
            "warning",
            "created",
            "edited",
            "deleted",
            "info",
            "debug",
            "important",
            "ok",
        ]
        sites = list(MonitoredSite.objects.all().values_list("name", flat=True))
        # feed with events
        while True:
            site = random.choice(sites)
            ec = random.choice(ecs)
            data = dict(site=site)
            MEvent.objects.create(
                name="An event has occured", event_class=ec, data=data
            )
            delay = random.uniform(0.2, 3)
            sleep(delay)
