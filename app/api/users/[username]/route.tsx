import { PrismaClient, Employee } from '@prisma/client';
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
    const username = new URL(req.url).pathname.split("/").pop();

    const employee = await prisma.employee.findFirst({
        where: {
            username: username
        },
        cacheStrategy: { ttl: 60 },
    });

    return NextResponse.json(employee);
}

export async function PUT(req: Request) {
    const { id, name, email, position, salary, username, phone, password } = await req.json();

    if (!id || !name || !email || !position || !salary || !username || !phone) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    if (password.legth == 0) {
        const employee = await prisma.employee.update({
            where: {
                id: id
            },
            data: {
                name,
                email,
                position,
                salary,
                username,
                phone
            }
        });
        return NextResponse.json(employee);
    } else {
        const hashedPassword = await hash(password, 10);
        const employee = await prisma.employee.update({
            where: {
                id: id
            },
            data: {
                name,
                email,
                position,
                salary,
                username,
                phone,
                password: hashedPassword
            }
        });
        return NextResponse.json(employee);
    }
}