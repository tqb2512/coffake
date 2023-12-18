import CustomerInfoForm from "@/components/ui/customers/infoForm"

export default function CustomerInfoPage({ params }: { params: { customerId: string } }) {
  return (
    <div>
      <div className="flex flex-col bg-light-background">
        <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
          <h1 className="text-purple-600 text-2xl font-bold">Customers</h1>
          <h4 className="text-sm text-gray-400">Customers / Details</h4>
        </div>
        <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
          <CustomerInfoForm params={params} />
        </div>
      </div>
    </div>
  )
}