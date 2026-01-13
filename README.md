# 🍽️ Restaurant Ordering & Management System

A full-stack restaurant web application that allows customers to order food using QR codes, while staff and administrators manage tables, orders, menu items, and users in real time.

This system replaces paper menus and manual ordering with a fast, modern, and mobile-friendly digital experience.

---

## 🚀 Main Features

The platform supports **three types of users**:
- Customers
- Workers (Waiters)
- Admins

Each role has its own dashboard and permissions.

---

## 📱 Customer Experience (QR Ordering)

Customers do not need an app. They only scan a QR code on their table.

### How it works
1. A QR code is placed on each table.
2. The QR code opens a link like: https://restorantp.netlify.app/table/5
3. The customer sees the menu for that table.

### Customers can:
- Browse meals by category  
- Add meals to their order  
- Remove meals  
- View their order in real time  
- Send the order  
- Pay  

This makes ordering faster and avoids mistakes.

---

## 🧾 Customer Order Page

The order page shows:
- Selected meals
- Quantities
- Total price
- Order status (pending / sent / paid)

The customer can update the order before sending it to the kitchen.

---

## 🧑‍💼 Worker (Waiter) Panel

Workers log in using their account.

They can:
- See all restaurant tables
- Add or remove meals
- See what the customer ordered
- Manage the order

They also have an **Orders page** where they can see:
- Which table ordered
- What was ordered
- Order status
- Finish order

---

## 🛠️ Admin Panel

Admins have full control over the system.

### Menu Management
Admins can:
- Create, edit, and remove categories and meals

### User Management
Admins can:
- Create new workers (waiters)
- Delete users

---

## 🌐 Website Pages

The website contains:
- Home page
- Information page (about the restaurant & owner)
- Menu page
- Navigation
- Contact page

Everything is responsive and works on mobile and desktop.

---

## 🔐 User Roles

| Role | Permissions |
|------|------------|
| Customer | Scan QR, browse menu, create and send orders |
| Worker | Manage tables and orders |
| Admin | Manage menu, categories, and users |

---

## 🧩 System Overview

The system consists of:
- A frontend for customers, workers, and admins
- A backend API that handles orders, users, tables, and menu
- A database that stores all data

---

## 📈 Why This System?

This platform:
- Speeds up ordering
- Reduces human errors
- Works on any phone
- Requires no mobile app
- Improves customer experience


---

## 📄 License

This project is free to use, modify, and extend.
