"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore, type CartItem as CartItemType } from "@/store/useCartStore";

interface CartItemProps {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCartStore();

    const handleIncrement = () => {
        updateQuantity(item.id, item.quantity + 1);
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1);
        }
    };

    const handleRemove = () => {
        removeItem(item.id);
    };

    return (
        <div className="flex gap-4 rounded-lg border bg-card p-3">
            {/* Product Image */}
            <Link
                href={`/medicines/${item.id}`}
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted"
            >
                <Image
                    src={item.image || "/test.webp"}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </Link>

            {/* Product Info */}
            <div className="flex flex-1 flex-col justify-between">
                <div className="space-y-1">
                    <Link
                        href={`/medicines/${item.id}`}
                        className="line-clamp-2 text-sm font-medium hover:text-primary"
                    >
                        {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>

                <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={handleDecrement}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={handleIncrement}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                        <p className="text-sm font-bold text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                            <p className="text-xs text-muted-foreground">
                                ${item.price.toFixed(2)} each
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Remove Button */}
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                onClick={handleRemove}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
