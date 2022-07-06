import { makeApiRequest, generateSymbol, parseFullSymbol } from './helpers';
import { subscribeOnStream, unsubscribeFromStream } from './streaming';

const lastBarsCache = new Map();

const configurationData = {
  supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
  exchanges: [
    {
      value: 'POW',
      name: 'POW',
      desc: 'POW',
    },
  ],
  symbols_types: [
    {
      name: 'crypto',

      // `symbolType` argument for the `searchSymbols` method, if a user selects this symbol type
      value: 'crypto',
    }, // ...
  ],
};

async function getAllSymbols() {
  const data = await makeApiRequest('/trade-his/exchange');
  let allSymbols = [];

  for (const exchange of configurationData.exchanges) {
    if (data?.Response === 'Success') {
      const pairs = data.Data[exchange.value].pairs;
      if (pairs !== undefined && pairs !== null) {
        for (const leftPairPart of Object.keys(pairs)) {
          const symbols = pairs[leftPairPart].map(rightPairPart => {
            const symbol = generateSymbol(
              exchange.value,
              leftPairPart,
              rightPairPart,
            );
            return {
              symbol: symbol.short,
              full_name: symbol.full,
              description: symbol.short,
              exchange: exchange.value,
              type: 'crypto',
            };
          });
          allSymbols = [...allSymbols, ...symbols];
        }
      }
    }
  }
  return allSymbols;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  onReady: callback => {
    console.log('[onReady]: Method call');
    setTimeout(() => callback(configurationData));
  },

  searchSymbols: async (
    userInput,
    exchange,
    symbolType,
    onResultReadyCallback,
  ) => {
    // console.log('[searchSymbols]: Method call');
    const symbols = await getAllSymbols();
    const newSymbols = symbols.filter(symbol => {
      const isExchangeValid = exchange === '' || symbol.exchange === exchange;
      const isFullSymbolContainsInput =
        symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1;
      return isExchangeValid && isFullSymbolContainsInput;
    });
    onResultReadyCallback(newSymbols);
  },

  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback,
  ) => {
    // console.log('[resolveSymbol]: Method call', symbolName);
    const symbols = await getAllSymbols();
    const symbolItem = symbols.find(
      ({ full_name }) => full_name === symbolName,
    );
    if (!symbolItem) {
      // console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
      onResolveErrorCallback('cannot resolve symbol');
      return;
    }
    const symbolInfo = {
      ticker: symbolItem.full_name,
      name: symbolItem.symbol,
      description: symbolItem.description,
      type: symbolItem.type,
      session: '24x7',
      timezone: 'Asia/Bangkok',
      exchange: symbolItem.exchange,
      minmov: 1,
      pricescale: 100,
      has_intraday: true,
      intraday_multipliers: ['1', '5', '15', '30', '60'],
      // has_seconds: true,
      // seconds_multipliers: ['1S', '5S', '15S'],
      has_no_volume: true,
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 8,
      data_status: 'streaming',
    };

    // console.log('[resolveSymbol]: Symbol resolved', symbolName);
    onSymbolResolvedCallback(symbolInfo);
  },
  getBars: async (
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest,
  ) => {
    // const {
    //   from1,
    //   to1,
    //   firstDataRequest
    // } = periodParams
    // const from = 1638344956
    // const to = 1640850556
    // console.log(
    //   '[getBars]: Method call',
    //   symbolInfo,
    //   'RESOLUTION: ',
    //   resolution,
    //   'FROM: ',
    //   from,
    //   'TO: ',
    //   to,
    //   onHistoryCallback,
    //   onErrorCallback,
    //   firstDataRequest,
    // );
    const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
    const urlParameters = {
      e: parsedSymbol.exchange,
      fsym: parsedSymbol.fromSymbol,
      tsym: parsedSymbol.toSymbol,
      toTs: to,
      limit: 2000,
      interval: resolution,
    };
    const query = Object.keys(urlParameters)
      .map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
      .join('&');
    try {
      // console.log('tuanpa:url:', `/trade-his/candle?${query}`);
      const data = await makeApiRequest(`/trade-his/candle?${query}`);
      if (
        (data.Response && data.Response === 'Error') ||
        data.Data.length === 0
      ) {
        // "noData" should be set if there is no data in the requested period.
        onHistoryCallback([], {
          noData: true,
        });
        return;
      }
      let bars = [];
      data.Data.forEach(bar => {
        if (bar.time >= from && bar.time < to) {
          bars = [
            ...bars,
            {
              time: bar.time * 1000,
              low: bar.low,
              high: bar.high,
              open: bar.open,
              close: bar.close,
            },
          ];
        }
      });
      if (firstDataRequest) {
        lastBarsCache.set(symbolInfo.full_name, {
          ...bars[bars.length - 1],
        });
      }
      // console.log('bars:', bars);
      // console.log(`[getBars]: returned ${bars.length} bar(s)`);
      onHistoryCallback(bars, {
        noData: false,
      });
    } catch (error) {
      // console.log('[getBars]: Get error', error);
      onErrorCallback(error);
    }
  },

  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback,
  ) => {
    // console.log(
    //   '[subscribeBars]: Method call with subscribeUID:',
    //   subscribeUID,
    // );
    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback,
      lastBarsCache.get(symbolInfo.full_name),
    );
  },
  unsubscribeBars: subscriberUID => {
    // console.log(
    //   '[unsubscribeBars]: Method call with subscriberUID:',
    //   subscriberUID,
    // );
    unsubscribeFromStream(subscriberUID);
  },
};
