
const formatToIDR = (price: number): string => {
  if (!price) return '0';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

export {
  formatToIDR
}