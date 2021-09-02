from django.core.management.base import BaseCommand

from instant.models import Channel
from mqueue_livefeed.models import MonitoredSite


class Command(BaseCommand):
    help = "Initialize the database with some data"

    def handle(self, *args, **options):
        sites = ["site1", "site2", "site3", "site4", "site5", "site6"]
        titles = ["Site 1", "Site 2", "Site 3", "Site 4", "Site 5", "Site 6"]
        # create the monitored site objects
        i = 0
        for slug in sites:
            title = titles[i]
            _, created = MonitoredSite.objects.get_or_create(slug=slug, name=title)
            if created is True:
                print("Created monitored site", title)
            i += 1
        # create the websockets channel
        _, created = Channel.objects.get_or_create(name="$livefeed", level="superuser")
        if created is True:
            print("Created websockets channel")
