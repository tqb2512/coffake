import CustomersTable from "@/components/ui/customers/customersTable"
import Link from "next/link"

export default function CustomersPage() {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Customers</h1>
        <Link className="text-sm text-gray-400" href="/customers">Customer List </Link>

      </div>
      <div className="mt-8 mx-8 h-screen">
        <CustomersTable />
      </div>
    </div>
  )
}