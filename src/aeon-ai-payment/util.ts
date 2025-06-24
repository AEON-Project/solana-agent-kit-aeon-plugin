import crypto from 'crypto';
import { TwitterSnowflake } from '@sapphire/snowflake';
import config from './config';

type FetchParameters = Parameters<typeof fetch>;

export async function fetchData<T>(
  uri: string,
  init?: FetchParameters[1]
): Promise<T> {
  if (init) {
    init.headers = {
      ...init.headers,
      'Content-Type': 'application/json',
    };
  }
  const url = config.test
  ? 'https://aeon-qrpay-test.alchemytech.cc'
  : 'https://aeon-qrpay.alchemypay.org';
  // console.log(`Fetching data from: ${url}${uri}`, init);
  const response = await fetch(`${url}${uri}`, init);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const bodyText = await response.text();
  // console.log(`Response from ${url}${uri}:`, response.status, bodyText);
  return JSON.parse(bodyText) as T;
}

export function generateSignature(
  params: Record<string, string>,
  secret: string
): string {
  const filtered = Object.keys(params)
    .filter(
      (key) =>
        key !== 'sign' &&
        key !== 'key' &&
        params[key] !== undefined &&
        params[key] !== null &&
        params[key] !== ''
    )
    .sort();
  const paramStr = filtered.map((key) => `${key}=${params[key]}`).join('&');
  const signStr = `${paramStr}&key=${secret}`;
  const hash = crypto
    .createHash('sha512')
    .update(signStr, 'utf8')
    .digest('hex');
  // console.log("signStr", signStr);
  // console.log("hash", hash.toUpperCase());
  return hash.toUpperCase();
}

export function generateUid(): string {
  return TwitterSnowflake.generate().toString();
}
