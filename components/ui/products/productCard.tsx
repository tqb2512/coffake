'use client'

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: { id: string, name: string} }) {
    const router = useRouter()

    const handleOnPress = () => {
        router.push(`/products/${product.id}`)
    }
    return (
        <Card
            isPressable
            onPress={handleOnPress}
        >
            <CardHeader>
                <Image alt="" src="https://avatars.githubusercontent.com/u/111489675?v=4" width={100} height={100} />
            </CardHeader>
            <CardBody>
                <h4 className="text-xl">{product.name}</h4>
            </CardBody>
        </Card>
    )
}