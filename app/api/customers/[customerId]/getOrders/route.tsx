import { PrismaClient, Customer } from '@prisma/client';
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from 'next/server';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
    const customerId = new URL(req.url).pathname.split("/")[3];

    const orders = await prisma.order.findMany({
        where: {
            customerID: customerId
        }
    });

    return NextResponse.json(orders);
}