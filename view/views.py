# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import Stock
# from .serializers import StockSerializer
# from nsetools import Nse

# nse = Nse()

# @api_view(['GET'])
# def index(request, symbol):
#     if symbol == '':
#         return Response({'error': 'Symbol parameter is missing'})
#     else:
#         q = nse.get_quote(symbol)
#         print('s=',symbol)
#         print('q=',q)
#         pChange = ((q['lastPrice'] - q['open']) / q['open']) * 100
#         stock = Stock(symbol=symbol, price=q['lastPrice'], change=q['change'], pChange=pChange)
#         stock.save()
#         serializer = StockSerializer(stock)
#         pChange_with_percent = f"{pChange:.2f}%"
#         data = serializer.data
#         print('data',data)
#         data['pChange'] = pChange_with_percent
#         return Response(data)
# no longer ww1 but www nsetools


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Stock
from .serializers import StockSerializer
from nsepython import *



@api_view(['GET'])
def index(request, symbol):
    if symbol == '':
        return Response({'error': 'Symbol parameter is missing'})
    else:
        q = nse_eq(symbol)
        # print('s=',symbol)
        # print('q=',q)
        # pChange = ((q['lastPrice'] - q['open']) / q['open']) * 100
        # print('nlp', pChange)
        stock = Stock(symbol=symbol, price=q['priceInfo']['lastPrice'], change=q['priceInfo']['change'], pChange = q['priceInfo']['pChange'])
        stock.save()
        serializer = StockSerializer(stock)
        # pChange_with_percent = f"{pChange:.2f}%"
        data = serializer.data
        # print('data',data)
        # data['pChange'] = pChange_with_percent
        return Response(data)

@api_view(['GET'])
def index_quote(request, symbol):
    if symbol == '':
        return Response({'error': 'Symbol parameter is missing'})
    else:
        q = nse_get_index_quote(symbol)
        print('is=',symbol)
        print('iq=',q)
        data = {
            'symbol': q['indexName'],
            'price': q['last'],
            'change': q['change'],
            'pChange': q['pChange'],
        }
        return Response(data)


# from nsepython import *

# nifty_details = nse_get_index_quote("NIFTY 50")
# print('nd',nifty_details)
# eq = nse_eq('ITC')
# print('eq',eq)
# from nsepython import *

# # Get the details of Nifty 50 index
# nifty_details = nse_get_index_quote("NIFTY 50")

# # Extract the symbol and last price
# symbol = nifty_details['indexName']
# last_price = nifty_details['last']

# # Print the extracted data
# print(f"Symbol: {symbol}, Last Price: {last_price}")




# import matplotlib.pyplot as plt
# from nsepython import *
# print(fnolist())

# # Get historical stock data
# symbol = "SBIN"
# series = "EQ" # specify the series here
# data = equity_history(symbol=symbol, series=series, start_date="01-01-2020", end_date="03-04-2023")

# # Create custom graph
# fig, ax = plt.subplots(figsize=(12, 6))
# ax.plot(data.index, data['priceInfo']['previousClose'], label='Closing Price')
# ax.plot(data.index, data['priceInfo']['open'], label='Opening Price')
# ax.set_xlabel('Date')
# ax.set_ylabel('Price')
# ax.set_title(f'{symbol} stock price')
# ax.legend()
# plt.show()

# import matplotlib.pyplot as plt
# from nsepython import *

# # Get historical stock data
# symbol = "SBIN"
# series = "EQ" # specify the series here
# # start_date = "01-01-2020"
# # end_date = "03-04-2023"
# data = equity_history(symbol=symbol, series=series, start_date="01-01-2020", end_date="03-04-2023")

# # Create custom graph
# fig, ax = plt.subplots(figsize=(12, 6))
# ax.plot(data.index, data['priceInfo']['previousClose'], label='Closing Price')
# ax.plot(data.index, data['priceInfo']['open'], label='Opening Price')
# ax.set_xlabel('Date')
# ax.set_ylabel('Price')
# ax.set_title(f'{symbol} stock price')
# ax.legend()
# plt.show()







    

# from nsepython import *
# print(nse_eq("JUSTDIAL")['priceInfo'])


# print(nse_most_active())


# # Import the plotting library 
# import matplotlib.pyplot as plt 
 
# # Import the yfinance. If you get module not found error the run !pip install yfinance from your Jupyter notebook 
# import yfinance as yf   
 
# # Get the data of the stock AAPL 
# data = yf.download('AAPL','2016-01-01','2021-05-31', auto_adjust=True) 
 
# # Plot the close price of the AAPL 
# data.Close.plot() 
# plt.grid() 
# plt.show() 



# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import Stock
# from .serializers import StockSerializer
# from nsetools import Nse
# import urllib.error

# nse = Nse()

