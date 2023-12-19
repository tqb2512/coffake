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
                      <HiOutlineCamera className="bg-white rounded-md shadow-lg border -m-1 h-12 w-12 text-purple-500 absolute top-0 right-0"/>
                      <input type="file" className="hidden" onChange={upLoadImage}/>
                      
                      <div className="h-64">
                        <img src="https://loremflickr.com/480/640" className="rounded-lg"/>
                      </div>
            </label>
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <Input label="Name" value={employee.name} />
            <Input label="Email" value={employee.email} />
            <Input label="Position" value={employee.position} />
            <Input label="Salary" value={employee.salary?.toString()} />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <Input label="Username" value={employee.username} />
            <Input label="Password" value={employee.password} type="password" />
            <Input label="Phone Number" value={employee.phone} />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button className="text-white bg-violet-800" onPress={handleSubmit}>Add</Button>
        </div>
      </div>
    </div>
  );
}
