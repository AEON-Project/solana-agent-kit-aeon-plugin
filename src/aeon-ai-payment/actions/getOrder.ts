import { Action, SolanaAgentKit } from 'solana-agent-kit';
import { z } from 'zod';
import { getOrder } from '../tools';
import { toErrorDetail } from '../types';
import logger from '../logger';

const getOrderAction: Action = {
  name: 'GET_AEON_ORDER',
  similes: [
    'get aeon order',
    'retrieve aeon order',
    'fetch aeon order',
    'get aeon order by merchant order number',
    'aeon order details',
  ],
  description:
    'Retrieve an existing Aeon order using the provided merchant order number. This action fetches the order details and returns them in a structured format.',
  examples: [
    [
      {
        input: {
          merchantOrderNo: '11126',
        },
        output: {
          status: 'success',
          order: {
            usdAmount: '7.62',
            fiatRate: '0.0000380648',
            orderNo: '400017485276846331286',
            fee: '0.06090366',
            orderStatus: 'SUCCESS',
            feeType: 'INNER_BUCKLE',
            merchantOrderNo: 'BYBIT_ID_CQtuRsWUhK',
            userId: '1000655288',
            orderTime: '20250529 22:08:05',
            qrCode:
              '00020101021138580010A000000727012800069704070114190360421800120208QRIBFTTA53037045802VN830084006304EDC5',
            fiatAmount: '200000',
            fiatCurrency: 'VND',
            userIp: '10.18.4.133',
          },
          message: 'Successfully retrieved Aeon order',
        },
        explanation:
          'This action retrieves an existing Aeon order using the provided merchant order number and returns the order details.',
      },
    ],
  ],
  schema: z.object({
    merchantOrderNo: z
      .string()
      .describe('The merchant order number to retrieve the Aeon order.'),
  }),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    try {
      const { merchantOrderNo } = input;
      const orderRes = await getOrder(merchantOrderNo);
      if (orderRes.success) {
        return {
          status: 'success',
          order: orderRes.model,
          message: 'Successfully retrieved Aeon order',
        };
      } else {
        return {
          status: 'error',
          message: `Failed to retrieve Aeon order`,
          ...toErrorDetail(orderRes),
        };
      }
    } catch (error: any) {
      logger.error('Error retrieving Aeon order:', error);
      return {
        status: 'error',
        message: `Failed to retrieve Aeon order: ${error.message}`,
      };
    }
  },
};

export default getOrderAction;
