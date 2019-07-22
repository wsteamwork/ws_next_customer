import React from 'react';
import { NextPage } from 'next';
import NextHead from '@/components/NextHead';
import Link from 'next/link';

const Home: NextPage = () => (
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
export default Home;
