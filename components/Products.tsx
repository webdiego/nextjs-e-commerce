"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import DrawerProducts from "./DrawerProducts";
import { Stripe } from "stripe";

interface ClientProductsProps {
  products: Stripe.Product[];
}

export default function Products({ products }: ClientProductsProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Stripe.Product | null>(
    null
  );

  const handleBuy = (product: Stripe.Product) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
      {products.map((p) => {
        const price = p.default_price as Stripe.Price;
        return (
          <div key={p.id} className="flex flex-col justify-between">
            <Image
              priority
              alt={p.name}
              src={p.images[0]}
              width={500}
              height={500}
              className="object-cover h-72 w-full"
            />
            <div>
              <h3 className="text-xl font-light">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.description}</p>
              <p className="mt-2 text-sm">
                {price &&
                  price.unit_amount &&
                  (price.unit_amount / 100).toFixed(2)}{" "}
                €
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full mt-4"
              onClick={() => handleBuy(p)}
            >
              Buy
            </Button>
          </div>
        );
      })}
      <DrawerProducts
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
