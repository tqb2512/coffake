"use client";

import {
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Employee } from "@prisma/client";
import React from "react";

const columns = [
  { name: "Name", key: "name" },
  { name: "Email", key: "email" },
  { name: "Position", key: "position" },
  { name: "Salary", key: "salary" },
  { name: "Username", key: "username" },
  { name: "Phone Number", key: "phone" },
];

export default function UserInfoForm({
  params,
}: {
  params: { username: string };
}) {
  const [employee, setEmployee] = React.useState({} as Employee);

  React.useEffect(() => {
    fetch(`/api/users/${params.username}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data));
  }, [params.username]);

  return (
    <div>
      <label className="font-light text-violet-800 text-3xl">
        {"Employee's Details"}
      </label>
      <Divider className="my-4" />
      <Table>
        <TableHeader>
          {columns.map((column) => (
            <TableColumn className="font-bold" key={column.key}>
              {column.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>{employee.position}</TableCell>
            <TableCell>{employee.salary}</TableCell>
            <TableCell>{employee.username}</TableCell>
            <TableCell>{employee.phone}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    // <div>
    //     <h1>{employee.name}</h1>
    //     <p>{employee.email}</p>
    //     <p>{employee.position}</p>
    //     <p>{employee.salary}</p>
    //     <p>{employee.username}</p>
    //     <p>{employee.phone}</p>
    // </div>
  );
}
