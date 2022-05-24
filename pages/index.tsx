import Head from 'next/head'
import axios from 'axios';

import styles from './index.module.css';
import { item } from '../types';
import { GetStaticProps, NextPage } from 'next';
import Item from '@/components/Item';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/main';
import { formatToIDR } from 'utils';

type indexProps = {
  items: Array<item>,
  // items: string
}

export default function Home({ items }: indexProps) {
  const cart = useSelector(selectCart);

  const calcTotal = () => {
    const cartArr = Object.keys(cart);
    if (cartArr.length <= 0) return 0;
    const total = items.reduce((prev, currVal) => {
      if (cartArr.find((val) => val === currVal.uid)) {
        return prev + cart[currVal.uid].qty * currVal.price;
      }
      return prev
    }, 0);
    return total;
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        {items.map((data) => (
          <Item key={data.uid} data={data} />
        ))}
      </div>
     
     <footer className={styles.footer}>
       Total: {formatToIDR(calcTotal())}
     </footer>
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