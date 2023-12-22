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
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PageShell() {

    const router = useRouter();
    const { data: session, status } = useSession()
    const [orders, setOrders] = useState<Order[]>([]);
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [orderForList, setOrderForList] = useState<Order[]>([]);
    const [dateRange, setDateRange] = useState<DateRangePickerValue>({
        from: new Date(),
        to: new Date(new Date().getTime() + 86400000)
    });

    useEffect(() => {
        fetch("/api/orders?status=All")
            .then((res) => res.json())
            .then((data) => setOrders(data))
    }, []);

    useEffect(() => {
        let orderFromTo: Order[] = []
        orders.forEach((order) => {
            const orderDate = new Date(order.date)
            if (orderDate >= (dateRange.from || new Date()) && orderDate <= (dateRange.to || new Date())) {
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

    if (status === "loading") return <p>Loading...</p>;
    if (status === "unauthenticated") {
        router.push("/login")
    }

    return (
        <main>
            <div className="flex justify-between my-3 mx-5">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <DateRangePicker className="h-full w-full" value={dateRange} onValueChange={(value) => {
                    setDateRange({
                        from: value.from || new Date(),
                        to: new Date((value.to || new Date()).getTime() + 86400000)
                    })
                }
                } />
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