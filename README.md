# Smart Invoice System – Backend

## 📌 Overview

This backend provides APIs for invoice management and Stripe payment processing. It also handles webhook events to update invoice status automatically.

---

## 🚀 Tech Stack

* NestJS
* MongoDB (Mongoose)
* Stripe API (Checkout + Webhooks)

---

## ⚙️ Setup Instructions

### 1. Clone repository

git clone <your-backend-repo-url>

### 2. Navigate to project

cd smart-invoice-api

### 3. Install dependencies

npm install

---

## 🔐 Environment Variables

Create a `.env` file:

STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

---

## ▶️ Run Server

npm run start:dev

---

## 🌐 API Base URL

http://localhost:3000/api

---

## 📦 API Endpoints

### Invoice

Create Invoice
POST /api/invoices

Get All Invoices
GET /api/invoices

Pay Invoice
POST /api/invoices/:id/pay

---

### Webhook

POST /api/invoices/webhook

---

## 💳 Stripe Integration

* Uses Stripe Checkout Session
* Returns checkout URL to frontend
* Handles payment securely

---

## 🔔 Webhook Setup

Run Stripe CLI:

stripe listen --forward-to localhost:3000/api/invoices/webhook

Copy webhook secret into `.env`

---

## 🔄 Payment Flow

1. Frontend sends payment request
2. Backend creates Stripe session
3. User completes payment
4. Stripe triggers webhook
5. Backend updates invoice status

---

## 🧠 Architecture

* Modular NestJS structure
* Controller → handles routes
* Service → handles business logic
* Stripe service → payment integration

---

## 📊 Database Schema

Invoice:

* customerName
* items (name, quantity, price)
* subtotal
* tax
* total
* status (Draft, Paid, Failed)

---

## ⚠️ Edge Cases Handled

* Invalid invoice ID
* Empty items validation
* Payment failure handling
* Webhook verification
