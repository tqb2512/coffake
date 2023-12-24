"use client";

import React from "react";
import { Invoice, Supplier, Inventory } from "@prisma/client";
import { Input, Select, SelectItem, Textarea, Button } from "@nextui-org/react";
import { HiX } from "react-icons/hi";

export default function InvoiceImportModal({
  invoice,
  setInvoice,
}: {
  invoice: Invoice;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
}) {
  const [isOpen, setOpen] = React.useState(false);
  const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);
  const [inventories, setInventories] = React.useState<Inventory[]>([]);

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  React.useEffect(() => {
    fetch("/api/suppliers")
      .then((res) => res.json())
      .then((data) => setSuppliers(data));
  }, []);

  React.useEffect(() => {
    fetch("/api/inventory")
      .then((res) => res.json())
      .then((data) => setInventories(data));
  }, []);

  const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInvoice({
      ...invoice,
      total: invoice.total + Number(e.currentTarget.unitPrice?.value),
      importList: [
        ...(invoice.importList || []),
        {
          ingredientId: e.currentTarget.ingredientId.value,
          ingredientName:
            inventories.find(
              (inventory) =>
                inventory.id === e.currentTarget.ingredientId?.value
            )?.name || "",
          quantity: Number(e.currentTarget.quantity?.value),
          unitPrice: Number(e.currentTarget.unitPrice?.value),
          suppilerId: e.currentTarget.suppilerId?.value,
          supplierName:
            suppliers.find(
              (supplier) => supplier.id === e.currentTarget.suppilerId?.value
            )?.name || "",
          note: e.currentTarget.note?.value,
        },
      ],
    });
    toggleModal();
  };

  return (
    <div className="App">
      <Button onClick={toggleModal} className="mb-5">
        Add Ingredient
      </Button>

      {isOpen && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-72 my-6 mx-auto max-w-4xl">
            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none px-4 border ">
              <div className="flex items-start justify-between border-gray-300 mb-4 borderrounded-t pt-2">
                <h3 className="text-purple-500 font-bold text-xl">
                  Add Ingredient
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl font-semibold outline-none focus:outline-none"
                  onClick={toggleModal}
                >
                  <span className="bg-transparenth-6 w-6 text-2xl block outline-none focus:outline-none text-gray-500">
                    <HiX />
                  </span>
                </button>
              </div>
              <div>
                <form onSubmit={handleSubmmit}>
                  <div className="flex flex-col">
                    <label htmlFor="ingredientId" className="hidden">
                      Ingredient
                    </label>
                    {/* <Select
                      name="ingredientId"
                      id="ingredientId"
                      label="Select an Ingredient"
                      className="max-w-xs"
                    >
                      {inventories.map((inventory) => (
                        <SelectItem key={inventory.id} value={inventory.id}>
                        {inventory.name}
                        </SelectItem>
                      ))}
                    </Select> */}
                    <select
                      defaultValue="Select an Ingredient"
                      name="ingredientId"
                      id="ingredientId"
                      className="bg-[#f4f4f5]  rounded-lg py-4 px-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    >
                      {inventories.map((inventory) => (
                        <option
                          className="text"
                          key={inventory.id}
                          value={inventory.id}
                        >
                          {inventory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col my-4">
                    <label className="hidden" htmlFor="quantity">
                      Quantity
                    </label>

                    <Input
                      type="number"
                      label="Quantity"
                      name="quantity"
                      id="quantity"
                      placeholder="Enter Quantity"
                    />
                  </div>
                  <div className="flex flex-col my-4">
                    <label className="hidden" htmlFor="unitPrice">
                      Unit Price
                    </label>
                    <Input
                      type="number"
                      label="Unit Price"
                      name="unitPrice"
                      id="unitPrice"
                      placeholder="Enter Unitprice"
                      endContent="$"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="hidden" htmlFor="suppilerId">
                      Supplier
                    </label>
                    <select
                      name="suppilerId"
                      id="suppilerId"
                      className="bg-[#f4f4f5]  rounded-lg py-4 px-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    >
                      {suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col my-4">
                    <label className="hidden" htmlFor="note">
                      Note
                    </label>
                    <Textarea
                      name="note"
                      id="note"
                      label="Note"
                      placeholder="Addition note"
                      className="max-w-xs"
                    />
                  </div>
                  <button
                    className="text-white font-semibold bg-purple-400 px-4 py-2 rounded-lg float-right mb-4 hover:bg-purple-300"
                    type="submit"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
