declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }

  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name?: string;
    description?: string;
    order_id?: string;
    handler?: (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) => void;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    notes?: Record<string, unknown>;
    theme?: {
      color?: string;
    };
  }

  interface RazorpayInstance {
    open: () => void;
    on: (event: string, callback: (...args: unknown[]) => void) => void;
    close: () => void;
  }
}

export {};
