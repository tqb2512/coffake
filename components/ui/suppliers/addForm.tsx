"use client";

import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Supplier } from "@prisma/client";

export default function SupplierAddForm() {
  const router = useRouter();
  const [supplier, setSupplier] = React.useState({} as Supplier);

  const handleSubmit = () => {
    fetch("/api/suppliers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplier),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <label className="text-violet-800 text-3xl">
        {"Add Supplier"}
      </label>
      <Divider className="my-4" />

      <div className="grid grid-cols-1 gap-6 mt-5 mb-10">
        <Input label="Name" value={supplier.name} />
        <Input label="Company" value={supplier.company} />
        <Input label="Phone Number" value={supplier.phone} />
        <Input label="Email" value={supplier.email} />
      </div>

      <div className="flex justify-end gap-3">
        <Button className="text-white bg-violet-800" onPress={handleSubmit}>Add</Button>
      </div>
    </div>
  );
}
