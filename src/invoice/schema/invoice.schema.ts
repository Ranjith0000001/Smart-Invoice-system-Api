import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

@Schema({ timestamps: true })
export class Invoice {
  @Prop()
  customerName: string;

  @Prop([
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ])
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];

  @Prop()
  subtotal: number;

  @Prop()
  tax: number;

  @Prop()
  total: number;

  @Prop({ default: 'Draft' })
  status: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
