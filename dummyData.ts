const dummyData = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    current_price: 30107,
    market_cap: 585121083342,
    market_cap_rank: 1,
    fully_diluted_valuation: 632344023088,
    total_volume: 8279191524,
    high_24h: 30442,
    low_24h: 30093,
    price_change_24h: -237.189060661869,
    price_change_percentage_24h: -0.78167,
    market_cap_change_24h: -4423600659.138428,
    market_cap_change_percentage_24h: -0.75034,
    circulating_supply: 19431737,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 69045,
    ath_change_percentage: -56.2854,
    ath_date: "2021-11-10T14:24:11.849Z",
    atl: 67.81,
    atl_change_percentage: 44411.2639,
    atl_date: "2013-07-06T00:00:00.000Z",
    roi: null,
    last_updated: "2023-07-17T12:19:35.940Z",
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    current_price: 1906.06,
    market_cap: 229127040781,
    market_cap_rank: 2,
    fully_diluted_valuation: 229127040781,
    total_volume: 5567881545,
    high_24h: 1942.78,
    low_24h: 1902.3,
    price_change_24h: -29.388732981724388,
    price_change_percentage_24h: -1.51845,
    market_cap_change_24h: -3491471515.7837524,
    market_cap_change_percentage_24h: -1.50094,
    circulating_supply: 120201013.32982,
    total_supply: 120201013.32982,
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: -60.80625,
    ath_date: "2021-11-10T14:24:19.604Z",
    atl: 0.432979,
    atl_change_percentage: 441485.80567,
    atl_date: "2015-10-20T00:00:00.000Z",
    roi: {
      times: 83.6187305418227,
      currency: "btc",
      percentage: 8361.87305418227,
    },
    last_updated: "2023-07-17T12:19:37.584Z",
  },
  {
    id: "tether",
    symbol: "usdt",
    name: "Tether",
    image:
      "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
    current_price: 1,
    market_cap: 83666570893,
    market_cap_rank: 3,
    fully_diluted_valuation: 83666570893,
    total_volume: 17351292364,
    high_24h: 1.003,
    low_24h: 0.998463,
    price_change_24h: -0.000062367917854633,
    price_change_percentage_24h: -0.00624,
    market_cap_change_24h: -2997159.928329468,
    market_cap_change_percentage_24h: -0.00358,
    circulating_supply: 83649374839.9383,
    total_supply: 83649374839.9383,
    max_supply: null,
    ath: 1.32,
    ath_change_percentage: -24.39728,
    ath_date: "2018-07-24T00:00:00.000Z",
    atl: 0.572521,
    atl_change_percentage: 74.71779,
    atl_date: "2015-03-02T00:00:00.000Z",
    roi: null,
    last_updated: "2023-07-17T12:15:00.446Z",
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image:
      "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
    current_price: 0.733813,
    market_cap: 38523493899,
    market_cap_rank: 4,
    fully_diluted_valuation: 73316508980,
    total_volume: 2946573370,
    high_24h: 0.7864,
    low_24h: 0.730749,
    price_change_24h: -0.017279017095280236,
    price_change_percentage_24h: -2.30052,
    market_cap_change_24h: -961715398.9328995,
    market_cap_change_percentage_24h: -2.43563,
    circulating_supply: 52544091958,
    total_supply: 99988621362,
    max_supply: 100000000000,
    ath: 3.4,
    ath_change_percentage: -78.35519,
    ath_date: "2018-01-07T00:00:00.000Z",
    atl: 0.00268621,
    atl_change_percentage: 27283.8933,
    atl_date: "2014-05-22T00:00:00.000Z",
    roi: null,
    last_updated: "2023-07-17T12:19:33.498Z",
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image:
      "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",
    current_price: 242.77,
    market_cap: 37840232783,
    market_cap_rank: 5,
    fully_diluted_valuation: 48558192160,
    total_volume: 774523719,
    high_24h: 250.45,
    low_24h: 240.76,
    price_change_24h: -7.679328661597339,
    price_change_percentage_24h: -3.06626,
    market_cap_change_24h: -1190571362.0795135,
    market_cap_change_percentage_24h: -3.05034,
    circulating_supply: 155855196,
    total_supply: 157900174,
    max_supply: 200000000,
    ath: 686.31,
    ath_change_percentage: -64.54048,
    ath_date: "2021-05-10T07:24:17.097Z",
    atl: 0.0398177,
    atl_change_percentage: 611088.02035,
    atl_date: "2017-10-19T00:00:00.000Z",
    roi: null,
    last_updated: "2023-07-17T12:19:33.703Z",
  },
  {
    id: "usd-coin",
    symbol: "usdc",
    name: "USD Coin",
    image:
      "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
    current_price: 1,
    market_cap: 27223614116,
    market_cap_rank: 6,
    fully_diluted_valuation: 27223614116,
    total_volume: 3131926016,
    high_24h: 1.002,
    low_24h: 0.998052,
    price_change_24h: -0.000200898478106781,
    price_change_percentage_24h: -0.02008,
    market_cap_change_24h: -69544079.01940536,
    market_cap_change_percentage_24h: -0.2548,
    circulating_supply: 27259388941.6471,
    total_supply: 27259388941.6471,
    max_supply: null,
    ath: 1.17,
    ath_change_percentage: -14.71119,
    ath_date: "2019-05-08T00:40:28.300Z",
    atl: 0.877647,
    atl_change_percentage: 13.96239,
    atl_date: "2023-03-11T08:02:13.981Z",
    roi: null,
    last_updated: "2023-07-17T12:19:37.347Z",
  },
  {
    id: "staked-ether",
    symbol: "steth",
    name: "Lido Staked Ether",
    image:
      "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1608607546",
    current_price: 1905.56,
    market_cap: 14750891792,
    market_cap_rank: 7,
    fully_diluted_valuation: 14750891792,
    total_volume: 13447786,
    high_24h: 1940.83,
    low_24h: 1902.56,
    price_change_24h: -28.82852582726514,
    price_change_percentage_24h: -1.49032,
    market_cap_change_24h: -204553051.99052238,
    market_cap_change_percentage_24h: -1.36775,
    circulating_supply: 7745251.04896918,
    total_supply: 7745251.04896918,
    max_supply: 7745251.04896918,
    ath: 4829.57,
    ath_change_percentage: -60.43836,
    ath_date: "2021-11-10T14:40:47.256Z",
    atl: 482.9,
    atl_change_percentage: 295.66622,
    atl_date: "2020-12-22T04:08:21.854Z",
    roi: null,
    last_updated: "2023-07-17T12:19:32.228Z",
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image:
      "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860",
    current_price: 0.311098,
    market_cap: 10905856151,
    market_cap_rank: 8,
    fully_diluted_valuation: 14003801829,
    total_volume: 284230910,
    high_24h: 0.323923,
    low_24h: 0.310144,
    price_change_24h: -0.012173413817358092,
    price_change_percentage_24h: -3.76569,
    market_cap_change_24h: -438444035.7168865,
    market_cap_change_percentage_24h: -3.86488,
    circulating_supply: 35045020830.3234,
    total_supply: 45000000000,
    max_supply: 45000000000,
    ath: 3.09,
    ath_change_percentage: -89.89244,
    ath_date: "2021-09-02T06:00:10.474Z",
    atl: 0.01925275,
    atl_change_percentage: 1520.60651,
    atl_date: "2020-03-13T02:22:55.044Z",
    roi: null,
    last_updated: "2023-07-17T12:19:37.299Z",
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image:
      "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
    current_price: 26.92,
    market_cap: 10854900552,
    market_cap_rank: 9,
    fully_diluted_valuation: 14896672534,
    total_volume: 849663078,
    high_24h: 28.53,
    low_24h: 26.91,
    price_change_24h: -1.2183063692507936,
    price_change_percentage_24h: -4.33043,
    market_cap_change_24h: -486203062.19233894,
    market_cap_change_percentage_24h: -4.28709,
    circulating_supply: 402682817.334621,
    total_supply: 552619900.679224,
    max_supply: null,
    ath: 259.96,
    ath_change_percentage: -89.56957,
    ath_date: "2021-11-06T21:54:35.825Z",
    atl: 0.500801,
    atl_change_percentage: 5314.29528,
    atl_date: "2020-05-11T19:35:23.449Z",
    roi: null,
    last_updated: "2023-07-17T12:19:28.298Z",
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image:
      "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256",
    current_price: 0.069273,
    market_cap: 9716587591,
    market_cap_rank: 10,
    fully_diluted_valuation: 9716590363,
    total_volume: 579739944,
    high_24h: 0.072613,
    low_24h: 0.068787,
    price_change_24h: -0.002412765498223918,
    price_change_percentage_24h: -3.36577,
    market_cap_change_24h: -321035499.97472,
    market_cap_change_percentage_24h: -3.19832,
    circulating_supply: 140209276383.705,
    total_supply: 140209316383.705,
    max_supply: null,
    ath: 0.731578,
    ath_change_percentage: -90.50386,
    ath_date: "2021-05-08T05:08:23.458Z",
    atl: 0.0000869,
    atl_change_percentage: 79840.9432,
    atl_date: "2015-05-06T00:00:00.000Z",
    roi: null,
    last_updated: "2023-07-17T12:19:28.261Z",
  },
];
export default dummyData;
