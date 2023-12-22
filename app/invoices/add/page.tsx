import InvoiceAddForm from "@/components/ui/invoices/addForm"
import Link from "next/link"

export default function InvoiceAddPage() {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Invoices</h1>
        <Link className="text-sm text-gray-400" href="/invoices">Invoices List /</Link>
        <Link className="text-sm text-gray-400" href="/invoices/add"> Add</Link>

      </div>
      <div className="mt-8 mx-8 h-screen">
        <InvoiceAddForm />
      </div>
    </div>
  )
}