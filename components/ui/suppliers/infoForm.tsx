"use client";

import {
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input
} from "@nextui-org/react";
import { Supplier, Invoice } from "@prisma/client";
import React from "react";
import { useRouter } from "next/navigation";

const columns = [
  { name: "Date", key: "date" },
  { name: "Ingredients", key: "ingredients" },
  { name: "Action", key: "action"}
];

export default function SupplierInfoForm({ params }: { params: { supplierId: string } }) {

  const router = useRouter();
  const [supplier, setSupplier] = React.useState({} as Supplier);
  const [isEditing, setIsEditing] = React.useState(false);
  const [invoices, setInvoices] = React.useState([] as Invoice[]);

  React.useEffect(() => {
    fetch(`/api/suppliers/${params.supplierId}`)
      .then((res) => res.json())
      .then((data) => setSupplier(data));
  }, []);
  
  React.useEffect(() => {
    fetch(`/api/invoices/bySupplierID?supplierId=${supplier.id}`)
      .then((res) => res.json())
      .then((data) => setInvoices(data));
  }, [supplier]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      if (supplier.name === "" || supplier.name == undefined) {
        alert("Please enter supplier name");
        return;
      }
      if (supplier.company === "" || supplier.company == undefined) {
        alert("Please enter supplier company");
        return;
      }
      if (supplier.phone === "" || supplier.phone == undefined) {
        alert("Please enter supplier phone number");
        return;
      }
      if (supplier.email === "" || supplier.email == undefined) {
        alert("Please enter supplier email");
        return;
      }
      fetch("/api/suppliers/" + params.supplierId, {
        method: "PUT",
        body: JSON.stringify(supplier),
      })
    }
  }

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="">
        <label className="text-violet-800 text-3xl">
          {"Supplier's Details"}
          <Button onClick={handleEditClick} className="float-right">
            {isEditing ? "Apply" : "Edit"}
          </Button>
        </label>
        <Divider className="my-4" />

        <div className="grid grid-cols-1 gap-6 mt-5 mb-10">
          <Input label="Name" value={supplier.name} onValueChange={(value) => setSupplier({ ...supplier, name: value })} disabled={!isEditing} />
          <Input label="Company" value={supplier.company} onValueChange={(value) => setSupplier({ ...supplier, company: value })} disabled={!isEditing} />
          <Input label="Email" value={supplier.email} onValueChange={(value) => setSupplier({ ...supplier, email: value })} disabled={!isEditing} />
          <Input label="Phone Number" value={supplier.phone} onValueChange={(value) => setSupplier({ ...supplier, phone: value })} disabled={!isEditing} />
        </div>

        <label className="text-violet-800 text-3xl">
          {"Suppiler's Invoices"}
        </label>
        <Divider className="my-4" />
        {!invoices.length ? <label className="text-black">
          {"No invoice found"}
        </label> :
          <Table aria-label="Invoices">
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.key}>{column.name}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{formatDate(invoice.date.toString())}</TableCell>
                  <TableCell>{invoice.importList.map((item) => item.ingredientName).join(", ")}</TableCell>
                  <TableCell className="w-10">
                    <Button onClick={() => router.push(`/invoices/${invoice.id}`)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>}
      </div>
    </div>
  );
}
