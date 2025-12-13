export const AUTH_MODULE_ENDPOINTS = {
  BASIC: 'auth',
  REGISTER: {
    INIT: 'register/init',
    VERIFY: 'register/verify',
  },
  LOGIN: {
    LOCAL: 'login/local-strategy',
  },
  LOGOUT: 'logout',
  REFRESH: 'refresh',
  RESET_PASSWORD: {
    INIT: 'reset-password/init',
    VERIFY: 'reset-password/verify',
    RESET: 'reset-password',
  },
};
