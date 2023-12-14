import CustomerInfoForm from "@/components/ui/customers/infoForm"

export default function CustomerInfoPage({ params }: { params: { customerId: string } }) {
  return (
    <div>
      <CustomerInfoForm params={params} />
    </div>
  )
}