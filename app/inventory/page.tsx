import InventoryTable from "@/components/ui/inventory/inventoryTable";
import Link from "next/link";

export default function InventoryPage() {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Inventory</h1>
        <Link className="text-sm text-gray-400" href="/inventory">Inventory / </Link>

      </div>
      <div className="mt-8 mx-8 h-screen">
        <InventoryTable />
      </div>
    </div>
  );
}
