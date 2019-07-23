import React, { useContext, useEffect, useReducer } from 'react';
import { NextPage, NextPageContext } from 'next';
import NextHead from '@/components/NextHead';
import Link from 'next/link';

const Home: NextPage = (props) => {
  
  return (
    <div>
      <NextHead
        title="Nextjs Demo"
        description="Welcome to Nextjs"
        url="https://nextjs.org/"></NextHead>

      <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <h1>Hello NextJS 😄</h1>
        <Link href="/about">
          <a>About</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
