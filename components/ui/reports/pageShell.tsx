'use client'

import { useEffect, useState } from "react";
import {
    Card,
    Grid,
    Col,
    DateRangePicker,
    DateRangePickerValue
} from "@tremor/react";
import { Order, Shift, Customer, Employee, Product } from "@prisma/client";
import IngredientUsed from "./ingredientUsed";
import ProfitPerDay from "./profitPerDay";
import EmployeeSalary from "./emloyeeSalary";
import MostSoldProduct from "./mostSoldProduct";


export default function PageShell() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [orderForList, setOrderForList] = useState<Order[]>([]);
    const [dateRange, setDateRange] = useState<DateRangePickerValue>({
        from: new Date(),
        to: new Date(),
    });

    useEffect(() => {
        fetch("/api/orders?status=All")
            .then((res) => res.json())
            .then((data) => setOrders(data))
        fetch("/api/customers")
            .then((res) => res.json())
            .then((data) => setCustomers(data))
        fetch("/api/users")
            .then((res) => res.json())
            .then((data) => setEmployees(data))
        fetch("/api/products?category=All")
            .then((res) => res.json())
            .then((data) => setProducts(data))
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
                <h1 className="text-2xl font-bold">Reports</h1>
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
                    <Card className="h-max">
                        <IngredientUsed order={orderForList} products={products} />
                        <EmployeeSalary shifts={shifts} employees={employees} />
                    </Card>
                </Col>

                <Col numColSpanLg={4}>
                    <Card className="h-max">
                        <ProfitPerDay orders={orderForList} />
                    </Card>
                </Col>

                <Col numColSpanLg={3}>
                    <div className="space-y-6">
                        <Card>
                            <MostSoldProduct orders={orderForList} />
                        </Card>
                    </div>
                </Col>
            </Grid>
        </main>
    )
}