'use client'

import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from '@nextui-org/react';
import { Product } from '@prisma/client';
import { HiDotsVertical } from 'react-icons/hi';
import React from 'react';
import { useRouter } from 'next/navigation';

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
        <form className='flex flex-1 flex-col bg-white p-4' onSubmit={() => {}}>
            <label className='mr-2'>* Product name: 
            </label>
            <input
                className='px-2 py-1 border rounded-md mt-1 mb-4'
                type='text'
                placeholder='product name'
                value={product?.name}
                onChange={() => {}}
            />
//
            <label>Category</label>
            <select className='px-2 py-1 border rounded-md mt-1 mb-4'>
                <option value="">Uncategorized</option>
            </select>


            <label>Photos</label>
            <div className="mt-1 mb-2 flex flex-wrap gap-2">
                <label className="border w-24 h-24 bg-gray-300 rounded-md flex items-center text-center">
                    <div>Upload photos</div>
                    <input type="file" className="hidden" onChange={()=>{}}/>
                </label>
            </div>
            <label>Description</label>
            <textarea
                className='px-2 py-1 border rounded-md mt-1 mb-4'
                placeholder="description"
                value=""
                onChange={()=>{}}
            />

            <label>Price (USD)</label>
            <input
                className='px-2 py-1 border rounded-md mt-1 mb-4'
                type="number"
                placeholder="price"
            />

            
            <label>Variation</label>
            <textarea
                className='px-2 py-1 border rounded-md mt-1 mb-4'
                placeholder="?????"
                value=""
                onChange={()=>{}}
            />

            <label>Stock</label>
            <input
                className='px-2 border rounded-md mb-4 focus:border-purple-600'
                type="number"
                placeholder="price"
            />

            <div className='flex flex-row-reverse'>
                <button onClick={handleClick} type="submit" className="bg-primary-color text-white py-2 px-8 rounded-sm ms-2">
                    Save
                </button>
                <button onClick={handleClick} type="button" className="bg-gray-400 border border-gray-500 text-white py-2 px-8 rounded-sm">Cancel</button>
            </div>
        </form>
    )
}