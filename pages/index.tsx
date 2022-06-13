import Head from 'next/head'
import axios from 'axios';

import styles from './index.module.css';
import type { item } from '../types/index';
import { GetStaticProps } from 'next';
import Item from '../components/Item';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Total from '@/components/Total/Total';

type indexProps = {
  items: Array<item>,
}

export default function Home({ items }: indexProps) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>WikiToko</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar text="WikiToko"/>
      <div className={styles.main}>
        {items.map((data) => (
          <Item key={data.uid} data={data} />
        ))}
      </div>
      <Total showButton />
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