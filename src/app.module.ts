import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceModule } from './invoice/invoice.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/smart-invoice'),
    InvoiceModule,
    StripeModule,
  ],
})
export class AppModule {}
