import SupplierInfoForm from "@/components/ui/suppliers/infoForm";
import Link from "next/link";

export default function SupplierInfoPage({
  params,
}: {
  params: { supplierId: string };
}) {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Suppliers</h1>
        <Link className="text-sm text-gray-400" href="/suppliers">Suppplier List /</Link>
        <Link className="text-sm text-gray-400" href="#"> Details </Link>
      </div>
      <div className="mt-8 mx-8 h-screen">
        <SupplierInfoForm params={params} />
      </div>
    </div>
  );
}
