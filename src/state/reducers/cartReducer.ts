import { data } from '../data/data';

interface State {
  productList: Product[];
  inCart: Product[];
  total: number;
}

const initialState: State = {
  productList: data,
  inCart: [],
  total: 0,
};

function cartReducer(state = initialState, action: CartReducerAction) {
  switch (action.type) {
    case 'ADD_TO_CART':
      let productToAdd = state.productList.find(prod => prod.id === action.id);
      if (!productToAdd) {
        return;
      }

      let existingProduct = state.inCart.find(prod => prod.id === action.id);
      if (existingProduct) {
        existingProduct.qty = existingProduct.qty! + 1;
        existingProduct.total = existingProduct.qty * existingProduct.price;

        const updatedList = state.inCart.filter(prod => prod.id !== action.id);

        return {
          ...state,
          inCart: [...updatedList, existingProduct],
          total: state.total + productToAdd.price,
        };
      }

      productToAdd.qty = 1;
      productToAdd.total = productToAdd.price;

      return {
        ...state,
        inCart: [...state.inCart, productToAdd],
        total: state.total + productToAdd.price,
      };

    case 'REMOVE_FROM_CART':
      let productToRemove = state.inCart.find(prod => prod.id === action.id);
      if (!productToRemove) {
        return;
      }

      let addedListFiltered = state.inCart.filter(
        prod => prod.id !== action.id
      );
      let total = state.total - (productToRemove.total || 0);

      return {
        ...state,
        inCart: addedListFiltered,
        total: total,
      };
    default:
      return state;
  }
}

export default cartReducer;
