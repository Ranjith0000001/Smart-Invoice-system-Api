import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Res,
  Headers,
} from '@nestjs/common';

import { InvoiceService } from './invoice.service';
import { StripeService } from '../stripe/stripe.service';

import type { Request, Response } from 'express'; // ✅ FIX

@Controller('invoices')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly stripeService: StripeService,
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.invoiceService.create(body);
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Post(':id/pay')
  async payInvoice(@Param('id') id: string) {
    const invoice = await this.invoiceService.findById(id);
    return this.stripeService.createCheckoutSession(invoice);
  }

  // ✅ WEBHOOK ADDED (no breaking changes)
  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') sig: string,
  ) {
    try {
      const event = this.stripeService.verifyWebhook(req, sig);

      if (event.type === 'checkout.session.completed') {
        const session: any = event.data.object;
        await this.invoiceService.updateStatus(
          session.metadata.invoiceId,
          'Paid',
        );
      }

      return res.json({ received: true });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}