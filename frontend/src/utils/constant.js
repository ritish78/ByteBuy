export const BASE_URL = process.env.NODE_ENV === 'development' ? '' : 'https://bytebuy.onrender.com';
// export const BASE_URL = '';
export const PRODUCTS_URL = '/api/products';
export const AUTH_URL = '/api/auth';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const ADDRESS_URL = '/api/address';
export const REVIEWS_URL = '/api/reviews';
export const PAYPAL_URL = '/api/config/paypal';
export const IMAGES_URL = '/api/images/upload';
export const TAX_PERCENTAGE = 25;
export const PAGINATION_PRODUCT = 'PAGINATION_PRODUCT';
export const PAGINATION_PRODUCT_ADMIN = 'PAGINATION_PRODUCT_ADMIN';
export const PAGINATION_ORDER = 'PAGINATION_ORDER';
export const PAGINATION_ORDER_ADMIN = 'PAGINATION_ORDER_ADMIN';
export const PAGINATION_USER_ADMIN = 'PAGINATION_USER_ADMIN';
export const PAGINATION_SEARCH = 'PAGINATION_SEARCH';
export const PAGINATION_ADDRESS_ADMIN = 'PAGINATION_ADDRESS_ADMIN';