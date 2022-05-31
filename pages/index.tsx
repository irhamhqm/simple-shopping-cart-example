import Head from 'next/head'
import axios from 'axios';

import styles from './index.module.css';
import type { item } from '../types/index';
import { GetStaticProps } from 'next';
import Item from '../components/Item';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/cart';
import { formatToIDR } from '../utils';
import { useRouter } from 'next/router';

type indexProps = {
  items: Array<item>,
  // items: string
}

export default function Home({ items }: indexProps) {
  const router = useRouter();
  const cart = useSelector(selectCart);

  const calcTotal = () => {
    const cartArr = Object.values(cart);
    
    if (cartArr.length <= 0) return 0;
    const total = cartArr.reduce((prev, currVal) => {
        return prev + currVal.qty * currVal.price;
      
    }, 0);
    return total;
  }

  return (
    <div>
      <Head>
        <title>WikiToko</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.navbar}>Home</nav>
      <div className={styles.main}>
        {items.map((data) => (
          <Item key={data.uid} data={data} />
        ))}
      </div>
     
     <div className={styles.total} data-testid="total-info">
       Total: {formatToIDR(calcTotal())}
       <button onClick={() => { router.push('/checkout') }}>Checkout</button>
     </div>
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