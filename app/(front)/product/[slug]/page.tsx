import AddtoCart from "@/components/products/AddToCart";
import { convertDocToObj } from "@/lib/utils";
import productService from "@/lib/services/productService";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-semibold">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Back Link */}
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Product Image */}
        <div className="lg:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="lg:col-span-1 space-y-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-gray-600">{product.brand}</p>
          <p className="text-yellow-500 font-medium">
            {product.rating} ⭐ ({product.numReviews} reviews)
          </p>
          <p className="text-gray-700">{product.description}</p>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="lg:col-span-1 p-6 rounded-lg shadow-md">
          <div className="flex justify-between text-lg font-semibold mb-4">
            <span>Price:</span>
            <span className="text-green-600">€{product.price}</span>
          </div>

          <div className="flex justify-between text-lg font-medium mb-4">
            <span>Status:</span>
            <span
              className={`${
                product.countInStock > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.countInStock > 0 ? "In Stock" : "Unavailable"}
            </span>
          </div>

          {product.countInStock > 0 && (
            <div className="mt-4">
              <AddtoCart
                item={{
                  ...convertDocToObj(product),
                  qty: 0,
                  color: "",
                  size: "",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
