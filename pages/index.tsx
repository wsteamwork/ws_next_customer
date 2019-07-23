import React from 'react';
import { NextPage } from 'next';
import NextHead from '@/components/NextHead';
import Link from 'next/link';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { useCookies } from 'react-cookie';

const Home: NextPage = () => {
  const { t, i18n }: UseTranslationResponse = useTranslation();
  const [cookies, setCookie, removeCookie] = useCookies(['initLanguage']);

  const handleChangeVN = () => {
    i18n.changeLanguage('vi');
    setCookie('initLanguage', 'vi');
  };

  const handleChangeEN = () => {
    i18n.changeLanguage('en');
    setCookie('initLanguage', 'en');
  };

  return (
    <div>
      <NextHead
        title="Nextjs Demo"
        description="Welcome to Nextjs"
        url="https://nextjs.org/"></NextHead>

      <div>
        <h1>{t('home:example')} 😄</h1>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Button
          onClick={handleChangeVN}
          color="primary"
          variant="contained"
          style={{ marginLeft: '2%', color: 'white' }}>
          VN
        </Button>
        <Button onClick={handleChangeEN} color="primary" variant="contained">
          EN
        </Button>
      </div>
    </div>
  );
};

export default Home;
