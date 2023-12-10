import { PrismaClient, Invoice } from "@prisma/client";
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

    if (!invoice) {
        return NextResponse.json({"message": "Invoice not created"}, { status: 500 });
    }

    return NextResponse.json({"message": "Invoice created"});
}