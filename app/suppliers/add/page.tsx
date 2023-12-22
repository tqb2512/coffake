import SupplierAddForm from "@/components/ui/suppliers/addForm";
import Link from "next/link";

export default function SupplierAddPage() {
  return (
    <div className="flex flex-col bg-light-background h-screen">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Suppliers</h1>
        <h2 className="text-sm text-gray-400">Add Supplier </h2>
      </div>
      <div className="mt-8 mx-8 h-screen">
        <SupplierAddForm />
      </div>
    </div>
  );
}
