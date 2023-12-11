"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({
    product,
}: {
    product: { id: string; name: string };
}) {
    const router = useRouter();

    const handleOnPress = () => {
        router.push(`/products/${product.id}`);
    };
    return (
        <div className="flex flex-col mr-2 bg-white p-2 rounded-md">
                <div className="flex flex-1">
                    <Image
                        alt="Card background"
                        className="p-2 rounded-xl w-full"
                        src="https://avatars.githubusercontent.com/u/111489675?v=4"
                        width={160}
                        height={160}
                    />
                </div>
                <div className="flex flex-1 flex-col overflow-visible py-2 px-1">
                    <p className="text-tiny uppercase font-bold">{product.name}</p>
                    <small className="text-default-500">(Description) A perfect combination.</small>
                    <h4 className="font-bold text-large">(Price) $40</h4>
                    <button onClick={handleOnPress} type="button" className="bg-gray-600 rounded-md bottom-0 mt-2 me-2">
                        <h3 className="text-white font-semibold py-1">details</h3>
                    </button>
                </div>
        </div>
    );
}
