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