import useSWR from "swr";

import { StyledButton } from "../Button/Button.styled";
import { ProductCard } from "./Product.styled";
import Comments from "../Comments";
import { useState } from "react";

import EditForm from "../EditForm";
import { useRouter } from "next/router";

export default function Product({ onDelete }) {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR(id ? `/api/products/${id}` : null);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing(true);
  }
  async function handleUpdate(event) {
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
        //macht in diesem beispiel nichts
        // const responseData = await response.json();
        // console.log("response", responseData);
        mutate(data);
        event.target.reset();
      } else {
        console.error(`Error:${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      {data.reviews.length > 0 && <Comments reviews={data.reviews} />}
      <StyledButton type="button" onClick={() => router.push("/")}>
        Back to all
      </StyledButton>

      <StyledButton type="button" onClick={handleEditClick}>
        ✏️
      </StyledButton>

      <StyledButton type="button" onClick={onDelete}>
        ❌
      </StyledButton>

      {isEditing ? <EditForm handleUpdate={handleUpdate}></EditForm> : null}
    </ProductCard>
  );
}
