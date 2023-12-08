'use client'

import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from '@nextui-org/react';
import { Product } from '@prisma/client';
import { HiDotsVertical } from 'react-icons/hi';
import React from 'react';

export default function ProductInfoForm( params: { productId: string }) {

    const [product, setProduct] = React.useState<Product>();
    const [name, setName] = React.useState("");

    React.useEffect(() => {
        fetch(`/api/products/${params.productId}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, []);
    
    return (
        <div>
            {product?.name}
        </div>
    )
}