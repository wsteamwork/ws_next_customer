import React, { FC } from 'react';
import Head from 'next/head';
import '@/styles/index.scss';
interface IProps {
  title: string;
  description: string;
  url: string;
  ogImage?: string;
}

const NextHead: FC<IProps> = (props) => (
  <Head>
    <title>{props.title}</title>
    <meta name="description" content={props.description} />
    <meta property="og:url" content={props.url} />
    <meta property="og:title" content={props.title} />
    <meta property="og:description" content={props.description} />
    <meta name="twitter:site" content={props.url} />
    <meta name="twitter:image" content={props.ogImage} />
    <meta property="og:image" content={props.ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <link rel="stylesheet" href="/_next/static/css/styles.chunk.css" />
  </Head>
);

NextHead.defaultProps = {
  description: '',
  url: '',
  ogImage: '',
  title: ''
};

export default NextHead;
