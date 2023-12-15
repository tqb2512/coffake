"use client";

import { Order, Product, OrderItems } from "@prisma/client";
import AddProductModal from "./addProductModal";
import React from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Radio, RadioGroup } from "@nextui-org/react";

export default function ProductCard({
    product,
    order,
    setOrder,
    handleOnModalPress
}: {
    product: Product;
    order: Order;
    setOrder: React.Dispatch<React.SetStateAction<Order>>;
    handleOnModalPress: (product: any, selectedSize: string) => void;
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

    const handleOnPress = () => {
        console.log("okay button")
        handleOnModalPress(product, selectedSize)
    }

    return (
        <Card isFooterBlurred className="w-full h-[360px]">
            <CardHeader className="absolute z-10 top-0 flex-col items-start backdrop-filter backdrop-blur-lg bg-opacity-5 bg-white">
                <div className="flex">
                    <h4 className="text-white font-medium text-xl uppercase">
                        {product.name}
                    </h4>
                    <h4 className="text-yellow-300 font-medium text-xl">
                        &nbsp; ${selectedPrice}
                    </h4>
                </div>
            </CardHeader>
            <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 w-full h-full object-cover"
                src="https://images.foody.vn/res/g111/1107037/prof/s/foody-upload-api-foody-mobile-in-854905df-210926200239.jpeg"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-col flex-grow gap-2">
                    <small className="text-white/90 font-medium text-sm">
                        A perfect combination from Italo.
                    </small>
                    <div className="flex">
                        <RadioGroup
                            color="primary"
                            defaultValue={selectedSize}
                            orientation="horizontal"
                        >
                            {product.sizeList.map((sizeInfo) => (
                                <Radio
                                    className="me-0"
                                    value={sizeInfo.size}
                                    onChange={(e) => {
                                        setSelectedSize(e.target.value),
                                         setSelectedPrice(sizeInfo.price);
                                    }}
                                >
                                    
                                    <p className="text-white">{sizeInfo.size}</p>
                                </Radio>
                            ))}
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
                    onClickCustom={handleOnPress}
                />
            )}
            </CardFooter>
        </Card>
        // <div className="flex flex-col bg-white p-2 rounded-md shadow-lg">
        //     <div className="flex flex-1">
        //         <div className="w-2/5">
        //             <Image
        //                 alt="Card background"
        //                 className="p-2 rounded-xl w-full h-full"
        //                 src="https://avatars.githubusercontent.com/u/111489675?v=4"
        //                 width={60}
        //                 height={60}
        //             />
        //         </div>
        //         <div className="flex flex-col flex-1 mt-1 ms-2 relative">
        //             <p className="text-tiny uppercase font-bold">
        //                 {product.name}
        //             </p>
        //             <small className="text-gray-500">
        //                 (Description) A perfect combination from Italo.
        //             </small>

        //         </div>
        //     </div>
        //     <Divider />
        //     <div className="flex items-center">
        //         <RadioGroup
        //             label="Size"
        //             color="secondary"
        //             defaultValue={selectedSize}
        //             orientation="horizontal"
        //         >
        //             {product.sizeList.map((sizeInfo) => (
        //                         <Radio
        //                             className="me-2"
        //                             value={sizeInfo.size}
        //                             onChange={(e) => {
        //                             setSelectedSize(e.target.value),
        //                             setSelectedPrice(sizeInfo.price);
        //                         }}>
        //                             {sizeInfo.size}
        //                         </Radio>

        //             ))}
        //         </RadioGroup>

        //     </div>
        //     <h1 className="text-purple-600 font-bold text-large">
        //         ${selectedPrice}
        //     </h1>
        //     <button onClick={handleAddToOrder}>Add to order</button>
            // {isOpen && (
            //     <AddProductModal
            //         order={order}
            //         setOrder={setOrder}
            //         orderItem={orderItem}
            //         isOpen={isOpen}
            //         setIsOpen={setIsOpen}
            //     />
            // )}
        // </div>
    );
}
