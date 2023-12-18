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

export default function CustomerAddForm() {
  const [customer, setCustomer] = React.useState({} as Customer);

  const handleSubmit = () => {
    
    fetch("/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <label className="text-violet-800 text-3xl">
        {"Add Customer"}
      </label>

      <div className="grid grid-cols-1 gap-6 mt-5 mb-10">
        <Input label="Name" value={customer.name} />
        <Input label="Email" value={customer.email} />
        <Input label="Phone" value={customer.phone} />
        <Input label="Loyalty Points" value={customer.loyaltyPoints?.toString()} />
      </div>

      <div className="flex justify-end gap-3">
        <Button className="text-white bg-violet-800" onPress={handleSubmit}>Add</Button>
      </div>
    </div>
    
  );
}
