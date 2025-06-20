import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getMint,
} from '@solana/spl-token';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { type SolanaAgentKit, signOrSendTX } from 'solana-agent-kit';

/**
 * Pay an order by transferring USDT to a specified recipient.
 * @param agent SolanaAgentKit instance
 * @param to Recipient's public key
 * @param amount Amount to transfer
 * @returns Transaction signature
 */
export async function payOrder(
  agent: SolanaAgentKit,
  to: PublicKey,
  amount: number
): Promise<Awaited<ReturnType<typeof signOrSendTX>>> {
  return transfer(
    agent,
    to,
    amount,
    new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB') //USDT
  );
}

/**
 * Transfer SOL or SPL tokens to a recipient
 * @param agent SolanaAgentKit instance
 * @param to Recipient's public key
 * @param amount Amount to transfer
 * @param mint Optional mint address for SPL tokens
 * @returns Transaction signature
 */
async function transfer(
  agent: SolanaAgentKit,
  to: PublicKey,
  amount: number,
  mint?: PublicKey
): Promise<Awaited<ReturnType<typeof signOrSendTX>>> {
  try {
    let tx: Awaited<ReturnType<typeof signOrSendTX>>;

    if (!mint) {
      // Transfer native SOL
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: agent.wallet.publicKey,
          toPubkey: to,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await agent.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      tx = await signOrSendTX(agent, transaction.instructions);
    } else {
      const transaction = new Transaction();
      // Transfer SPL token
      const fromAta = await getAssociatedTokenAddress(
        mint,
        agent.wallet.publicKey
      );
      const toAta = await getAssociatedTokenAddress(mint, to);

      try {
        await getAccount(agent.connection, toAta);
      } catch {
        // Error is thrown if the tokenAccount doesn't exist
        transaction.add(
          createAssociatedTokenAccountInstruction(
            agent.wallet.publicKey,
            toAta,
            to,
            mint
          )
        );
      }

      // Get mint info to determine decimals
      const mintInfo = await getMint(agent.connection, mint);
      const adjustedAmount = amount * Math.pow(10, mintInfo.decimals);

      transaction.add(
        createTransferInstruction(
          fromAta,
          toAta,
          agent.wallet.publicKey,
          adjustedAmount
        )
      );

      const { blockhash } = await agent.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      tx = await signOrSendTX(agent, transaction.instructions);
    }

    return tx;
  } catch (error: any) {
    throw new Error(`Transfer failed: ${error.message}`);
  }
}
