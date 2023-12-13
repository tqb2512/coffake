import ProductInfoForm from "@/components/ui/products/infoForm"

export default function ProductInfoPage({ params }: { params: { productId: string } }) {
  return (
    <div className="flex bg-light-background pt-4 px-2 ">
      <ProductInfoForm productId={params.productId} />
    </div>
  )
}