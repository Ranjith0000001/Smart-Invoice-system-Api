import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice, InvoiceDocument } from './schema/invoice.schema';
import { Model } from 'mongoose';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name)
    private invoiceModel: Model<InvoiceDocument>,
  ) {}

  async create(data: any) {
    return this.invoiceModel.create(data);
  }

  async findAll() {
    return this.invoiceModel.find().sort({ createdAt: -1 });
  }

  async findById(id: string) {
    return this.invoiceModel.findById(id);
  }

  async updateStatus(id: string, status: string) {
    return this.invoiceModel.findByIdAndUpdate(id, { status }, { new: true });
  }
}
