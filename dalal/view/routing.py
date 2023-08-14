from django.urls import re_path
from . import consumers

urlpatterns = [
    re_path(r'stock/(?P<symbol>\w+)/$', consumers.StockConsumer.as_asgi()),
]