import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios';

import styles from './index.module.css';
import { item } from '../types';
import { GetStaticProps, NextPage } from 'next';
import Item from '@/components/Item';

type indexProps = {
  items: Array<item>,
  // items: string
}

export default function Home({ items }: indexProps) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {items.map((data) => (
        <Item key={data.uid} data={data} />
      ))}
     
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get('https://my-json-server.typicode.com/irhamhqm/placeholder-shops/items');
  return {
    props: {
      items: response.data,
    }
  }
}