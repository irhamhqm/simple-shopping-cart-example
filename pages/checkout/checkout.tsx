
import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/cart";
import { formatToIDR } from "../../utils";

import Navbar from "../../components/Navbar";
import Total from '../../components/Total';

import styles from './checkout.module.css';

export default function Checkout() {
  const cart = useSelector(selectCart);
  const cartArr = Object.values(cart);

  return (
    <div>
      <Head>
        <title>Checkout - WikiToko</title>
      </Head>
      <Navbar text="Checkout" />
      <div className={styles.main}>
        {cartArr.map((item) => {
          if (item.qty <= 0) return null;
          return (
            <div className={styles.item} key={item.uid} data-testid={`item-${item.uid}`}>
              <div className={styles.image}>
                <Image src={item.img} alt={item.productName} layout="fill" objectFit="cover" />
              </div>
              <div className={styles.desc}>
                <div>{item.productName}</div>
                <div>in cart: {item.qty}</div>
                <div>{formatToIDR(item.price)}</div>
                <div>{formatToIDR(item.price * item.qty)}</div>
              </div>
            </div>
          )
        })}
      </div>
      <Total />
    </div>
  )
}