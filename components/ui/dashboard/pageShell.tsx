'use client'

import { useEffect, useState } from "react";
import {
    Card,
    Grid,
    Col,
    DateRangePicker,
    DateRangePickerValue
} from "@tremor/react";
import { Order, Shift } from "@prisma/client";
import OrderByStatus from "./ordersByStatus";
import MostSoldProduct from "./mostSoldProduct";
import IncomePerDay from "./incomePerDay";
import MostActiveEmployee from "./mostActiveEmployee";


export default function PageShell() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [orderForList, setOrderForList] = useState<Order[]>([]);
    const [dateRange, setDateRange] = useState<DateRangePickerValue>({
        from: new Date(),
        to: new Date(),
    });

    useEffect(() => {
        fetch("/api/orders?status=All")
            .then((res) => res.json())
            .then((data) => setOrders(data))
    }, []);

    useEffect(() => {
        let orderFromTo: Order[] = []
        orders.forEach((order) => {
            const orderDate = new Date(order.date);
            if (orderDate >= (dateRange.from as Date) && orderDate <= (dateRange.to as Date)) {
                orderFromTo.push(order);
            }
        });
        setOrderForList(orderFromTo);
    }, [dateRange]);

    useEffect(() => {
        fetch("/api/shifts?from=" + dateRange.from?.toISOString() + "&to=" + dateRange.to?.toISOString())
            .then((res) => res.json())
            .then((data) => setShifts(data))
    }, [dateRange]);

    return (
        <main>
            <div className="flex justify-between my-3 mx-5">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <DateRangePicker className="h-full w-full" value={dateRange} onValueChange={setDateRange} />
            </div>

            <Grid numItemsLg={11} className="gap-6 mt-6">
                <Col numColSpanLg={4}>
                    <Card className="h-full">
                        <IncomePerDay orders={orderForList} />
                    </Card>
                </Col>

                <Col numColSpanLg={4}>
                    <Card className="h-full">
                        <MostActiveEmployee shifts={shifts} />
                    </Card>
                </Col>

                <Col numColSpanLg={3}>
                    <div className="space-y-6">
                        <Card>
                            <OrderByStatus orders={orderForList} />
                        </Card>
                        <Card>
                            <MostSoldProduct orders={orderForList} />
                        </Card>
                    </div>
                </Col>
            </Grid>
        </main>
    )
}