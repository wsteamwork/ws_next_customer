import React from 'react';
import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/nav';
import ToTheTop from '@/components/Button/ButtonToTop';
import '@/styles/index.css';

const Home = () => (
  <div>
    <Head title="Home" />
    <Nav />
    <div className="hero">
      <h1 className="title">Welcome to Next!</h1>
      <p className="description">
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>

      <div className="row">
        <Link href="https://github.com/zeit/next.js#getting-started">
          <a className="card">
            <h3>Getting Started &rarr;</h3>
            <ToTheTop />
          </a>
        </Link>
        <Link href="https://github.com/zeit/next.js/tree/master/examples">
          <a className="card">
            <h3>Examples &rarr;</h3>
            <p>
              Find other example boilerplates on the <code>create-next-app</code> site
            </p>
          </a>
        </Link>
        <Link href="https://github.com/zeit/next.js">
          <a className="card">
            <h3>Create Next App &rarr;</h3>
            <p>Was this tool helpful? Let us know how we can improve it</p>
          </a>
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
