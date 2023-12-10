import InvoiceInfoForm from "@/components/ui/invoices/infoForm"

export default function InvoiceInfoPage({ params }: { params: { invoiceId: string } }) {
  return (
    <div>
      <InvoiceInfoForm params={params} />
    </div>
  )
}