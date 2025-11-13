"use server";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
export const checkoutAction = async (formData: FormData): Promise<void> => {
  const itemJson = formData.get("item") as string;
  const item = JSON.parse(itemJson);

  const line_items = [
    {
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity || 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/chekcout/cancel`,
  });
  if (session.url) {
    redirect(session.url);
  }
};
