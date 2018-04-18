/*
bid price represents the marginal cost,
or how much it will cost MIT to reduce its demand by a certain MW amount
bid MW amount is the amount that MIT can reduce its electricity consumption
ideally, we would get BidPrice and BidMW from website using GetElementByID
this way, website users can play with more factors
we initialize as many variables as possible to expand complexity later
*/ 
PriceNG=2.52; //price of natural gas (NG), $/million BTUs 
/* https://www.eia.gov/dnav/ng/ng_pri_fut_s1_a.htm
Henry Hub 2016 average Price
note that 2015: $2.62/mmBTU; 2014: $4.37/mmBTU 
*/ 
NGPlantRate =7870/1000; //ramp rate in MW of MIT's NG plant
/*
https://www.eia.gov/electricity/annual/html/epa_08_01.html
in 2016, natural gas average operating heat rate in BTU/kWh
2015:7878 ; 2014: 7907
*/  
BidPrice = PriceNG*NGPlantRate;// units in dollars
BidMW = 0.1; //units in MW, participation requres at least 0.1 MW

module.exports = {PriceNG: PriceNG, 
                    NGPlantRate: NGPlantRate, 
                    BidPrice: BidPrice, 
                    BidMW:BidMW}; 


