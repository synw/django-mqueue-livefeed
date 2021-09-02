from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from .views import LoginView, IndexView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("instant/", include("instant.urls")),
    path("login/", LoginView.as_view(), name="login"),
    path("", IndexView.as_view(), name="home"),
]

if settings.DEBUG is True:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
