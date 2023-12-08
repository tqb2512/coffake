'use client'

import { Employee } from '@prisma/client';
import React from "react"

export default function UserInfoForm({ params }: { params: { username: string } }) {
    
    const [employee, setEmployee] = React.useState({} as Employee);

    React.useEffect(() => {
        fetch(`/api/users/${params.username}`)
            .then((res) => res.json())
            .then((data) => setEmployee(data));
    }, [params.username])
    
    return (
        <div>
            <h1>{employee.name}</h1>
            <p>{employee.email}</p>
            <p>{employee.position}</p>
            <p>{employee.salary}</p>
            <p>{employee.username}</p>
            <p>{employee.phone}</p>
        </div>
    )
}