"use client"

import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Table, TableHeader, TableBody, TableCell, TableColumn, TableRow } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Product, ProductSizeList } from "@prisma/client";
import React from "react";
import AddSizeModal from "./addSizeModal";
import { HiDotsVertical } from "react-icons/hi";
import { HiOutlineCamera } from "react-icons/hi2";
import { CldUploadButton, CldUploadWidget } from 'next-cloudinary';

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
    const [image, setImage] = React.useState("");

    const handleSubmit = () => {
        if (product.sizeList?.length == 0 || product.sizeList == undefined) {
            alert("Please add at least one size");
            return;
        }
        if (product.name === "" || product.name == undefined) {
            alert("Please enter product name");
            return;
        }
        if (product.category === "" || product.category == undefined) {
            alert("Please enter product category");
            return;
        }
        fetch("/api/products", {
            method: "POST",
            body: JSON.stringify({ ...product, imageUrl: image } as Product),
        })
            .then((res) => res.json())
            .then((data) => {
                router.push("/products");
            });
    };

    return (
        <div className="bg-white rounded-lg p-4">
            <div>
                <label className="text-violet-800 text-3xl">
                    {"Product details"}
                </label>
                <Divider className="my-4" />

                <div className="grid grid-cols-5 gap-6 mt-5 mb-10">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <label className="border w-50 h-full bg-gray-300 rounded-md flex items-center text-center relative">
                                <CldUploadWidget uploadPreset="zwrrw7i4" options={{
                                    sources: ['local', 'url'],
                                    multiple: false,
                                    maxFiles: 1
                                }}
                                    onSuccess={(result) => {
                                        setImage((result?.info as { secure_url: string })?.secure_url || "");
                                    }}
                                >
                                    {({ open }) => {
                                        if (image !== "") {
                                            return (
                                                <div className="absolute inset-0 h-[360px] rounded-lg">
                                                    <img src={image} className="object-cover w-full h-full rounded-lg" />
                                                </div>
                                            )
                                        }
                                        return (
                                            <div className="absolute inset-0 flex flex-col justify-center items-center" onClick={() => open()}>
                                                <HiOutlineCamera className="text-4xl" />
                                                <p className="text-gray-500">Upload Image</p>
                                            </div>
                                        )
                                    }}
                                </CldUploadWidget>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col col-span-4 gap-2">
                        <Input
                            className="justify-start"
                            label="Name"
                            placeholder="Name"
                            value={product.name}
                            onValueChange={(value) =>
                                setProduct({ ...product, name: value })
                            }
                        />
                        <Dropdown className="">
                            <DropdownTrigger>
                                <Input
                                    label="Category"
                                    placeholder="Category"
                                    value={product.category}
                                    onValueChange={(value) =>
                                        setProduct({
                                            ...product,
                                            category: value,
                                        })
                                    }
                                />
                            </DropdownTrigger>
                            <DropdownMenu className="">
                                {categoryList.map((category) => (
                                    <DropdownItem
                                        key={category}
                                        onClick={() =>
                                            setProduct({ ...product, category })
                                        }
                                    >
                                        {category}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <div>
                            <Divider className="my-4 bg-gray-100" />
                            <label className="text-violet-800 text-3xl">
                                {"Product sizes"}
                                <Button
                                    className="float-right"
                                    onPress={() => setIsOpen(true)}
                                >
                                    Add Variation
                                </Button>
                            </label>
                            <Divider className="my-4" />

                            <AddSizeModal
                                product={product}
                                setProduct={setProduct}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                            />
                            <Table>
                                <TableHeader>
                                    {columns.map((column) => (
                                        <TableColumn key={column.uid}>
                                            {column.name}
                                        </TableColumn>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {product.sizeList?.map((size) => (
                                        <TableRow key={size.size}>
                                            <TableCell>{size.size}</TableCell>
                                            <TableCell>$ {size.price}</TableCell>
                                            <TableCell>
                                                {size.recipe?.map(
                                                    (recipe) =>
                                                        recipe.ingredientName +
                                                        " x " +
                                                        recipe.quantity
                                                ).join(", ")}
                                            </TableCell>
                                            <TableCell className="w-10">
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <Button>
                                                            <HiDotsVertical />
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu>
                                                        <DropdownItem
                                                            onClick={() => {
                                                                setProduct({
                                                                    ...product,
                                                                    sizeList:
                                                                        product.sizeList?.filter(
                                                                            (item) =>
                                                                                item.size !==
                                                                                size.size
                                                                        ),
                                                                });
                                                            }}
                                                        >
                                                            Delete
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <div className="flex justify-end gap-3 mt-5">
                                <Button
                                    className="text-white bg-violet-800"
                                    onPress={handleSubmit}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
