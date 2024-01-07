import { Supplier, PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET() {
    const suppliers = await prisma.supplier.findMany({
    });
    return NextResponse.json(suppliers);
}

export async function POST(req: Request) {
    const { name, email, phone, company } = await req.json();

    if (!name || !email || !phone || !company) {
        return NextResponse.json({ "message": "Missing fields" }, { status: 400 });
    }

    const supplier = await prisma.supplier.create({
        data: {
            name,
            email,
            phone,
            company
        }
    });

    if (!supplier) {
        return NextResponse.json({ "message": "Supplier not created" }, { status: 500 });
    }

    return NextResponse.json({ "message": "Supplier created" });
}