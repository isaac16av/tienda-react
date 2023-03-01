export const add = (id: number) => {
  return {
    type: 'ADD_TO_CART',
    id,
  };
};

export const remove = (id: number) => {
  return {
    type: 'REMOVE_FROM_CART',
    id,
  };
};
