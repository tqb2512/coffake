import ShiftTable from "@/components/ui/shift/shiftTable"

export default function ShiftPage() {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Shifts</h1>
        <h4 className="text-sm text-gray-400">Shifts List</h4>
      </div>
      <div className="mt-8 mx-8 h-screen">
        <ShiftTable />
      </div>
    </div>
  )
}