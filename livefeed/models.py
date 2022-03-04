# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import gettext_lazy as _


class MonitoredSite(models.Model):
    name = models.CharField(max_length=120, verbose_name=_("Name"))
    slug = models.SlugField(unique=True, verbose_name=_("Slug"))

    class Meta:
        verbose_name = _("Monitored site")
        verbose_name_plural = _("Monitored sites")
        ordering = ["name"]

    def __str__(self):
        return self.name
