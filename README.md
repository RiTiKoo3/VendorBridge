# VendorBridge – Procurement & Vendor Management System

## Overview

VendorBridge is a procurement management platform built to streamline the complete procurement lifecycle from vendor onboarding to invoice generation.

The system enables procurement officers to:

* Manage vendors
* Create RFQs (Request for Quotations)
* Receive and compare vendor quotations
* Approve quotations
* Generate Purchase Orders
* Generate Invoices
* Track procurement activities through reports and analytics

---

## Problem Statement

Organizations often face challenges in managing procurement activities across multiple vendors. VendorBridge provides a centralized solution to automate and simplify procurement workflows.

### Workflow

1. Procurement Officer creates an RFQ.
2. Vendors receive invitations and submit quotations.
3. Procurement team compares quotations.
4. Approval workflow is initiated.
5. Approved quotations generate Purchase Orders.
6. Invoice is generated from the Purchase Order.
7. Invoice can be printed.
8. Procurement activities are tracked through reports and analytics.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Role-Based Access

### Vendor Management

* Add Vendors
* View Vendors
* Delete Vendors

### RFQ Management

* Create RFQs
* View RFQs

### Quotation Management

* Submit Quotations
* View Quotations

### Quotation Comparison

* Compare Vendor Quotations
* Identify Best Offer

### Approval Workflow

* Create Approvals
* Track Approval Status

### Purchase Orders

* Generate Purchase Orders
* View Purchase Orders

### Invoice Management

* Generate Invoices
* Print Invoice

### Reports & Analytics

* Procurement Statistics
* RFQ Metrics
* Quotation Metrics
* Approval Metrics
* Purchase Order Metrics
* Invoice Metrics

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* React Hook Form
* Axios
* React Toastify

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

### Database

* MongoDB (Local Database)
* Mongoose ODM

---

## Project Structure

client/
├── src/
│ ├── pages/
│ ├── services/
│ ├── layout/
│ ├── routes/
│ └── components/

server/
├── src/
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ ├── config/
│ └── middlewares/

---

## API Modules

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Vendors

* POST /api/vendors
* GET /api/vendors
* DELETE /api/vendors/:id

### RFQs

* POST /api/rfqs
* GET /api/rfqs

### Quotations

* POST /api/quotations
* GET /api/quotations

### Approvals

* POST /api/approvals
* GET /api/approvals

### Purchase Orders

* POST /api/purchase-orders
* GET /api/purchase-orders

### Invoices

* POST /api/invoices
* GET /api/invoices

### Reports

* GET /api/reports

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/vendorbridge
JWT_SECRET=your_secret_key
```

Start Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Local Database

This project uses a local MongoDB instance.

Default connection:

```env
mongodb://127.0.0.1:27017/vendorbridge
```

No cloud database dependency is required.

---

## Future Enhancements

* Email Notifications
* Vendor Portal Access
* PDF Invoice Export
* Audit Logs
* Advanced Analytics Dashboard
* Multi-Level Approval Workflow

---

## Team

### Team Name

VendorBridge

### Hackathon

Odoo x KSV Hackathon 2026

---

## Demo Flow

Register → Login → Vendor → RFQ → Quotation → Comparison → Approval → Purchase Order → Invoice → Reports

---

## License

This project was developed for educational and hackathon purposes.
