import { NextUIProvider, useSSR } from '@nextui-org/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from '../components/layout/layout.component';
import StyledComponentsRegistry from '../components/registry/registry.component';
import '../src/styles/globals.css';
import { persistor, store } from '../store/store';

export default function App({ Component, pageProps }: AppProps) {
  const { isBrowser } = useSSR()
  return (
    isBrowser && (
      <NextUIProvider >
        <StyledComponentsRegistry>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </PersistGate>
          </Provider>
        </StyledComponentsRegistry>
      </NextUIProvider>
    )
  );
}
