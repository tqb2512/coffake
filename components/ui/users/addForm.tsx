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
  SelectItem,
  Select,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { HiCamera, HiOutlineCamera, HiPhoto } from "react-icons/hi2";

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

  function upLoadImage() {

  }

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="">
        <label className="text-violet-800 text-3xl">
          {"Add Employee"}
        </label>
        <Divider className="my-4" />

        <div className="grid grid-cols-5 gap-6 mt-5 mb-10">
          <div className="flex flex-col items-center">
            <label className="border w-48 h-64 bg-gray-300 rounded-md flex items-center text-center relative">
              <HiOutlineCamera className="bg-white rounded-md shadow-lg border -m-1 h-12 w-12 text-purple-500 absolute top-0 right-0" />
              <input type="file" className="hidden" onChange={upLoadImage} />

              <div className="h-64">
                <img src="https://loremflickr.com/480/640" className="rounded-lg" />
              </div>
            </label>
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <Input label="Name" value={employee.name} onValueChange={(value) => { setEmployee({ ...employee, name: value }) }} />
            <Input label="Email" value={employee.email} onValueChange={(value) => { setEmployee({ ...employee, email: value }) }} />
            <Select
              label="Position"
              value={employee.position}
              onChange={(e) => setEmployee({ ...employee, position: e.target.value })}>
              <SelectItem key="Manager" value="Manager">Manager</SelectItem>
              <SelectItem key="Cashier" value="Cashier">Cashier</SelectItem>
              <SelectItem key="Barista" value="Barista">Barista</SelectItem>
            </Select>
            <Input label="Salary" value={employee.salary?.toString()} type="number" endContent="$" onValueChange={(value) => { setEmployee({ ...employee, salary: parseInt(value) }) }} />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <Input label="Username" value={employee.username} onValueChange={(value) => { setEmployee({ ...employee, username: value }) }} />
            <Input label="Password" value={employee.password} type="password" onValueChange={(value) => { setEmployee({ ...employee, password: value }) }} />
            <Input label="Phone Number" value={employee.phone} onValueChange={(value) => { setEmployee({ ...employee, phone: value }) }} />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button className="text-white bg-violet-800" onPress={handleSubmit}>Add</Button>
        </div>
      </div>
    </div>
  );
}
