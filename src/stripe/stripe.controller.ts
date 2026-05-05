import { Controller, Post, Body, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import type { Request } from 'express'; 

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment')
  async createPayment(@Body() body: any) {
    return this.stripeService.createCheckoutSession({
      items: [
        {
          name: 'Custom Payment',
          price: body.amount,
          quantity: 1,
        },
      ],
      _id: 'manual',
    });
  }

  @Post('webhook')
  handleWebhook(@Req() req: Request) {
    return { received: true };
  }
}
