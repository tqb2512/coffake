'use client'

import { Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Drink" },
    { id: 3, name: "Food" },
    { id: 4, name: "Topping" }
]

export default function CategoryGrid(params: { onPress: (category: string) => void}) {
    const router = useRouter()

    const handleOnPress = (category: string) => {
        
    }
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
                <Card 
                    isPressable
                    key={category.id}
                    onPress={() => params.onPress(category.name)}
                    >
                    <h4 className="text-xl">{category.name}</h4>
                </Card>
            ))}
        </div>
    )
}