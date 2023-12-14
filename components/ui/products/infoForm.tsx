'use client'

import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button, Input } from '@nextui-org/react';
import { Product } from '@prisma/client';
import { HiDotsVertical } from 'react-icons/hi';
import React, { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { SlPicture } from 'react-icons/sl';



export default function ProductInfoForm( params: { productId: string }) {
    const router = useRouter()
    const [product, setProduct] = React.useState<Product>();
    const [name, setName] = React.useState("");

    React.useEffect(() => {
        fetch(`/api/products/${params.productId}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, []);

    function handleClick () {
        router.back();
    }
    
    return (
      <Fragment>
        <div className="flex flex-col bg-white first-letter:bg-white ps-8 m-6">
          <label className="font-light text-violet-800 text-3xl pt-4">
            Product Information
          </label>
          <form className="flex flex-wrap px-24 mt-16" onSubmit={() => {}}>
            <div className="grid grid-cols-3 gap-x-16">
              <div className="col-span-1 min-h-full min-w-full">
                <label htmlFor="image" className="text-gray-800">
                  Product Image
                </label>
                <div
                  id="image"
                  className="flex justify-center min-h-[75%] min-w-[75%] align-center border-dashed border-2 border-sky-500"
                >
                  <input type="file" />
                </div>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-x-20 gap-y-10 grid-flow-row">
                <div className="flex items-center">
                  <label htmlFor="name" className="text-gray-800 hidden">
                    Product Name
                  </label>
                  <Input
                    id="name"
                    isRequired
                    type="text"
                    label="Name"
                    className="px-4 rounded-lg"
                    value={product?.name}
                  />
                </div>
                <div className="flex flex-row col-span-2 items-center">
                  <label className="text-gray-800 hidden">Category</label>
                  <Dropdown type="listbox" showArrow>
                    <DropdownTrigger>
                      <Input
                        className="px-4 rounded-lg"
                        type="text"
                        label="Category"
                        placeholder="Category"
                        isRequired
                      />
                    </DropdownTrigger>
                    <DropdownMenu
                      selectionMode="single"
                      aria-label="Static Actions"
                    >
                      <DropdownItem key="pos_1">Drink</DropdownItem>
                      <DropdownItem key="pos_2">Food</DropdownItem>
                      <DropdownItem key="pos_3">Topping</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="flex flex-row items-center">
                  <label htmlFor="price" className="text-gray-800 hidden">
                    Price
                  </label>
                  <Input
                    id="price"
                    isRequired
                    type="number"
                    label="Price"
                    className="px-4 rounded-lg"
                  />
                </div>
                <div className="flex flex-row items-center">
                  <label htmlFor="stock" className="text-gray-800 hidden">
                    Stock
                  </label>
                  <Input
                    id="stock"
                    isRequired
                    type="text"
                    label="Stock"
                    className="px-4 rounded-lg"
                  />
                </div>
                <div className="flex flex-row items-center">
                  <label htmlFor="variation" className="text-gray-800 hidden">
                    Variation
                  </label>
                  <Input
                    id="variation"
                    isRequired
                    type="variation"
                    label="Variation"
                    className="px-4 rounded-lg"
                  />
                </div>
                <div className="flex col-span-2 flex-row items-center">
                  <label htmlFor="notes" className="text-gray-800 hidden">
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
        </div>
      </Fragment>
    )
}