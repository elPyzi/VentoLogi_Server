export const STRIPE_MODULE_ENDPOINTS = {
  BASIC: 'stripe',
  PRODUCTS: 'products',
  CUSTOMERS: 'customers',
  CREATE_PAYMENT_INTENT: 'create-payment-intent',
  SUBSCRIPTIONS: 'subscriptions',
  REFUNDS: 'refunds',
  PAYMENT_LINKS: 'payment-links',
  BALANCE: 'balance',
};

export enum Currency {
  USD = 'usd',
  EUR = 'eur',
  GBP = 'gbp',
  AUD = 'aud',
  CAD = 'cad',
  JPY = 'jpy',
  RUB = 'rub',
}

export enum PaymentMethodId {
  VISA = 'pm_card_visa',
  MASTERCARD = 'pm_card_mastercard',
  AMEX = 'pm_card_amex',
  DISCOVER = 'pm_card_discover',
  DINERS = 'pm_card_diners',
  JCB = 'pm_card_jcb',
  // Ошибки/специальные кейсы для теста
  DECLINED = 'pm_card_chargeDeclined', // карта отклонена
  DECLINED_INSUFFICIENT_FUNDS = 'pm_card_chargeDeclinedInsufficientFunds',
  DECLINED_LOST_CARD = 'pm_card_chargeDeclinedLostCard',
  DECLINED_STOLEN = 'pm_card_chargeDeclinedStolenCard',
  EXPIRED = 'pm_card_expired',
  AUTH_REQUIRED = 'pm_card_authenticationRequired', // требует 3D Secure
  PROCESSING_ERROR = 'pm_card_processingError', // ошибка обработки
}
