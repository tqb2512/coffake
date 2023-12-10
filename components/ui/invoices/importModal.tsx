'use client'


import React from "react"
import { Invoice, Supplier, Inventory } from "@prisma/client"

export default function InvoiceImportModal({ invoice, setInvoice}: { invoice: Invoice, setInvoice: React.Dispatch<React.SetStateAction<Invoice>>}) {

    const [isOpen, setOpen] = React.useState(false)
    const [suppliers, setSuppliers] = React.useState<Supplier[]>([])
    const [inventories, setInventories] = React.useState<Inventory[]>([])

    const toggleModal = () => {
        setOpen(!isOpen);
    };

    React.useEffect(() => {
        fetch("/api/suppliers")
            .then((res) => res.json())
            .then((data) => setSuppliers(data))
    }, [])

    React.useEffect(() => {
        fetch("/api/inventory")
            .then((res) => res.json())
            .then((data) => setInventories(data))
    }, [])

    const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setInvoice(
            {
                ...invoice,
                importList: [
                    ...invoice.importList || [],
                    {
                        ingredientId: e.currentTarget.ingredientId.value,
                        ingredientName: inventories.find((inventory) => inventory.id === e.currentTarget.ingredientId.value)?.name || "",
                        quantity: Number(e.currentTarget.quantity.value),
                        unitPrice: Number(e.currentTarget.unitPrice.value),
                        suppilerId: e.currentTarget.suppilerId.value,
                        supplierName: suppliers.find((supplier) => supplier.id === e.currentTarget.suppilerId.value)?.name || "",
                        note: e.currentTarget.note.value
                    }
                ]
            }
        )
        toggleModal()
    }

    return (
        <div className="App">
            <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style={{ transition: "all .15s ease" }}
                onClick={toggleModal}
            >
                Open Modal
            </button>

            {isOpen && (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">                                
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={toggleModal}
                                >
                                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                </button>
                            </div>
                            <div>
                                <form onSubmit={handleSubmmit}>
                                    <div className="flex flex-col">
                                        <label htmlFor="ingredientId">Ingredient</label>
                                        <select name="ingredientId" id="ingredientId" className="border border-gray-300 rounded-md">
                                            {inventories.map((inventory) => (
                                                <option key={inventory.id} value={inventory.id}>{inventory.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="quantity">Quantity</label>
                                        <input type="number" name="quantity" id="quantity" className="border border-gray-300 rounded-md"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="unitPrice">Unit Price</label>
                                        <input type="number" name="unitPrice" id="unitPrice" className="border border-gray-300 rounded-md"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="suppilerId">Supplier</label>
                                        <select name="suppilerId" id="suppilerId" className="border border-gray-300 rounded-md">
                                            {suppliers.map((supplier) => (
                                                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="note">Note</label>
                                        <textarea name="note" id="note" className="border border-gray-300 rounded-md"/>
                                    </div>
                                    <button type="submit">Add</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
