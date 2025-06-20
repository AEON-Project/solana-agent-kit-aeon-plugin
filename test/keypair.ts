import { Keypair } from '@solana/web3.js';

import bs58 from "bs58";

function main() {
  const keypair = Keypair.generate();
  console.log('address:', keypair.publicKey.toBase58());
  console.log('private key:', bs58.encode(keypair.secretKey));
}

main();
