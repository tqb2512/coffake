import InvoiceInfoForm from "@/components/ui/invoices/infoForm";
import Link from "next/link";

export default function InvoiceInfoPage({
  params,
}: {
  params: { invoiceId: string };
}) {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Invoices</h1>
        <h2 className="text-sm text-gray-400">Invoice Detail</h2>
      </div>
      <div className="mt-8 mx-8 h-screen">
        <InvoiceInfoForm params={params} />
      </div>
    </div>
  );
}
