import '../styles/globals.css';
import '../styles/loading.css';
import '../styles/form.css';
import '../styles//mobile.css';
import '../styles/profile.css';
import '../styles/navbar.css';
import '../styles/bouton.css';
import '../styles/gestion-article.css';
import 'antd/dist/antd.css';
import { useState } from 'react';
import Layout from '../components/Layout';
import { DataProvider } from '../store/GlobalState';
import Router from 'next/router';
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
  });

  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
  });

  return (
      <DataProvider>
        <Layout>
          { loading && <Loading /> }
        <Component {...pageProps} />
        </Layout>
      </DataProvider>

  );
};

export default MyApp;
