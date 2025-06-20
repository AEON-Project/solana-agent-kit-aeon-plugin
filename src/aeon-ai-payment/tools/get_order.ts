import { fetchData, generateSignature } from '../util';
import config from '../config';
import { GetOrderResponse, PaymentResponse } from '../types';

/**
 * Retrieves an existing Aeon order using the provided merchant order number.
 * This function fetches the order details and returns them in a structured format.
 *
 * @param {string} merchantOrderNo - The merchant order number to retrieve the Aeon order.
 * @returns {Promise<PaymentResponse<GetOrderResponse>>} - A promise that resolves to the payment response containing the order details.
 */
export async function getOrder(
  merchantOrderNo: string
): Promise<PaymentResponse<GetOrderResponse>> {
  const orderReqSignSource = {
    appId: config.appId,
    merchantOrderNo: merchantOrderNo,
  };
  const orderReqSign = generateSignature(orderReqSignSource, config.appSecret);
  return fetchData<PaymentResponse<GetOrderResponse>>(
    '/open/api/payment/query',
    {
      method: 'POST',
      body: JSON.stringify({ ...orderReqSignSource, sign: orderReqSign }),
    }
  );
}