# @api_view(['GET'])
# def index(request, symbol):
#     if symbol == '':
#         return Response({'error': 'Symbol parameter is missing'})
#     else:
#         try:
#             q = nse.get_quote(symbol)
#             print('s=',symbol)
#             print('q=',q)
#             pChange = ((q['lastPrice'] - q['open']) / q['open']) * 100
#             stock = Stock(symbol=symbol, price=q['lastPrice'], change=q['change'], pChange=pChange)
#             stock.save()
#             serializer = StockSerializer(stock)
#             pChange_with_percent = f"{pChange:.2f}%"
#             data = serializer.data
#             print('data',data)
#             data['pChange'] = pChange_with_percent
#             return Response(data)
#         except urllib.error.HTTPError as e:
#             print(f"HTTP Error {e.code}: {e.reason}")
#             print(e.read())
#             return Response({'error': 'Failed to retrieve stock information'})



# from django.shortcuts import render


# def index(request):
#     return render(request, 'index.html')




# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from nsetools import Nse
# nse = Nse()

# @api_view(['GET'])
# def index(request):
#     symbol = request.GET.get('symbol')
#     if symbol is None:
#         return Response({'error': 'Symbol parameter is missing'})
#     else:
#         # nse = Nse()
#         q = nse.get_quote(symbol)
#         print(symbol)
#         pChange = ((q['lastPrice'] - q['open']) / q['open']) * 100
#         stock_price = {
#             'symbol': symbol,
#             'price': q['lastPrice'],
#             'change': q['change'],
#             'pChange': '{:5.2f}%'.format(pChange),
#             'datetime': q['dateTime'],
#         }
#         print(symbol)
#         print(stock_price)
#         return Response(stock_price)





# from nsetools import Nse
# nse = Nse()
# print(nse)

# q = nse.get_quote('TATASTEEL') # it's ok to use both upper or lower case for codes.
# from pprint import pprint # just for neatness of display
# pprint(q)

# import yfinance as yf

# ticker = yf.Ticker('TATASTEEL')
# info = ticker.info

# print(info)

# import requests
# url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TATASTEEL&interval=5min&apikey=IEYX7X1A7NYO4JWO'
# r = requests.get(url)
# data = r.json()

# print(data)

# from nsepython import get_quote

# quote = get_quote('TATASTEEL')
# print(quote)

# from nsetools import Nse
# nse = Nse()
# print(nse)

# q = nse.get_quote('TATASTEEL') # it's ok to use both upper or lower case for codes.
# from pprint import pprint # just for neatness of display
# pprint(q)

# from nsetools import Nse
# nse = Nse()

# q = nse.get_quote('TATASTEEL')

# symbol = q['symbol']
# current_price = q['lastPrice']
# today_change = q['change']
# overall_change = current_price - q['open']

# print('Symbol:', symbol)
# print('Current price:', current_price)
# print('Today\'s change:', today_change)

# if overall_change > 0:
#     print('Stock is up')
# elif overall_change < 0:
#     print('Stock is down')
# else:
#     print('Stock price is unchanged')


# from nsetools import Nse
# nse = Nse()

# q = nse.get_quote('TATASTEEL')

# symbol = q['symbol']
# current_price = q['lastPrice']
# today_change = q['change']
# overall_change = (current_price - q['open']) / q['open'] * 100

# print('Symbol:', symbol)
# print('Current price:', current_price)
# print('Today\'s change:', today_change)

# if overall_change > 0:
#     print(f'Stock is up by {overall_change:.2f}%')
# elif overall_change < 0:
#     print(f'Stock is down by {overall_change:.2f}%')
# else:
#     print('Stock price is unchanged')


# Symbol: TATASTEEL
# Current price: 105.5
# Today's change: -4.25
# Overall change: -1.5799999999999983








# from django.shortcuts import render
# from django.http import HttpResponseBadRequest, HttpResponse
# from channels.layers import get_channel_layer
# from asgiref.sync import async_to_sync
# import yfinance as yf


# def index(request):
#     return render(request, 'index.html')


# def stock_chart(request):
#     if request.is_ajax() and request.method == 'POST':
#         symbol = request.POST.get('symbol')
#         if symbol:
#             try:
#                 ticker = yf.Ticker(symbol)
#                 data = ticker.history(period='1d')
#                 if not data.empty:
#                     stock_price = {
#                         'symbol': symbol.upper(),
#                         'price': data['Close'].iloc[-1],
#                         'volume': data['Volume'].iloc[-1],
#                         'datetime': data.index[-1].strftime('%Y-%m-%d %H:%M:%S'),
#                     }
#                     channel_layer = get_channel_layer()
#                     async_to_sync(channel_layer.group_send)(
#                         symbol,
#                         {
#                             'type': 'send_stock_data',
#                             'data': stock_price
#                         }
#                     )
#                     return HttpResponse(status=200)
#             except Exception as e:
#                 print(str(e))
#     return HttpResponseBadRequest()


# def websocket_stock_chart(request, symbol):
#     return render(request, 'websocket_stock_chart.html', {'symbol': symbol})
