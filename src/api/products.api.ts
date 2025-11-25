import type { Product, ProductsResponse, AddProductPayload } from "@/types/Product";

export async function fetchProductsAPI(): Promise<Product[]> {
    const res = await fetch("https://dummyjson.com/products");
    const data: ProductsResponse = await res.json();
    return data.products;
}

export async function fetchProductByIdAPI(id: number): Promise<Product> {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data: Product = await res.json();
    return data;
}

export async function addProductAPI(payload: AddProductPayload): Promise<Product> {
    const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data: Product = await res.json();
    return data;
}

export async function deleteProductAPI(id: number): Promise<void> {
    await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
    });
}





