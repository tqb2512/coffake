import SuppliersTable from "@/components/ui/suppliers/suppliersTable"

export default function SuppliersPage() {
    return (
      <div className="flex flex-col bg-light-background">
        <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
          <h1 className="text-purple-600 text-2xl font-bold">Suppliers</h1>
          <h4 className="text-sm text-gray-400">Suppliers / </h4>
        </div>
        <SuppliersTable />
      </div>
    )
  }