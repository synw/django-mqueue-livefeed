from django.views.generic import TemplateView
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from .views import LoginView, IndexView, SpaAppView

urlpatterns = [
    path(
        "template_demo/",
        TemplateView.as_view(template_name="mqueue/livefeed/index.html"),
    ),
    path("instant/", include("instant.urls")),
    path("login/", LoginView.as_view(), name="login"),
    path("app/", SpaAppView.as_view(), name="home"),
    path("", IndexView.as_view()),
]

if settings.DEBUG is True:
    urlpatterns = (
        urlpatterns
        + staticfiles_urlpatterns()
        + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    )
