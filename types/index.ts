interface item {
  uid: string,
  productName: string,
  image: {
    url: string,
    altText: string
  },
  price: number,
  availableQuantity: number
}

interface itemInCart extends item {
  inCart?: number
}

export type {
  item,
  itemInCart
};
