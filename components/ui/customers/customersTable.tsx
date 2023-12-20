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
  Input,
  Pagination,
} from "@nextui-org/react";
import { Customer } from "@prisma/client";
import { HiDotsVertical } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { FaPlus, FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

const columns = [
  { name: "Name", uid: "name", sortable: true },
  { name: "Email", uid: "email" },
  { name: "Phone", uid: "phone" },
  { name: "Actions", uid: "actions" },
];

const searchColumns = [
  { name: "Name", uid: "name" },
  { name: "Email", uid: "email" },
  { name: "Phone", uid: "phone" },
];

export default function CustomersTable() {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchColumn, setSearchColumn] = React.useState(columns[0].uid);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);


  return (
    <div className="p-4 bg-white rounded-lg">
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
              onClick={() => router.push("/customers/add")}
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
            {customers
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
                  <TableCell>{item.phone}</TableCell>
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
                            router.push("/customers/" + item.id)
                          }
                        >View</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
