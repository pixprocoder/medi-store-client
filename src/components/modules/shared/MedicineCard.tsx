import { Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface MedicineCardProps {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    inStock?: boolean;
    image?: string;
}

export function MedicineCard({
    id,
    name,
    category,
    price,
    originalPrice,
    rating,
    reviews,
    inStock = true,
    image,
}: MedicineCardProps) {
    const discount = originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    return (
        <div className="group relative flex h-full flex-col overflow-hidden rounded-xl  bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
            {/* Wishlist Icon */}
            <button className="absolute right-4 top-4 z-10 rounded-full bg-background p-2 shadow-sm transition-colors hover:bg-muted">
                <Heart className="h-5 w-5" />
            </button>

            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute left-4 top-4 z-10 rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
                    -{discount}%
                </div>
            )}

            {/* Product Image - Fixed Height */}
            <Link href={`/medicines/${id}`} className="block">
                <div className="relative mx-auto mb-4 h-48 w-full overflow-hidden rounded-lg bg-muted">
                    <Image
                        src={image || "/test.webp"}
                        alt={name}
                        fill

                    />
                </div>
            </Link>

            {/* Product Info - Flex Grow */}
            <div className="flex flex-1 flex-col space-y-2">
                <h3 className="line-clamp-2 text-sm font-medium leading-tight transition-colors group-hover:text-primary">
                    <Link href={`/medicines/${id}`}>{name}</Link>
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${i < Math.floor(rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {rating} ({reviews})
                    </span>
                </div>

                {/* Category/Badge */}
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
                        💳 Rate 0% with MyWallet
                    </span>
                </div>

                {/* Spacer to push price/button to bottom */}
                <div className="flex-1" />

                {/* Price & Add to Cart - Aligned Bottom */}
                <div className="flex items-center justify-between pt-2">
                    {/* Price Left */}
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-destructive">
                                ${price.toFixed(2)}
                            </span>
                        </div>
                        {originalPrice && originalPrice > price && (
                            <span className="text-xs text-muted-foreground line-through">
                                ${originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    {/* Button Right */}
                    <Button
                        className="h-10 w-10 rounded-lg p-0"
                        disabled={!inStock}
                        size="icon"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Stock Status Overlay */}
            {!inStock && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm">
                    <p className="text-sm font-semibold text-destructive">
                        Out of Stock
                    </p>
                </div>
            )}
        </div>
    );
}