/* eslint-disable no-unused-vars */

type CartReducerAction = {
  type: 'ADD_TO_CART' | 'REMOVE_FROM_CART';
  id: number;
};

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  qty?: number;
  total?: number;
}
