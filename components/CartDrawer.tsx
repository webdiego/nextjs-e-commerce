"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Stripe from "stripe";
import { checkoutAction } from "@/actions/check-out";

type CartDrawerProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function CartDrawer({ isOpen, setIsOpen }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalPrice = items.reduce((sum, item) => {
    const price = item.product.default_price as Stripe.Price;
    return sum + ((price.unit_amount ?? 0) / 100) * item.quantity;
  }, 0);

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader className="flex flex-row justify-between items-center">
          <DrawerTitle>Cart</DrawerTitle>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            <X />
          </Button>
        </DrawerHeader>

        <div className="p-4 flex flex-col gap-4">
          {items.length === 0 && <p>Your cart is empty</p>}

          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-center"
            >
              <div className="flex">
                <Image
                  src={item.product.images[0]}
                  alt=""
                  width={500}
                  height={500}
                  className="object-cover w-12 h-12 mr-2 "
                />
                <div className="flex flex-col">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    {((item.product.default_price as Stripe.Price)
                      ?.unit_amount ?? 0) / 100}{" "}
                    €{" "}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      Math.max(1, item.quantity - 1)
                    )
                  }
                >
                  <Minus />
                </Button>
                <span>{item.quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => addItem(item.product, 1)}
                >
                  <Plus />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => removeItem(item.product.id)}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <DrawerFooter className="flex flex-col gap-2">
            <p className="text-lg font-semibold">
              Total: {totalPrice.toFixed(2)} €
            </p>
            <form action={checkoutAction}>
              <input
                type="hidden"
                name="items"
                value={JSON.stringify(
                  items.map((item) => ({
                    name: item.product.name,
                    price: (item.product.default_price as Stripe.Price)
                      .unit_amount,
                    quantity: item.quantity,
                  }))
                )}
              />
              <Button
                size="sm"
                variant="default"
                className="w-full mt-4"
                type="submit"
              >
                Proceed to payment
              </Button>
            </form>

            <Button onClick={clearCart} variant="outline">
              Clear Cart
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
