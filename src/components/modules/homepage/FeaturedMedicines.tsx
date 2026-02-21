"use client"
import Link from "next/link";

import { MedicineCard } from "@/components/modules/shared/MedicineCard";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { IMedicine } from "@/types/medicine.types";

export function FeaturedMedicines() {
    const { data: medicinesResponse, isLoading: isLoadingMedicines, error: medicinesError } = useQuery({
        queryKey: ["medicines"],
        queryFn: () => api.get<IMedicine[]>("/medicines"),
    });


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
                        <Link href="/medicines">View All</Link>
                    </Button>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {medicinesResponse?.data?.map((medicine) => (
                        <MedicineCard key={medicine.id} {...medicine} />
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
