"use client"
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";


export default function CategoriesPage() {

    const { data: categories, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: () => api.get<any[]>("/categories"),
    });


    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold">Shop by Category</h1>
                <p className="mt-2 text-muted-foreground">
                    Explore our wide range of healthcare products organised by category
                </p>
            </div>

            {/* Category Grid */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories?.data?.map((category) => {
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
        </div>
    );
}
