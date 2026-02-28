'use client'
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";



export function FeaturedCategories() {
    const { data: categories, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: () => api.get<any[]>("/categories"),
    });
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Shop by Category
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Find what you need from our wide range of healthcare products
                        </p>
                    </div>
                    <Button asChild variant="ghost" className="hidden sm:flex">
                        <Link href="/medicines">View All</Link>
                    </Button>
                </div>



                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories?.data?.splice(0, 6).map((category) => {
                        return (
                            <Link
                                key={category?.id}
                                href="/"
                                className="group relative overflow-hidden rounded-lg  bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
                            >
                                <div className="flex items-start gap-4">

                                    <div className="flex-1">
                                        <h3 className="font-semibold group-hover:text-primary">
                                            {category?.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {category?.slug}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-8 text-center ">
                    <Button asChild variant="outline" size="lg">
                        <Link href="/categories">View All Categories</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
