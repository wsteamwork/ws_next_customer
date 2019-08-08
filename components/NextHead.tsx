import React, { FC } from 'react';
import Head from 'next/head';
interface IProps {
  title: string;
  description: string;
  url: string;
  ogImage: string;
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
  </Head>
);

export default NextHead;
