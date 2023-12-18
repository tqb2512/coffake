'use client'

import React, { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button, Input, Select, SelectItem } from '@nextui-org/react';
import { Order } from '@prisma/client';
import { HiDotsVertical } from 'react-icons/hi';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';

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
  { name: "Customer", uid: "customer" },
  { name: "Total", uid: "total" },
];


export default function OrdersTable() {

  const router = useRouter();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [status, setStatus] = React.useState<string>("All");
  const [searchValue, setSearchValue] = React.useState("");
  const [searchColumn, setSearchColumn] = React.useState(columns[0].uid);

  useEffect(() => {
    fetch("/api/orders?status=" + status)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [status]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Input
            className="w-64"
            startContent={<FaSearch />}
            endContent={
              <Dropdown>
                <DropdownTrigger>
                  <Button>
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

      <Table className="mt-5">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.uid}>
              {column.name}
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
                <TableCell>{item.date.toString()}</TableCell>
                <TableCell>{item.customerName}</TableCell>
                <TableCell>{item.totalPrice}</TableCell>
                <TableCell>{item.status}</TableCell>
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