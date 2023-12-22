'use client'

import React from "react";
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Tab } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Inventory, ProductSizeListRecipe, ProductSizeList } from "@prisma/client";

const columns = [
    { name: "Name", uid: "name" },
    { name: "Unit", uid: "unit" },
    { name: "Unit Price", uid: "unitPrice" },
    { name: "Actions", uid: "actions" },
];

export default function AddIngredientModal({ productSizeList, setProductSizeList, isOpen, setIsOpen }: { productSizeList: ProductSizeList, setProductSizeList: React.Dispatch<React.SetStateAction<ProductSizeList>>, isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const router = useRouter();
    const [inventory, setInventory] = React.useState([] as Inventory[]);
    const [quantity, setQuantity] = React.useState(0);
    const [selectedIngredient, setSelectedIngredient] = React.useState<Inventory>({} as Inventory);

    React.useEffect(() => {
        fetch("/api/inventory")
            .then((res) => res.json())
            .then((data) => setInventory(data));
    }, []);

    const handleSubmit = () => {
        if (quantity === 0 || quantity == undefined) {
            alert("Please enter quantity");
            return;
        }
        setProductSizeList({
            ...productSizeList,
            recipe: [...productSizeList.recipe ?? [], {
                ingredientId: selectedIngredient?.id,
                ingredientName: selectedIngredient?.name,
                ingredientUnit: selectedIngredient?.unit,
                ingredientUnitPrice: selectedIngredient?.unitPrice,
                quantity: quantity
            }]
        });
        setQuantity(0);
        setSelectedIngredient({} as Inventory);
        setIsOpen(false);
    };

    const handleSelect = (item: Inventory) => {
        setSelectedIngredient(item);
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">

                    <label className="text-violet-800 text-xl">
                        {"Ingredient details"}
                        <Button className="float-right" onPress={() => setIsOpen(false)}>Close</Button>
                    </label>
                    <Divider className="my-4" />

                    <Table>
                        <TableHeader>
                            {columns.map((column) => (
                                <TableColumn key={column.uid} align="center">
                                    {column.name}
                                </TableColumn>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {inventory.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell align="center">{item.name}</TableCell>
                                    <TableCell align="center">{item.unit}</TableCell>
                                    <TableCell align="center">$ {item.unitPrice}</TableCell>
                                    <TableCell className="w-10" align="center">
                                        <Button {...(selectedIngredient?.id === item.id ? { className: "text-white bg-violet-800" } : {})}
                                            onClick={() => handleSelect(item)}>Select</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Input className="my-5" label="Quantity" value={quantity.toString()} onValueChange={(value) => setQuantity(Number(value))} type="number" />

                    <Button className="float-right" onPress={handleSubmit}>Add</Button>
                </div>
            </div>
        </div>
    );
}