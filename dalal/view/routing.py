from django.urls import re_path
from . import consumers

urlpatterns = [
    re_path(r'stock/AAPL/', consumers.StockConsumer.as_asgi()),
]