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
import { Inventory } from "@prisma/client";
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus, FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const columns = [
  { name: "Name", uid: "name", sortable: true },
  { name: "Stock", uid: "stock" },
  { name: "Unit", uid: "unit" },
  { name: "Unit Price", uid: "unitprice" },
  { name: "Actions", uid: "actions" },
];

const searchColumns = [
  { name: "Name", uid: "name" },
  { name: "Stock", uid: "stock" },
  { name: "Unit", uid: "unit" },
  { name: "Unit Price", uid: "unitPrice" },
];

export default function InventoryTable() {
  const router = useRouter();
  const { data: session, status } = useSession()
  const [inventory, setInventory] = React.useState<Inventory[]>([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchColumn, setSearchColumn] = React.useState(columns[0].uid);

  useEffect(() => {
    fetch("/api/inventory")
      .then((res) => res.json())
      .then((data) => setInventory(data))
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") {
    router.push("/login")
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
              onClick={() => router.push("/inventory/add")}
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
            {inventory
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
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>$ {item.unitPrice}</TableCell>
                  <TableCell className="w-10">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button>
                          <HiDotsVertical />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => router.push(`/inventory/${item.id}`)}
                        >
                          Edit
                        </DropdownItem>
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
