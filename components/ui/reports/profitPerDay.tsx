import { LineChart } from "@mui/x-charts";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Product, Inventory, Order} from "@prisma/client";

import React from "react";

const columns = [
    { name: "Date", uid: "date" },
    { name: "Income", uid: "income" },
    { name: "Cost", uid: "cost" },
    { name: "Profit", uid: "profit" },
];

type ProfitPerDay = {
    date: string;
    income: number;
    cost: number;
    profit: number;
}

export default function ProfitPerDay({orders}: {orders: Order[]}) {

    const [tableData, setTableData] = React.useState<ProfitPerDay[]>([]);
    const [products, setProducts] = React.useState<Product[]>([]);

    React.useEffect(() => {
        fetch("/api/products?category=All")
            .then((res) => res.json())
            .then((data) => setProducts(data))
    }, []);

    React.useEffect(() => {
        const data: ProfitPerDay[] = [];
        orders.forEach((order) => {
            const index = data.findIndex((item) => item.date === order.date.toString().split("T")[0]);
            const income = order.totalPrice;
            let cost = 0

            order.items.forEach((item) => {
                const product = products.find((product) => product.id === item.productID);
                if (product) {
                    const recipe = product.sizeList.find((recipe) => recipe.size === item.size);
                    if (recipe) {
                        recipe.recipe.forEach((ingredient) => {
                            cost += ingredient.quantity * item.quantity * ingredient.ingredientUnitPrice;
                        });
                    }
                }
                
                item.toppings.forEach((topping) => {
                    const product = products.find((product) => product.id === topping.productID);
                    if (product) {
                        const recipe = product.sizeList.find((recipe) => recipe.size === topping.size);
                        if (recipe) {
                            recipe.recipe.forEach((ingredient) => {
                                cost += ingredient.quantity * topping.quantity * ingredient.ingredientUnitPrice;
                            });
                        }
                    }
                })
            })

            if (index === -1) {
                data.push({
                    date: order.date.toString().split("T")[0],
                    income: income,
                    cost: cost,
                    profit: income - cost
                });
            } else {
                data[index].profit += income - cost;
                data[index].income += income;
                data[index].cost += cost;
            }
        });
        setTableData(data);
           
    }, [orders]);

    return (
        <div>
            <h2 className="text-xl font-bold">Profit per day</h2>
            <div className="h-60 w-full mt-5">
                <LineChart
                    series={[
                        {
                            data: tableData.map((item) => item.income),
                            label: "Income",
                            type: "line",
                            curve: "monotoneX",
                            color: "#6366F1",
                            valueFormatter: (value) => `$ ${value}`,
                        },
                        {
                            data: tableData.map((item) => item.cost),
                            label: "Cost",
                            type: "line",
                            curve: "monotoneX",
                            color: "#F87171",
                            valueFormatter: (value) => `$ ${value}`,
                        },
                        {
                            data: tableData.map((item) => item.profit),
                            label: "Profit",
                            type: "line",
                            curve: "monotoneX",
                            color: "#34D399",
                            valueFormatter: (value) => `$ ${value}`,
                        }
                    ]}
                    xAxis={[{
                        scaleType: "band",
                        data: tableData.map((item) => item.date),
                    }]}
                />
            </div>
            <div className="h-60 w-full mt-5">
                <Table
                    aria-label="Profit Per Day"
                    >
                    <TableHeader>
                        {columns.map((column) => (
                            <TableColumn key={column.uid}>{column.name}</TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.date}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.income}</TableCell>
                                <TableCell>{row.cost}</TableCell>
                                <TableCell>{row.profit}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}