"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MedicineCard } from "@/components/modules/shared/MedicineCard";
import { useWishlistStore } from "@/store/useWishlistStore";

// Mock products — replace with API call
const MOCK_MEDICINES = [
    {
        id: 1,
        name: "Paracetamol 500mg Tablets",
        category: "Pain Relief",
        price: 8.99,
        originalPrice: 12.99,
        rating: 4.5,
        reviews: 128,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 2,
        name: "Ibuprofen 400mg Capsules",
        category: "Pain Relief",
        price: 11.99,
        originalPrice: 15.99,
        rating: 4.7,
        reviews: 256,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 3,
        name: "Amoxicillin 250mg",
        category: "Antibiotics",
        price: 24.99,
        rating: 4.8,
        reviews: 89,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 4,
        name: "Vitamin D3 Supplements",
        category: "Vitamins",
        price: 15.99,
        originalPrice: 19.99,
        rating: 4.6,
        reviews: 342,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 5,
        name: "Aspirin 75mg Tablets",
        category: "Pain Relief",
        price: 6.99,
        rating: 4.4,
        reviews: 178,
        inStock: false,
        image: "/test.webp",
    },
    {
        id: 6,
        name: "Cetirizine 10mg",
        category: "Allergy",
        price: 9.99,
        originalPrice: 13.99,
        rating: 4.5,
        reviews: 203,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 7,
        name: "Omeprazole 20mg",
        category: "Digestive Health",
        price: 18.99,
        rating: 4.7,
        reviews: 145,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 8,
        name: "Multivitamin Complex",
        category: "Vitamins",
        price: 22.99,
        originalPrice: 29.99,
        rating: 4.8,
        reviews: 412,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 9,
        name: "Calcium Tablets 500mg",
        category: "Vitamins",
        price: 12.99,
        rating: 4.3,
        reviews: 167,
        inStock: true,
        image: "/test.webp",
    },
    {
        id: 10,
        name: "Azithromycin 250mg",
        category: "Antibiotics",
        price: 28.99,
        originalPrice: 34.99,
        rating: 4.9,
        reviews: 92,
        inStock: true,
        image: "/test.webp",
    },
];

export default function WishlistPage() {
    const wishlistIds = useWishlistStore((state) => state.items);

    const wishlisted = MOCK_MEDICINES.filter((m) => wishlistIds.includes(m.id));

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8 flex items-center gap-3">
                <Heart className="h-7 w-7 fill-red-500 text-red-500" />
                <h1 className="text-3xl font-bold">Wishlist</h1>
                {wishlisted.length > 0 && (
                    <span className="rounded-full bg-muted px-3 py-0.5 text-sm text-muted-foreground">
                        {wishlisted.length} {wishlisted.length === 1 ? "item" : "items"}
                    </span>
                )}
            </div>

            {wishlisted.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {wishlisted.map((medicine) => (
                        <MedicineCard key={medicine.id} {...medicine} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="mb-4 rounded-full bg-muted p-6">
                        <Heart className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">Your wishlist is empty</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                        Tap the heart icon on any medicine to save it here for later.
                    </p>
                    <Button asChild className="mt-6">
                        <Link href="/medicines">Browse Medicines</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
