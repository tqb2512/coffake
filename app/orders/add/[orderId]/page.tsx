import CheckOutForm from "@/components/ui/orders/checkOutForm"

export default function CheckOutPage({ params }: { params: { orderId: string }}) {
    return (
        <div>
            <CheckOutForm params={params} />
        </div>
    )
}