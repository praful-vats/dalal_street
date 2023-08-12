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


# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import Stock
# from .serializers import StockSerializer
# # from nsepython import *

# @api_view(['GET'])
# def index(request, symbol):
#     if symbol == '':
#         return Response({'error': 'Symbol parameter is missing'})
#     else:
#         # Comment out the API call and Stock creation
#         # q = nse_eq(symbol)
#         # stock = Stock(symbol=symbol, price=q['priceInfo']['lastPrice'], change=q['priceInfo']['change'], pChange=q['priceInfo']['pChange'])
#         # stock.save()
#         # serializer = StockSerializer(stock)
#         # data = serializer.data
#         # return Response(data)
        
#         # Instead, return a simple response
#         return Response({'message': 'This is a simple response'})


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Stock
from .serializers import StockSerializer
import yfinance as yf
from datetime import datetime, timedelta

@api_view(['GET'])
def index(request, symbol):
    if symbol == '':
        return Response({'error': 'Symbol parameter is missing'})
    else:
        try:
            # Retrieve historical data for the specified symbol
            end_date = datetime.now()
            start_date = end_date - timedelta(days=1)  # One day ago
            stock_data = yf.download(symbol, start=start_date, end=end_date)
            
            # Extract the details of the previous close from the historical data
            previous_close = stock_data['Close'].iloc[-1]
            # You can calculate change and pChange based on the previous close
            
            # Create a Stock object and save it to the database
            stock = Stock(
                symbol=symbol,
                price=previous_close,
                change=0,  # Calculate the change from previous_close and previous day's close
                pChange=0  # Calculate the percentage change based on the change
            )
            stock.save()
            
            # Serialize the stock data and return the response
            serializer = StockSerializer(stock)
            data = serializer.data
            return Response(data)

        except Exception as e:
            return Response({'error': str(e)})
