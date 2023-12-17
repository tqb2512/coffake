import OrdersTable from "@/components/ui/orders/ordersTable";
import React from "react";

export default function OrdersPage() {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Order</h1>
        <h4 className="text-sm text-gray-400">Oders /</h4>
      </div>
      <OrdersTable />
    </div>
  );
}