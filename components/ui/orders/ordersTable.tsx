'use client'

import React, { use, useEffect } from 'react';
import {useRouter} from 'next/navigation';
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button, Input } from '@nextui-org/react';
import { Order } from '@prisma/client';
import { HiDotsVertical } from 'react-icons/hi';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';

const columns = [
    { name: "Date", uid: "date", sortable: true },
    { name: "Customer", uid: "customer"},
    { name: "Total", uid: "total" },
    { name: "Status", uid: "status" },
    { name: "Actions", uid: "actions" }
];

const statuses = [
    "All",
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled"
]


export default function OrdersTable() {

    const router = useRouter();
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [status, setStatus] = React.useState<string>("All");
    const [filterValue, setFilterValue] = React.useState("");

    useEffect(() => {
        fetch("/api/orders?status=" + status)
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, [status]);

    const [page, setPage] = React.useState(1);
    const onClear = React.useCallback(() => {
      setFilterValue("");
      setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
          setFilterValue(value);
          setPage(1);
        } else {
          setFilterValue("");
        }
      }, []);

      const topContent = React.useMemo(() => {
        return (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
              <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Search by name..."
                startContent={<FaSearch />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
              <div className="flex gap-3">
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button endContent={<MdOutlineKeyboardDoubleArrowDown />}>
                      Filter
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {statuses.map((status) => (
                        <DropdownItem key={status} onClick={() => setStatus(status)}>
                            {status}
                        </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Button
                  onClick={() => router.push("/orders/add")}
                  className="text-white bg-violet-800"
                  endContent={<FaPlus />}
                >
                  Add New
                </Button>
              </div>
            </div>
          </div>
        );
      }, [filterValue, onSearchChange, onClear]);

    return (
        <div className='p-8 h-screen'>
            <Table
                topContent={topContent}
                aria-label='Orders Table'
            >
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.uid}>
                            {column.name}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.date.toString()}</TableCell>
                            <TableCell>{order.customerName}</TableCell>
                            <TableCell>{order.totalPrice}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button>
                                            <HiDotsVertical />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            View
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}