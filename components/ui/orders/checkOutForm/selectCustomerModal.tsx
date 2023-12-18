'use client'

import React from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Order, Customer } from '@prisma/client'

const searchColumns = [
    { name: "Name", uid: "name" },
    { name: "Phone", uid: "phone" },
]

export default function SelectCustomerModal({ isOpen, setIsOpen, order }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, order: Order }) {

    const [customer, setCustomer] = React.useState<Customer[]>([]);
    const [searchValue, setSearchValue] = React.useState("");
    const [searchColumn, setSearchColumn] = React.useState(searchColumns[0].uid);

    React.useEffect(() => {
        fetch(`/api/customers`)
            .then((res) => res.json())
            .then((data) => setCustomer(data));
    }, []);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = () => {
        fetch(`/api/orders/${order.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={toggleModal}
            placement="top-center"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Select Customer</ModalHeader>
                <ModalBody>
                    <Input label="Search" placeholder="Search by" value={searchValue} onValueChange={(value) => setSearchValue(value)} endContent={
                        <Dropdown>
                            <DropdownTrigger>
                                <Button>
                                    {searchColumns.find((column) => column.uid === searchColumn)?.name}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                {searchColumns.map((column) => (
                                    <DropdownItem
                                        key={column.uid}
                                        onClick={() => setSearchColumn(column.uid)}
                                    >
                                        {column.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    } />
                    <Table>
                        <TableHeader>
                            <TableColumn>Name</TableColumn>
                            <TableColumn>Phone</TableColumn>
                            <TableColumn>Action</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {customer
                                .filter((item) => {
                                    if (searchColumn in item) {
                                        const searchValueLower = searchValue.toLowerCase();
                                        return String(item[searchColumn as keyof typeof item]).toLowerCase().includes(searchValueLower);
                                    }
                                    return false;
                                })
                                .map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell>{customer.name}</TableCell>
                                        <TableCell>{customer.phone}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => {
                                                    toggleModal()
                                                    order.customerID = customer.id
                                                    order.customerName = customer.name
                                                }}
                                            >
                                                Select
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}