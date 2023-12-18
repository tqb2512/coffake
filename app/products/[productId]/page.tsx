import ProductInfoForm from "@/components/ui/products/infoForm"

export default function ProductInfoPage({ params }: { params: { productId: string } }) {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Products</h1>
        <h4 className="text-sm text-gray-400">Products / Details / </h4>
      </div>
      <ProductInfoForm productId={params.productId} />
    </div>
  )
}