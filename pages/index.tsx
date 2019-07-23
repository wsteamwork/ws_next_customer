import React from 'react';
import { NextPage } from 'next';
import NextHead from '@/components/NextHead';
import Link from 'next/link';
import { useTranslation, UseTranslationResponse } from 'react-i18next';

const Home: NextPage = () => {
  const { t }: UseTranslationResponse = useTranslation();

  return (
    <div>
      <NextHead
        title="Nextjs Demo"
        description="Welcome to Nextjs"
        url="https://nextjs.org/"></NextHead>

      <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <h1>{t('example')} 😄</h1>
        <Link href="/about">
          <a>About</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
