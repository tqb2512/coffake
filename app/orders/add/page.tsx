import OrderAddForm from "@/components/ui/orders/addForm";
import Link from "next/link";

export default function AddOrderPage() {
  return (
    <div className="flex flex-col bg-light-background h-max">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Orders</h1>
        <h2 className="text-sm text-gray-400">Add Order</h2>
      </div>
      <OrderAddForm />
    </div>
  )
}