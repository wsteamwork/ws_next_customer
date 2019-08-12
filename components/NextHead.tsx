import React, { FC } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
interface IProps {
  title: string;
  description: string;
  url: string;
  ogImage: string;
  ogSitename: string;
}

const NextHead: FC<IProps> = (props) => (
  <NextSeo
    title={props.title}
    description={props.description}
    canonical={props.url}
    additionalMetaTags={[{
      name: 'robots',
      content: 'index,follow'
    }]}
    openGraph={{
      url: props.url,
      title: props.title,
      locale: 'vi-VN',
      description: props.description,
      images: [
        {
          url: props.ogImage,
          width: 1200,
          height: 630
        }
      ],
      site_name: props.ogSitename,
    }}
    facebook={{
      appId: '331750437466885',
    }}
    twitter={{
      handle: '@handle',
      site: '@site',
      cardType: 'summary_large_image',
    }}
  />
);

export default NextHead;
