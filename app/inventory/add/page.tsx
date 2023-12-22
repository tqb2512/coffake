import InventoryAddForm from "@/components/ui/inventory/addForm"
import Link from "next/link"

export default function InventoryAddPage() {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Inventory</h1>
        <Link className="text-sm text-gray-400" href="/inventory">Inventory / </Link>
        <Link className="text-sm text-gray-400" href="/inventory/add"> Add </Link>

      </div>
      <div className="mt-8 mx-8 h-screen">
        <InventoryAddForm />
      </div>
    </div>
  )
}