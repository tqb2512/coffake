"use client";

import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Inventory } from "@prisma/client";
import React from "react";
import { useSession } from "next-auth/react";

export default function InventoryAddForm() {
  const router = useRouter();
  const { data: session, status } = useSession()
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
      .then((data) => {
        router.push("/inventory");
      });
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") {
    router.push("/login")
  }

  return (
    <div className="bg-white rounded-lg p-4">
      <div>
        <label className="text-violet-800 text-3xl">
          {"Add Ingredient"}
        </label>
        <Divider className="my-4" />

        <div className="grid grid-cols-1 gap-6 mt-5 mb-10">
          <Input label="Name" value={ingredient.name} onValueChange={(value) => setIngredient({ ...ingredient, name: value })} />
          <Input label="Stock" value={ingredient.stock?.toString()} onValueChange={(value) => setIngredient({ ...ingredient, stock: parseInt(value) })} />
          <Select
            label="Unit"
            value={ingredient.unit}
            onChange={(e) => setIngredient({ ...ingredient, unit: e.target.value })}
          >
            <SelectItem key="1" value="Phần">Phần</SelectItem>
            <SelectItem key="2" value="Chai">Chai</SelectItem>
            <SelectItem key="3" value="Lon">Lon</SelectItem>
            <SelectItem key="4" value="Gói">Gói</SelectItem>
            <SelectItem key="4" value="g">g</SelectItem>
            <SelectItem key="5" value="ml">ml</SelectItem>
          </Select>
          <Input label="Unit Price" type="number" value={ingredient.unitPrice?.toString()} onValueChange={(value) => setIngredient({ ...ingredient, unitPrice: parseFloat(value) })} endContent="$" />
        </div>

        <div className="flex justify-end gap-3">
          <Button className="text-white bg-violet-800" onPress={handleSubmit}>Add</Button>
        </div>
      </div>
    </div>
  );
}
