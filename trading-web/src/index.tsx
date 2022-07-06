/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Use consistent styling
import 'sanitize.css/sanitize.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import root app
import { App } from 'app';

import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';

import reportWebVitals from 'reportWebVitals';
import { ThemeContextProvider } from 'app/components/common/themeContext';
import 'index.css';
// Initialize languages
import i18n from './locales/i18n';
import { I18nextProvider } from 'react-i18next';
//Context Privider
import { GlobalContextProvider } from 'app/components/common/context';

const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <ThemeContextProvider>
        <GlobalContextProvider>
          {/* <React.StrictMode> */}
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
          {/* </React.StrictMode> */}
        </GlobalContextProvider>
      </ThemeContextProvider>
    </HelmetProvider>
  </Provider>,
  MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
