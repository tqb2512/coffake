import CheckOutForm from "@/components/ui/orders/checkOutForm"

export default function CheckOutPage({ params }: { params: { orderId: string } }) {
  return (
    <div className="flex flex-col bg-light-background h-full">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Orders</h1>
        <h4 className="text-sm text-gray-400">Order checkout</h4>
      </div>
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <CheckOutForm params={params} />
      </div>
    </div>
  )
}