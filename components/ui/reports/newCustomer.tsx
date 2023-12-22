import { Order, Customer } from "@prisma/client";
import React from "react";

export default function NewCustomer({ orders, customers }: { orders: Order, customers: Customer }) {


    const [newCustomers, setNewCustomers] = React.useState<Customer[]>([]);




}