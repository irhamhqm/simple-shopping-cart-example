import Image from "next/image"

import styles from './Item.module.css';

import type { item } from "../../types/index"
import { ChangeEvent, ChangeEventHandler, SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, decreaseItem, selectCart, setItemQty } from "../../redux/cart";
import { formatToIDR } from "../../utils";

type ItemProps = {
  data: item,
}

export default function Item({ data }: ItemProps) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const { uid, productName, price, image: { url }, availableQuantity } = data;
  const qty = cart[uid]?.qty;

  const [showControl, setShowControl] = useState(!!qty);

  const handleAddBtn = () => {
    setShowControl(true)
    if ((qty || 0 ) < availableQuantity) {
      dispatch(addItem({ uid, productName, price, img: url }));
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
    <div className={styles.container} data-testid={`item-${uid}`}>
      <div className={styles.image}>
        <Image src={url} layout="fill" alt={data.image.altText} objectFit="cover" priority />
      </div>
      <div className={styles.main}>
        <div className={styles.name}>{productName}</div>
        <div className={styles.qty}>{availableQuantity} qty</div>
        <div className={styles.price}>{formatToIDR(price)}</div>
        <div className={styles.control}>
          {showControl && 
          <>
            <button className={styles.btnReduce} onClick={handleDecBtn} data-testid="dec-btn">-</button>
            <input className={styles.inputQty} value={qty|| 0} onChange={handleSet} data-testid="input-el"/>
            <button className={styles.btnAdd} onClick={handleAddBtn} data-testid="add-btn">+</button>
          </>}
          {!showControl && (
            <button onClick={handleAddBtn}>add to cart</button>
          )}
        </div>
      </div>
    </div>
  )
}