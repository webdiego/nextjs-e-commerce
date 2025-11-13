import React from "react";
import { stripe } from "@/lib/stripe";
import { Stripe } from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { checkoutAction } from "@/actions/check-out";
export default async function Products() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });
  const productList: Stripe.Product[] = products.data;
  console.log(productList);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div>
        <h2 className="text-2xl font-light">Products</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
          accusamus.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        {productList.map((p) => {
          const price = p.default_price as Stripe.Price;
          return (
            <div key={p.id} className="flex flex-col justify-between">
              <Image
                priority
                alt={p.name}
                src={p.images[0]}
                width={500}
                height={500}
                className="object-cover h-72 w-full "
              />
              <div>
                <h3 className="text-xl font-light">{p.name}</h3>
                <p className="text-sm text-gray-600">{p.description}</p>
                <p className="mt-2 text-sm">
                  {price &&
                    price?.unit_amount &&
                    (price?.unit_amount / 100).toFixed(2)}
                  €
                </p>
              </div>
              <form action={checkoutAction}>
                <input
                  type="hidden"
                  name="item"
                  value={JSON.stringify({
                    name: p.name,
                    price: (p.default_price as Stripe.Price).unit_amount,
                    quantity: 1,
                  })}
                />
                <Button
                  size={"sm"}
                  variant={"outline"}
                  className="w-full mt-4"
                  type="submit"
                >
                  Buy
                </Button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
