import { Order } from "@prisma/client";
import { List, ListItem } from "@tremor/react";

const statuses = [
    "All",
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled"
]

const colors = [
    "bg-gray-200",
    "bg-yellow-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-red-200"
]

export default function OrderByStatus({ orders }: { orders: Order[]}) {

    return (
        <div>
            <h2 className="text-xl font-bold">Order Statuses</h2>
            <div className="w-full mt-5">
            <List>
                {statuses.map((status) => (
                    <ListItem key={status} className="flex justify-between">
                        <span>{status}</span>
                        <span className={colors[statuses.indexOf(status)] + " px-2 rounded-full"}>
                            {orders.filter((order) => order.status === status).length}
                        </span>
                    </ListItem>
                ))}
            </List>
            </div>
        </div>
    )
}