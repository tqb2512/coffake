import InventoryTable from "@/components/ui/inventory/inventoryTable";

export default function InventoryPage() {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Inventory</h1>
        <h4 className="text-sm text-gray-400">Inventory / </h4>
      </div>
      <div>
        <InventoryTable />
      </div>
    </div>
  );
}
