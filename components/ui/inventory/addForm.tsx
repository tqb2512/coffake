"use client";

import { Button, Divider, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Inventory } from "@prisma/client";
import React from "react";

export default function InventoryAddForm() {
  const router = useRouter();
  const [ingredient, setIngredient] = React.useState({} as Inventory);

  const handleSubmit = () => {
    

    fetch("/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredient),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div>
        <label className="text-violet-800 text-3xl">
          {"Add Ingredient"}
        </label>
        <Divider className="my-4" />

        <div className="grid grid-cols-1 gap-6 mt-5 mb-10">
          <Input label="Name" value={ingredient.name} onValueChange={(value) => setIngredient({...ingredient, name: value})} />
          <Input label="Stock" value={ingredient.stock?.toString()} onValueChange={(value) => setIngredient({...ingredient, stock: parseInt(value)})} />
          <Input label="Unit" value={ingredient.unit} onValueChange={(value) => setIngredient({...ingredient, unit: value})} />
          <Input label="Unit Price" value={ingredient.unitPrice?.toString()} onValueChange={(value) => setIngredient({...ingredient, unitPrice: parseInt(value)})} />
        </div>

        <div className="flex justify-end gap-3">
          <Button className="text-white bg-violet-800" onPress={handleSubmit}>Add</Button>
        </div>
      </div>
    </div>
  );
}
