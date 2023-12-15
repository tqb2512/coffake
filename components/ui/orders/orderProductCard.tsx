"use client";

import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import OrderModal from "./orderModal";

export default function OrderProductCard({ product, handleAddToOrder,}: {product: { id: string; name: string }, handleAddToOrder: (product: any, selectedSize: string) => void}) 
{
    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    const [size, setSize] = React.useState("")
    const handleOnPress = () => {
        console.log("okay button")
        handleAddToOrder(product, size)
    };

    return (
        <div className="flex flex-col bg-white p-2 rounded-md shadow-lg">
            <div className="flex flex-1">
                <div className="w-2/5">
                    <Image
                        alt="Card background"
                        className="p-2 rounded-xl w-full"
                        src="https://avatars.githubusercontent.com/u/111489675?v=4"
                        width={60}
                        height={80}
                    />
                </div>
                <div className="flex flex-col flex-1 mt-1 ms-2 relative">
                    <p className="text-tiny uppercase font-bold">
                        {product.name}
                    </p>
                    <small className="text-gray-500">
                        (Description) A perfect combination from Italo.
                    </small>
                    <h4 className="text-purple-600 left-0 bottom-2 font-bold text-large absolute">
                        (Price) $35
                    </h4>
                </div>
            </div>
            <div className="flex flex-1 flex-col overflow-visible py-2 px-1">
                <p className="text-tiny uppercase font-bold">Size</p>
                {/* <div className="flex items-center">
                    <button
                        onClick={() => {
                            setSize("S");
                        }}
                        className={`w-1/4 bg-gray-300 rounded-xl my-2 me-4 p-2 ${
                            size==='S' ? "bg-purple-600 text-white font-semibold" : "bg-black"
                        }`}
                    >
                        Size S
                    </button>
                    <button
                        onClick={() => {
                            setSize("M");
                        }}                    
                        className={`w-1/4 bg-gray-300 rounded-xl my-2 me-4 p-2 ${
                            size==='M' ? "bg-purple-600 text-white font-semibold" : "bg-black"
                        }`}
                    >
                        Size M
                    </button>
                    <button
                        onClick={() => {
                            setSize("L");
                        }}                     
                        className={`w-1/4 bg-gray-300 rounded-xl my-2 me-4 p-2 ${
                            size==='L' ? "bg-purple-600 text-white font-semibold" : "bg-black"
                        }`}
                    >
                        Size L
                    </button>
                    
                </div> */}
                <OrderModal onClick={handleOnPress}/>
            </div>
        </div>
    );
}
