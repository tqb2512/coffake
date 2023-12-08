import { Inventory, PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from "next/server";

const prisma = new PrismaClient().$extends(withAccelerate());;

export async function GET() {
    const inventory = await prisma.inventory.findMany({
        cacheStrategy: { ttl: 60 },
    });
    return NextResponse.json(inventory);
}

export async function POST(req: Request) {
    const { name, stock, unit, unitPrice } = await req.json();

    if (!name || !stock || !unit || !unitPrice) {
        return NextResponse.json({"message": "Missing fields"}, { status: 400 });
    }

    const inventory = await prisma.inventory.create({
        data: {
            name,
            stock,
            unit,
            unitPrice
        }
    });

    if (!inventory) {
        return NextResponse.json({"message": "Inventory not created"}, { status: 500 });
    }

    return NextResponse.json({"message": "Inventory created"});
}