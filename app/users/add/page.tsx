import UserAddForm from "@/components/ui/users/addForm"
import Link from "next/link"

export default function UserAddPage() {
  return (
    <div className="flex flex-col bg-light-background h-full">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Employees</h1>
        <Link className="text-sm text-gray-400" href="/users">Employees List /</Link>
        <Link className="text-sm text-gray-400" href="/users/add"> Add </Link>
      </div>
      <div className="mt-8 mx-8 h-screen">
        <UserAddForm />
      </div>
    </div>
  )
}