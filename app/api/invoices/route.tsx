import { PrismaClient, Invoice, Inventory } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { NextResponse } from "next/server";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
    const invoices = await prisma.invoice.findMany({
        cacheStrategy: { ttl: 60 },
    });
    return NextResponse.json(invoices);
}


export async function POST(req: Request) {
    const { date, total, importList } = await req.json();

    if (!date || !total || !importList) {
        return NextResponse.json({"message": "Missing fields"}, { status: 400 });
    }

    const invoice = await prisma.invoice.create({
        data: {
            date,
            total,
            importList: importList
        }
    });

    const updateInventory = importList.map(async (item: any) => {
        const inventory = await prisma.inventory.findFirst({
            where: {
                id: item.ingredientId
            }
        });
        if (!inventory) {
            return NextResponse.json({"message": "Inventory not found"}, { status: 404 });
        }
        await prisma.inventory.update({
            where: {
                id: inventory.id
            },
            data: {
                stock: inventory.stock + item.quantity
            }
        });
    });

    if (!invoice) {
        return NextResponse.json({"message": "Invoice not created"}, { status: 500 });
    }

    return NextResponse.json({"message": "Invoice created"});
}