"use client";

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

const columns = [
  { name: "Name", uid: "name", sortable: true },
  { name: "Email", uid: "email" },
  { name: "Position", uid: "position" },
  { name: "Salary", uid: "salary", sortable: true },
  { name: "Actions", uid: "actions" },
];

const searchColumns = [
  { name: "Name", uid: "name" },
  { name: "Email", uid: "email" },
  { name: "Position", uid: "position" },
  { name: "Salary", uid: "salary" },
];

export default function UsersTable() {
  const router = useRouter();
  const [employee, setEmployee] = React.useState<Employee[]>([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchColumn, setSearchColumn] = React.useState(columns[0].uid);

  React.useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setEmployee(data));
  }, []);

  const handleDelete = (id: string) => {
    fetch("/api/users/", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEmployee(employee.filter((item) => item.id !== id));
        }
      });
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Input
            className="w-64"
            startContent={<FaSearch />}
            endContent={
              <Dropdown>
                <DropdownTrigger>
                  <Button>
                    {searchColumns.find((column) => column.uid === searchColumn)?.name}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  {searchColumns.map((column) => (
                    <DropdownItem
                      key={column.uid}
                      onClick={() => setSearchColumn(column.uid)}
                    >
                      {column.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            }
            placeholder="Search by"
            value={searchValue}
            onValueChange={(value) => setSearchValue(value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Button
            className="text-white bg-violet-800 h-full"
            onClick={() => router.push("/users/add")}
          >
            Add
          </Button>
        </div>
      </div>

      <Table className="mt-5">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {employee
            .filter((item) => {
              if (searchColumn in item) {
                const searchValueLower = searchValue.toLowerCase();
                return String(item[searchColumn as keyof typeof item]).toLowerCase().includes(searchValueLower);
              }
              return false;
            })
            .map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell>$ {item.salary}</TableCell>
                <TableCell className="w-10">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button>
                        <HiDotsVertical />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() =>
                          router.push("/users/" + item.username)
                        }
                      >View</DropdownItem>
                      <DropdownItem
                        onClick={() => handleDelete(item.id)}
                      >Delete</DropdownItem>
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
