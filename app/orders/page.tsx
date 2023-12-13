"use client"

import OrderProductCard from "@/components/ui/orders/orderProductCard";
import CategoryGrid from "@/components/ui/products/categoryGrid"
import { Table, TableCell, TableColumn, TableHeader, TableRow, TableBody, Image, Pagination } from "@nextui-org/react";
import { Order, Product } from '@prisma/client';

import React from "react";
import { IoTrash } from "react-icons/io5";
export default function OrderPage() {
    const [page, setPage] = React.useState(1);
    const [category, setCategory] = React.useState("All");
    const [products, setProducts] = React.useState([] as Product[])
    const [productOrder, setProductOrder] = React.useState<Order>({ id: "1", date: new Date(), status: 'test', totalPrice: 0, items: [] });

    const rowsPerPage = 6;
    const pages = Math.ceil((productOrder.items.length)/rowsPerPage)

    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      return productOrder.items.slice(start, end);
    }, [page, productOrder.items]);

    const handleAddToOrder = (product: Product, selectedSize: string) => {
      const selectedSizeInfo = product.sizeList.find(sizeInfo => sizeInfo.size === selectedSize)

      const newItem = {
        note: '',
        productID: product.id,
        quantity: 1, 
        size: selectedSize,
        price: selectedSizeInfo?.price,
        toppings: [], 
      };

      setProductOrder(prevOrder => ({
        ...prevOrder,
        items: [...prevOrder.items, newItem]
      }))

      console.log(productOrder)
    }

    React.useEffect(() => {
      fetch(`/api/products?category=${category}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
    }, [category])
    
    return (
      <div className="flex flex-col bg-light-background ">
        <div className="mt-8 mb-4 mx-8 bg-white p-4">
          <h4 className="font-semibold">Orders/ Add Order</h4>
          <h1 className="text-purple-600 text-2xl font-bold">Orders</h1>
        </div>
        <div className="flex flex-row flex-1">
          {/* Container bên trái */}
          <div className="relative flex flex-col w-3/5 mt-4 mx-8 bg-heavy-background p-4">
            <h1 className="text-purple-600 text-2xl font-bold mb-8">Choose Menu</h1>
            <CategoryGrid onPress={(category) => setCategory(category)} />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-4">
                  {products.map((product) => (                    
                      <OrderProductCard key={product.id} product={product} handleAddToOrder={handleAddToOrder} />
                  ))}
            </div>
          </div>
          {/* //OrderInfoSection */}
          <div className="flex flex-col w-2/5 mt-4 ms-2 me-8 bg-white p-4 h-fit">
            <h1 className="text-2xl font-bold">Order Information</h1>
            <Table 
              aria-label="Order Table pagination"
              bottomContent={
                <div className="flex justify-center h-full">
                  <Pagination
                  
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }
              className="mt-2"
            >
              <TableHeader>
                <TableColumn className="w-2/5">Product</TableColumn>
                <TableColumn className="w-1/5">Price</TableColumn>
                <TableColumn className="w-1/5">Quantity</TableColumn>
                <TableColumn className="w-1/5">Total</TableColumn>
              </TableHeader>
              <TableBody items={items}>
                {productOrder.items.slice(0, 6).map(item => (
                  <TableRow key="1">
                    <TableCell>
                      <div className="mb-2">
                          <h1 className="font-semibold ">Milk Coffee</h1>
                          <h1 className="text-gray-400">{item.quantity}</h1>
                      </div>
                    </TableCell>
                    <TableCell>
                      <input
                        className='w-full px-2 py-1 border rounded-md mt-1 mb-4'
                        type='text'
                        value={item.quantity}
                        onChange={() => {}}
                      />
                    </TableCell>

                    <TableCell>
                    <input
                        className='w-full px-2 py-1 border rounded-md mt-1 mb-4'
                        type='number'
                        // value={}
                        onChange={() => {}}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex">
                        <input
                          className='w-full px-2 py-1 border rounded-md mt-1 mb-4'
                          type='text'
                          // value={}
                          onChange={() => {}}
                        />
                        <button type="button" className="absolute top-0 -right-5 my-3">
                          <IoTrash />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>                    
                ))}
             
              </TableBody>
            </Table>     
            {/* Chỗ tính tổng và nút checkout*/}
            <div className="flex flex-col border border-purple-600 mt-4 p-4 rounded-md">
              <div className="flex justify-between">
                <h2>Discount</h2>
                <h2>1 USD</h2>
              </div>
              <div className="flex justify-between">
                <h2 className="font-bold">Subtotal</h2>
                <h2 className="font-bold">1 USD</h2>
              </div>
              <button
                      onClick={()=>{}}
                      type="button"
                      className="bg-purple-600 rounded-md bottom-0 mt-2 py-1"
                  >
                      <h3 className="text-white font-semibold py-1">Continue to Checkout</h3>
              </button>
            </div>      
          </div>

        </div>
      </div>
    )
  }