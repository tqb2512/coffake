"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import React from "react";
import { Customer } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CustomerAddForm() {

  const router = useRouter();
  const { data: session, status } = useSession()
  const [customer, setCustomer] = React.useState({} as Customer);

  const handleSubmit = () => {

    if (!customer.name || !customer.email || !customer.phone || !customer.loyaltyPoints) {
      alert("Please fill all fields");
      return;
    }

    fetch("/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => res.json())
      .then(() => router.push("/customers"));
  };

  return (
    <div className="bg-white p-4  rounded-lg">
      <div>
        <label className="text-violet-800 text-3xl">
          {"Add Customer"}
        </label>

        <div className="grid grid-cols-1 gap-6 mt-5 mb-10">
          <Input label="Name" value={customer.name} onValueChange={(value) => setCustomer(prevCustomer => ({ ...prevCustomer, name: value }))} />
          <Input label="Email" value={customer.email} type="email" onValueChange={(value) => setCustomer(prevCustomer => ({ ...prevCustomer, email: value }))} />
          <Input label="Phone" value={customer.phone} onValueChange={(value) => setCustomer(prevCustomer => ({ ...prevCustomer, phone: value }))} />
          <Input label="Loyalty Points" value={customer.loyaltyPoints?.toString()} type="number" onValueChange={(value) => setCustomer(prevCustomer => ({ ...prevCustomer, loyaltyPoints: parseInt(value) }))} />
        </div>

        <div className="flex justify-end gap-3">
          <Button className="text-white bg-violet-800" onPress={handleSubmit}>Add</Button>
        </div>
      </div>
    </div>

  );
}
