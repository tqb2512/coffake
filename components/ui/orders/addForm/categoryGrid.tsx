'use client'

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Drink" },
    { id: 3, name: "Food" },
    { id: 4, name: "Topping" }
]

export default function CategoryGrid(params: { onPress: (category: string) => void}) {
    
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4">
            {categories.map((category) => (
                <Card 
                    className="bg-red-500 rounded-md w-24 h-24"
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