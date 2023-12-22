import CustomerAddForm from "@/components/ui/customers/addForm"
import { Link } from "@nextui-org/react"

export default function CustomerAddPage() {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Customer</h1>
        <Link className="text-sm text-gray-400" href="/customers">Customer /</Link>
        <Link className="text-sm text-gray-400" href="/customers/add">&nbsp;Add</Link>
      </div>
      <div className="mt-8 mx-8 h-screen ">
        <CustomerAddForm />
      </div>
    </div>
  )
}