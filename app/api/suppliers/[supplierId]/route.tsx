import { Supplier, PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from "next/server";

const prisma = new PrismaClient().$extends(withAccelerate());;

export async function GET(req : Request) {
    const supplierId = new URL(req.url).pathname.split("/").pop();
    
    const supplier = await prisma.supplier.findFirst({
        where: {
            id: supplierId
        },
        cacheStrategy: { ttl: 60 },
    });

    return NextResponse.json(supplier);
}