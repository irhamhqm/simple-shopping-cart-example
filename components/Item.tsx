import Image from "next/image"

import styles from './Item.module.css';

import { item } from "types"
import { ChangeEvent, ChangeEventHandler, SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, decreaseItem, selectCart, setItemQty } from "../redux/main";

type ItemProps = {
  data: item
}


export default function Item({ data }: ItemProps) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const { uid, availableQuantity } = data;

  const [showControl, setShowControl] = useState(false);

  const handleAddBtn = () => {
    setShowControl(true);
    if ((cart[uid]?.qty || 0 ) < availableQuantity) {
      dispatch(addItem({ uid }));
    }
    
  }

  const handleDecBtn = () => {
    setShowControl(true);
    if (cart[uid].qty > 0) {
      dispatch(decreaseItem({ uid }));
    }
  }

  const handleSet = (e: ChangeEvent<HTMLInputElement>) => {
    setShowControl(true);
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
        <div className={styles.qty}>{data.availableQuantity}</div>
        <div className={styles.price}>{data.price}</div>
        <div className={styles.control}>
          {showControl && <button className={styles.btnReduce} onClick={handleDecBtn}>-</button>}
          {showControl && <input className={styles.inputQty} value={cart[uid]?.qty} onChange={handleSet} />}
          <button className={styles.btnAdd} onClick={handleAddBtn}>+</button>
        </div>
      </div>
    </div>
  )
}