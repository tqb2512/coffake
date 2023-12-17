import InvoicesTable from "@/components/ui/invoices/invoicesTable"

export default function InvoicesPage() {
    return (
      <div className="flex flex-col bg-light-background">
        <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
          <h1 className="text-purple-600 text-2xl font-bold">Invoices</h1>
          <h4 className="text-sm text-gray-400">Invoices / </h4>
        </div>
        <InvoicesTable />
      </div>
    )
  }