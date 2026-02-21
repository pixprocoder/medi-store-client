"use client";

import { ReviewForm, ReviewList } from "@/components/modules/shared";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { IMedicine } from "@/types/medicine.types";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function MedicineDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = React.use(params);

    // Fetch medicine details with TanStack Query
    const {
        data: medicineResponse,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["medicine", slug],
        queryFn: () => api.get<IMedicine>(`/medicines/${slug}`),
        enabled: !!slug,
    });

    const medicine = medicineResponse?.data;

    const { addItem, openCart } = useCartStore();
    const isWishlisted = useWishlistStore((state) =>
        state.items.includes(slug),
    );
    const toggleWishlist = useWishlistStore((state) => state.toggle);
    const [quantity, setQuantity] = React.useState(1);
    const [isAdding, setIsAdding] = React.useState(false);

    // Loading state
    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading medicine details...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <p className="text-destructive mb-2">
                            Failed to load medicine details
                        </p>
                        {/* <p className="text-sm text-muted-foreground">{error || 'something went wrong'}</p> */}
                        <Button asChild className="mt-4">
                            <Link href="/medicines">Back to Medicines</Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Not found state
    if (!medicine) {
        return (
            <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <h2 className="mb-2 text-2xl font-bold">Medicine Not Found</h2>
                <p className="mb-6 text-muted-foreground">
                    The medicine you are looking for does not exist or has been removed.
                </p>
                <Button asChild>
                    <Link href="/medicines">Back to Medicines</Link>
                </Button>
            </div>
        );
    }

    const discount = medicine.originalPrice
        ? Math.round(
            ((Number(medicine.originalPrice) - Number(medicine.price)) /
                Number(medicine.originalPrice)) *
            100,
        )
        : 0;

    const handleAddToCart = () => {
        if (!medicine) return;

        setIsAdding(true);
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: medicine.id,
                name: medicine.name,
                price: Number(medicine.price),
                image: medicine.image,
            });
        }
        setTimeout(() => {
            setIsAdding(false);
            openCart();
        }, 300);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Link */}
            <Link
                href="/medicines"
                className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Medicines
            </Link>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Left — Image */}
                <div className="relative overflow-hidden rounded-2xl bg-muted">
                    <Image
                        src={medicine.image || "/test.webp"}
                        alt={medicine.name}
                        width={600}
                        height={600}
                        className="w-full object-cover"
                    />
                    {discount > 0 && (
                        <div className="absolute left-4 top-4 rounded-md bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
                            -{discount}%
                        </div>
                    )}
                    <button
                        className="absolute right-4 top-4 rounded-full bg-background/80 p-2 shadow-sm transition-colors hover:bg-background"
                        onClick={() => toggleWishlist(medicine.id)}
                    >
                        <Heart
                            className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""
                                }`}
                        />
                    </button>
                </div>

                {/* Right — Details */}
                <div className="flex flex-col space-y-5">
                    {/* Name */}
                    <h1 className="text-3xl font-bold leading-tight">{medicine?.name}</h1>

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-destructive">
                            ${Number(medicine.price).toFixed(2)}
                        </span>
                        {medicine.originalPrice && (
                            <span className="text-lg text-muted-foreground line-through">
                                ${Number(medicine.originalPrice).toFixed(2)}
                            </span>
                        )}
                    </div>

                    {/* Manufacturer & Stock */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        {medicine.manufacturer && (
                            <span>
                                Manufacturer:{" "}
                                <span className="font-medium text-foreground">
                                    {medicine.manufacturer}
                                </span>
                            </span>
                        )}
                        <span
                            className={`font-medium ${medicine.stock && medicine.stock > 0
                                ? "text-green-600"
                                : "text-destructive"
                                }`}
                        >
                            {medicine.stock && medicine.stock > 0
                                ? `In Stock (${medicine.stock})`
                                : "Out of Stock"}
                        </span>
                    </div>

                    {/* Divider */}
                    <hr className="border-muted" />

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {medicine.description}
                    </p>

                    {/* Dosage & Side Effects */}
                    {(medicine.dosage || medicine.sideEffects) && (
                        <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-sm">
                            {medicine.dosage && (
                                <p>
                                    <span className="font-semibold text-foreground">Dosage:</span>{" "}
                                    <span className="text-muted-foreground">
                                        {medicine.dosage}
                                    </span>
                                </p>
                            )}
                            {medicine.sideEffects && (
                                <p>
                                    <span className="font-semibold text-foreground">
                                        Side Effects:
                                    </span>{" "}
                                    <span className="text-muted-foreground">
                                        {medicine.sideEffects}
                                    </span>
                                </p>
                            )}
                        </div>
                    )}

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">Quantity</span>
                        <div className="flex items-center rounded-lg border border-muted">
                            <button
                                className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-muted disabled:opacity-50"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                disabled={
                                    quantity <= 1 || !medicine.stock || medicine.stock === 0
                                }
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="flex h-10 w-10 items-center justify-center text-sm font-medium">
                                {quantity}
                            </span>
                            <button
                                className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-muted disabled:opacity-50"
                                onClick={() => setQuantity((q) => q + 1)}
                                disabled={
                                    !medicine.stock ||
                                    medicine.stock === 0 ||
                                    quantity >= (medicine.stock || 0)
                                }
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <Button
                        size="lg"
                        className="w-full"
                        disabled={!medicine.stock || medicine.stock === 0 || isAdding}
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        {medicine.stock && medicine.stock > 0
                            ? "Add to Cart"
                            : "Out of Stock"}
                    </Button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12 space-y-8">
                {/* Write Review Form */}
                <ReviewForm medicineId={medicine.id} />

                {/* Existing Reviews */}
                {medicine.reviews && medicine.reviews.length > 0 && (
                    <ReviewList
                        reviews={medicine.reviews}
                        averageRating={
                            medicine.reviews.reduce((acc, r) => acc + r.rating, 0) /
                            medicine.reviews.length
                        }
                        totalReviews={medicine.reviews.length}
                    />
                )}
            </div>
        </div>
    );
}
