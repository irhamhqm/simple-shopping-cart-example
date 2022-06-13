
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/cart";
import { formatToIDR } from "../../utils";

import styles from './Total.module.css'

type TotalProps = {
  showButton?: boolean
}

export default function Total({ showButton }: TotalProps) {
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
    <div className={styles.total} data-testid="total">
      <div className={styles.totalContent}>
        <span className={styles.label}>Total</span>
        <span className={styles.value}>{formatToIDR(calcTotal())}</span>
        {showButton && <button className={styles.button} onClick={() => { router.push('/checkout') }} disabled={!calcTotal()}>Checkout</button>}
       </div>
     </div>
  )
}