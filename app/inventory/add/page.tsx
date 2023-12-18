import InventoryAddForm from "@/components/ui/inventory/addForm"

export default function InventoryAddPage() {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Inventory</h1>
        <h4 className="text-sm text-gray-400">Inventory / Add</h4>
      </div>
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <InventoryAddForm />
      </div>
    </div>
  )
}