import PageShell from "@/components/ui/dashboard/pageShell"

export default function DashboardPage() {
  return (
    <div className="flex flex-col bg-light-background h-full">
      <div className="mt-8 mb-8 mx-8 bg-white rounded-lg">
        <PageShell />
      </div>
    </div>
  )
}