import { PrismaClient, Product } from '@prisma/client';
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from 'next/server';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
    const query = new URL(req.url).searchParams;
    const category = query.get("category") ?? "";
    const products = await prisma.product.findMany({
        where: {
            category: (category !== 'All' ? category : {})
        },
        cacheStrategy: { ttl: 60 },
    });
    return NextResponse.json(products);
}

export async function POST(req: Request) {
    const { name, category, sizeList, imageUrl } = await req.json();
    const newProduct = await prisma.product.create({
        data: {
            name,
            category,
            sizeList: sizeList,
            imageUrl,
        },
    });
    return NextResponse.json(newProduct);
}