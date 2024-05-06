# TickerAI - Data Architecture

+ MarketsSetup (to be updated!)
  + list of all markets
+ Stocks
  + list of all Stocks
+ (Stocks) Sectors
  + list of all Sectors per Market
+ Market Topics
  + list of all Topics per Market

```
+ **Preferences**
 + marketsAspectsSelections: IMarketsAspectsSelection[];
  + [
   market: IMarket;
   marketsAspectSelection: IMarketAspectSelections[];
    + [
     aspect: IMarketAspectSetup;
     selections: ISelection[];
    ]
  ]
```
