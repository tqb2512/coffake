import { PrismaClient, Customer } from '@prisma/client';
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from 'next/server';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
    const customerId = new URL(req.url).pathname.split("/")[3];

    const customer = await prisma.customer.findUnique({
        where: {
            id: customerId
        }
    });

    return NextResponse.json(customer);
}

export async function PUT(req: Request) {
    const customerId = new URL(req.url).pathname.split("/")[3];
    const data = await req.json();

    const customer = await prisma.customer.update({
        where: {
            id: customerId
        },
        data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            loyaltyPoints: data.loyaltyPoints
        }
    });

    return NextResponse.json(customer);
}