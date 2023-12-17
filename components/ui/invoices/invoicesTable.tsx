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
  Pagination,
  Input,
} from "@nextui-org/react";
import { Invoice } from "@prisma/client";
import { HiDotsVertical } from "react-icons/hi";
import Link from "next/link";
import { FaPlus, FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

const columns = [
  { name: "Date", uid: "date", sortable: true },
  { name: "Total", uid: "total" },
  { name: "Actions", uid: "actions" },
];

export default function InvoicesTable() {
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);
  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data));
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
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<MdOutlineKeyboardDoubleArrowDown />}>
                    Filter
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem key="date">Date</DropdownItem>
                  <DropdownItem key="total">Total</DropdownItem>
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
  }, []);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex w-full justify-center">
        <Pagination isCompact showControls showShadow color="secondary" />
      </div>
    );
  }, []);

  return (
    <div className="p-8 h-screen">
      <Table
        aria-label="Invoices Table"
        topContent={topContent}
        bottomContent={bottomContent}
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                {new Date(invoice.date).toLocaleString("en-GB")}
              </TableCell>
              <TableCell>{invoice.total}</TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownTrigger>
                    <Button>
                      <HiDotsVertical />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem href={`/invoices/${invoice.id}`}>
                      View
                    </DropdownItem>
                    <DropdownItem href={`/invoices/${invoice.id}`}>
                      Print
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
