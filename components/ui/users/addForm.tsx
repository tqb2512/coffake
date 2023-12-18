"use client";

import { Employee } from "@prisma/client";
import React from "react";
import { SlPicture } from "react-icons/sl";
import {
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Textarea,
  Divider,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function UserAddForm() {
  const router = useRouter();
  const [employee, setEmployee] = React.useState({} as Employee);

  const handleSubmit = () => {
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <label className="text-violet-800 text-3xl">
        {"Add Employee"}
      </label>
      <Divider className="my-4" />

      <div className="grid grid-cols-3 gap-6 mt-5 mb-10">
        <div className="flex flex-col gap-2">
        </div>

        <div className="flex flex-col gap-2">
          <Input label="Name" value={employee.name} />
          <Input label="Email" value={employee.email} />
          <Input label="Position" value={employee.position} />
          <Input label="Salary" value={employee.salary?.toString()} />
        </div>
        <div className="flex flex-col gap-2">
          <Input label="Username" value={employee.username} />
          <Input label="Password" value={employee.password} type="password" />
          <Input label="Phone Number" value={employee.phone} />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button className="text-white bg-violet-800" onPress={handleSubmit}>Add</Button>
      </div>
    </div>
  );
}
