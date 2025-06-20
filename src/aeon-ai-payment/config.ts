import 'dotenv/config';

const test = process.env.AEON_AI_PAYMENT_TEST === 'true';
const appSecret = process.env.AEON_AI_PAYMENT_APP_SECRET || '';
const appId = process.env.AEON_AI_PAYMENT_APP_ID || '';
const userId = process.env.AEON_AI_PAYMENT_USER_ID || '';
const email = process.env.AEON_AI_PAYMENT_EMAIL || '';

if (!appSecret) {
  throw new Error('AEON_AI_PAYMENT_APP_SECRET is not set');
}
if (!appId) {
  throw new Error('AEON_AI_PAYMENT_APP_ID is not set');
}
if (!userId) {
  throw new Error('AEON_AI_PAYMENT_USER_ID is not set');
}
if (!email) {
  throw new Error('AEON_AI_PAYMENT_EMAIL is not set');
}
const config = {
  test,
  appSecret,
  appId,
  userId,
  email,
};

export default config;
