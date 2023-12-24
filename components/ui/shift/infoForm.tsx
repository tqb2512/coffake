'use client'

import {
    Divider,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Input,
} from "@nextui-org/react";
import { Employee, Shift } from "@prisma/client";
import React from "react";

const columns = [
    { name: "Name", key: "name" },
    { name: "From", key: "from" },
    { name: "To", key: "to" },
]

export default function ShiftInfoForm({ params }: { params: { shiftId: string } }) {
    const [shift, setShift] = React.useState({} as Shift);

    React.useEffect(() => {
        fetch(`/api/shifts/${params.shiftId}`)
            .then((res) => res.json())
            .then((data) => setShift(data));
    }, []);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
    }

    return (
        <div className="bg-white p-4 rounded-lg">
            <div>
                <label className="text-violet-800 text-3xl">
                    {"Shift's Details"}
                </label>
                <Divider className="my-4" />

                <div className="grid grid-cols-1 gap-6 mt-5 mb-10">
                    <div className="flex flex-col gap-2">
                        <Input label="Date" value={formatDate(shift?.date?.toString())} disabled />
                    </div>
                </div>

                <label className="text-violet-800 text-3xl">
                    {"Shift's Employees"}
                </label>
                <Divider className="my-4" />
                {!shift?.employees?.length ? <label className="text-black">
                    {"No employee found"}
                </label> :
                    <Table aria-label="Shifts">
                        <TableHeader>
                            {columns.map((column) => (
                                <TableColumn key={column.key}>{column.name}</TableColumn>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {shift.employees.map((shift) => (
                                <TableRow key={shift.employeeID}>
                                    <TableCell>{shift.employeeName}</TableCell>
                                    <TableCell>{shift.from}</TableCell>
                                    <TableCell>{shift.to}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>}
            </div>
        </div>
    )
}


