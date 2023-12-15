"use client";

import React, { useEffect, useState } from "react";
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
  Divider,
} from "@nextui-org/react";
import { Invoice } from "@prisma/client";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { FaPlus, FaSearch } from "react-icons/fa";

const columns = [
  { name: "Name", key: "name" },
  { name: "Quantity", key: "quantity" },
  { name: "Unit Price", key: "unitPrice" },
  { name: "Supplier", key: "supplier" },
  { name: "Total", key: "total" },
];

export default function InvoiceInfoForm({
  params,
}: {
  params: { invoiceId: string };
}) {
  const [invoice, setInvoice] = useState<Invoice>();

  useEffect(() => {
    fetch(`/api/invoices/${params.invoiceId}`)
      .then((res) => res.json())
      .then((data) => setInvoice(data));
  }, []);

  if (!invoice) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <label className="font-light text-violet-800 text-3xl">
        Invoice Details
      </label>
      <Divider className="my-4" />
      <h1 className="font-semibold my-4">
        Date: {new Date(invoice.date).toLocaleString("en-GB")}
      </h1>
      <Table>
        <TableHeader>
          {columns.map((column) => (
            <TableColumn className="font-bold" key={column.key}>
              {column.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {invoice.importList.map((item) => (
            <TableRow key={item.ingredientId + item.suppilerId}>
              <TableCell>{item.ingredientName}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unitPrice}</TableCell>
              <TableCell>{item.supplierName}</TableCell>
              <TableCell>{item.quantity * item.unitPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
