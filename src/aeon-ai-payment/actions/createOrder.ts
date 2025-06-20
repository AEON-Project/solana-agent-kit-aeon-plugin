import { Action, SolanaAgentKit } from 'solana-agent-kit';
import { z } from 'zod';
import { createOrder } from '../tools';
import { toErrorDetail } from '../types';
import logger from '../logger';

const createOrderAction: Action = {
  name: 'CREATE_AEON_ORDER',
  similes: [
    'create aeon order',
    'generate aeon order',
    'aeon order creation',
    'initiate aeon order',
    'aeon order request',
    'aeon order setup',
    'new aeon order',
    'create order from qr code',
  ],
  description:
    'Create a new order for Aeon AI payment processing. This action generates an order with the specified details and returns the order information.',
  examples: [
    [
      {
        input: {
          amount: '100000',
          qrCode:
            '00020101021138580010A000000727012800069704070114190360421800120208QRIBFTTA53037045802VN830084006304EDC5',
        },
        output: {
          status: 'success',
          message: 'Successfully created Aeon order',
          cryptoVolume: 0.78,
          orderNo: '400017452047901950404',
          address: 'DLn8KRAxUrWx2J4uthoEUiq2Wo8oNLNamjZnBtrS1dDM',
          merchantOrderNo: '11126',
        },
        explanation:
          'This action creates a new Aeon order with the specified details and returns the order information.',
      },
      {
        input: {
          amount: '10000',
          qrCode:
            '00020101021138580010A000000727012800069704070114190360421800120208QRIBFTTA53037045802VN830084006304EDC5',
        },
        output: {
          status: 'failed',
          message: 'Failed to create Aeon order',
          code: '<code>',
          cause: '<error cause>',
          traceId: '<trace id>',
        },
        explanation:
          'This action attempts to create a new Aeon order with the specified details but fails due to an error in processing.',
      },
    ],
  ],
  schema: z.object({
    qrCode: z
      .string()
      .describe('The QR code string to parse for payment details.'),
    amount: z
      .string()
      .optional()
      .describe('The amount to be processed in the order.'),
  }),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    try {
      const { qrCode, amount } = input;
      const orderRes = await createOrder(qrCode, amount);
      if (orderRes.success) {
        return {
          status: 'success',
          ...orderRes.model,
          message: 'Successfully created Aeon order',
        };
      } else {
        return {
          status: 'error',
          message: `Failed to create Aeon order`,
          ...toErrorDetail(orderRes),
        };
      }
    } catch (error: any) {
      logger.error('Error creating Aeon order:', error);
      return {
        status: 'error',
        message: `Failed to create Aeon order: ${error.message}`,
      };
    }
  },
};

export default createOrderAction;
