import React from 'react';
import { NextPage } from 'next';
import NextHead from '@/components/NextHead';
import SearchAutocomplete from '@/components/SearchAutoSuggestion';

const Home: NextPage = () => {
  return (
    <div>
      <NextHead
        title="Nextjs Demo"
        description="Welcome to Nextjs"
        url="https://nextjs.org/"></NextHead>

      <SearchAutocomplete/>
    </div>
  );
};

export default Home;
