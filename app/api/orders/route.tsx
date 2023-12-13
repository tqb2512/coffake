import { PrismaClient, Order } from '@prisma/client';
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from 'next/server';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
    const orders = await prisma.order.findMany({
        cacheStrategy: { ttl: 60 },
    });
    return NextResponse.json(orders);
}

export async function POST(req: Request) {
    const { date, totalPrice, status, items } = await req.json();

    const createdOrder = await prisma.order.create({
        data: {
            date,
            totalPrice,
            status,
            items
        },
    });

    if (!createdOrder) {
        return NextResponse.json({"message": "Order not created"}, { status: 500 });
    }

    return NextResponse.json(createdOrder);
}