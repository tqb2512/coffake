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
  Divider,
  Input,
  Select,
  SelectItem
} from "@nextui-org/react";
import { Inventory, Invoice } from "@prisma/client";
import { HiDotsVertical } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const columns = [
  { name: "Date", uid: "date", sortable: true },
  { name: "Supplier", uid: "supplier" },
  { name: "Quantity", uid: "quantity" },
  { name: "Unit Price", uid: "unitprice" },
  { name: "Total", uid: "total" },
  { name: "Actions", uid: "actions" },
];

export default function IngredientInfoForm({ params }: { params: { ingredientId: string } }) {

  const router = useRouter();
  const { data: session, status } = useSession()
  const [inventory, setInventory] = React.useState<Inventory>({} as Inventory);
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);
  const [isEditing, setIsEditing] = React.useState(false);

  useEffect(() => {
    fetch("/api/inventory/" + params.ingredientId)
      .then((res) => res.json())
      .then((data) => setInventory(data));
  }, [params.ingredientId]);

  useEffect(() => {
    fetch("/api/inventory/" + params.ingredientId + "/getInvoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data));
  }, [params.ingredientId]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      fetch("/api/inventory/" + params.ingredientId, {
        method: "PUT",
        body: JSON.stringify(inventory),
      })
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") {
    router.push("/login")
  }

  return (
    <div className="bg-white rounded-lg p-4">
      <div>
        <label className="text-violet-800 text-3xl">
          {"Ingredient's Details"}
          <Button onClick={handleEditClick} className="float-right">
            {isEditing ? "Apply" : "Edit"}
          </Button>
        </label>

        <Divider className="my-4" />
        <div className="grid grid-cols-1 gap-6 mt-5 mb-10">
          <Input label="Name" value={inventory?.name} disabled={!isEditing} onChange={(e) => setInventory({ ...inventory, name: e.target.value })} />
          <Select
            label="Unit"
            onChange={(e) => setInventory({ ...inventory, unit: e.target.value })}
            value={inventory?.unit}
            selectedKeys={[inventory?.unit]}
            isDisabled={!isEditing}
          >
            <SelectItem key="Phần" value="Phần" isReadOnly={!isEditing}>Phần</SelectItem>
            <SelectItem key="Chai" value="Chai" isReadOnly={!isEditing}>Chai</SelectItem>
            <SelectItem key="Lon" value="Lon" isReadOnly={!isEditing}>Lon</SelectItem>
            <SelectItem key="Gói" value="Gói" isReadOnly={!isEditing}>Gói</SelectItem>
            <SelectItem key="g" value="g" isReadOnly={!isEditing}>g</SelectItem>
            <SelectItem key="ml" value="ml" isReadOnly={!isEditing}>ml</SelectItem>
          </Select>
          <Input label="Quantity" type="number" value={inventory?.stock?.toString()} disabled={!isEditing} onChange={(e) => setInventory({ ...inventory, stock: parseInt(e.target.value) })}/>
          <Input label="Unit Price" type="number" value={inventory?.unitPrice?.toString()} disabled={!isEditing} endContent="$" onChange={(e) => setInventory({ ...inventory, unitPrice: parseFloat(e.target.value) })} />
        </div>

        <label className="text-violet-800 text-3xl">
          {"Invoices List"}
        </label>
        <Divider className="my-4" />
        {!invoices.length ? <label className="text-black">
          {"No invoice found"}
        </label> :
          <Table aria-label="Inventory Table">
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    {new Date(invoice.date).toLocaleString("en-GB")}
                  </TableCell>
                  <TableCell>
                    {
                      invoice.importList.filter(
                        (item) => item.ingredientId == params.ingredientId
                      )[0].supplierName
                    }
                  </TableCell>
                  <TableCell>
                    {invoice.importList
                      .filter((item) => item.ingredientId == params.ingredientId)
                      .reduce((a, b) => a + b.quantity, 0)}
                  </TableCell>
                  <TableCell>
                    {
                      invoice.importList.filter(
                        (item) => item.ingredientId == params.ingredientId
                      )[0].unitPrice
                    }
                  </TableCell>
                  <TableCell>
                    {invoice.importList
                      .filter((item) => item.ingredientId == params.ingredientId)
                      .reduce((a, b) => a + b.quantity * b.unitPrice, 0)}
                  </TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button>
                          <HiDotsVertical />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem
                          href={`/invoices/${invoice.id}`}
                        ></DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>}
      </div>
    </div>
  );
}
