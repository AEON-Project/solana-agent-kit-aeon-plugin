export interface CreateOrderRequest {
  appId: string;
  sign: string;
  merchantOrderNo: string;
  amount: string;
  currency: string;
  feeType: string;
  qrCode: string;
  userId: string;
  userIp: string;
  email?: string;
  callbackUrl: string;
  customParam?: {
    token: string;
    network: string;
  };
}

export interface CreateOrderModel {
  cryptoVolume: number;
  orderNo: string;
  address: string;
  merchantOrderNo: string;
}

export interface GetOrderResponse {
  usdAmount: string;
  fiatRate: string;
  orderNo: string;
  fee: string;
  orderStatus: string;
  feeType: string;
  merchantOrderNo: string;
  userId: string;
  orderTime: string;
  qrCode: string;
  fiatAmount: string;
  fiatCurrency: string;
  userIp: string;
}

export interface ParseQrCodeRequest {
  appId: string;
  sign: string;
  qrCode: string;
}

export interface ParseQrCodeModel {
  bankAccountName: string;
  bankAccountNumber: string;
  bankCode: string;
  bankName: string;
  currency: string;
  amount: string;
}

export interface PaymentResponse<T> {
  code: string;
  msg: string;
  model: T | null | undefined;
  traceId: string;
  error: boolean;
  success: boolean;
}

export function toErrorString(res: PaymentResponse<any>): string {
  return `Code: ${res.code}, Message: ${res.msg}, Trace ID: ${res.traceId}`;
}

export function toErrorDetail(res: PaymentResponse<any>): Record<string, any> {
  return {
    code: res.code,
    cause: res.msg,
    traceId: res.traceId,
  };
}
