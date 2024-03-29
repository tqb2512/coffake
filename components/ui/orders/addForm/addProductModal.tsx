'use client'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from "@nextui-org/react"
import { Order, Product, OrderItems, Inventory, ProductSizeList } from "@prisma/client"
import React from "react"

const columns = [
  { name: "Name", key: "name" },
  { name: "Price", key: "price" },
  { name: "Action", key: "action" },
]

export default function AddProductModal({ order, setOrder, orderItem, isOpen, setIsOpen, inventory }: { order: Order, setOrder: React.Dispatch<React.SetStateAction<Order>>, orderItem: OrderItems, isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, inventory: Inventory[] }) {

  const [products, setProducts] = React.useState<Product[]>([])
  const [selectedToppings, setSelectedToppings] = React.useState([] as Product[])
  const [item, setItem] = React.useState(orderItem)
  React.useEffect(() => {
    fetch(`/api/products?category=Topping`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [])

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const isSizeAvailable = (sizeInfo: ProductSizeList) => {
    let isAvailable = false;
    sizeInfo.recipe.forEach((ingredient) => {
      inventory.forEach((item) => {
        if (ingredient.ingredientId === item.id) {
          if (item.stock >= ingredient.quantity) {
            isAvailable = true;
          } else {
            isAvailable = false;
          }
        }
      });
    });
    return isAvailable;
  };


  const handleSubmit = () => {
    toggleModal()

    selectedToppings.forEach((topping) => {
      item.toppings.push({
        productID: topping.id,
        productName: topping.name,
        size: topping.sizeList[0].size,
        price: topping.sizeList[0].price,
        quantity: 1,
      })
    })

    setOrder(prevOrder => ({
      ...prevOrder,
      items: [...prevOrder.items || [], item],
      totalPrice: prevOrder.totalPrice + item.price + selectedToppings.reduce((acc, topping) => acc + topping.sizeList[0].price, 0)
    }))
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={toggleModal}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Addition Order Infomation</ModalHeader>
              <ModalBody>

                <Table>
                  <TableHeader>
                    {columns.map((column) => (
                      <TableColumn key={column.key}>{column.name}</TableColumn>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>${product.sizeList[0].price}</TableCell>
                        <TableCell className="w-10">
                          {isSizeAvailable(product.sizeList[0]) ? 
                          <Button
                            {...(selectedToppings.includes(product) ? { className: 'text-white bg-violet-800' } : {})}
                            onClick={() => {
                              if (selectedToppings.includes(product)) {
                                setSelectedToppings(selectedToppings.filter((topping) => topping.id !== product.id))
                              } else {
                                setSelectedToppings([...selectedToppings, product])
                              }
                            }}
                          >
                            Select
                          </Button>
                          : <Button
                            isDisabled
                            className="text-white bg-red-500 w-10 text-xs"
                          >
                            Out of stock
                          </Button>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Textarea
                  autoFocus
                  label="Noted"
                  placeholder="Addition note"
                  className=""
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}