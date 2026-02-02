import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MedicineCard } from "@/components/modules/shared/MedicineCard";

const featuredProducts = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        category: "Pain Relief",
        price: 5.99,
        originalPrice: 8.99,
        rating: 4.5,
        reviews: 128,
        inStock: true,
        image: "/products/paracetamol.jpg", // Placeholder
    },
    {
        id: 2,
        name: "Vitamin D3 Tablets",
        category: "Vitamins",
        price: 12.99,
        originalPrice: 15.99,
        rating: 4.8,
        reviews: 256,
        inStock: true,
        image: "/products/vitamin-d.jpg",
    },
    {
        id: 3,
        name: "Omega-3 Fish Oil",
        category: "Supplements",
        price: 18.99,
        originalPrice: 24.99,
        rating: 4.6,
        reviews: 189,
        inStock: true,
        image: "/products/omega-3.jpg",
    },
    {
        id: 4,
        name: "Blood Pressure Monitor",
        category: "Medical Devices",
        price: 45.99,
        originalPrice: 59.99,
        rating: 4.7,
        reviews: 94,
        inStock: true,
        image: "/products/bp-monitor.jpg",
    },
    {
        id: 5,
        name: "Multivitamin Complex",
        category: "Wellness",
        price: 14.99,
        originalPrice: 19.99,
        rating: 4.5,
        reviews: 312,
        inStock: true,
        image: "/products/multivitamin.jpg",
    },
    {
        id: 6,
        name: "First Aid Kit",
        category: "Emergency",
        price: 24.99,
        originalPrice: 29.99,
        rating: 4.9,
        reviews: 167,
        inStock: true,
        image: "/test.webp",
    },
];

export function FeaturedMedicines() {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Featured Products
                        </h2>
                        <p className="mt-2 text-lg text-muted-foreground">
                            Best-selling medicines and healthcare products
                        </p>
                    </div>
                    <Button asChild variant="ghost" className="hidden sm:flex">
                        <Link href="/products">View All</Link>
                    </Button>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredProducts.map((product) => (
                        <MedicineCard key={product.id} {...product} />
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Button asChild variant="outline">
                        <Link href="/products">View All Products</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
