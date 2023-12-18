import { PrismaClient, Order } from '@prisma/client';
import { withAccelerate } from "@prisma/extension-accelerate"
import { NextResponse } from 'next/server';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
    const orderId = new URL(req.url).pathname.split("/").pop();

    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        },
        cacheStrategy: { ttl: 60 },
    });

    if (!order) {
        return NextResponse.json({"message": "Order not found"}, { status: 404 });
    }
    return NextResponse.json(order);
}

export async function PUT(req: Request) {
    const orderId = new URL(req.url).pathname.split("/").pop();
    const { customerID, customerName } = await req.json();

    const updatedOrder = await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            customerID,
            customerName,
            status: "Confirmed"
        }
    });

    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        },
        cacheStrategy: { ttl: 60 },
    });

    let productIdWithQuantity = [] as any;

    const product = await prisma.product.findMany();

    order?.items.map((item) => {
        productIdWithQuantity.push({
            productId: item.productID,
            size: item.size,
            quantity: item.quantity
        });
        item.toppings.map((topping) => {
            productIdWithQuantity.push({
                productId: topping.productID,
                size: topping.size,
                quantity: topping.quantity
            });
        });
    });

    let ingredientIdWithQuantity = [] as any;

    productIdWithQuantity.map((item: any) => {
        const productInfo = product.find((product) => product.id === item.productId);
        if (productInfo) {
            productInfo.sizeList.map((size) => {
                if (size.size === item.size) {
                    size.recipe.map((ingredient) => {
                        ingredientIdWithQuantity.push({
                            ingredientId: ingredient.ingredientId,
                            quantity: ingredient.quantity * item.quantity
                        });
                    });
                }
            });
        }
    });

    ingredientIdWithQuantity.map(async (item: any) => {
        await prisma.inventory.update({
            where: {
                id: item.ingredientId
            },
            data: {
                stock: {
                    decrement: item.quantity
                }
            }
        });
    })

    if (!updatedOrder) {
        return NextResponse.json({"message": "Order not updated"}, { status: 500 });
    }

    return NextResponse.json(updatedOrder);
}

export async function PATCH(req: Request) {
    const orderId = new URL(req.url).pathname.split("/").pop();
    const { status } = await req.json();

    const updatedOrder = await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            status
        }
    });

    if (!updatedOrder) {
        return NextResponse.json({"message": "Order not updated"}, { status: 500 });
    }

    return NextResponse.json(updatedOrder);
}