import Image from "next/image"

import { itemInCart } from "types"

type ItemProps = {
  data: itemInCart
}

export default function Item({ data }: ItemProps) {
  return (
    <div>
      {data.productName}
      <Image src={data.image.url} width="100" height="150" alt={data.image.altText} />
    </div>
  )
}