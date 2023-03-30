import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Header, Layout } from '../components';
import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { appTheme } from '../config/theme';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import store from '../providers/redux/store';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Admin de cursos!</title>
      </Head>
      <main className="app">
        <ThemeProvider theme={appTheme}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={2000}
          >
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
                  <Component {...pageProps} />
                </Provider>
              </Layout>
            </Box>
          </SnackbarProvider>
        </ThemeProvider>
      </main>
    </>
  );
}

export default CustomApp;
