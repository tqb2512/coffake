import OrdersTable from "@/components/ui/orders/ordersTable";
import Link from "next/link";
import React from "react";

export default function OrdersPage() {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Orders</h1>
        <Link className="text-sm text-gray-400" href="/orders">Order List </Link>

      </div>
      <div className="mt-8 mx-8 h-screen">
        <OrdersTable />
      </div>
    </div>
  );
}