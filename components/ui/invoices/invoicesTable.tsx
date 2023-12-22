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
  Pagination,
  Input,
} from "@nextui-org/react";
import { Invoice } from "@prisma/client";
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useRouter} from "next/navigation";

const columns = [
  { name: "Date", uid: "date", sortable: true },
  { name: "Total", uid: "total" },
  { name: "Actions", uid: "actions" },
];

const searchColumns = [
  { name: "Date", uid: "date" },
  { name: "Total", uid: "total" },
];

export default function InvoicesTable() {

  const router = useRouter();
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchColumn, setSearchColumn] = React.useState(columns[0].uid);

  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data));
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
  }

  return (
    <div className="bg-white p-4 rounded-lg">
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
              onClick={() => router.push("/invoices/add")}
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
            {invoices
              .filter((item) => {
                if (searchColumn in item) {
                  const searchValueLower = searchValue.toLowerCase();
                  return String(item[searchColumn as keyof typeof item]).toLowerCase().includes(searchValueLower);
                }
                return false;
              })
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{formatDate(item.date.toString())}</TableCell>
                  <TableCell>$ {item.total}</TableCell>
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
                            router.push("/invoices/" + item.id)
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
