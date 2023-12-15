'use client'

import React from 'react'
import { Shift, Employee } from '@prisma/client'
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from '@nextui-org/react';
import { HiDotsVertical } from 'react-icons/hi';
import { DatePicker } from '@tremor/react';
import AddEmployeeModal from './addEmployeeModal';

export default function AddShiftForm() {

    const [shift, setShift] = React.useState<Shift>({ date: new Date() } as Shift);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [employees, setEmployees] = React.useState<Employee[]>([]);

    React.useEffect(() => {
        fetch(`/api/users`)
            .then(res => res.json())
            .then(data => setEmployees(data))
    }, [])

    const addShift = () => {
        fetch(`/api/shifts`, {
            method: 'POST',
            body: JSON.stringify(shift),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div>
            <DatePicker className="max-w-sm mx-auto" value={shift.date} onValueChange={(value) => { setShift(prevShift => ({ ...prevShift, date: value || new Date() })) }} />
            <div>
                <AddEmployeeModal shift={shift} setShift={setShift} isOpen={isOpen} setIsOpen={setIsOpen} />
                <Table
                    aria-label="Employees">
                    <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Actions</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {shift.employees?.map((employee) => (
                            <TableRow key={employee.employeeID}>
                                <TableCell>{employee.employeeName}</TableCell>
                                <TableCell>
                                    <Button onClick={() => {
                                        setShift(prevShift => ({
                                            ...prevShift,
                                            employees: prevShift.employees?.filter((e) => e.employeeID != employee.employeeID)
                                        }))
                                    }}>Remove</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Button onClick={addShift}>Add Shift</Button>
        </div>
    )
}
