import React from 'react';
import Head from 'next/head';
import Intro from '../components/Intro';

export default () => (
  <React.Fragment>
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Intro />
  </React.Fragment>
);
