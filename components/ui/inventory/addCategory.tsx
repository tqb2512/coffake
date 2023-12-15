"use client";

import { Button, Input } from "@nextui-org/react";
export default function CategoryAddForm() {
    return (
      <div className="mt-6 mx-16">
        <label className="font-light text-violet-800 text-3xl">
          Add New Category
        </label>
        <div className="flex flex-col mt-12">
          <form className="w-3/6 mx-24" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6">
              <div>
                <Input type="text" name="name" label="Name" isRequired></Input>
              </div>
              <div>
                <Input
                  type="text"
                  name="stock"
                  label="Stock"
                  isRequired
                ></Input>
              </div>
              <div>
                <Input type="text" name="unit" label="Unit" isRequired></Input>
              </div>
              <div>
                <Input
                  type="number"
                  name="unit_price"
                  label="Unit Price"
                  isRequired
                ></Input>
              </div>
            </div>
            <div className="mt-10 col-span-2 flex justify-end gap-x-6">
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
          </form>
        </div>
      </div>
    );
}