'use client'

import React from 'react'
import { Shift, Employee, ShiftEmployees } from '@prisma/client'
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button, Modal, ModalContent, ModalHeader, ModalBody, Textarea, Input } from '@nextui-org/react';
import { HiDotsVertical } from 'react-icons/hi';

export default function AddEmployeeModal({ shift, setShift, isOpen, setIsOpen }: { shift: Shift, setShift: React.Dispatch<React.SetStateAction<Shift>>, isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [employees, setEmployees] = React.useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = React.useState<ShiftEmployees>({} as ShiftEmployees);

    React.useEffect(() => {
        fetch(`/api/users`)
            .then(res => res.json())
            .then(data => setEmployees(data))
    }, [])

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={toggleModal}
                placement="top-center"
            >
                <ModalContent>
                    <ModalHeader>Add Employee</ModalHeader>
                    <ModalBody>
                        <Table
                            aria-label="Employees">
                            <TableHeader>
                                <TableColumn>Name</TableColumn>
                                <TableColumn>Actions</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell className="w-10">
                                            <Button
                                                {...(shift.employees?.find((e) => e.employeeID == employee.id) ? { disabled: true } : {})}
                                                {...(selectedEmployee.employeeID == employee.id ? { color: "secondary" } : {})}
                                                onClick={() => {
                                                    setSelectedEmployee({ employeeID: employee.id, employeeName: employee.name } as ShiftEmployees)
                                                }}>Select</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Input
                            label="From"
                            type="time"
                            onChange={(e) => {
                                setSelectedEmployee(prevEmployee => ({ ...prevEmployee, from: e.target.value }))
                            }}
                        />

                        <Input
                            label="To"
                            type="time"
                            onChange={(e) => {
                                setSelectedEmployee(prevEmployee => ({ ...prevEmployee, to: e.target.value }))
                            }}
                        />

                        <Button
                            className="mt-2"
                            onClick={() => {
                                setShift(prevShift => ({
                                    ...prevShift,
                                    employees: [...prevShift.employees || [], { ...selectedEmployee, workHours: (new Date(`1970-01-01T${selectedEmployee.to}:00.000Z`).getTime() - new Date(`1970-01-01T${selectedEmployee.from}:00.000Z`).getTime()) / 1000 / 60 / 60 }]
                                }))
                                toggleModal()
                            }}
                        >Add</Button>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}