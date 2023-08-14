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


# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import Stock
# from .serializers import StockSerializer
# import requests

# @api_view(['GET'])
# def index(request, symbol):
#     if symbol == '':
#         return Response({'error': 'Symbol parameter is missing'})
#     else:
#         try:
#             # Replace 'YOUR_IEX_CLOUD_TOKEN' with your actual IEX Cloud API token
#             API_TOKEN = 'sk_8e590277286548a1b0e828159d5d3d4a'
            
#             # Construct the URL for fetching real-time price
#             base_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/quote'
#             params = {'token': API_TOKEN}
            
#             response = requests.get(base_url, params=params)
#             data = response.json()
            
#             if 'latestPrice' in data:
#                 latest_price = data['latestPrice']
                
#                 # Calculate change and percentage change based on the latest price
#                 # You need to fetch previous close from IEX Cloud historical data API
#                 # and calculate change and pChange using the latest_price and previous_close
                
#                 # Create a Stock object and save it to the database
#                 stock = Stock(
#                     symbol=symbol,
#                     price=latest_price,
#                     change=0,    # Calculate the change from previous_close and latest_price
#                     pChange=0    # Calculate the percentage change based on the change
#                 )
#                 stock.save()
                
#                 # Serialize the stock data and return the response
#                 serializer = StockSerializer(stock)
#                 data = serializer.data
#                 return Response(data)
#             else:
#                 return Response({'error': 'Error fetching data'})

#         except Exception as e:
#             return Response({'error': str(e)})



# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import Stock
# from .serializers import StockSerializer
# import yfinance as yf
# from datetime import datetime, timedelta

# @api_view(['GET'])
# def index(request, symbol):
#     if symbol == '':
#         return Response({'error': 'Symbol parameter is missing'})
#     else:
#         try:
#             # Retrieve historical data for the specified symbol
#             end_date = datetime.now()
#             start_date = end_date - timedelta(days=1)  # One day ago
#             stock_data = yf.download(symbol, start=start_date, end=end_date)
            
#             # Extract the details of the previous close from the historical data
#             previous_close = stock_data['Close'].iloc[-1]
#             # You can calculate change and pChange based on the previous close
#             previous_day_close = stock_data['Close'].iloc[-2]
#             change = previous_close - previous_day_close
#             pChange = (change / previous_day_close) * 100 if previous_day_close != 0 else 0
            
#             # Create a Stock object and save it to the database
#             stock = Stock(
#                 symbol=symbol,
#                 price=previous_close,
#                 change=change,
#                 pChange=pChange
#             )
#             stock.save()
            
#             # Serialize the stock data and return the response
#             serializer = StockSerializer(stock)
#             data = serializer.data
#             return Response(data)

#         except Exception as e:
#             return Response({'error': str(e)})




from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Stock
from .serializers import StockSerializer
import yfinance as yf

@api_view(['GET'])
def index(request, symbol):
    if symbol == '':
        return Response({'error': 'Symbol parameter is missing'})
    else:
        try:
            # Retrieve stock data using yfinance
            stock_data = yf.Ticker(symbol)
            stock_info = stock_data.info
            
            # Create a Stock object and save it to the database
            stock = Stock(
                symbol=symbol,
                price=stock_info.get('last_price', 0),  # Replace 'last_price' with the correct key from yfinance data
                change=stock_info.get('change', 0),      # Replace 'change' with the correct key from yfinance data
                pChange=stock_info.get('pChange', 0)     # Replace 'pChange' with the correct key from yfinance data
            )
            stock.save()
            
            # Serialize the stock data and return the response
            serializer = StockSerializer(stock)
            data = serializer.data
            return Response(data)

        except Exception as e:
            return Response({'error': str(e)})



