from typing import Any, Dict, Union
from django.conf import settings
from django.http.response import HttpResponseBase, HttpResponseRedirect
from django.views.generic import TemplateView
from django.contrib.auth.views import LoginView, redirect_to_login


class LoginView(LoginView):
    template_name = "login_form.html"


class IndexView(TemplateView):
    template_name = "index.html"

    def dispatch(
        self, request, *args, **kwargs
    ) -> Union[HttpResponseRedirect, HttpResponseBase]:
        if self.request.user.is_superuser is False:  # type: ignore
            # no superuser no app
            return redirect_to_login("/", "/login/")
        return super(IndexView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs) -> Dict[str, Any]:
        context = super(IndexView, self).get_context_data(**kwargs)
        uri = settings.CENTRIFUGO_HOST.replace("https", "wss").replace("http", "ws")
        if settings.CENTRIFUGO_PORT is not None:
            uri += f":{settings.CENTRIFUGO_PORT}"
        context["uri"] = uri
        return context
