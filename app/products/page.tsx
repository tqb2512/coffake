import CategoryGrid from "@/components/ui/products/categoryGrid"
import ProductsGrid from "@/components/ui/products/productsGrid"

export default function ProductsPage() {

    return (
      <div className="flex flex-col bg-light-background ">
        <div className="mt-8 mb-4 mx-8 bg-white p-4 rounded-lg">
          <h1 className="text-purple-600 text-2xl font-bold">Products</h1>
          <h4 className="text-sm text-gray-400">Products /</h4>
        </div>
        <ProductsGrid/>
      </div>
    )
  }