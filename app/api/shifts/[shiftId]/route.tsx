import { Shift, PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from "next/server";

const prisma = new PrismaClient().$extends(withAccelerate());;

export async function GET(req: Request) {
    const shiftId = new URL(req.url).pathname.split("/").pop();
    const shift = await prisma.shift.findUnique({
        where: {
            id: shiftId
        },
        cacheStrategy: { ttl: 60 },
    });
    return NextResponse.json(shift);
}