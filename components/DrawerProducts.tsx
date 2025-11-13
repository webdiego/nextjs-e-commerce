"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Stripe } from "stripe";
import { useCartStore } from "@/store/cartStore";

interface DrawerProductsProps {
  isOpen: boolean;
  onClose: () => void;
  product: Stripe.Product | null;
}

export default function DrawerProducts({
  isOpen,
  onClose,
  product,
}: DrawerProductsProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    onClose();
    setQuantity(1); // resetta la quantità
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm ">
          <Image
            src={product.images[0]}
            alt=""
            width={200}
            height={200}
            className="object-cover h-64 w-full p-2"
          />
          <DrawerHeader>
            <DrawerTitle>{product.name}</DrawerTitle>
            <DrawerDescription>{product.description}</DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0 flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >
              <Minus />
              <span className="sr-only">Decrease quantity</span>
            </Button>

            <div className="text-xl font-bold">{quantity}</div>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleIncrease}
            >
              <Plus />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>

          <DrawerFooter className="flex flex-col gap-2">
            <Button onClick={handleAddToCart}>Add to cart</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
