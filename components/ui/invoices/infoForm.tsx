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
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const columns = [
  { name: "Name", key: "name" },
  { name: "Quantity", key: "quantity" },
  { name: "Unit Price", key: "unitPrice" },
  { name: "Supplier", key: "supplier" },
  { name: "Total", key: "total" },
];

export default function InvoiceInfoForm({ params }: { params: { invoiceId: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession()
  const [invoice, setInvoice] = useState<Invoice>();

  useEffect(() => {
    fetch(`/api/invoices/${params.invoiceId}`)
      .then((res) => res.json())
      .then((data) => setInvoice(data));
  }, [params.invoiceId]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
  }

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") {
    router.push("/login")
  }

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg">
      <div>
        <label className="text-violet-800 text-3xl">
          {"Invoice's Details"}
        </label>
        <Divider className="my-4" />

        <div className="flex flex-col gap-4 mt-5 mb-10">
          <Input label="Date" value={formatDate(invoice.date?.toString())} disabled />
          <Input label="Total" value={invoice.total.toString()} disabled endContent="$" />
        </div>

        <label className="text-violet-800 text-3xl">
          {"Import List"}
        </label>
        <Divider className="my-4" />
        {!invoice.importList.length ? <label className="text-black">
          {"No import found"}
        </label> :
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
                  <TableCell>$ {item.unitPrice}</TableCell>
                  <TableCell>{item.supplierName}</TableCell>
                  <TableCell>$ {item.quantity * item.unitPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </div>
    </div>
  );
}
