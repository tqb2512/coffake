import { PrismaClient, Employee } from '@prisma/client';
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from 'next/server';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req : Request) {
    const username = new URL(req.url).pathname.split("/").pop();
    
    const employee = await prisma.employee.findFirst({
        where: {
            username: username
        },
        cacheStrategy: { ttl: 60 },
    });

    return NextResponse.json(employee);
}