"use client"

import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Table, TableHeader, TableBody, TableCell, TableColumn, TableRow } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Product, ProductSizeList } from "@prisma/client";
import React from "react";
import AddSizeModal from "./addSizeModal";
import { HiDotsVertical } from "react-icons/hi";

const categoryList = [
    "Drink",
    "Food",
    "Topping"
];

const columns = [
    { name: "Size", uid: "size" },
    { name: "Price", uid: "price" },
    { name: "Recipe", uid: "recipe" },
    { name: "Actions", uid: "actions" },
];

export default function ProductAddForm() {
    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState(false);
    const [product, setProduct] = React.useState({} as Product);

    const handleSubmit = () => {
        fetch("/api/products", {
            method: "POST",
            body: JSON.stringify(product),
        })
            .then((res) => res.json())
            .then((data) => {
                router.push("/products");
            });
    };

    return (
        <div>
            <label className="text-violet-800 text-3xl">
                {"Product details"}
            </label>
            <Divider className="my-4" />

            <div className="grid grid-cols-2 gap-6 mt-5 mb-10">
                <div className="flex flex-col gap-2">
                </div>

                <div className="flex flex-col gap-2">
                    <Input label="Name" placeholder="Name" value={product.name} onValueChange={(value) => setProduct({ ...product, name: value })} />
                    <Dropdown>
                        <DropdownTrigger>
                            <Input label="Category" placeholder="Category" value={product.category} onValueChange={(value) => setProduct({ ...product, category: value })} />
                        </DropdownTrigger>
                        <DropdownMenu>
                            {categoryList.map((category) => (
                                <DropdownItem key={category} onClick={() => setProduct({ ...product, category })}>
                                    {category}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>

            <label className="text-violet-800 text-3xl">
                {"Product sizes"}
                <Button className="float-right" onPress={() => setIsOpen(true)}>Add</Button>
            </label>
            <Divider className="my-4" />

            <AddSizeModal product={product} setProduct={setProduct} isOpen={isOpen} setIsOpen={setIsOpen} />
            <Table>
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.uid}>{column.name}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {product.sizeList?.map((size) => (
                        <TableRow key={size.size}>
                            <TableCell>{size.size}</TableCell>
                            <TableCell>{size.price}</TableCell>
                            <TableCell>{size.recipe?.map((recipe) => recipe.ingredientName + " x " + recipe.quantity)}</TableCell>
                            <TableCell className="w-10">
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button>
                                            <HiDotsVertical />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => {
                                            setProduct({ ...product, sizeList: product.sizeList?.filter((item) => item.size !== size.size) });
                                        }}>Delete</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-end gap-3 mt-5">
                <Button className="text-white bg-violet-800" onPress={handleSubmit}>Add</Button>
            </div>
        </div>
    );
}
