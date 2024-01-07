"use client";

import { Order, Product, OrderItems, Inventory, ProductSizeList } from "@prisma/client";
import AddProductModal from "./addProductModal";
import React from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Radio, RadioGroup } from "@nextui-org/react";

export default function ProductCard({
    product,
    order,
    setOrder,
    inventory
}: {
    product: Product;
    order: Order;
    setOrder: React.Dispatch<React.SetStateAction<Order>>;
    inventory: Inventory[];
}) {
    const [selectedSize, setSelectedSize] = React.useState("");
    const [selectedPrice, setSelectedPrice] = React.useState(0);
    const [orderItem, setOrderItem] = React.useState({} as OrderItems);
    const [isOpen, setIsOpen] = React.useState(false);

    const handleAddToOrder = () => {
        setOrderItem({
            productID: product.id,
            productName: product.name,
            size: selectedSize,
            price: selectedPrice,
            quantity: 1,
            toppings: [],
            note: "",
        });
        setIsOpen(true);
    };

    const isSizeAvailable = (sizeInfo: ProductSizeList) => {
        let isAvailable = false;
        sizeInfo.recipe.forEach((ingredient) => {
            inventory.forEach((item) => {
                if (ingredient.ingredientId === item.id) {
                    if (item.stock >= ingredient.quantity) {
                        isAvailable = true;
                    } else {
                        isAvailable = false;
                    }
                }
            });
        });
        return isAvailable;
    };

    return (
        <Card className="w-full h-[360px]">
            <CardHeader className="absolute bg-black/40 border-t-1 border-default-600 dark:border-default-100 backdrop-blur-lg bg-opacity-40">
                <h3 className="text-white">{product.name}</h3>
            </CardHeader>
            <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 w-full h-full object-cover"
                src={product.imageUrl}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 backdrop-blur-lg bg-opacity-40">
                <div className="flex flex-col flex-grow gap-2">
                    <div>
                        <h1 className="text-white">Price: ${selectedPrice}</h1>
                    </div>
                    <div className="flex">
                        <RadioGroup
                            color="primary"
                            defaultValue={selectedSize}
                            orientation="horizontal"
                        >
                            {
                                product.sizeList.map((sizeInfo) => isSizeAvailable(sizeInfo) ? (
                                    <Radio
                                        key={sizeInfo.size}
                                        value={sizeInfo.size}
                                        onChange={(e) => {
                                            setSelectedSize(e.target.value);
                                            setSelectedPrice(sizeInfo.price);
                                        }}
                                    >
                                        <h1
                                            className="text-white"
                                        >{sizeInfo.size}</h1>
                                    </Radio>
                                ) : (
                                    <Radio
                                        key={sizeInfo.size}
                                        value={sizeInfo.size}
                                        isDisabled
                                    >
                                        <h1
                                            className="text-white"
                                        >{sizeInfo.size}</h1>
                                    </Radio>                                    
                                ))
                            }
                        </RadioGroup>
                    </div>
                </div>
                <Button onClick={handleAddToOrder} radius="md" size="sm">
                    Add
                </Button>
                {isOpen && (
                    <AddProductModal
                        order={order}
                        setOrder={setOrder}
                        orderItem={orderItem}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        inventory={inventory}
                    />
                )}
            </CardFooter>
        </Card>
    );
}