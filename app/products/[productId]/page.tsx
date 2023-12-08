import ProductInfoForm from "@/components/ui/products/infoForm"

export default function ProductInfoPage({ params }: { params: { productId: string } }) {
  return (
    <div>
      <ProductInfoForm productId={params.productId} />
    </div>
  )
}