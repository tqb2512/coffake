import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Shift } from "@prisma/client";
import React from "react";

const columns = [
    { name: "Name", uid: "name" },
    { name: "Total hours", uid: "totalHours" },
];

type EmployeeWithHours = {
    name: string;
    totalHours: number;
    id: string;
};

export default function MostActiveEmployee({ shifts }: { shifts: Shift[] }) {

    const [employees, setEmployees] = React.useState<EmployeeWithHours[]>([]);

    React.useEffect(() => {
        const data: EmployeeWithHours[] = [];
        shifts.forEach((shift) => {
            shift.employees.forEach((employee) => {
                const index = data.findIndex((item) => item.id === employee.employeeID);
                if (index === -1) {
                    data.push({
                        name: employee.employeeName,
                        totalHours: employee.workHours,
                        id: employee.employeeID
                    });
                } else {
                    data[index].totalHours += employee.workHours;
                }
            })
        })
        data.sort((a, b) => b.totalHours - a.totalHours);
        setEmployees(data);
    }, [shifts]);

    return (
        <div>
            <h2 className="text-xl font-bold">Most Active Employee</h2>
            <div className="h-60 w-full mt-5">
                <Table
                    aria-label="Table"
                >
                    <TableHeader>
                        {columns.map((column) => (
                            <TableColumn key={column.uid}>{column.name}</TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.totalHours}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}


