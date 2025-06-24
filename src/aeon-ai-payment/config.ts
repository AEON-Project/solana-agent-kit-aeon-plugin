const config = {
  test: false,
  appSecret: '',
  appId: '',
  userId: '',
  email: '',
  logger: false,

  validate() {
    if (!this.appSecret) {
      throw new Error('AEON_AI_PAYMENT_APP_SECRET is not set');
    }
    if (!this.appId) {
      throw new Error('AEON_AI_PAYMENT_APP_ID is not set');
    }
    if (!this.userId) {
      throw new Error('AEON_AI_PAYMENT_USER_ID is not set');
    }
    if (!this.email) {
      throw new Error('AEON_AI_PAYMENT_EMAIL is not set');
    }
  },

  loadFromEnv() {
    this.test = process.env.AEON_AI_PAYMENT_TEST === 'true';
    this.appSecret = process.env.AEON_AI_PAYMENT_APP_SECRET || '';
    this.appId = process.env.AEON_AI_PAYMENT_APP_ID || '';
    this.userId = process.env.AEON_AI_PAYMENT_USER_ID || '';
    this.email = process.env.AEON_AI_PAYMENT_EMAIL || '';
    this.logger = process.env.AEON_AI_PAYMENT_LOGGER === 'enabled';
  },
};

export default config;
