import ProductInfoForm from "@/components/ui/products/infoForm"
import Link from "next/link"

export default function ProductInfoPage({ params }: { params: { productId: string } }) {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Products</h1>
        <h2 className="text-sm text-gray-400">Product Detail</h2>
      </div>
      <div className="mt-8 mx-8 h-screen">
        <ProductInfoForm productId={params.productId} />
      </div>
    </div>
  )
}