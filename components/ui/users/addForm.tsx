"use client";

import { Employee } from "@prisma/client";
import React, { Fragment } from "react";
import { SlPicture } from "react-icons/sl";
import {
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";

export default function UserAddForm() {
  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, position, salary, username, password, phone } =
      e.currentTarget;
    const employee = {
      name: (name as any).value,
      email: email.value,
      position: position.value,
      salary: parseInt(salary.value),
      username: username.value,
      password: password.value,
      phone: phone.value,
    };

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
        Employee Information
      </label>
      <form className="flex flex-wrap px-24 mt-16" onSubmit={handlerSubmit}>
        <div className="grid grid-cols-3 gap-x-16">
          <div className="col-span-1 min-h-full min-w-full">
            <label htmlFor="image" className="text-gray-800">
              Profile Picture
            </label>
            <div
              id="image"
              className="flex justify-center min-h-[75%] min-w-[75%] align-center border-dashed border-2 border-sky-500"
            >
              <SlPicture />
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-x-20 gap-y-10 grid-flow-row">
            <div className="flex flex-row items-center">
              <label htmlFor="name" className="text-gray-800">
                Name
              </label>
              <Input
                id="name"
                isRequired
                type="text"
                label="Name"
                className="px-4 rounded-lg"
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
            <div className="flex flex-row col-span-2 items-center">
              <label className="text-gray-800">Position</label>
              <Dropdown type="listbox" showArrow>
                <DropdownTrigger>
                  <Input
                    className="px-4 rounded-lg"
                    type="text"
                    label="Job Position"
                    placeholder="Employee"
                  />
                </DropdownTrigger>
                <DropdownMenu
                  selectionMode="single"
                  aria-label="Static Actions"
                >
                  <DropdownItem key="pos_1">Position 1</DropdownItem>
                  <DropdownItem key="pos_2">Position 2</DropdownItem>
                  <DropdownItem key="pos_3">Position 3</DropdownItem>
                  <DropdownItem key="pos_4">Position 4</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="flex flex-row items-center">
              <label htmlFor="salary" className="text-gray-800">
                Salary
              </label>
              <Input
                id="salary"
                isRequired
                type="number"
                label="Salary"
                className="px-4 rounded-lg"
              />
            </div>
            <div className="flex flex-row items-center">
              <label htmlFor="username" className="text-gray-800">
                Username
              </label>
              <Input
                id="username"
                isRequired
                type="text"
                label="Username"
                className="px-4 rounded-lg"
              />
            </div>
            <div className="flex flex-row items-center">
              <label htmlFor="password" className="text-gray-800">
                Password
              </label>
              <Input
                id="password"
                isRequired
                type="password"
                label="Password"
                className="px-4 rounded-lg"
              />
            </div>
            <div className="flex flex-row items-center">
              <label htmlFor="phone" className="text-gray-800">
                Phone Number
              </label>
              <Input
                id="phone"
                isRequired
                type="text"
                label="Phone"
                className="px-4 rounded-lg "
              />
            </div>
            <div className="flex col-span-2 flex-row items-center">
              <label htmlFor="notes" className="text-gray-800">
                Notes
              </label>
              <Input
                id="notes"
                type="text"
                label="Notes"
                className="px-4 rounded-lg w-full"
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