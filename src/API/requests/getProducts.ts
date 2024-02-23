import md5 from 'md5';

import BASE_URI from 'src/API/BASE_URI';
import { TProduct } from 'src/components/Product/Product.types';
import { getTodayDate } from 'src/utils';

type TParams = {
  offset?: number;
  limit?: number;
  price?: number;
  brand?: string;
  field?: string;
  product?: string;
  ids?: string[];
};

const getProducts = async (action: string, params?: TParams) => {
  try {
    const res = await fetch(`${BASE_URI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': md5(`Valantis_${getTodayDate()}`),
      },
      body: JSON.stringify(params ? { action, params } : { action }),
    });

    if (!res.ok) {
      console.log(`${res.status} ${res.statusText}`);
      getProducts(action, params);
    }

    const data = await res.json();

    return data.result.filter((value: string | TProduct, index: number) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        data.result.findIndex((obj: string | TProduct) => {
          return JSON.stringify(obj) === _value && obj !== null;
        })
      );
    });
  } catch (error) {
    throw error;
  }
};

export default getProducts;
