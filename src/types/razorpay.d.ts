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
    modal?: {
      ondismiss?: () => void; // Called when modal is closed
      escape?: boolean; // Allow closing with ESC key
      backdropclose?: boolean; // Allow closing by clicking backdrop
      handleback?: boolean; // Handle browser back button
      confirm_close?: boolean; // Show confirmation before closing
    };
  }

  interface RazorpayInstance {
    open: () => void;
    on: (event: string, callback: (...args: unknown[]) => void) => void;
    close: () => void;
  }
}

export {};
