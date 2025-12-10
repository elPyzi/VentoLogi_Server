import { ProductType } from '@modules/orders/types';

export const ORDERS_MODULE_ENDPOINTS = {
  BASIC: 'orders',
  CREATE_ORDER: 'create-order',
  GET_ORDERS: 'get-orders',
  GET_ORDER: 'get-order/:id',
  UPDATE_ORDER: 'update-order/:id',
} as const;

export const ORDER_STATUSES = {
  CREATED: 1,
  IS_BEING_PROGRESSED: 2, // обрабатывается
  DELETED: 3,
  CANCELED: 4,
  DELAYED: 5, // задерживается
  DELIVERED: 6, //доставляется
} as const;

export const PRODUCT_TYPES = {
  GLASS: 1,
  METAL: 2,
  PLASTIC: 3,
  WOOD: 4,
  CERAMIC: 5,
  TEXTILE: 6,
  PAPER: 7,
  COMPOSITE: 8,
  LIQUID: 9, // жидкости
  OTHER: 10,
} as const;

export const BASE_RATE_WEIGHT = 100;

export const PRODUCT_TYPE_COEFFICIENTS: Record<ProductType, number> = {
  [PRODUCT_TYPES.GLASS]: 1.8,
  [PRODUCT_TYPES.METAL]: 1.4,
  [PRODUCT_TYPES.PLASTIC]: 1.1,
  [PRODUCT_TYPES.WOOD]: 1.2,
  [PRODUCT_TYPES.CERAMIC]: 1.5,
  [PRODUCT_TYPES.TEXTILE]: 1.05,
  [PRODUCT_TYPES.PAPER]: 1.02,
  [PRODUCT_TYPES.COMPOSITE]: 1.3,
  [PRODUCT_TYPES.LIQUID]: 1.6,
  [PRODUCT_TYPES.OTHER]: 1.0,
};
