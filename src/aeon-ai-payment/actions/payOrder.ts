import { Action, SolanaAgentKit } from 'solana-agent-kit';
import { z } from 'zod';
import { payOrder } from '../tools';
import { toErrorDetail } from '../types';
import { PublicKey } from '@solana/web3.js';
import logger from '../logger';

const payOrderAction: Action = {
  name: 'PAY_AEON_ORDER',
  similes: [
    'pay aeon order',
    'process aeon payment',
    'aeon order payment',
    'initiate aeon payment',
    'aeon payment request',
    'aeon order settlement',
    'complete aeon order payment',
  ],
  description:
    'Process a payment for an Aeon order using the provided details. This action initiates the payment and returns the payment status and details.',
  examples: [
    [
      {
        input: {
          cryptoVolume: 0.46,
          address: 'F74QdtfoU2kZKH69W2PngDh9EMMZFF2eD6z8heR3PFtd',
        },
        output: {
          status: 'success',
          message: 'Successfully processed Aeon order payment',
          cryptoVolume: 0.46,
          recipient: 'F74QdtfoU2kZKH69W2PngDh9EMMZFF2eD6z8heR3PFtd',
          token: 'USDT',
          transaction:
            'paWzjuDdJCpByFps2Y5vsSPEHDgKkvtcxTAyFNzqfsbi4N3W8puRYtg4pn5cZJY6SgvmSHDnEw9G7n424DQtAaT',
        },
        explanation:
          'This action processes a payment for an Aeon order using the provided crypto volume and recipient address, returning the transaction details.',
      },
    ],
  ],
  schema: z.object({
    cryptoVolume: z
      .number()
      .positive('Crypto volume must be a positive number')
      .describe('The amount of cryptocurrency to pay for the order.'),
    address: z
      .string()
      .min(32, 'Solana address')
      .describe('The recipient address to which the payment will be sent.'),
  }),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    try {
      const { cryptoVolume, address } = input;
      const tx = await payOrder(agent, new PublicKey(address), cryptoVolume);
      return {
        status: 'success',
        message: 'Successfully processed Aeon order payment',
        cryptoVolume,
        recipient: address,
        token: 'USDT',
        transaction: tx,
      };
    } catch (error: any) {
      logger.error('Error processing Aeon order payment:', error);
      return {
        status: 'error',
        message: `Failed to process Aeon order payment, ${error.message}`,
      };
    }
  },
};

export default payOrderAction;
