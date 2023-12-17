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
} from "@nextui-org/react";
import { Supplier } from "@prisma/client";
import React from "react";
import { FaPlus } from "react-icons/fa";

const columns = [
  { name: "Name", key: "name" },
  { name: "Company", key: "company" },
  { name: "Email", key: "email" },
  { name: "Phone Number", key: "phone" },
];

export default function SupplierInfoForm({
  params,
}: {
  params: { supplierId: string };
}) {
  const [supplier, setSupplier] = React.useState({} as Supplier);

  React.useEffect(() => {
    fetch(`/api/suppliers/${params.supplierId}`)
      .then((res) => res.json())
      .then((data) => setSupplier(data));
  }, [params.supplierId]);

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

  return (
    <div>
      <label className="font-light text-violet-800 text-3xl">
        Supplier's Details
      </label>
      <Divider className="my-4" />
      <Table topContent={topContent}>
        <TableHeader>
          {columns.map((column) => (
            <TableColumn className="font-bold" key={column.key}>
              {column.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{supplier.name}</TableCell>
            <TableCell>{supplier.company}</TableCell>
            <TableCell>{supplier.email}</TableCell>
            <TableCell>{supplier.phone}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    // <div>
    //     <h1>{supplier.name}</h1>
    //     <p>{supplier.email}</p>
    //     <p>{supplier.phone}</p>
    // </div>
  );
}
