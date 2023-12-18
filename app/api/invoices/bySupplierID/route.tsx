import { PrismaClient, Supplier, Invoice } from '@prisma/client';
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from 'next/server';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req : Request) {
    const supplierId = new URL(req.url).searchParams.get("supplierId") ?? "";

    if (supplierId == "undefined") {
        return NextResponse.json({ error: "supplierId is undefined" }, { status: 400 });
    }
    
    const invoices = await prisma.invoice.findMany({
        where: {
            importList: {
                some: {
                    suppilerId: supplierId,
                }
            }
        },
        cacheStrategy: { ttl: 60 },
    });

    return NextResponse.json(invoices);
}