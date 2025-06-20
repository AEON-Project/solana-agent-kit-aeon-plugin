import type { Plugin, SolanaAgentKit } from 'solana-agent-kit';

// Import all actions
import createOrderAction from './aeon-ai-payment/actions/createOrder';
import getOrderAction from './aeon-ai-payment/actions/getOrder';
import payOrderAction from './aeon-ai-payment/actions/payOrder';
// Import all tools
import { createOrder, getOrder, payOrder } from './aeon-ai-payment/tools';

// Define and export the plugin
const AEONAIPlugin = {
  name: 'aeon-ai-payment',

  // Combine all tools
  methods: {
    createOrder,
    getOrder,
    payOrder,
  },

  // Combine all actions
  actions: [createOrderAction, getOrderAction, payOrderAction],

  // Initialize function
  initialize: function (): void {
    // Initialize all methods with the agent instance
    Object.entries(this.methods).forEach(([methodName, method]) => {
      if (typeof method === 'function') {
        this.methods[methodName] = method;
      }
    });
  },
} satisfies Plugin;

// Default export for convenience
export default AEONAIPlugin;
