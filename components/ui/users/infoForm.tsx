"use client";

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
  { name: "Date", key: "date" },
  { name: "Start Time", key: "from" },
  { name: "End Time", key: "to" },
  { name: "Total Hours", key: "totalHours" }
];

export default function UserInfoForm({ params, }: { params: { username: string } }) {
  const [employee, setEmployee] = React.useState({} as Employee);
  const [shifts, setShifts] = React.useState([] as Shift[]);
  const [password, setPassword] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    fetch(`/api/users/${params.username}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data));
  }, []);

  React.useEffect(() => {
    fetch(`/api/shifts/byUserID?userId=${employee.id}`)
      .then((res) => res.json())
      .then((data) => setShifts(data));
  }, [employee]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      fetch(`/api/users/${params.username}`, {
        method: "PUT",
        body: JSON.stringify({
          ...employee,
          password: password,
        }),
      });
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg">
      <div>
        <label className="text-violet-800 text-3xl">
          {"Employee's Details"}
          <Button onClick={handleEditClick} className="float-right">
            {isEditing ? "Apply" : "Edit"}
          </Button>
        </label>
        <Divider className="my-4" />
        
        <div className="grid grid-cols-3 gap-6 mt-5 mb-10">
          <div className="flex flex-col gap-2">
          </div>

          <div className="flex flex-col gap-2">
            <Input  label="Name" disabled={!isEditing} value={employee.name} />
            <Input label="Email" disabled={!isEditing} value={employee.email} />
            <Input label="Position" disabled={!isEditing} value={employee.position} />
            <Input label="Salary" disabled={!isEditing} value={employee.salary?.toString()} />
          </div>
          <div className="flex flex-col gap-2">
            <Input label="Username" disabled={!isEditing} value={employee.username} />
            <Input label="Password" disabled={!isEditing} value={password} onValueChange={(value) => {setPassword(value)}} type="password" />
            <Input label="Phone Number" disabled={!isEditing} value={employee.phone} />
          </div>
        </div>

        <label className="text-violet-800 text-3xl">
          {"Employee's Shifts"}
        </label>
        <Divider className="my-4" />
        {!shifts.length ? <label className="text-black">
          {"No shifts found"}
        </label> :
          <Table aria-label="Shifts">
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.key}>{column.name}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {shifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell>{shift.date.toString()}</TableCell>
                  <TableCell>{shift.employees.find((curEmployee) => curEmployee.employeeID === employee.id)?.from}</TableCell>
                  <TableCell>{shift.employees.find((curEmployee) => curEmployee.employeeID === employee.id)?.to}</TableCell>
                  <TableCell>{shift.employees.find((curEmployee) => curEmployee.employeeID === employee.id)?.workHours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>}
      </div>
    </div>
  );
}
