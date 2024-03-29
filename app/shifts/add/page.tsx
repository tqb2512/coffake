import AddShiftForm from "@/components/ui/shift/addForm"

export default function AddShiftPage() {
    return (
        <div className="flex flex-col bg-light-background">
            <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
                <h1 className="text-purple-600 text-2xl font-bold">Shifts</h1>
                <h2 className="text-sm text-gray-400">Add Shift</h2>
            </div>
            <div className="mt-8 mx-8 h-screen">
                <AddShiftForm />
            </div>
        </div>
    )
}