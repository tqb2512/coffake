import { PrismaClient, Customer } from '@prisma/client';
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from 'next/server';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
    const customers = await prisma.customer.findMany({
        cacheStrategy: { ttl: 60 },
    });
    return NextResponse.json(customers);
}

export async function POST(req: Request) {
    const { name, email, phone } = await req.json();
    const customer = await prisma.customer.create({
        data: {
            name,
            email,
            phone,
            loyaltyPoints: 0
        }
    });
    return NextResponse.json(customer);
}