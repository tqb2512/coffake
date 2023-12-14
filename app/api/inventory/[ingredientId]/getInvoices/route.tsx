import { Inventory, PrismaClient, Invoice } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from "next/server";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
    const ingredientId = new URL(req.url).pathname.split("/")[3];

    const invoices = await prisma.invoice.findMany({
        where: {
            importList: {
                some: {
                    ingredientId: ingredientId
                }
            }
        }
    });

    return NextResponse.json(invoices);
}