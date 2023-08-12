# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import Stock
# from .serializers import StockSerializer
# from nsepython import *



# @api_view(['GET'])
# def index(request, symbol):
#     if symbol == '':
#         return Response({'error': 'Symbol parameter is missing'})
#     else:
#         q = nse_eq(symbol)
#         stock = Stock(symbol=symbol, price=q['priceInfo']['lastPrice'], change=q['priceInfo']['change'], pChange = q['priceInfo']['pChange'])
#         stock.save()
#         serializer = StockSerializer(stock)
#         data = serializer.data
#         return Response(data)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Stock
from .serializers import StockSerializer
# from nsepython import *

@api_view(['GET'])
def index(request, symbol):
    if symbol == '':
        return Response({'error': 'Symbol parameter is missing'})
    else:
        # Comment out the API call and Stock creation
        # q = nse_eq(symbol)
        # stock = Stock(symbol=symbol, price=q['priceInfo']['lastPrice'], change=q['priceInfo']['change'], pChange=q['priceInfo']['pChange'])
        # stock.save()
        # serializer = StockSerializer(stock)
        # data = serializer.data
        # return Response(data)
        
        # Instead, return a simple response
        return Response({'message': 'This is a simple response'})
