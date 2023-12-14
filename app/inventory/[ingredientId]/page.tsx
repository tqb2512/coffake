import IngredientInfoForm from "@/components/ui/inventory/infoForm"

export default function IngredientInfoPage({ params }: { params: { ingredientId: string } }) {
  return (
    <div>
      <IngredientInfoForm params={params} />
    </div>
  )
}