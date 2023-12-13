"use client";

import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function OrderProductCard({
    product,
    handleAddToOrder,
}: {
    product: { id: string; name: string },
    handleAddToOrder: (product: any, selectedSize: string) => void
}) {
    const router = useRouter();
    const [size, setSize] = React.useState<string>("")
    const [ice, setIce] = React.useState<string>("")
    const [sugar, setSugar] = React.useState<string>("")
    const handleOnPress = () => {
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
                {/* <button
                    onClick={handleOnPress}
                    type="button"
                    className="bg-gray-600 rounded-md bottom-0 mt-2 me-2"
                >
                    <h3 className="text-white font-semibold py-1">details</h3>
                </button> */}
            </div>
            <div className="flex flex-1 flex-col overflow-visible py-2 px-1">
                <p className="text-tiny uppercase font-bold">Size</p>
                <div className="flex items-center">
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
                    
                </div>
                {/* <p className="text-tiny uppercase font-bold">Ice</p>
                <div className="flex items-center">
                    <button
                        onClick={() => {
                            setIce("ice");
                        }}
                        className={`w-1/4 bg-gray-300 rounded-xl my-2 me-4 p-2 ${
                            ice==="ice" ? "bg-purple-600 text-white font-semibold" : "bg-black"
                        }`}
                    >
                        Ice
                    </button>
                    <button
                        onClick={() => {
                            setIce("noIce");
                        }}                    
                        className={`w-1/4 bg-gray-300 rounded-xl my-2 me-4 p-2 ${
                            ice==="noIce" ? "bg-purple-600 text-white font-semibold" : "bg-black"
                        }`}
                    >
                        No Ice
                    </button>
                </div> */}
                {/* <p className="text-tiny uppercase font-bold">Sugar</p>
                <div className="flex items-center">
                    <button
                        onClick={() => {
                            setSugar("30");
                        }}
                        className={`w-1/4 bg-gray-300 rounded-xl my-2 me-4 p-2 ${
                            sugar==='30' ? "bg-purple-600 text-white font-semibold" : "bg-black"
                        }`}
                    >
                        30%
                    </button>
                    <button
                        onClick={() => {
                            setSugar("50");
                        }}                    
                        className={`w-1/4 bg-gray-300 rounded-xl my-2 me-4 p-2 ${
                            sugar==='50' ? "bg-purple-600 text-white font-semibold" : "bg-black"
                        }`}
                    >
                        50%
                    </button>
                    <button
                        onClick={() => {
                            setSugar("70");
                        }}                     
                        className={`w-1/4 bg-gray-300 rounded-xl my-2 me-4 p-2 ${
                            sugar==='70' ? "bg-purple-600 text-white font-semibold" : "bg-black"
                        }`}
                    >
                        70%
                    </button>   
                </div> */}
                <button
                    onClick={handleOnPress}
                    type="submit"
                    className="bg-gray-600 rounded-md bottom-0 mt-2 me-2"
                >
                    <h3 className="text-white font-semibold py-1">Add to Order</h3>
                </button>
            </div>
        </div>
    );
}
