"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "./CartDrawer";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 w-full z-50 shadow-xs bg-white px-4">
        <div className="flex items-center max-w-4xl mx-auto">
          <div className="text-xl font-bold mr-10">
            <h1>Woodesign</h1>
          </div>

          <div className="flex w-full space-x-4 items-center text-xs font-medium">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            {/* Cart Drawer Trigger */}
            <Button
              variant={"ghost"}
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs"
            >
              <ShoppingCart />
              Cart ({totalQuantity})
            </Button>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
