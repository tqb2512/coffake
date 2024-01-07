import UsersTable from "@/components/ui/users/usersTable"
import Link from "next/link"

export default function UsersPage() {
    return (
        <div className="flex flex-col bg-light-background h-full">
            <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
                <h1 className="text-purple-600 text-2xl font-bold">Employees</h1>
                <h2 className="text-sm text-gray-400">Employees List </h2>
            </div>
            <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
                <UsersTable />
            </div>
        </div>
    );
}