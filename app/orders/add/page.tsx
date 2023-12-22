import OrderAddForm from "@/components/ui/orders/addForm";
import Link from "next/link";

export default function AddOrderPage() {
  return (
    <div className="flex flex-col bg-light-background h-full">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Order</h1>
        <Link className="text-sm text-gray-400" href="/orders">Order List /</Link>
        <Link className="text-sm text-gray-400" href="/orders/add"> Add </Link>
      </div>
      <OrderAddForm />
    </div>
  )
}