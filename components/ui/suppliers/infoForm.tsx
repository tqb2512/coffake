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

const columns = [
  { name: "Date", key: "date" },
  { name: "Ingredients", key: "ingredients" },
  { name: "Action", key: "action"}
];

export default function SupplierInfoForm({ params }: { params: { supplierId: string } }) {
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

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-3">
          <div className="flex gap-3">
            <Button className="text-white bg-violet-800">Edit</Button>
          </div>
        </div>
      </div>
    );
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    
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
          <Input label="Name" value={supplier.name} />
          <Input label="Company" value={supplier.company} />
          <Input label="Email" value={supplier.email} />
          <Input label="Phone Number" value={supplier.phone} />
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
                  <TableCell>{invoice.date.toString()}</TableCell>
                  <TableCell>{invoice.importList?.find((importList) => importList.suppilerId == supplier.id)?.ingredientName}</TableCell>
                  <TableCell>
                    <Button>
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
