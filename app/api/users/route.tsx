import { PrismaClient, Employee } from '@prisma/client';
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET() {
    const employees = await prisma.employee.findMany({
        cacheStrategy: { ttl: 60 },
    });
    return NextResponse.json(employees);
}

export async function POST(req: Request) {

    const { name, email, position, salary, username, password, phone, imageUrl } = await req.json();

    if (!name || !email || !position || !salary || !username || !password || !phone ) {
        return NextResponse.json({ "message": "Missing fields" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const employee = await prisma.employee.create({
        data: {
            name,
            email,
            position,
            salary,
            username,
            password: hashedPassword,
            phone,
            imageUrl
        },
    });

    if (!employee) {
        return NextResponse.json({ "message": "Employee not created" }, { status: 500 });
    }

    return NextResponse.json({ "message": "Employee created" });
}

export async function DELETE(req: Request) {
    const { id } = await req.json();
    if (!id) {
        return NextResponse.json({ "message": "Missing fields" }, { status: 400 });
    }

    const employee = await prisma.employee.delete({
        where: {
            id: id
        }
    });

    if (!employee) {
        return NextResponse.json({ "message": "Employee not deleted" }, { status: 500 });
    }

    return NextResponse.json({ "message": "Employee deleted" });
}


export async function UPDATE(req: Request) {
    const { id, name, email, position, salary, username, password, phone } = await req.json();

    if (!id || !name || !email || !position || !salary || !username || !password || !phone) {
        return NextResponse.json({ "message": "Missing fields" }, { status: 400 });
    }

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
            password,
            phone
        }
    });

    if (!employee) {
        return NextResponse.json({ "message": "Employee not updated" }, { status: 500 });
    }

    return NextResponse.json({ "message": "Employee updated" });
}