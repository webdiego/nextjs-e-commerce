import { stripe } from "@/lib/stripe";
import { Stripe } from "stripe";
import Products from "@/components/Products";

export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const productList: Stripe.Product[] = products.data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div>
        <h2 className="text-2xl font-light">Products</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
          accusamus.
        </p>
      </div>
      <Products products={productList} />
    </div>
  );
}
