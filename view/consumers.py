# import json
# from channels.generic.websocket import AsyncWebsocketConsumer
# from nsetools import Nse
# import asyncio

# class StockConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         await self.accept()
#         print('connect')

#     async def disconnect(self, close_code):
#         print('dicon')
#         pass

#     async def receive(self, text_data):
#         data = json.loads(text_data)
#         symbol = data['symbol']
#         nse = Nse()
#         print("Received symbol:", symbol)

#         while True:
#             try:
#                 q = nse.get_quote(symbol)
#                 pChange = ((q['lastPrice'] - q['open']) / q['open']) * 100
#                 stock_price = {
#                     'symbol': symbol,
#                     'price': q['lastPrice'],
#                     'change': q['change'],
#                     'pChange':'{:>6.2f}%'.format(pChange)
#                 }
#                 print(stock_price)
#                 await self.send(text_data=json.dumps(stock_price))
#             except Exception as e:
#                 print(f"Error fetching data for {symbol}: {str(e)}")
#             await asyncio.sleep(999999999)
#no longer ww1 but www



import json
from channels.generic.websocket import AsyncWebsocketConsumer
from nsepython import *
import asyncio

class StockConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.symbol = self.scope['url_route']['kwargs']['symbol']
        print('symbol:', self.symbol)


    async def disconnect(self, close_code):
        print('disconnect')
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        symbol = data['symbol']
        print(symbol)

        while True:
            try:
                q = nse_eq(symbol)
                # pChange = ((q['lastPrice'] - q['open']) / q['open']) * 100
                stock_price = {
                    'symbol': symbol,
                    'price': q['priceInfo']['lastPrice'],
                    'change': q['priceInfo']['change'],
                    # 'pChange':'{:>6.2f}%'.format(pChange)
                    'pChange' : q['priceInfo']['pChange']
                }
                print('stock_price',stock_price)
                await self.send(text_data=json.dumps(stock_price))
            except Exception as e:
                print(f"Error fetching data for {symbol}: {str(e)}")
            await asyncio.sleep(60)









# from channels.generic.websocket import WebsocketConsumer
# import json 
# from random import randint
# from time import sleep

# class StockConsumer(WebsocketConsumer):
#     def connect(self):
#         self.accept() 

#         for i in range(1000):
#             self.send(json.dumps({'message': randint(1,100)}))
#             sleep(1)



# import json
# import yfinance as yf
# from channels.generic.websocket import AsyncWebsocketConsumer


# class StockConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         symbol = self.scope['url_route']['kwargs']['symbol']
#         self.symbol = symbol
#         self.ticker = yf.Ticker(symbol)
#         await self.channel_layer.group_add(symbol, self.channel_name)
#         await self.accept()

#     async def disconnect(self, close_code):
#         await self.channel_layer.group_discard(self.symbol, self.channel_name)

#     async def receive(self, text_data):
#         pass

#     async def send_stock_data(self, event):
#         data = event['data']
#         await self.send(text_data=json.dumps(data))

#     async def update_stock_data(self):
#         data = self.ticker.history(period='1d')
#         stock_price = {
#             'symbol': self.symbol,
#             'price': data['Close'].iloc[-1],
#             'volume': data['Volume'].iloc[-1],
#             'datetime': data.index[-1].isoformat(),
#         }
#         await self.channel_layer.group_send(self.symbol, {
#             'type': 'send_stock_data',
#             'data': stock_price
#         })




# import json
# import yfinance as yf
# from channels.generic.websocket import AsyncWebsocketConsumer
# import asyncio

# class StockConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         await self.accept()
#         print('connect')

#     async def disconnect(self, close_code):
#         print('dicon')
#         pass

#     async def receive(self, text_data):
#         symbol = text_data
#         ticker = yf.Ticker(symbol)
#         print("Received symbol:", symbol)

#         while True:
#             try:
#                 data = ticker.history(period='1d')
#                 stock_price = {
#                     'symbol': symbol,
#                     'price': data['Close'].iloc[-1],
#                     'volume': data['Volume'].iloc[-1],
#                     'datetime': data.index[-1].isoformat(),
#                 }
#                 await self.send(text_data=json.dumps(stock_price))
#             except Exception as e:
#                 print(f"Error fetching data for {symbol}: {str(e)}")
#             await asyncio.sleep(5)


