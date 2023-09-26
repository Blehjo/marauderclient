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

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const { isBrowser } = useSSR()
  return (
    isBrowser && (
      <NextUIProvider >
        <StyledComponentsRegistry>
          <Provider store={store}>
            {/* <CacheProvider value={emotionCache}> */}
            <PersistGate 
              loading={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <ReactLoading type="bars" color="lightgrey" height={375} width={375}/>
                </div>
              } 
              persistor={persistor} 
              >
              <Layout>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, maximum-scale=1"
                />
                <Component {...pageProps} />
              </Layout>
            </PersistGate>
            {/* </CacheProvider> */}
          </Provider>
        </StyledComponentsRegistry>
      </NextUIProvider>
    )
  );
}

export default App;