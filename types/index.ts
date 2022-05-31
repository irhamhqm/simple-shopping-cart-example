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


export type {
  item
};

// export {}