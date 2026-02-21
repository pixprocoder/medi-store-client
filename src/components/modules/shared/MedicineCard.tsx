"use client";

import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { IMedicine } from "@/types/medicine.types";



export function MedicineCard({
    id,
    name,
    price,
    stock,
    image,
}: any) {



    const { addItem, openCart } = useCartStore();
    const isWishlisted = useWishlistStore((state) => state.items.includes(id));
    const toggleWishlist = useWishlistStore((state) => state.toggle);
    const [isAdding, setIsAdding] = React.useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);

        addItem({
            id,
            name,
            price: Number(price),
            image,
        });

        // Brief animation delay then open cart
        setTimeout(() => {
            setIsAdding(false);
            openCart();
        }, 300);
    };

    return (
        <div className="group relative flex h-full flex-col overflow-hidden rounded-xl  bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
            {/* Wishlist Icon */}
            <button
                className="absolute right-5 top-5 z-10 rounded-full bg-background p-2 shadow-sm transition-colors hover:bg-muted"
                onClick={() => toggleWishlist(id)}
            >
                <Heart
                    className={`h-5 w-5 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : ""
                        }`}
                />
            </button>



            {/* Product Image - Fixed Height */}
            <Link href={`/medicines/${id}`} className="block">
                <div className="relative mx-auto mb-4 h-48 w-full overflow-hidden rounded-lg bg-muted">
                    <Image src={image || "/test.webp"} alt={name} width={500}
                        height={500} quality={75} />
                </div>
            </Link>

            {/* Product Info - Flex Grow */}
            <div className="flex flex-1 flex-col space-y-2">
                <h3 className="line-clamp-2 text-sm font-medium leading-tight transition-colors group-hover:text-primary">
                    <Link href={`/medicines/${id}`}>{name}</Link>
                </h3>

                {/* Spacer to push price/button to bottom */}
                <div className="flex-1" />

                {/* Price & Add to Cart - Aligned Bottom */}
                <div className="flex items-center justify-between pt-2">
                    {/* Price Left */}
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-destructive">
                                {/* ${Number(price.toFixed(2))} */}
                                {price}
                            </span>
                        </div>

                    </div>

                    {/* Button Right */}
                    <Button
                        className="h-10 w-10 rounded-lg p-0"
                        disabled={!stock || isAdding}
                        size="icon"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Stock Status Overlay */}
            {!stock && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm">
                    <p className="text-sm font-semibold text-destructive">Out of Stock</p>
                </div>
            )}
        </div>
    );
}
