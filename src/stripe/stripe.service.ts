import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: any;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-04-22.dahlia',
    });
  }

  async createCheckoutSession(invoice: any) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',

      line_items: invoice.items.map((item) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),

      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',

      metadata: {
        invoiceId: invoice._id.toString(),
      },
    });

    return session;
  }

  verifyWebhook(req: any, sig: string) {
    return this.stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  }
}