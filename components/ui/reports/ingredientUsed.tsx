import { Order, Product, Inventory } from "@prisma/client";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import List from "postcss/lib/list";
import React from "react";

const columns = [
    { name: "Name", uid: "name" },
    { name: "Used", uid: "used" },
];

type IngredientUsed = {
    id: string;
    name: string;
    used: number;
}

export default function IngredientUsed({ order, products }: { order: Order[], products: Product[] }) {

    const [tableData, setTableData] = React.useState<IngredientUsed[]>([]);

    React.useEffect(() => {
        const data: IngredientUsed[] = [];
        order.forEach((order) => {
            order.items.forEach((item) => {
                const product = products.find((product) => product.id === item.productID);
                if (product) {
                    const recipe = product.sizeList.find((recipe) => recipe.size === item.size);
                    if (recipe) {
                        recipe.recipe.forEach((ingredient) => {
                            const index = data.findIndex((item) => item.id === ingredient.ingredientId);
                            if (index === -1) {
                                data.push({
                                    id: ingredient.ingredientId,
                                    name: ingredient.ingredientName,
                                    used: ingredient.quantity * item.quantity
                                });
                            } else {
                                data[index].used += ingredient.quantity * item.quantity;
                            }
                        });
                    }
                }
            })
        });
        data.sort((a, b) => b.used - a.used);
        setTableData(data);
    }, [order]);


    return (
        <div>
            <h2 className="text-xl font-bold">Ingredient used</h2>
            <div className="h-72 w-full mt-5">
                <Table
                    className="h-70"
                    isHeaderSticky
                    aria-label="Ingredient Used"
                >
                    <TableHeader>
                        {columns.map((column) => (
                            <TableColumn key={column.uid}>{column.name}</TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.used}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
