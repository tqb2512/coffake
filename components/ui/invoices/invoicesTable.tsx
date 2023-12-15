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
} from "@nextui-org/react";
import { Invoice } from "@prisma/client";
import { HiDotsVertical } from "react-icons/hi";
import Link from "next/link";

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
  return (
    <Table
      aria-label="Invoices Table"
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
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.date.toString()}</TableCell>
            <TableCell>{invoice.total}</TableCell>
            <TableCell>
              <Dropdown>
                <DropdownTrigger>
                  <Button>
                    <HiDotsVertical />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>
                    <Link href={`/invoices/${invoice.id}`}>Edit</Link>
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
