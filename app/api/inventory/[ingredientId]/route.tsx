import { Inventory, PrismaClient, Invoice } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from "next/server";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
    const ingredientId = new URL(req.url).pathname.split("/")[3];

    const inventory = await prisma.inventory.findUnique({
        where: {
            id: ingredientId
        }
    });

    return NextResponse.json(inventory);
}

export async function PUT(req: Request) {
    const ingredientId = new URL(req.url).pathname.split("/")[3];
    const body = await req.json();

    const data = {
        unit: body.unit,
        unitPrice: body.unitPrice,
        stock: body.stock,
        name: body.name,
    }

    const inventory = await prisma.inventory.update({
        where: {
            id: ingredientId
        },
        data: {
            ...data
        }
    });

    return NextResponse.json(inventory);
}