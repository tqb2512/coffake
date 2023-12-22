import { Supplier, PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from "next/server";

const prisma = new PrismaClient().$extends(withAccelerate());;

export async function GET(req: Request) {
    const supplierId = new URL(req.url).pathname.split("/").pop();

    const supplier = await prisma.supplier.findFirst({
        where: {
            id: supplierId
        },
        cacheStrategy: { ttl: 60 },
    });

    return NextResponse.json(supplier);
}

export async function PUT(req: Request) {
    const supplierId = new URL(req.url).pathname.split("/").pop();
    const body = await req.json();
    const data = {
        name: body.name,
        company: body.company,
        phone: body.phone,
        email: body.email,
    }


    const supplier = await prisma.supplier.update({
        where: {
            id: supplierId
        },
        data: data
    });

    return NextResponse.json(supplier);
}