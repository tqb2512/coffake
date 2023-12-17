"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Textarea,
} from "@nextui-org/react";
import React from "react";
import { SlPicture } from "react-icons/sl";

export default function SupplierAddForm() {
  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, address, phone, company } = e.currentTarget;
    const supplier = {
      name: (name as any).value,
      email: email.value,
      address: address.value,
      phone: phone.value,
      company: company.value,
    };

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
  const [value, setValue] = React.useState("email@gmail.com");

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  return (
    <div className="p-8 h-full">
      <div className="bg-white p-4 rounded-lg">
        <label className=" font-light text-violet-800 text-3xl">
          Add a Supplier
        </label>
        <form
          className="flex flex-wrap items-center justify-center mt-16"
          onSubmit={handlerSubmit}
        >
          <div className="grid grid-cols-2 gap-x-16 px-8">
            <div className="col-span-2 grid grid-cols-2 gap-x-20 gap-y-10 grid-flow-row">
              <div className="flex flex-row items-center">
                <Input
                  id="name"
                  isRequired
                  type="text"
                  label="Name"
                  className="px-4 rounded-lg"
                  placeholder="Enter Name"
                />
              </div>
              <div className="flex flex-row items-center">
                <Input
                  id="company"
                  isRequired
                  type="text"
                  label="Company"
                  className="px-4 rounded-lg "
                  placeholder="Enter Company Name"
                />
              </div>
              <div className="flex flex-row items-center ">
                <Input
                  id="email"
                  isRequired
                  type="email"
                  label="Email"
                  className="px-4 rounded-lg"
                  value={value}
                  variant="bordered"
                  isInvalid={isInvalid}
                  color={isInvalid ? "danger" : "success"}
                  errorMessage={isInvalid && "Please enter a valid email"}
                  onValueChange={setValue}
                  placeholder="Enter Email"
                />
              </div>

              <div className="flex flex-row items-center">
                <Input
                  id="phone"
                  isRequired
                  type="text"
                  label="Phone"
                  className="px-4 rounded-lg "
                  placeholder="Enter Phone Number"
                />
              </div>

              <div className="flex col-span-2 flex-row items-center">
                <Textarea
                  id="notes"
                  type="text"
                  label="Notes"
                  className="px-4 rounded-lg w-full"
                  placeholder="Enter notes here"
                />
              </div>
              <div className="col-span-2 flex justify-end gap-x-6 mb-4 me-4">
                <Button
                  color="default"
                  className="text-neutral-500"
                  variant="bordered"
                >
                  Cancel
                </Button>
                <Button
                  color="secondary"
                  className="text-white font-bold bg-violet-800"
                  variant="solid"
                >
                  Save and Add
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
