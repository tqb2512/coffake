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
