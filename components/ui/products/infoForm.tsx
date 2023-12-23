'use client'

import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button, Input, Textarea, Divider } from '@nextui-org/react';
import { Product } from '@prisma/client';
import { HiDotsVertical } from 'react-icons/hi';
import React, { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { SlPicture } from 'react-icons/sl';
import AddSizeModal from './addForm/addSizeModal';
import { HiOutlineCamera } from 'react-icons/hi2';
import { CldUploadWidget } from 'next-cloudinary';

const columns = [
    { name: "Size", uid: "size" },
    { name: "Price", uid: "price" },
    { name: "Recipe", uid: "recipe" },
    { name: "Actions", uid: "actions" },
];

const categoryList = [
    "Drink",
    "Food",
    "Topping"
];

export default function ProductInfoForm(params: { productId: string }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = React.useState(false);
    const [product, setProduct] = React.useState<Product>({} as Product);
    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(() => {
        fetch(`/api/products/${params.productId}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, []);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
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
            fetch(`/api/products/${params.productId}`, {
                method: "PUT",
                body: JSON.stringify(product),
            });
        }
    }

    const upLoadImage = () => { }

    return (
        <div className="bg-white p-4 rounded-lg">
            <div>
                <label className="text-violet-800 text-3xl">
                    {"Product details"}
                    <Button onClick={handleEditClick} className="float-right">
                        {isEditing ? "Apply" : "Edit"}
                    </Button>
                </label>
                <Divider className="my-4" />

                <div className="grid grid-cols-5 gap-6 mt-5 mb-10">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <label className="border w-50 h-54 bg-gray-300 rounded-md flex items-center text-center relative">
                                <CldUploadWidget uploadPreset="zwrrw7i4" options={{
                                    sources: ['local', 'url'],
                                    multiple: false,
                                    maxFiles: 1
                                }}
                                    onSuccess={(result) => {
                                        setProduct({ ...product, imageUrl: (result.info as { secure_url: string }).secure_url });
                                    }}
                                >
                                    {({ open }) => {
                                        if (product.imageUrl !== "") {
                                            return (
                                                <div className="absolute inset-0 h-[360px] rounded-lg" onClick={() => open()}>
                                                    <img src={product.imageUrl} className="object-cover w-full h-full rounded-lg" />
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
                            label="Name"
                            placeholder="Name"
                            value={product.name}
                            onValueChange={(value) =>
                                setProduct({ ...product, name: value })
                            }
                            isDisabled={!isEditing}
                        />
                        <Dropdown isDisabled={!isEditing}>
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
                                    isDisabled={!isEditing}
                                />
                            </DropdownTrigger>
                            <DropdownMenu>
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
                                    isDisabled={!isEditing}
                                    className="float-right"
                                    onPress={() => setIsOpen(true)}
                                >
                                    Add
                                </Button>
                            </label>

                            <AddSizeModal
                                product={product}
                                setProduct={setProduct}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                            />

                            <Divider className="my-4" />
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
                                                        <Button isDisabled={!isEditing}>
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
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}