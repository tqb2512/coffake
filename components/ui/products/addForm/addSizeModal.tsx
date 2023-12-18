'use client'

import React from "react";
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Tab } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Product, ProductSizeList, ProductSizeListRecipe, Inventory } from "@prisma/client";
import AddIngredientModal from "./addIngredientModal";

const columns = [
    { name: "Name", uid: "size" },
    { name: "Quantiy", uid: "quantity"},
    { name: "Unit", uid: "unit" },
    { name: "Unit Price", uid: "unitPrice" },
    { name: "Actions", uid: "actions" },
];

export default function AddSizeModal({ product, setProduct, isOpen, setIsOpen }: { product: Product, setProduct: React.Dispatch<React.SetStateAction<Product>>, isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const router = useRouter();
    const [isOpenIngredient, setIsOpenIngredient] = React.useState(false);
    const [productSize, setProductSize] = React.useState({} as ProductSizeList);
    const [productSizeRecipe, setProductSizeRecipe] = React.useState([] as ProductSizeListRecipe[]);

    const handleSubmit = () => {
        setProduct({ ...product, sizeList: [...product.sizeList ?? [], productSize] });
        setProductSize({
            size: "",
            price: 0,
            recipe: []
        } as ProductSizeList);
        setIsOpen(false);
    };

    return (
        <div>
            <AddIngredientModal productSizeList={productSize} setProductSizeList={setProductSize} isOpen={isOpenIngredient} setIsOpen={setIsOpenIngredient} />
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" style={{ display: isOpen && !isOpenIngredient ? 'block' : 'none' }}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">

                        <label className="text-violet-800 text-xl">
                            {"Size details"}
                            <Button className="float-right" onPress={() => setIsOpen(false)}>Close</Button>
                        </label>
                        <Divider className="my-4" />
                        <div className="grid grid-cols-2 gap-6 mt-5 mb-10">
                            <Input label="Size Name" value={productSize.size} onValueChange={(value) => setProductSize({ ...productSize, size: value })} />
                            <Input label="Price" value={productSize.price?.toString()} onValueChange={(value) => setProductSize({ ...productSize, price: Number(value) })} />
                        </div>

                        <label className="text-violet-800 text-xl">
                            {"Recipe"}
                            <Button className="float-right" onPress={() => { setIsOpenIngredient(!isOpenIngredient) }}>Add</Button>
                        </label>
                        <Divider className="my-4" />

                        <AddIngredientModal productSizeList={productSize} setProductSizeList={setProductSize} isOpen={isOpenIngredient} setIsOpen={setIsOpenIngredient} />
                        
                        <Table>
                            <TableHeader>
                                {columns.map((column) => (
                                    <TableColumn key={column.uid} align="center">
                                        {column.name}
                                    </TableColumn>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {productSize.recipe?.map((recipe) => (
                                    <TableRow key={recipe.ingredientId}>
                                        <TableCell>{recipe.ingredientName}</TableCell>
                                        <TableCell>{recipe.quantity}</TableCell>
                                        <TableCell>{recipe.ingredientUnit}</TableCell>
                                        <TableCell>{recipe.ingredientUnitPrice}</TableCell>
                                        <TableCell className="w-10">
                                            <Button className="text-white bg-violet-800" onPress={() => { setProductSize({ ...productSize, recipe: productSize.recipe?.filter((item) => item.ingredientId !== recipe.ingredientId) }) }}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="mt-5 sm:mt-6">
                            <Button className="text-white bg-violet-800 float-right" onPress={handleSubmit}>Add</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
