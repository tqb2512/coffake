'use client'

import React from 'react'
import { Shift, ShiftEmployees } from '@prisma/client'
import { Table, TableHeader, TableBody, TableCell, TableColumn, TableRow, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button, Link } from '@nextui-org/react';
import { HiDotsVertical } from 'react-icons/hi';
import { DateRangePicker, DateRangePickerValue } from '@tremor/react';
import { useRouter } from 'next/navigation';


export default function ShiftTable() {

    const router = useRouter();
    const [shifts, setShifts] = React.useState<Shift[]>([]);
    const [dates, setDates] = React.useState<DateRangePickerValue>({ from: new Date(), to: new Date() } as DateRangePickerValue);
    const [employees, setEmployees] = React.useState<ShiftEmployees[]>([]);

    React.useEffect(() => {
        fetch(`/api/shifts?from=${dates.from?.toISOString()}&to=${dates.to?.toISOString()}`)
            .then(res => res.json())
            .then(data => setShifts(data))
    }, [dates])

    React.useEffect(() => {
        shifts.forEach((shift) => {
            shift.employees.forEach((employee) => {
                if (!employees.includes(employee)) {
                    setEmployees([...employees, employee])
                }
            })
        })
    }, [shifts])

    return (
        <div className='bg-white p-4 rounded-lg'>
            <div>
                <div className="float-left max-w my-5">
                    <DateRangePicker className="" enableSelect={false} value={dates} onValueChange={(value) => { setDates(value); }} />
                </div>  
                <div>
                    {shifts.length != 0 &&
                        <Table
                            aria-label="Shifts">
                            <TableHeader>
                                <TableColumn>Date</TableColumn>
                                <TableColumn>Employees</TableColumn>
                                <TableColumn>Actions</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {shifts.map((shift) => (
                                    <TableRow key={shift.id}>
                                        <TableCell>{shift.date.toString()}</TableCell>
                                        <TableCell>
                                            {shift.employees.map((employee) => (
                                                <div key={employee.employeeID}>{employee.employeeName} from {employee.from} to {employee.to}</div>
                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button>
                                                        <HiDotsVertical />
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={() => {
                                                        router.push(`/shifts/${shift.id}`)
                                                    }}>View
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
                </div>
            </div>
        </div>
    )
}