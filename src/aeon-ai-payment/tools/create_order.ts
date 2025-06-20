import { fetchData, generateSignature, generateUid } from '../util';
import config from '../config';
import {
  CreateOrderRequest,
  ParseQrCodeRequest,
  PaymentResponse,
  CreateOrderModel,
  ParseQrCodeModel,
} from '../types';

/**
 * Create a new order based on the provided QR code and amount
 * @param qrCode - The QR code string to parse for payment details
 * @param amount - The amount to be used for the order if not specified in the QR code
 * @returns Promise resolving to the payment response containing order details
 * @throws Error if QR code parsing fails or if amount is invalid
 */
export async function createOrder(
  qrCode: string,
  amount: string
): Promise<PaymentResponse<CreateOrderModel>> {
  const qrCodeReqSignSource = {
    appId: config.appId,
    qrCode: qrCode,
  };
  const qrCodeReqSign = generateSignature(
    qrCodeReqSignSource,
    config.appSecret
  );
  const qrCodeRes = await parseQrCode({
    ...qrCodeReqSignSource,
    sign: qrCodeReqSign,
  });
  if (!qrCodeRes.success) {
    throw new Error(
      `Failed to parse QR code: ${qrCodeRes.msg} (Code: ${qrCodeRes.code})`
    );
  }
  if (!qrCodeRes.model) {
    throw new Error('QR code parsing returned no model data');
  }
  const orderAmount = qrCodeRes.model.amount || amount;
  if (!orderAmount) {
    throw new Error('Amount is required to create an order');
  }
  if (isNaN(Number(orderAmount))) {
    throw new Error('Invalid amount format');
  }
  if (Number(orderAmount) <= 0) {
    throw new Error('Amount must be greater than zero');
  }
  const orderReqSignSource = {
    appId: config.appId,
    merchantOrderNo: generateUid(),
    amount: orderAmount,
    currency: qrCodeRes.model.currency,
    feeType: 'OUTER_BUCKLE',
    qrCode: qrCode,
    userId: config.userId,
    userIp: '127.0.0.1',
    callbackUrl: 'https://example.com/callback',
  };
  const orderReqSign = generateSignature(orderReqSignSource, config.appSecret);
  const orderRes = await fetchData<PaymentResponse<CreateOrderModel>>(
    '/open/api/scan/payment',
    {
      method: 'POST',
      body: JSON.stringify({
        ...orderReqSignSource,
        sign: orderReqSign,
        email: config.email,
        customParam: {
          token: 'USDT',
          network: 'SOL',
        },
      } as CreateOrderRequest),
    }
  );
  if (orderRes.model) {
    orderRes.model.merchantOrderNo = orderReqSignSource.merchantOrderNo;
  }
  return orderRes;
}

/**
 * Parse a QR code to extract payment details
 * @param qrCodeReq - The request containing the QR code and necessary parameters
 * @returns Promise resolving to the payment response containing parsed QR code details
 */
async function parseQrCode(
  qrCodeReq: ParseQrCodeRequest
): Promise<PaymentResponse<ParseQrCodeModel>> {
  return fetchData<PaymentResponse<ParseQrCodeModel>>('/open/ai/scanCode', {
    method: 'POST',
    body: JSON.stringify(qrCodeReq),
  });
}
