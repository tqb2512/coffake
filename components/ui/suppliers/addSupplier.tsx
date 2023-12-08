'use client'

export default function SupplierAddForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { name, email, address, phone, company } = e.currentTarget
        const supplier = {
            name: (name as any).value,
            email: email.value,
            address: address.value,
            phone: phone.value,
            company: company.value
        }

        fetch("/api/suppliers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(supplier)
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input type="text" name="address" id="address" />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input type="number" name="phone" id="phone" />
            </div>
            <div>
                <label htmlFor="company">Company</label>
                <input type="text" name="company" id="company" />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}