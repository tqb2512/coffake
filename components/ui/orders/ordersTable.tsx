'use client'

import React, { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button, Input, Select, SelectItem } from '@nextui-org/react';
import { Order } from '@prisma/client';
import { HiDotsVertical } from 'react-icons/hi';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';

const columns = [
  { name: "Date", uid: "date", sortable: true },
  { name: "Customer", uid: "customer" },
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

const searchColumns = [
  { name: "Date", uid: "date" },
  { name: "Customer", uid: "customerName" },
  { name: "Total", uid: "totalPrice" },
];


export default function OrdersTable() {

  const router = useRouter();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [status, setStatus] = React.useState<string>("All");
  const [sort, setSort] = React.useState<string>("DESC")
  const [searchValue, setSearchValue] = React.useState("");
  const [searchColumn, setSearchColumn] = React.useState(columns[0].uid);

  useEffect(() => {
    fetch("/api/orders?status=" + status)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [status]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
  }

  const sortOrdersDate = () => {
    if (sort === "ASC") {
      setSort("DESC")
      orders.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } else {
      setSort("ASC")
      orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
  }

  return (
    <div className='bg-white p-4 rounded-lg'>
      <div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Input
              className="w-64"
              startContent={<FaSearch />}
              endContent={
                <Dropdown>
                  <DropdownTrigger>
                    <Button className='mt-0.5'>
                      {searchColumns.find((column) => column.uid === searchColumn)?.name}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {searchColumns.map((column) => (
                      <DropdownItem
                        key={column.uid}
                        onClick={() => setSearchColumn(column.uid)}
                      >
                        {column.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              }
              placeholder="Search by"
              value={searchValue}
              onValueChange={(value) => setSearchValue(value)}
            />
          </div>

          <div className="flex gap-2 items-center">
            <Select className="w-32" value={status} onChange={(e) => setStatus(e.target.value)}>
              {statuses.map((status) => (
                <SelectItem
                  key={status}
                  value={status}
                  onClick={() => setStatus(status)}
                >
                  {status}
                </SelectItem>
              ))}
            </Select>

            <Button
              className="text-white bg-violet-800 h-full"
              onClick={() => router.push("/orders/add")}
            >
              Add
            </Button>
          </div>
        </div>

        <Table
          className="mt-5"
          aria-label='Orders Table'
        >
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.uid}>
                {column.sortable ? (
                  <div className="flex flex-row items-center gap-1 justify-between">
                    <span>{column.name}</span>
                    <Button
                      variant='light'
                      onClick={() => sortOrdersDate()}
                    >
                      {sort === "ASC" ? <HiChevronUp /> : <HiChevronDown />}
                    </Button>
                  </div>
                ) : (
                  <span>{column.name}</span>
                )}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {orders
              .filter((item) => {
                if (searchColumn in item) {
                  const searchValueLower = searchValue.toLowerCase();
                  return String(item[searchColumn as keyof typeof item]).toLowerCase().includes(searchValueLower);
                }
                return false;
              })
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{formatDate(item.date.toString())}</TableCell>
                  <TableCell>{item.customerName}</TableCell>
                  <TableCell>$ {item.totalPrice}</TableCell>
                  <TableCell>
                    <span className={
                      "px-2 py-1 rounded-full text-white " +
                      (item.status === "Pending" ? "bg-yellow-500" :
                        item.status === "Confirmed" ? "bg-green-500" :
                          item.status === "Completed" ? "bg-blue-500" :
                            "bg-red-500")
                    }>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="w-10">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button>
                          <HiDotsVertical />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() =>
                            router.push("/orders/" + item.id)
                          }
                        >View</DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            fetch("/api/orders/" + item.id, {
                              method: "DELETE",
                            }).then(() => {
                              setOrders(orders.filter((order) => order.id !== item.id));
                            });
                          }
                          }
                        >Delete</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}