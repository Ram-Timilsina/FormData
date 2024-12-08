import React from "react";
import { useEffect, useState } from "react";
const Practice = () => {
  const [product, setProduct] = useState("");
  useEffect(() => {
    const FetchingDats = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = response.json();
      setProduct(data);
    };
    FetchingDats();
  }, []);
  return (
    <>
      <h1>Product Fetch</h1>
    </>
  );
};
export default Practice;
