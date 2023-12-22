import { LineChart } from "@mui/x-charts";
import { Order } from "@prisma/client";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React from "react";

const columns = [
    { name: "Date", uid: "date" },
    { name: "Total Orders", uid: "totalOrders" },
    { name: "Total Income", uid: "totalPrice" },
];

type OrderByDate = {
    date: string;
    totalOrders: number;
    totalPrice: number;
}

export default function IncomePerDay({ orders }: { orders: Order[] }) {

    const [tableData, setTableData] = React.useState<OrderByDate[]>([]);
    const [data, setData] = React.useState<number[]>([]);
    const [labels, setLabels] = React.useState<string[]>([]);

    React.useEffect(() => {
        const data: number[] = [];
        const labels: string[] = [];
        orders.forEach((order) => {
            const index = labels.indexOf(order.date.toString().split("T")[0]);
            if (index === -1) {
                labels.push(order.date.toString().split("T")[0]);
                data.push(order.totalPrice);
            } else {
                data[index] += order.totalPrice;
            }
        });
        setData(data);
        setLabels(labels);
    }, [orders]);

    React.useEffect(() => {
        const data: OrderByDate[] = [];
        orders.forEach((order) => {
            const index = data.findIndex((item) => item.date === order.date.toString().split("T")[0]);
            if (index === -1) {
                data.push({
                    date: order.date.toString().split("T")[0],
                    totalOrders: 1,
                    totalPrice: order.totalPrice,
                });
            } else {
                data[index].totalOrders++;
                data[index].totalPrice += order.totalPrice;
            }
        });
        data.sort((a, b) => b.totalPrice - a.totalPrice);
        setTableData(data);
    }, [orders]);

    return (
        <div>
            <h2 className="text-xl font-bold">Income Per Day</h2>
            <div className="h-60 w-full mt-5">
                {data.length > 0 && (
                    <LineChart
                        series={[{
                            data: data,
                            label: "Income",
                            type: "line",
                            color: "#6366F1",
                        }]}
                        xAxis={[{
                            scaleType: "band",
                            data: labels,
                        }]}
                    />
                )}
            </div>

            <div className="w-full mt-5">
                <Table
                    aria-label="Table"
                >
                    <TableHeader>
                        {columns.map((column) => (
                            <TableColumn key={column.uid}>
                                {column.name}
                            </TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {tableData.map((item) => (
                            <TableRow key={item.date}>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.totalOrders}</TableCell>
                                <TableCell>{item.totalPrice}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}