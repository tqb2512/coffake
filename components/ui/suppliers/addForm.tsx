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
    if (supplier.name === "" || supplier.name == undefined) {
      alert("Please enter supplier name");
      return;
    }
    if (supplier.company === "" || supplier.company == undefined) {
      alert("Please enter supplier company");
      return;
    }
    if (supplier.phone === "" || supplier.phone == undefined) {
      alert("Please enter supplier phone number");
      return;
    }
    if (supplier.email === "" || supplier.email == undefined) {
      alert("Please enter supplier email");
      return;
    }
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
    <div className="bg-white rounded-lg p-4">
      <div className="">
        <label className="text-violet-800 text-3xl">
          {"Add Supplier"}
        </label>
        <Divider className="my-4" />

        <div className="grid grid-cols-1 gap-6 mt-5 mb-10">
          <Input label="Name" value={supplier.name} onValueChange={(value) => setSupplier({ ...supplier, name: value })} />
          <Input label="Company" value={supplier.company} onValueChange={(value) => setSupplier({ ...supplier, company: value })} />
          <Input label="Phone Number" value={supplier.phone} onValueChange={(value) => setSupplier({ ...supplier, phone: value })} />
          <Input label="Email" value={supplier.email} onValueChange={(value) => setSupplier({ ...supplier, email: value })} />
        </div>

        <div className="flex justify-end gap-3">
          <Button className="text-white bg-violet-800" onPress={handleSubmit}>Add</Button>
        </div>
      </div>
    </div>
  );
}
