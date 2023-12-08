'use client'

import { Employee } from "@prisma/client";

export default function UserAddForm() {
    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, email, position, salary, username, password, phone } = e.currentTarget;
        const employee = {
            name: (name as any).value,
            email: email.value,
            position: position.value,
            salary: parseInt(salary.value),
            username: username.value,
            password: password.value,
            phone: phone.value
        };

        fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    }

    return (
        <form onSubmit={handlerSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div>
                <label htmlFor="position">Position</label>
                <input type="text" name="position" id="position" />
            </div>
            <div>
                <label htmlFor="salary">Salary</label>
                <input type="number" name="salary" id="salary" />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input type="number" name="phone" id="phone" />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}