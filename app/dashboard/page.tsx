import PageShell from "@/components/ui/dashboard/pageShell"

export default function DashboardPage() {
  return (
    <div className="flex flex-col bg-light-background h-full">
      <div className="mt-8 mx-8 bg-white p-4 rounded-lg">
        <PageShell />
      </div>
    </div>
  )
}