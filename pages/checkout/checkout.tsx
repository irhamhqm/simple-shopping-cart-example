import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectCart } from "redux/cart";
import { formatToIDR } from "utils";

import styles from './checkout.module.css';

export default function Checkout() {
  const cart = useSelector(selectCart);
  const cartArr = Object.values(cart);
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
        <title>Checkout - WikiToko</title>
      </Head>
      <nav className={styles.navbar}>Checkout</nav>
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
      <div className={styles.total} data-testid="">
       Total: {formatToIDR(calcTotal())}
       {/* <button onClick={() => { router.push('/checkout') }}>Checkout</button> */}
     </div>
    </div>
  )
}