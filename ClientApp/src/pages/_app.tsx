import 'bootstrap/dist/css/bootstrap.min.css';
import { NextUIProvider, useSSR } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReactLoading from "react-loading";

import Layout from '../components/layout/layout.component';
import StyledComponentsRegistry from '../components/registry/registry.component';
import '../styles/globals.css';
import { persistor, store, wrapper } from '../store/store';

function App({ Component, pageProps }: AppProps) {
  const { isBrowser } = useSSR()
  return (
    isBrowser && (
      <NextUIProvider >
        <StyledComponentsRegistry>
          <Provider store={store}>
            <PersistGate 
              loading={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <ReactLoading type="bars" color="lightgrey" height={375} width={375}/>
                </div>
              } 
              persistor={persistor} 
            >
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

export default wrapper.withRedux(App);