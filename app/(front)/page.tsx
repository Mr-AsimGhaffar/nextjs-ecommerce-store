import CarouselNavigation from "@/components/CarouselNavigation";
import ProductItem from "@/components/products/ProductItem";
import productService from "@/lib/services/productService";
import { convertDocToObj } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Ride Darker",
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    "Nextjs, Server components, Next auth, daisyui, zustand",
};

export default async function Home() {
  const featuredProducts = await productService.getFeatured();
  const latestProducts = await productService.getLatest();
  return (
    <>
      <div className="w-full carousel rounded-box mt-4 rounded-lg shadow-lg p-2">
        {featuredProducts.map((product, index) => (
          <div
            key={product._id}
            id={`slide-${index}`}
            className="carousel-item relative w-full h-[400px] md:h-[500px] lg:h-[600px]"
          >
            <Link href={`/product/${product.slug}`} className="w-full h-full">
              <Image
                src={product.banner as string}
                alt={product.name}
                width={800}
                height={400}
                className="w-full h-full object-contain"
                priority={index === 0}
              />
            </Link>

            <CarouselNavigation
              totalSlides={featuredProducts.length}
              currentIndex={index}
            />
          </div>
        ))}
      </div>
      <h2 className="text-2xl py-12">Latest Products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {latestProducts.map((product) => (
          <ProductItem key={product.slug} product={convertDocToObj(product)} />
        ))}
      </div>
    </>
  );
}
