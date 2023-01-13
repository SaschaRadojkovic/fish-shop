import { useRouter } from "next/router";

import Product from "../components/product";

export default function ProductDetailsPage() {
  const router = useRouter();
  const {
    query: { id },
    push,
  } = router;

  async function handleEditProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(productData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        push(`/`);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleDeleteProduct() {
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      push("/");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Product onSubmit={handleEditProduct} onDelete={handleDeleteProduct} />
  );
}
