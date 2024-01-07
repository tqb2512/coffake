import ProductsTable from "@/components/ui/products/productsTable"
import Link from "next/link"

export default function ProductsPage() {

  return (
    <div className="flex flex-col bg-light-background h-max">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Products</h1>
        <h2 className="text-sm text-gray-400">Products List</h2>
      </div>
      <div className="mt-8 mx-8">
        <ProductsTable />
      </div>
    </div>
  )
}