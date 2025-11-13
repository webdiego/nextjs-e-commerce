"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import CartDrawer from "./CartDrawer";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 w-full z-50 shadow-xs bg-white">
        <NavigationMenu className="w-full max-w-4xl mx-auto">
          <NavigationMenuList className="flex justify-between items-center w-full px-4 py-2">
            <div className="text-xl font-bold mr-10">
              <h1>Woodesign</h1>
            </div>

            <div className="flex  w-full space-x-4 items-center">
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Cart Drawer Trigger */}
              <Button variant={"ghost"} onClick={() => setIsOpen(!isOpen)}>
                <ShoppingCart />
                Cart ({totalQuantity})
              </Button>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
