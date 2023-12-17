import UsersTable from "@/components/ui/users/usersTable"

export default function UsersPage() {
    return (
        <div className="flex flex-col bg-light-background">
            <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
                <h1 className="text-purple-600 text-2xl font-bold">Users</h1>
                <h4 className="text-sm text-gray-400">Users /</h4>
            </div>
            <UsersTable />
        </div>
    );
}