from django.urls import path
from .views import index, index_quote

urlpatterns = [
    path('<str:symbol>/', index),
    path('<str:symbol>/', index_quote)
]


# from django.urls import path
# from .views import index, stock_chart, websocket_stock_chart
# from .consumers import StockConsumer

# websocket_urlpatterns = [
#     path('ws/stock/<str:symbol>/', StockConsumer.as_asgi()),
# ]

# urlpatterns = [
#     path('', index, name='index'),
#     path('stock_chart/', stock_chart, name='stock_chart'),
#     path('<str:symbol>/', websocket_stock_chart, name='websocket_stock_chart'),
# ]
