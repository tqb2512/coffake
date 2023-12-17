import SupplierInfoForm from "@/components/ui/suppliers/infoForm";

export default function SupplierInfoPage({
  params,
}: {
  params: { supplierId: string };
}) {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Suppliers</h1>
        <h4 className="text-sm text-gray-400">Suppliers / Details</h4>
      </div>
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <SupplierInfoForm params={params} />
      </div>
    </div>
  );
}
