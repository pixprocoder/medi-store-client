"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore, useTotalItems, useTotalPrice } from "@/store/useCartStore";
import { CartItem } from "./CartItem";

export function CartSheet() {
    const { items, isOpen, closeCart, clearCart } = useCartStore();
    const totalItems = useTotalItems();
    const totalPrice = useTotalPrice();
    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
            <SheetContent className="flex w-full flex-col sm:max-w-lg">
                <SheetHeader className="space-y-2.5 border-b pb-4">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-xl font-bold">
                            Your Cart
                        </SheetTitle>

                    </div>
                    {items.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                            {totalItems} {totalItems === 1 ? "item" : "items"} in cart
                        </p>
                    )}
                </SheetHeader>

                {/* Cart Items */}
                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center space-y-4">
                        <div className="rounded-full bg-muted p-6">
                            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-semibold">Your cart is empty</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Add items to get started
                            </p>
                        </div>
                        <Button asChild onClick={closeCart}>
                            <Link href="/medicines">Browse Medicines</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="px-4">
                        {/* Scrollable Items List */}
                        <div className="flex-1 overflow-y-auto py-4">
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </div>
                        </div>

                        {/* Cart Footer */}
                        <div className="space-y-4  pt-4">
                            {/* Clear Cart Button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearCart}
                                className="w-full text-muted-foreground hover:text-destructive"
                            >
                                Clear Cart
                            </Button>

                            {/* Subtotal */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="font-medium">
                                        {totalPrice > 50 ? "FREE" : "$4.99"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="font-semibold">Total</span>
                                    <span className="text-xl font-bold text-primary">
                                        $
                                        {(
                                            totalPrice + (totalPrice > 50 ? 0 : 4.99)
                                        ).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Free Shipping Notice */}
                            {totalPrice < 50 && totalPrice > 0 && (
                                <div className="rounded-lg bg-primary/10 p-3 text-center text-sm">
                                    <span className="text-primary font-medium">
                                        Add ${(50 - totalPrice).toFixed(2)} more for FREE
                                        shipping!
                                    </span>
                                </div>
                            )}

                            {/* Checkout Button */}
                            <Button asChild size="lg" className="w-full">
                                <Link href="/cart/checkout" onClick={closeCart}>
                                    Proceed to Checkout
                                </Link>
                            </Button>

                            {/* Continue Shopping */}
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="w-full"
                            >
                                <Link href="/medicines" onClick={closeCart}>
                                    Continue Shopping
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
