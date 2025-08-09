// utils/orderUtils.js
export const saveOrder = (order) => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const updatedOrders = [order, ...orders];
  localStorage.setItem('orders', JSON.stringify(updatedOrders));
  return updatedOrders;
};

export const getOrders = () => {
  return JSON.parse(localStorage.getItem('orders')) || [];
};

export const getOrderById = (orderId) => {
  const orders = getOrders();
  return orders.find(order => order.id === orderId);
};

export const clearCart = () => {
  localStorage.removeItem('cart');
};