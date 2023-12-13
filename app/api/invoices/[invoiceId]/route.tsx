import { PrismaClient, Invoice } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { NextResponse } from "next/server";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
    const invoiceId = new URL(req.url).pathname.split("/").pop();

    const invoice = await prisma.invoice.findFirst({
        where: {
            id: invoiceId,
        },
        cacheStrategy: { ttl: 60 },
    });

    return NextResponse.json(invoice);
}