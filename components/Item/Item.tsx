import Image from "next/image"

import styles from './Item.module.css';

import { item } from "../../types"
import { ChangeEvent, ChangeEventHandler, SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, decreaseItem, selectCart, setItemQty } from "../../redux/main";
import { formatToIDR } from "utils";

type ItemProps = {
  data: item,
  qty?: number
}


export default function Item({ data, qty: qtyProps }: ItemProps) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const { uid, availableQuantity } = data;
  const qty = cart[uid]?.qty || qtyProps || 0;

  const [showControl, setShowControl] = useState(false);

  const handleAddBtn = () => {
    setShowControl(true)
    if ((qty || 0 ) < availableQuantity) {
      dispatch(addItem({ uid }));
    }
  }

  const handleDecBtn = () => { 
    if (qty === 1 || qty === 0) {
      setShowControl(false);
    }
    if (qty > 0) {
      dispatch(decreaseItem({ uid }));
    }
  }

  const handleSet = (e: ChangeEvent<HTMLInputElement>) => {
    let qty;
    if (!e.target.value) {
      qty = 0;
    } else if (parseInt(e.target.value, 10) > availableQuantity) {
      qty = availableQuantity;
    } else {
      qty = parseInt(e.target.value, 10);
    }
    dispatch(setItemQty({ uid, qty }));
  }

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src={data.image.url} layout="fill" alt={data.image.altText} objectFit="cover" priority />
      </div>
      <div className={styles.main}>
        <div className={styles.name}>{data.productName}</div>
        <div className={styles.qty}>{data.availableQuantity} qty</div>
        <div className={styles.price}>{formatToIDR(data.price)}</div>
        <div className={styles.control}>
          {showControl && <>
            <button className={styles.btnReduce} onClick={handleDecBtn}>-</button>
            <input className={styles.inputQty} value={qty|| 0} onChange={handleSet} />
            <button className={styles.btnAdd} onClick={handleAddBtn}>+</button>
          </>}
          {!showControl && (
            <button onClick={handleAddBtn}>add to cart</button>
          )}
        </div>
      </div>
    </div>
  )
}