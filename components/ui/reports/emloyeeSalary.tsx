import { Employee, Shift } from "@prisma/client";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Pagination } from "@nextui-org/react";
import React from "react";

const columns = [
    { name: "Name", uid: "name" },
    { name: "Total Shift", uid: "totalShift" },
    { name: "Total Hour", uid: "totalHour" },
    { name: "Salary", uid: "salary" },
    { name: "Total Salary", uid: "totalSalary" },
];

type EmployeeSalary = {
    id: string;
    name: string;
    totalShift: number;
    totalHour: number;
    salary: number;
    totalSalary: number;
}

export default function EmployeeSalary({ shifts, employees }: { shifts: Shift[], employees: Employee[] }) {

    const [tableData, setTableData] = React.useState<EmployeeSalary[]>([]);

    React.useEffect(() => {
        const data: EmployeeSalary[] = [];
        shifts.forEach((shift) => {
            shift.employees.forEach((employee) => {

                const index = data.findIndex((item) => item.id === employee.employeeID);
                const salary = employees.find((employee) => employee.id === employee.id)?.salary;

                console.log(salary);

                if (index === -1) {
                    data.push({
                        id: employee.employeeID,
                        name: employee.employeeName,
                        totalShift: 1,
                        totalHour: employee.workHours,
                        salary: salary || 0,
                        totalSalary: salary ? salary * employee.workHours : 0
                    });
                } else {
                    data[index].totalShift += 1;
                    data[index].totalHour += employee.workHours;
                    data[index].totalSalary += salary ? salary * employee.workHours : 0;
                }
            })
        })
        setTableData(data);
    }, [shifts]);

    return (
        <div>
            <h2 className="text-xl font-bold">Employee Salary</h2>
            <div className="h-72 w-full mt-5">
                <Table
                    className="h-70"
                    isHeaderSticky
                    aria-label="Employee Salary">
                    <TableHeader>
                        {columns.map((column) => (
                            <TableColumn key={column.uid}>
                                {column.name}
                            </TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {tableData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.totalShift}</TableCell>
                                <TableCell>{item.totalHour}</TableCell>
                                <TableCell>{item.salary}</TableCell>
                                <TableCell>{item.totalSalary}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )

}