/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Container, Span } from './style';
import { useState, useEffect } from 'react';
import { widget } from './charting_library';
import Datafeed1 from './api/datafeeds';
import { useParams } from 'react-router-dom';
const Chart = props => {
  const tv_chart_container = 'tv_chart_container';
  const libraryPath = '/custom_scripts/chart_main/';
  let { pair } = useParams();
  const [selectedTime, setSelectedTime] = useState('1');
  const [reselect, setReselect] = useState(true);
  const findIndex = pair?.indexOf('_');
  const changeFormatPair = `POW:${pair?.substring(
    0,
    findIndex,
  )}/${pair?.substring(findIndex + 1)}`;
  const timeFrame = [
    {
      title: '1min',
      value: '1',
    },
    {
      title: '5min',
      value: '5',
    },
    {
      title: '15min',
      value: '15',
    },
    {
      title: '30min',
      value: '30',
    },
    {
      title: '1h',
      value: '60',
    },
    {
      title: '4h',
      value: '240',
    },
    {
      title: '1D',
      value: '1D',
    },
    {
      title: '1W',
      value: '1W',
    },
    {
      title: '1M',
      value: '1M',
    },
  ];
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    initTradingView();
  }, [changeFormatPair]);
  const initTradingView = () => {
    const widgetOptions = {
      fullscreen: false,
      autosize: true,
      symbol: changeFormatPair,
      container_id: tv_chart_container,
      library_path: libraryPath,
      datafeed: Datafeed1,
      locale: 'en',
      timezone: 'Asia/Bangkok', //todo: ustawianie timezone'a po strefie usera
      charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      style: '1',
      debug: true,
      loading_screen: {
        backgroundColor: '#1e2329',
        foregroundColor: '#000000',
      }, //todo:do it
      interval: selectedTime,
      enable_publishing: false,
      // timeframe:'',//todo: na koncu
      toolbar_bg: `#1e2329`,
      // saved_data: this.savedData,
      allow_symbol_change: true,
      // studies: [
      //   'MASimple@tv-basicstudies',
      //   'MAExp@tv-basicstudies',
      //   'MAWeighted@tv-basicstudies',
      // ],
      time_frames: [
        {
          text: '5y',
          resolution: 'W',
        },
        {
          text: '1y',
          resolution: 'W',
        },
        {
          text: '6m',
          resolution: '120',
        },
        {
          text: '3m',
          resolution: '60',
        },
        {
          text: '1m',
          resolution: '30',
        },
        {
          text: '5d',
          resolution: '5',
        },
        {
          text: '1d',
          resolution: '1',
        },
      ],
      drawings_access: {
        type: 'black',
        // tools: [{name: "Regression Trend"}]//todo: moje
        tools: [
          {
            name: 'Trend Line',
            grayed: true,
          },
          {
            name: 'Trend Angle',
            grayed: true,
          },
        ], //todo: bb
      },
      disabled_features: [
        'header_symbol_search',
        'header_interval_dialog_button',
        'show_interval_dialog_on_key_press',
        'symbol_search_hot_key',
        // 'study_dialog_search_control',
        // 'display_market_status',
        // 'header_compare',
        // 'edit_buttons_in_legend',
        'symbol_info',
        // 'border_around_the_chart',
        // 'main_series_scale_menu',
        // 'star_some_intervals_by_default',
        // 'datasource_copypaste',
        // 'right_bar_stays_on_scroll',
        'context_menus',
        'go_to_date',
        'use_localstorage_for_settings',
        // 'compare_symbol',
        // 'border_around_the_chart',
        // 'timezone_menu',
        // 'header_resolutions', //todo: przetestowac
        // 'control_bar', //todo: przetestowac
        // 'edit_buttons_in_legend', //todo: przetestowac
        // 'remove_library_container_border',
        // 'constraint_dialogs_movement',
      ],
      enabled_features: [
        // 'header_symbol_search',
        // 'header_interval_dialog_button',
        // 'show_interval_dialog_on_key_press',
        // 'symbol_search_hot_key',
        'study_dialog_search_control',
        'display_market_status',
        'header_compare',
        'adaptive_logo',
        // 'symbol_info',
        'border_around_the_chart',
        'main_series_scale_menu',
        'star_some_intervals_by_default',
        'datasource_copypaste',
        'right_bar_stays_on_scroll',
        // 'context_menus',
        // 'go_to_date',
        'study_templates',
        'compare_symbol',
        'timezone_menu',
        'header_resolutions', //todo: przetestowac
        'control_bar', //todo: przetestowac
        'edit_buttons_in_legend', //todo: przetestowac
        'remove_library_container_border',
        'dont_show_boolean_study_arguments',
        // 'use_localstorage_for_settings',
        'save_chart_properties_to_local_storage',
        'side_toolbar_in_fullscreen_mode',
        'hide_last_na_study_output',
        // 'constraint_dialogs_movement', //todo: nie do końca jestem pewien
      ],
      studies_overrides: {
        'volume.volume.color.0': '#ff9710',
        'volume.volume.color.1': '#0ecb81',
        'volume.volume.transparency': 100,
        'volume.volume ma.color': '#FF0000',
        'volume.volume ma.transparency': 30,
        'volume.volume ma.linewidth': 5,
        'volume.show ma': true,
        'bollinger bands.median.color': '#33FF88',
        'bollinger bands.upper.linewidth': 7,
      },
      overrides: {
        'symbolWatermarkProperties.color': 'rgba(0,0,0, 0)',
        'paneProperties.background': '#1e2329',
        'paneProperties.vertGridProperties.color': '#2c2c31',
        'paneProperties.horzGridProperties.color': '#2c2c31',
        'paneProperties.crossHairProperties.color': '#58637a',
        'paneProperties.crossHairProperties.style': 2,
        'mainSeriesProperties.style': 1,
        'mainSeriesProperties.showCountdown': true,
        'mainSeriesProperties.onWidget': true,
        'scalesProperties.showSeriesLastValue': true,
        'mainSeriesProperties.visible': false,
        'mainSeriesProperties.showPriceLine': true,
        'mainSeriesProperties.priceLineWidth': 1,
        'mainSeriesProperties.lockScale': false,
        'mainSeriesProperties.minTick': 'default',
        'mainSeriesProperties.extendedHours': false,
        volumePaneSize: 'medium',
        editorFontsList: [
          'Lato',
          'Arial',
          'Verdana',
          'Courier New',
          'Times New Roman',
        ],
        'paneProperties.topMargin': 15,
        'paneProperties.bottomMargin': 20,
        'paneProperties.leftAxisProperties.autoScale': true,
        'paneProperties.leftAxisProperties.autoScaleDisabled': false,
        'paneProperties.leftAxisProperties.percentage': true,
        'paneProperties.leftAxisProperties.percentageDisabled': true,
        'paneProperties.leftAxisProperties.log': false,
        'paneProperties.leftAxisProperties.logDisabled': false,
        'paneProperties.leftAxisProperties.alignLabels': true,
        'paneProperties.legendProperties.showStudyArguments': true,
        'paneProperties.legendProperties.showStudyTitles': true,
        'paneProperties.legendProperties.showStudyValues': true,
        'paneProperties.legendProperties.showSeriesTitle': true,
        'paneProperties.legendProperties.showSeriesOHLC': true,
        'scalesProperties.showLeftScale': false,
        'scalesProperties.showRightScale': true,
        'scalesProperties.backgroundColor': '#1e2329',
        'scalesProperties.lineColor': '#1e2329',
        'scalesProperties.textColor': '#8f98ad',
        'scalesProperties.scaleSeriesOnly': false,
        'timeScale.rightOffset': 3,
        'mainSeriesProperties.priceAxisProperties.autoScale': true,
        'mainSeriesProperties.priceAxisProperties.autoScaleDisabled': false,
        'mainSeriesProperties.priceAxisProperties.percentage': false,
        'mainSeriesProperties.priceAxisProperties.percentageDisabled': false,
        'mainSeriesProperties.priceAxisProperties.log': false,
        'mainSeriesProperties.priceAxisProperties.logDisabled': false,
        'mainSeriesProperties.candleStyle.upColor': '#0ecb81',
        'mainSeriesProperties.candleStyle.downColor': '#ff9710',
        'mainSeriesProperties.candleStyle.drawWick': true,
        'mainSeriesProperties.candleStyle.drawBorder': true,
        'mainSeriesProperties.candleStyle.borderColor': '#0ecb81',
        'mainSeriesProperties.candleStyle.borderUpColor': '#0ecb81',
        'mainSeriesProperties.candleStyle.borderDownColor': '#ff9710',
        'mainSeriesProperties.candleStyle.wickColor': '#737375',
        'mainSeriesProperties.candleStyle.wickUpColor': '#0ecb81',
        'mainSeriesProperties.candleStyle.wickDownColor': '#ff9710',
        'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false,
        'mainSeriesProperties.hollowCandleStyle.upColor': '#0ecb81',
        'mainSeriesProperties.hollowCandleStyle.downColor': '#ff9710',
        'mainSeriesProperties.hollowCandleStyle.drawWick': true,
        'mainSeriesProperties.hollowCandleStyle.drawBorder': true,
        'mainSeriesProperties.hollowCandleStyle.borderColor': '#0ecb81',
        'mainSeriesProperties.hollowCandleStyle.borderUpColor': '#0ecb81',
        'mainSeriesProperties.hollowCandleStyle.borderDownColor': '#ff9710',
        'mainSeriesProperties.hollowCandleStyle.wickColor': '#737375',
        'mainSeriesProperties.hollowCandleStyle.wickUpColor': '#0ecb81',
        'mainSeriesProperties.hollowCandleStyle.wickDownColor': '#ff9710',
        'mainSeriesProperties.haStyle.upColor': '#0ecb81',
        'mainSeriesProperties.haStyle.downColor': '#ff9710',
        'mainSeriesProperties.haStyle.drawWick': true,
        'mainSeriesProperties.haStyle.drawBorder': true,
        'mainSeriesProperties.haStyle.borderColor': '#0ecb81',
        'mainSeriesProperties.haStyle.borderUpColor': '#0ecb81',
        'mainSeriesProperties.haStyle.borderDownColor': '#ff9710',
        'mainSeriesProperties.haStyle.wickColor': '#737375',
        'mainSeriesProperties.haStyle.wickUpColor': '#0ecb81',
        'mainSeriesProperties.haStyle.wickDownColor': '#ff9710',
        'mainSeriesProperties.haStyle.barColorsOnPrevClose': false,
        'mainSeriesProperties.barStyle.upColor': '#0ecb81',
        'mainSeriesProperties.barStyle.downColor': '#ff9710',
        'mainSeriesProperties.barStyle.barColorsOnPrevClose': false,
        'mainSeriesProperties.barStyle.dontDrawOpen': false,
        'mainSeriesProperties.lineStyle.color': '#0cbef3',
        'mainSeriesProperties.lineStyle.linestyle': 0,
        'mainSeriesProperties.lineStyle.linewidth': 1,
        'mainSeriesProperties.lineStyle.priceSource': 'close',
        'mainSeriesProperties.areaStyle.color1': '#0cbef3',
        'mainSeriesProperties.areaStyle.color2': '#0098c4',
        'mainSeriesProperties.areaStyle.linecolor': '#0cbef3',
        'mainSeriesProperties.areaStyle.linestyle': 0,
        'mainSeriesProperties.areaStyle.linewidth': 1,
        'mainSeriesProperties.areaStyle.priceSource': 'close',
        'mainSeriesProperties.areaStyle.transparency': 80,
      },
      custom_css_url: 'chart.css',
      // custom_css_url: 'custom_scripts/chart_main/static/chart.css',
    };
    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      console.log('mounted:onChartReady');
    });
  };
  return (
    <Container>
      <div id={tv_chart_container} className="chart"></div>
    </Container>
  );
};
export default Chart;
