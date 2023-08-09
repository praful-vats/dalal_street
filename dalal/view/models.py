from django.db import models

class Stock(models.Model):
    symbol = models.CharField(max_length=10)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    change = models.DecimalField(max_digits=10, decimal_places=2)
    pChange = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.symbol
