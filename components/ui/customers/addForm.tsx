'use client'

export default function CustomerAddForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, email, phone } = e.currentTarget;
        const customer = {
            name: (name as any).value,
            email: (email as any).value,
            phone: (phone as any).value
        };

        fetch("/api/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name="phone" id="phone" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
