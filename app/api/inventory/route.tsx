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