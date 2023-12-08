'use client'

import { Supplier } from '@prisma/client';
import React from "react"

export default function SupplierInfoForm({ params }: { params: { supplierId: string } }) {
    
    const [supplier, setSupplier] = React.useState({} as Supplier);

    React.useEffect(() => {
        fetch(`/api/suppliers/${params.supplierId}`)
            .then((res) => res.json())
            .then((data) => setSupplier(data));
    }, [params.supplierId])
    
    return (
        <div>
            <h1>{supplier.name}</h1>
            <p>{supplier.email}</p>
            <p>{supplier.phone}</p>
        </div>
    )
}