"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "./CartDrawer";
import { Button } from "./ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
];

export default function NavBar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 w-full z-50 shadow-sm bg-white/80 backdrop-blur-md px-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto h-16">
          {/* Logo and Desktop Nav */}
          <div className="flex items-center">
            <div className="text-xl font-bold mr-10">
              <h1>Woodesign</h1>
            </div>

            <nav className="hidden md:flex space-x-6 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-gray-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Cart Trigger */}
            <Button
              variant={"ghost"}
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="text-xs font-medium"
            >
              <ShoppingCart className="w-5 h-5 mr-1" />
              Cart ({totalQuantity})
            </Button>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Drawer direction="left" open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-full w-[300px] rounded-none">
                  <DrawerHeader className="flex justify-between items-center border-b p-4">
                    <DrawerTitle className="text-xl font-bold">Menu</DrawerTitle>
                    <DrawerClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="w-5 h-5" />
                      </Button>
                    </DrawerClose>
                  </DrawerHeader>
                  <div className="flex flex-col p-4 space-y-4">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium py-2 border-b border-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </>
  );
}
