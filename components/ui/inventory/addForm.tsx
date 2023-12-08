'use client'

export default function InventoryAddForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, unitPrice, stock, unit } = e.currentTarget;
        const product = {
            name: (name as any).value,
            unitPrice: parseInt(unitPrice.value),
            stock: parseInt(stock.value),
            unit: unit.value
        };

        fetch("/api/inventory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
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
                    <label htmlFor="unit">Unit</label>
                    <input type="text" name="unit" id="unit" />
                </div>
                <div>
                    <label htmlFor="unitPrice">Unit Price</label>
                    <input type="number" name="unitPrice" id="unitPrice" />
                </div>
                <div>
                    <label htmlFor="stock">Stock</label>
                    <input type="number" name="stock" id="stock" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
