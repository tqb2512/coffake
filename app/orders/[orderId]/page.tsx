import OrderInfoForm from "@/components/ui/orders/infoForm"

export default function OrderInfoPage({ params }: { params: { orderId: string } }) {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Orders</h1>
        <h4 className="text-sm text-gray-400">Order details</h4>
      </div>
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <OrderInfoForm params={params} />
      </div>
    </div>
  )
}