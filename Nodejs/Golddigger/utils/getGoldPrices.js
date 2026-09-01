const MIN_PRICE = 1200;
const MAX_PRICE = 2200;

export default function getGoldPrices() {
  const price = Math.random() * (MAX_PRICE - MIN_PRICE) + MIN_PRICE;

  return {
    time: new Date().toISOString(),
    price: price.toFixed(2)
  };
}