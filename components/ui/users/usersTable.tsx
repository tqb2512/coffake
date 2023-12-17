"use client";

import { FaEllipsisVertical } from "react-icons/fa6";
import React from "react";
import { useRouter } from "next/navigation";
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
import { Employee } from "@prisma/client";
import { HiDotsVertical } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

const columns = [
  { name: "Name", uid: "name", sortable: true },
  { name: "Email", uid: "email" },
  { name: "Position", uid: "position" },
  { name: "Salary", uid: "salary", sortable: true },
  { name: "Actions", uid: "actions" },
];

export default function UsersTable() {
  const router = useRouter();
  React.useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setEmployee(data));
  }, []);
  const [employee, setEmployee] = React.useState<Employee[]>([]);
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
                <DropdownItem key="position">Position</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button
              className="text-white bg-violet-800"
              endContent={<FaPlus />}
              onClick={() => {
                router.push(`/users/add`);
              }}
            >
              Add New
            </Button>
          </div>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex w-full justify-center">
        <Pagination isCompact showControls showShadow color="secondary" />
      </div>
    );
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
    <Table
      topContent={topContent}
      bottomContent={bottomContent}
      aria-label="Users Table"
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.uid}>{column.name}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {employee.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>{employee.position}</TableCell>
            <TableCell>{employee.salary}</TableCell>
            <TableCell>
              <Dropdown>
                <DropdownTrigger>
                  <Button>
                    <HiDotsVertical />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem href={`/users/${employee.username}`}>
                    View
                  </DropdownItem>
                  <DropdownItem onClick={() => handleDelete(employee.id)}>
                    Delete
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
