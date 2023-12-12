"use client";

import { FaEllipsisVertical } from "react-icons/fa6";
import React from "react";
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
import { Employee } from "@prisma/client";
import { HiDotsVertical } from "react-icons/hi";
import Link from "next/link";

const columns = [
  { name: "Name", uid: "name", sortable: true },
  { name: "Email", uid: "email" },
  { name: "Position", uid: "position" },
  { name: "Salary", uid: "salary", sortable: true },
  { name: "Actions", uid: "actions" },
];

export default function UsersTable() {
  const [employee, setEmployee] = React.useState<Employee[]>([]);
  const [filterValue, setFilterValue] = React.useState("");
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold">{user.name}</p>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold">{cellValue}</p>
          </div>
        );
      case "position":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "salary":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-start items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <FaEllipsisVertical />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  React.useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setEmployee(data));
  }, []);

  const handleDelete = (id: string) => {
    fetch("/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="w-11/12 flex flex-col">
      <Table
        className="flex-wrap"
        aria-label="Users Table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination isCompact showControls showShadow color="primary" />
          </div>
        }
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          ))}
        </TableHeader>
        <TableBody text-left>
          {employee.map((employee) => (
            <TableRow key={employee.id}>
              {(columnKey) => (
                <TableCell text-left>
                  {renderCell(employee, columnKey)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
