import json
import os
import subprocess
from typing import List

from django.core.management.base import BaseCommand

from instant.init import generate_settings_from_conf


class Command(BaseCommand):
    help = "Install the websockets server and generate the settings"

    def handle(self, *args, **options):
        basepath = os.getcwd()
        subprocess.call(["python", "backend/manage.py", "installws"])
        filepath = basepath + "/centrifugo/config.json"
        settings: List[str] = []
        with open(filepath, "r") as f:
            content = f.read()
            conf = json.loads(content)
            settings = generate_settings_from_conf(conf)
            print(settings)
            f.close()
        settingspath = basepath + "/backend/backend/localsettings.py"
        if not os.path.exists(settingspath):
            with open(settingspath, "w") as f:
                f.write("\n".join(settings) + "\n")
                f.close()
        print("localsettings.py file generated with websockets config")
