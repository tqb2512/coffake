import SuppliersTable from "@/components/ui/suppliers/suppliersTable"
import Link from "next/link"

export default function SuppliersPage() {
  return (
    <div className="flex flex-col bg-light-background h-full">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Suppliers</h1>
        <h2 className="text-sm text-gray-400">Suppliers List </h2>
      </div>
      <div className="my-8 mx-8 bg-white p-4 rounded-lg">
        <SuppliersTable />
      </div>
    </div>
  )
}