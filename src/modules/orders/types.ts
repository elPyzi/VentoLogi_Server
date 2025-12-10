import { ORDER_STATUSES, PRODUCT_TYPES } from '@modules/orders/constants';

export type ProductType = (typeof PRODUCT_TYPES)[keyof typeof PRODUCT_TYPES];
export type OrderStatusesType =
  (typeof ORDER_STATUSES)[keyof typeof ORDER_STATUSES];
