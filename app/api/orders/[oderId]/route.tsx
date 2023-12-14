import { PrismaClient, Order } from '@prisma/client';
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from 'next/server';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
    const orderId = new URL(req.url).pathname.split("/").pop();

    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        },
        cacheStrategy: { ttl: 60 },
    });

    if (!order) {
        return NextResponse.json({"message": "Order not found"}, { status: 404 });
    }
    return NextResponse.json(order);
}

export async function PUT(req: Request) {
    const orderId = new URL(req.url).pathname.split("/").pop();
    const { customerID, customerName } = await req.json();

    const updatedOrder = await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            customerID,
            customerName,
            status: "Confirmed"
        }
    });

    if (!updatedOrder) {
        return NextResponse.json({"message": "Order not updated"}, { status: 500 });
    }

    return NextResponse.json(updatedOrder);
}