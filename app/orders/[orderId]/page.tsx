import OrderInfoForm from "@/components/ui/orders/infoForm"

export default function OrderInfoPage({ params }: { params: { orderId: string } }) {
  return (
    <div>
      <OrderInfoForm params={params} />
    </div>
  )
}