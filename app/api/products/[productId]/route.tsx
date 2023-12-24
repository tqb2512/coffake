import { PrismaClient, Product } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { NextResponse } from "next/server";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: Request) {
  const productId = new URL(req.url).pathname.split("/").pop();

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
    },
    cacheStrategy: { ttl: 60 },
  });
  return NextResponse.json(product);
}

export async function PUT(req: Request) {
  const productId = new URL(req.url).pathname.split("/").pop();

  const data = await req.json();

  const product = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      category: data.category,
      imageUrl: data.imageUrl,
      name: data.name,
      sizeList: data.sizeList,
    }
  });
  return NextResponse.json(product);
}
