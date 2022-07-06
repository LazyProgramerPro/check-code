import { parseFullSymbol } from './helpers.js';
import moment from 'moment';
import ReconnectingWebSocket from 'reconnecting-websocket';
const baseURL = process.env.REACT_APP_BASE_WEBSOCKET_URL;

var socket = new ReconnectingWebSocket(`${baseURL}/ws`, [], {
  connectionTimeout: 5000,
});
const channelToSubscription = new Map();

socket.onopen = () => {
  console.log(`[Chart] Socket opened`);
  setInterval(
    () =>
      socket.send(
        JSON.stringify({
          method: 'GET_PROPERTY',
          id: Math.random(),
        }),
      ),
    5000,
  );
};

socket.onmessage = message => {
  const Message = JSON.parse(message?.data);
  // console.log('[socket] Message:', Message);

  const fromSymbol = Message.FSYM;
  const toSymbol = Message.TSYM;
  const tradeTimeStr = Message.TS;
  const tradePriceStr = Message.P;
  const tradePrice = parseFloat(tradePriceStr);
  const tradeTime = parseInt(tradeTimeStr);
  const channelString = `${fromSymbol}/${toSymbol}_CHART`;
  const subscriptionItem = channelToSubscription.get(channelString);
  if (subscriptionItem === undefined) {
    return;
  }
  const lastDailyBar = subscriptionItem.lastDailyBar;
  const nextDailyBarTime = getNextDailyBarTime(
    lastDailyBar?.time,
    subscriptionItem.resolution,
  );
  // console.log('subscriptionItemResolution', subscriptionItem.resolution);
  // console.log('tradeTime', tradeTime);
  // console.log('lastDailyBar', lastDailyBar);
  // console.log('lastDailyBarTime', lastDailyBar.time);
  // console.log('nextDailyBarTime', nextDailyBarTime);
  // console.log('tradePrice', tradePrice);
  let bar;
  if (tradeTime >= nextDailyBarTime) {
    bar = {
      time: nextDailyBarTime,
      open: tradePrice,
      high: tradePrice,
      low: tradePrice,
      close: tradePrice,
    };
    console.log('[socket] Generate new bar', bar);
  } else {
    bar = {
      ...lastDailyBar,
      high: Math.max(lastDailyBar?.high, tradePrice),
      low: Math.min(lastDailyBar?.low, tradePrice),
      close: tradePrice,
    };
    // console.log('[socket] Update the latest bar by price', tradePrice);
    console.log('[socket] Update the latest bar by price', bar);
  }
  subscriptionItem.lastDailyBar = bar;

  // send data to every subscriber of that symbol
  subscriptionItem.handlers.forEach(handler => handler.callback(bar));
};
// };

function getNextDailyBarTime(barTime, resolution) {
  // const date = moment(barTime);
  // date.setMinutes(date.getMinutes() + 1);
  switch (resolution) {
    case '1':
      return moment(barTime).add(1, 'm').startOf('minute').valueOf();
    case '5':
      return moment(barTime).add(5, 'm').startOf('minute').valueOf();
    case '1D':
      return moment(barTime).add(1, 'd').startOf('day').valueOf();
    case 'D':
      return moment(barTime).add(1, 'w').startOf('week').valueOf();
    case '1W':
      return moment(barTime).add(1, 'w').startOf('week').valueOf();
    case '1M':
      return moment(barTime).add(1, 'M').startOf('month').valueOf();
    default:
  }
}

export function subscribeOnStream(
  symbolInfo,
  resolution,
  onRealtimeCallback,
  subscribeUID,
  onResetCacheNeededCallback,
  lastDailyBar,
) {
  const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
  const channelString = `${parsedSymbol.fromSymbol}/${parsedSymbol.toSymbol}_CHART`;
  const handler = {
    id: subscribeUID,
    callback: onRealtimeCallback,
  };
  let subscriptionItem = channelToSubscription.get(channelString);
  if (subscriptionItem) {
    // already subscribed to the channel, use the existing subscription
    subscriptionItem.handlers.push(handler);
    return;
  }
  subscriptionItem = {
    subscribeUID,
    resolution,
    lastDailyBar,
    handlers: [handler],
  };
  channelToSubscription.set(channelString, subscriptionItem);
  console.log(
    '[subscribeBars]: Subscribe to streaming. Channel:',
    channelString,
  );
  socket.send(
    JSON.stringify({
      method: 'SUBSCRIBE',
      pair: parsedSymbol.fromSymbol + '/' + parsedSymbol.toSymbol + '_CHART',
    }),
  );
}

export function unsubscribeFromStream(subscriberUID) {
  // find a subscription with id === subscriberUID
  for (const channelString of channelToSubscription.keys()) {
    const subscriptionItem = channelToSubscription.get(channelString);
    const handlerIndex = subscriptionItem.handlers.findIndex(
      handler => handler.id === subscriberUID,
    );

    if (handlerIndex !== -1) {
      // remove from handlers
      subscriptionItem.handlers.splice(handlerIndex, 1);

      if (subscriptionItem.handlers.length === 0) {
        // unsubscribe from the channel, if it was the last handler
        console.log(
          '[unsubscribeBars]: Unsubscribe from streaming. Channel:',
          channelString,
        );
        socket.send(
          JSON.stringify({
            method: 'UNSUBSCRIBE',
            pair: channelString,
          }),
        );
        channelToSubscription.delete(channelString);
        break;
      }
    }
  }
}
