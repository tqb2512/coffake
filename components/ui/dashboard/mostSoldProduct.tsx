import { Order, OrderItems } from "@prisma/client";
import { BarChart } from "@mui/x-charts";
import React from "react";

export default function MostSoldProduct({ orders }: { orders: Order[] }) {

    const [products, setProducts] = React.useState<OrderItems[]>([]);
    const [uData, setUData] = React.useState<number[]>([]);
    const [xLabels, setXLabels] = React.useState<string[]>([]);

    React.useEffect(() => {
        let allProducts: OrderItems[] = [];
        orders.forEach((order) => {
            allProducts = allProducts.concat(order.items);
        });
        setProducts(allProducts);
    }, [orders]);

    React.useEffect(() => {
        const data: number[] = [];
        const labels: string[] = [];
        products.forEach((product) => {
            const index = labels.indexOf(product.productName);
            if (index === -1) {
                labels.push(product.productName);
                data.push(product.quantity);
            } else {
                data[index] += product.quantity;
            }
        });
        setUData(data);
        setXLabels(labels);
    }, [products]);

    return (
        <div>
            <h2 className="text-xl font-bold">Most Sold Product</h2>
            <div className="h-60 w-full mt-5">
                {uData.length > 0 && (
                    <BarChart
                        series={[{
                            data: uData,
                            label: "Quantity",
                            type: "bar",
                            color: "#6366F1",
                        }]}
                        xAxis={[{
                            scaleType: "band",
                            data: xLabels,
                        }]}
                    />
                )}
            </div>
        </div>
    )
}