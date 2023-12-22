import { Shift, PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from "next/server";

const prisma = new PrismaClient().$extends(withAccelerate());;

export async function GET(req: Request) {
    const query = new URL(req.url).searchParams;
    const from = query.get("from") ?? "";
    const to = query.get("to") ?? "";
    if (from == "undefined" || to == "undefined")
        return NextResponse.json([])
    const shifts = await prisma.shift.findMany({
        where: {
            date: {
                gte: from,
                lte: to,
            }
        },
        cacheStrategy: { ttl: 60 },
    });
    return NextResponse.json(shifts);
}

export async function POST(req: Request) {

    const { date, employees } = await req.json();

    if (!date || !employees) {
        return NextResponse.json({ "message": "Missing fields" }, { status: 400 });
    }

    const shift = await prisma.shift.create({
        data: {
            date,
            employees: employees
        }
    });

    if (!shift) {
        return NextResponse.json({ "message": "Shift not created" }, { status: 500 });
    }

    return NextResponse.json(shift);
}