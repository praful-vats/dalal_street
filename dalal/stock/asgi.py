# import os

# from django.core.asgi import get_asgi_application
# from channels.routing import ProtocolTypeRouter
# from channels.auth import AuthMiddlewareStack
# from channels.routing import URLRouter
# from view.routing import urlpatterns

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stock.settings')

# application = ProtocolTypeRouter({
#     'http': get_asgi_application(),
#     'websocket' : AuthMiddlewareStack(URLRouter(urlpatterns))
# })


from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path

from view import consumers

application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path('<str:symbol>/', consumers.StockConsumer.as_asgi()),
        ])
    ),
})
