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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Employee, Shift } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";
import { HiOutlineCamera } from "react-icons/hi2";

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
    fetch(`/api/shifts/byUserID?userId=${employee?.id}`)
      .then((res) => res.json())
      .then((data) => setShifts(data));
  }, [employee]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      if (employee.name === "" || employee.email === "" || employee.position === "" || employee.salary === 0 || employee.name === undefined || employee.email === undefined) {
        alert("Please fill all the fields");
        return;
      }
      fetch(`/api/users/${params.username}`, {
        method: "PUT",
        body: JSON.stringify({
          ...employee,
          password: password,
        }),
      });
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
  }

  function upLoadImage() {
    
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

        <div className="grid grid-cols-3 gap-7 mt-5 mb-10">
          <div className="flex flex-col gap-1">
            <label className="border w-50 h-54 bg-gray-300 rounded-md flex items-center text-center relative">
              <CldUploadWidget uploadPreset="zwrrw7i4" options={{
                sources: ['local', 'url'],
                multiple: false,
                maxFiles: 1
              }}
                onSuccess={(result) => {
                  setEmployee({ ...employee, imageUrl: (result.info as { secure_url: string }).secure_url });
                }}
              >
                {({ open }) => {
                  if (employee.imageUrl !== "") {
                    return (
                      <div className="absolute inset-0 h-[260px] rounded-lg" onClick={() => open()}>
                        <img src={employee.imageUrl} className="object-cover w-full h-full rounded-lg" />
                      </div>
                    )
                  }
                  return (
                    <div className="absolute inset-0 flex flex-col justify-center items-center" onClick={() => open()}>
                      <HiOutlineCamera className="text-4xl" />
                      <p className="text-gray-500">Upload Image</p>
                    </div>
                  )
                }}
              </CldUploadWidget>
            </label>
          </div>

          <div className="flex flex-col gap-3 col-span-2">
            <Input label="Name" disabled={!isEditing} value={employee?.name} onValueChange={(value) => { setEmployee({ ...employee, name: value }) }} />
            <Input label="Email" disabled={!isEditing} value={employee?.email} onValueChange={(value) => { setEmployee({ ...employee, email: value }) }} />
            <Select
              label="Position"
              value={employee.position}
              selectedKeys={[employee.position]}
              onChange={(e) => setEmployee({ ...employee, position: e.target.value })}>
              <SelectItem key="Manager" value="Manager">Manager</SelectItem>
              <SelectItem key="Cashier" value="Cashier">Cashier</SelectItem>
              <SelectItem key="Barista" value="Barista">Barista</SelectItem>
            </Select>
            <Input label="Salary" type="number" endContent="$" disabled={!isEditing} value={employee?.salary?.toString()} onValueChange={(value) => { setEmployee({ ...employee, salary: parseInt(value) }) }} />
          </div>
          <div className="flex flex-col gap-3">
            <Input label="Username" disabled={!isEditing} value={employee?.username} />
            <Input label="Password" disabled={!isEditing} value={password} onValueChange={(value) => { setPassword(value) }} type="password" />
            <Input label="Phone Number" disabled={!isEditing} value={employee?.phone} />
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
                  <TableCell>{formatDate(shift.date.toString())}</TableCell>
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
