import OrderAddForm from "@/components/ui/orders/addForm";

export default function AddOrderPage() {
    return (
        <div className="flex flex-col bg-light-background">
        <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
          <h1 className="text-purple-600 text-2xl font-bold">Order</h1>
          <h4 className="text-gray-400 text-sm">Oders / Add Order</h4>
        </div>
        <OrderAddForm />
      </div>
    )
}