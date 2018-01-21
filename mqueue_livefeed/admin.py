
# -*- coding: utf-8 -*-
from django.contrib import admin
from .models import MonitoredSite


@admin.register(MonitoredSite)
class MonitoredSiteAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {'slug': ('name',)}