"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableColumn,
  TableRow,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
  Input,
  Pagination,
} from "@nextui-org/react";
import { Customer } from "@prisma/client";
import { HiDotsVertical } from "react-icons/hi";
import Link from "next/link";
import { FaPlus, FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

const columns = [
  { name: "Name", uid: "name", sortable: true },
  { name: "Email", uid: "email" },
  { name: "Phone", uid: "phone" },
  { name: "Actions", uid: "actions" },
];

export default function CustomersTable() {
  const [customers, setCustomers] = React.useState<Customer[]>([]);

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  const [filterValue, setFilterValue] = React.useState("");

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
                <DropdownItem key="name">Name</DropdownItem>
                <DropdownItem key="email">Email</DropdownItem>
                <DropdownItem key="phone">Phone</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button
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
    <Table
      aria-label="Customers Table"
      topContent={topContent}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination isCompact showControls showShadow color="secondary" />
        </div>
      }
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.uid}>{column.name}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>
              <Dropdown>
                <DropdownTrigger>
                  <Button>
                    <HiDotsVertical />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>
                    <Link href={`/customers/${customer.id}`}>View</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
