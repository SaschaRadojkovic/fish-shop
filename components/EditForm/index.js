import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import {
  StyledForm,
  StyledHeading,
  StyledLabel,
} from "../ProductForm/ProductForm.styled";
import { StyledButton } from "../Button/Button.styled";

export default function EditForm({ handleUpdate, onEditClick }) {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR(id ? `/api/products/${id}` : null);
  // const { data, error} = useSWR(`/api/products`);

  return (
    <>
      <StyledForm onSubmit={handleUpdate}>
        <StyledHeading>Update Fish Product</StyledHeading>
        <StyledLabel htmlFor="name">
          Name:
          <input type="text" id="name" name="name" />
          <input type="hidden" id="id" name="id" value={data.id} />
        </StyledLabel>
        <StyledLabel htmlFor="description">
          Description:
          <input type="text" id="description" name="description" />
        </StyledLabel>
        <StyledLabel htmlFor="price">
          Price:
          <input type="number" id="price" name="price" min="0" />
        </StyledLabel>
        <StyledLabel htmlFor="currency">
          Currency:
          <select id="currency" name="currency">
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </StyledLabel>
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </>
  );
}
