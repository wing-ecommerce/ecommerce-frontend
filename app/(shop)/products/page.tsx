import { Suspense } from "react";
import ProductsClient from "./ProductClient";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsClient />
    </Suspense>
  );
}