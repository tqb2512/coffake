import SupplierInfoForm from "@/components/ui/suppliers/infoForm"

export default function SupplierInfoPage({ params }: { params: { supplierId: string } }) {
  return (
    <div>
      <SupplierInfoForm params={params} />
    </div>
  )
}