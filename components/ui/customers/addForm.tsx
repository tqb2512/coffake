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
import { Fragment } from "react";
import { SlPicture } from "react-icons/sl";

export default function CustomerAddForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, phone } = e.currentTarget;
    const customer = {
      name: (name as any).value,
      email: (email as any).value,
      phone: (phone as any).value,
    };

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

  const [value, setValue] = React.useState("email@gmail.com");

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  return (
    <Fragment>
      <label className="font-light text-violet-800 text-3xl">
        Customer Information
      </label>
      <form className="flex flex-wrap px-24 mt-16">
        <div className="grid grid-cols-3 gap-x-16">
          <div className="col-span-1 min-h-full min-w-full">
            <label htmlFor="image" className="text-gray-800">
              Profile Picture
            </label>
            <div
              id="image"
              className="flex justify-center min-h-[75%] min-w-[75%] align-center border-dashed border-2 border-sky-500  rounded-xl"
            >
              <SlPicture />
            </div>
          </div>
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
                labelPlacement="outside-left"
              />
            </div>
            <div className="flex flex-row items-center">
              <Input
                id="phone"
                isRequired
                type="text"
                label="Phone"
                className="px-4 rounded-lg"
                placeholder="Enter Phone Number"
              />
            </div>
            <div className="flex col-span-2 flex-row items-center">
              <Input
                id="royalty"
                type="number"
                label="Points"
                className="px-4 rounded-lg w-full"
                placeholder="Enter royalty points"
              />
            </div>
            <div className="col-span-2 flex justify-end gap-x-6">
              <Button
                color="default"
                className="text-neutral-500 "
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
    </Fragment>
  );
}
