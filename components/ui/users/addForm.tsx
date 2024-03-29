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
import { CldUploadWidget } from "next-cloudinary";

export default function UserAddForm() {
  const router = useRouter();
  const [employee, setEmployee] = React.useState({} as Employee);

  const handleSubmit = () => {
    if (employee.name === "" || employee.name === undefined) {
      alert("Name cannot be empty");
      return;
    }
    if (employee.email === "" || employee.email === undefined) {
      alert("Email cannot be empty");
      return;
    }
    if (employee.username === "" || employee.username === undefined) {
      alert("Username cannot be empty");
      return;
    }
    if (employee.password === "" || employee.password === undefined) {
      alert("Password cannot be empty");
      return;
    }
    if (employee.phone === "" || employee.phone === undefined) {
      alert("Phone cannot be empty");
      return;
    }
    if (employee.position === "" || employee.position === undefined) {
      alert("Position cannot be empty");
      return;
    }
    if (employee.salary === undefined) {
      alert("Salary cannot be empty");
      return;
    }
    if (employee.imageUrl === "" || employee.imageUrl === undefined) {
      alert("Image cannot be empty");
      return;
    }

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    })
      .then((res) => res.json())
      .then((data) => router.push("/users"));
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="">
        <label className="text-violet-800 text-3xl">
          {"Add Employee"}
        </label>
        <Divider className="my-4" />

        <div className="grid grid-cols-5 gap-6 mt-5 mb-10">
          <div className="flex flex-col gap-1">
            <label className="border w-50 h-54 bg-gray-300 rounded-md flex items-center text-center relative">
              <CldUploadWidget uploadPreset="zwrrw7i4" options={{
                sources: ['local', 'url'],
                multiple: false,
                maxFiles: 1
              }}
                onSuccess={(result) => {
                  setEmployee(prev => ({ ...prev, imageUrl: (result.info as { secure_url: string }).secure_url }))
                }}
              >
                {({ open }) => {
                  if (employee.imageUrl !== "") {
                    return (
                      <div className="absolute inset-0 h-[260px] rounded-lg" onClick={() => open()}>
                        <img src={employee.imageUrl} className="object-cover w-full h-full rounded-lg" />
                      </div>
                    )
                  }
                  return (
                    <div className="absolute inset-0 flex flex-col justify-center items-center" onClick={() => open()}>
                      <HiOutlineCamera className="text-4xl" />
                      <p className="text-gray-500">Upload Image</p>
                    </div>
                  )
                }}
              </CldUploadWidget>
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
