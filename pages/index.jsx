import React from 'react';
import Head from 'next/head';
import Intro from '../components/Intro';

export default () => (
  <React.Fragment>
    <Head>
      <title>Tanička ❤️ Vojtík</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Intro />
  </React.Fragment>
);
