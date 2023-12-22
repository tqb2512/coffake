import IngredientInfoForm from "@/components/ui/inventory/infoForm";
import Link from "next/link";

export default function IngredientInfoPage({
  params,
}: {
  params: { ingredientId: string };
}) {
  return (
    <div className="flex flex-col bg-light-background">
      <div className="mt-8 mx-8 bg-white p-4  rounded-lg">
        <h1 className="text-purple-600 text-2xl font-bold">Inventory</h1>
        <h2 className="text-sm text-gray-400">Ingredient Detail</h2>
      </div>
      <div className="mt-8 mx-8 h-screen">
        <IngredientInfoForm params={params} />
      </div>
    </div>
  );
}
