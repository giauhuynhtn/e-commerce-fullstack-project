import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { RootState } from "../redux/store";
import MenuBar from "components/MenuBar";
import ProductForm from "components/ProductForm";

function ProductUpdate() {
  const { products } = useSelector((state: RootState) => {
    return state;
  });

  const { productId } = useParams<{ productId: string }>();

  const selectProduct = products.items.find(
    (product) => product._id === productId
  );

  return (
    <>
      <MenuBar />
      {selectProduct !== undefined ? (
        <ProductForm selectedProduct={selectProduct} />
      ) : null}
    </>
  );
}

export default ProductUpdate;
