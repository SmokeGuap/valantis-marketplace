const formatePrice = (price: number) => {
  const reversedPrice = price.toString().split('').reverse().join('');
  const result = reversedPrice.match(/.{1,3}/g)?.join(' ');

  return result?.split('').reverse().join('') + '₽';
};

export default formatePrice;
