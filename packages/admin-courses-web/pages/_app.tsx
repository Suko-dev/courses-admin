import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from '../components/header/header';
import Layout from '../components/layout/layout';
import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { appTheme } from '../config/theme';
import { wrapper } from '../features/redux/store';
import { Provider } from 'react-redux';

function CustomApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <Head>
        <title>Admin de cursos!</title>
      </Head>
      <main className="app">
        <ThemeProvider theme={appTheme}>
          <Box
            component="main"
            sx={{
              height: '100vh',
              backgroundColor: (theme) => theme.palette.grey[900],
            }}
          >
            <Header />
            <Layout>
              <Provider store={store}>
                <Component {...props.pageProps} />
              </Provider>
            </Layout>
          </Box>
        </ThemeProvider>
      </main>
    </>
  );
}

export default CustomApp;
