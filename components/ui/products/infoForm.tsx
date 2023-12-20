'use client'

import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button, Input, Textarea, Divider } from '@nextui-org/react';
import { Product } from '@prisma/client';
import { HiDotsVertical } from 'react-icons/hi';
import React, { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { SlPicture } from 'react-icons/sl';
import AddSizeModal from './addForm/addSizeModal';
import { HiOutlineCamera } from 'react-icons/hi2';

const columns = [
  { name: "Size", uid: "size" },
  { name: "Price", uid: "price" },
  { name: "Recipe", uid: "recipe" },
  { name: "Actions", uid: "actions" },
];

const categoryList = [
  "Drink",
  "Food",
  "Topping"
];

export default function ProductInfoForm(params: { productId: string }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false);
  const [product, setProduct] = React.useState<Product>({} as Product);
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    fetch(`/api/products/${params.productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      fetch(`/api/products/${params.productId}`, {
        method: "PUT",
        body: JSON.stringify(product),
      });
    }
  }

  const upLoadImage = () => { }

  return (
      <div className="bg-white p-4 rounded-lg">
          <div>
              <label className="text-violet-800 text-3xl">
                  {"Product details"}
                  <Button onClick={handleEditClick} className="float-right">
                      {isEditing ? "Apply" : "Edit"}
                  </Button>
              </label>
              <Divider className="my-4" />

              <div className="grid grid-cols-5 gap-6 mt-5 mb-10">
                  <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                          <label className="border w-50 h-54 bg-gray-300 rounded-md flex items-center text-center relative">
                              <HiOutlineCamera className="bg-white rounded-md shadow-lg border -m-1 h-12 w-12 text-purple-500 absolute top-0 right-0" />
                              <input
                                  type="file"
                                  className="hidden"
                                  onChange={upLoadImage}
                              />

                              <div className="h-48">
                                  <img
                                      src="https://loremflickr.com/360/480"
                                      className="rounded-lg"
                                  />
                              </div>
                          </label>
                      </div>
                  </div>

                  <div className="flex flex-col col-span-4 gap-2">
                      <Input
                          label="Name"
                          placeholder="Name"
                          value={product.name}
                          onValueChange={(value) =>
                              setProduct({ ...product, name: value })
                          }
                          isDisabled={!isEditing}
                      />
                      <Dropdown isDisabled={!isEditing}>
                          <DropdownTrigger>
                              <Input
                                  label="Category"
                                  placeholder="Category"
                                  value={product.category}
                                  onValueChange={(value) =>
                                      setProduct({
                                          ...product,
                                          category: value,
                                      })
                                  }
                                  isDisabled={!isEditing}
                              />
                          </DropdownTrigger>
                          <DropdownMenu>
                              {categoryList.map((category) => (
                                  <DropdownItem
                                      key={category}
                                      onClick={() =>
                                          setProduct({ ...product, category })
                                      }
                                  >
                                      {category}
                                  </DropdownItem>
                              ))}
                          </DropdownMenu>
                      </Dropdown>
                  <div>
                    <Divider className="my-4 bg-gray-100" />
                    <label className="text-violet-800 text-3xl">
                        {"Product sizes"}
                        <Button
                            isDisabled={!isEditing}
                            className="float-right"
                            onPress={() => setIsOpen(true)}
                        >
                            Add
                        </Button>
                    </label>

                    <AddSizeModal
                        product={product}
                        setProduct={setProduct}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />

                      <Divider className="my-4" />
                      <Table>
                          <TableHeader>
                              {columns.map((column) => (
                                  <TableColumn key={column.uid}>
                                      {column.name}
                                  </TableColumn>
                              ))}
                          </TableHeader>
                          <TableBody>
                              {product.sizeList?.map((size) => (
                                  <TableRow key={size.size}>
                                      <TableCell>{size.size}</TableCell>
                                      <TableCell>{size.price}</TableCell>
                                      <TableCell>
                                          {size.recipe?.map(
                                              (recipe) =>
                                                  recipe.ingredientName +
                                                  " x " +
                                                  recipe.quantity
                                          )}
                                      </TableCell>
                                      <TableCell className="w-10">
                                          <Dropdown>
                                              <DropdownTrigger>
                                                  <Button isDisabled={!isEditing}>
                                                      <HiDotsVertical />
                                                  </Button>
                                              </DropdownTrigger>
                                              <DropdownMenu>
                                                  <DropdownItem
                                                      onClick={() => {
                                                          setProduct({
                                                              ...product,
                                                              sizeList:
                                                                  product.sizeList?.filter(
                                                                      (item) =>
                                                                          item.size !==
                                                                          size.size
                                                                  ),
                                                          });
                                                      }}
                                                  >
                                                      Delete
                                                  </DropdownItem>
                                              </DropdownMenu>
                                          </Dropdown>
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>  
                  </div>
                      
                  </div>
              </div>
              </div>
      </div>
  );
}