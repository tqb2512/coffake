import { PrismaClient, Employee, Shift } from '@prisma/client';
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from 'next/server';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
    const userId = new URL(req.url).searchParams.get("userId") ?? "";

    if (userId == "undefined") {
        return NextResponse.json({ error: "userId is undefined" }, { status: 400 });
    }

    const employee = await prisma.shift.findMany({
        where: {
            employees: {
                some: {
                    employeeID: userId,
                }
            }
        },
        cacheStrategy: { ttl: 60 },
    });

    return NextResponse.json(employee);
}