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