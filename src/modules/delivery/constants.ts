export const DELIVERY_MODULE_ENDPOINTS = {
  BASIC: 'delivery',
  GET_DELIVERY: 'get-delivery/:id',
  GET_DELIVERIES: 'get-deliveries',
  CREATE_DELIVERY: 'create-deliveries',
  UPDATE_DELIVERY: 'update-deliveries/:id',
  DELETE_DELIVERY: 'delete-deliveries/:id',
};

export const enum DELIVERY_STATUSES {
  CREATED = 1,
  IS_BEING_PROGRESSED = 2, // обрабатывается
  DELETED = 3,
  CANCELED = 4,
  DELAYED = 5, // задерживается
  DELIVERED = 6, //доставляется
}
