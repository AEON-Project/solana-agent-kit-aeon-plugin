import BlinksPlugin from '@solana-agent-kit/plugin-blinks';
import DefiPlugin from '@solana-agent-kit/plugin-defi';
import MiscPlugin from '@solana-agent-kit/plugin-misc';
import NFTPlugin from '@solana-agent-kit/plugin-nft';
import TokenPlugin from '@solana-agent-kit/plugin-token';
import { SolanaAgentKit } from 'solana-agent-kit';
import { PublicKey } from '@solana/web3.js';

export default async function (agentKit: SolanaAgentKit) {
  const agent = agentKit
    .use(TokenPlugin)
    .use(NFTPlugin)
    .use(DefiPlugin)
    .use(MiscPlugin)
    .use(BlinksPlugin);

  // Test a method
  console.log('Testing Token Plugin...');
  /*
  const tokenData = await agent.methods.getAsset(
    agent,
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  );
  console.log("USDC Token Data:", tokenData);
  */

  /*
  const balance = await agent.methods.get_balance(agent);
  console.log('Balance:', balance);
  */

  const tokenBalance = await agent.methods.get_token_balance(
    agent,
    agent.wallet.publicKey
  );
  console.log('Token balance:', tokenBalance);

  /*
  const usdtBalance = await agent.methods.get_balance(
    agent,
    new PublicKey('G98txYQNBa6sY8AxpZyuK73ampRGAsqdi9NGYyeTztGx')
  );
  console.log('USDT Token Balance:', usdtBalance);
  */

  /*
  const sendTx = await agent.methods.transfer(
    agent,
    new PublicKey('5UE1khwoVAKX6iDH6qieJ4VwaP7ShrWqbWHw5YZFDesT'),
    0.1,
    new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB') // USDT
  );
  console.log('Send Transaction:', sendTx);
  */

  console.log('Testing NFT Plugin...');
  // Add your NFT plugin test here

  console.log('Testing DeFi Plugin...');
  // Add your DeFi plugin test here

  console.log('Testing Misc Plugin...');
  // Add your misc plugin test here

  console.log('Testing Blinks Plugin...');
  // Add your blinks plugin test here
}
