'use client'

import { Product } from '@prisma/client';
import React from "react"
import { Button, Divider, Input, Card, CardHeader, CardBody, Image, CardFooter } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const categoryList = [
    "All",
    "Drink",
    "Food",
    "Topping"
];

export default function ProductsTable() {
    const router = useRouter();
    const [products, setProducts] = React.useState([] as Product[]);
    const [category, setCategory] = React.useState("All");

    React.useEffect(() => {
        fetch(`/api/products?category=${category}`)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [category])

    return (
        <div className='bg-white rounded-lg p-4'>
            <div>
                <label className="text-violet-800 text-3xl">
                    {"Category List"}
                    <Button
                        className="float-right"
                        onClick={() => router.push(`/products/add`)}
                    >
                        {"New Product"}
                    </Button>
                </label>
                <div className="flex flex-row gap-2 my-5">
                    {categoryList.map((category) => (
                        <Button
                            {...(category === category ? { className: 'text-white bg-violet-800' } : {})}
                            key={category}
                            onClick={() => setCategory(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-4 gap-6 mt-5 mb-10">
                    {products.map((product) => (
                        <Card
                            className="h-[360px]"
                            key={product.id}
                            isPressable
                            onPress={() => router.push(`/products/${product.id}`)}>
                            <CardBody>
                                {/* PlaceHolder for image */}
                                <Image
                                    removeWrapper
                                    alt="Relaxing app background"
                                    className="z-0 w-full h-full object-cover"
                                    src={product.imageUrl}
                                />
                            </CardBody>
                            <CardFooter>
                                <h4>{product.name}</h4>
                            </CardFooter>
                        </Card>
                    ))}
                </div>


            </div>
        </div>
    );
}