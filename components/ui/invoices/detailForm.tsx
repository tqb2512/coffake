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
  Divider,
  Input,
} from "@nextui-org/react";
import { Invoice } from "@prisma/client";

const columns = [
  { name: "No.", uid: "number" },
  { name: "Item Description", uid: "item_des" },
  { name: "Price", uid: "price" },
  { name: "Quantity", uid: "quantity" },
  { name: "Total", uid: "total" },
];

export default function DetailForm() {
  return (
    <div className="w-6/12">
      <h1 className="text-4xl font-bold">Coffake</h1>
      <Divider className="my-4" />
      <div className="flex flex-col">
        <h1 className="mb-8 m-auto text-4xl font-bold">INVOICE</h1>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <div className="flex flex-row">
              <label htmlFor="name" className="text-black font-bold">
                {"Name: "}
              </label>
              <p id="name" className="mx-1">
                Vo Thien Phuc
              </p>
            </div>
            <div className="flex flex-row">
              <label htmlFor="phone" className="text-black font-bold">
                {"Phone number: "}
              </label>
              <p id="phone" className="mx-1">
                084 345 5555
              </p>
            </div>
            <div className="flex flex-row">
              <label htmlFor="email" className="text-black font-bold">
                {"Email: "}
              </label>
              <p id="email" className="mx-1">
                21522480@gm.uit.edu.vn
              </p>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-row">
              <label htmlFor="date" className="text-black font-bold">
                {"Date: "}
              </label>
              <p id="date" className="mx-1">
                13/12/2023
              </p>
            </div>
            <div className="flex flex-row">
              <label htmlFor="order" className="text-black font-bold">
                {"Order: "}
              </label>
              <p id="order" className="mx-1">
                2349
              </p>
            </div>
          </div>
        </div>
        <Table className="mt-6" aria-label="Example static collection table">
          <TableHeader>
            {columns.map((column) => (
              <TableColumn className="font-bold" key={column.uid}>
                {column.name}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>1</TableCell>
              <TableCell>Espresso</TableCell>
              <TableCell>$3.00</TableCell>
              <TableCell>1</TableCell>
              <TableCell>$3.00</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>1</TableCell>
              <TableCell>Latte</TableCell>
              <TableCell>$4.50</TableCell>
              <TableCell>1</TableCell>
              <TableCell>$4.50</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>3</TableCell>
              <TableCell>Americano</TableCell>
              <TableCell>$2.00</TableCell>
              <TableCell>2</TableCell>
              <TableCell>$4.00</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>4</TableCell>
              <TableCell>Dark Mocha</TableCell>
              <TableCell>$4.00</TableCell>
              <TableCell>1</TableCell>
              <TableCell>$4.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Divider className="my-8" />
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <div className="flex flex-row">
              <label htmlFor="cashier" className="text-black font-bold">
                {"Cashier: "}
              </label>
              <p id="cashier" className="mx-1">
                Vo Thien Phuc
              </p>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-row">
              <label htmlFor="date" className="text-black font-bold">
                {"Date: "}
              </label>
              <p id="date" className="mx-1">
                13/12/2023
              </p>
            </div>
            <div className="flex flex-row">
              <label htmlFor="phone" className="text-black font-bold">
                {"Phone number: "}
              </label>
              <p id="phone" className="mx-1">
                084 345 5555
              </p>
            </div>
            <div className="flex flex-row">
              <label htmlFor="email" className="text-black font-bold">
                {"Email: "}
              </label>
              <p id="email" className="mx-1">
                21522480@gm.uit.edu.vn
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
