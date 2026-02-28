"use client";

import { MedicineCard } from "@/components/modules/shared/MedicineCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MANUFACTURERS, PRICE_RANGES } from "@/types/filter.types";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import React from "react";


function MedicinesPage() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("All");
    const [selectedManufacturer, setSelectedManufacturer] = React.useState("All");
    const [selectedPriceRange, setSelectedPriceRange] = React.useState("All Prices");

    const { data: medicinesResponse, isLoading: isLoadingMedicines, error: medicinesError } = useQuery({
        queryKey: ["medicines"],
        queryFn: () => api.get<any[]>("/medicines"),
    });

    // Fetch categories
    const { data: categoriesResponse, isLoading: isLoadingCategories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => api.get<any[]>("/categories"),
    });

    const medicines = React.useMemo(
        () => medicinesResponse?.data || [],
        [medicinesResponse?.data]
    );

    const categories = React.useMemo(
        () => categoriesResponse?.data || [],
        [categoriesResponse?.data]
    );


    // Filter logic
    const filteredMedicines = React.useMemo(() => {
        const priceRange = PRICE_RANGES.find((range) => range.label === selectedPriceRange);

        return medicines.filter((medicine) => {
            const matchesSearch =
                searchQuery === "" ||
                medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                medicine.category.toLowerCase().includes(searchQuery.toLowerCase());

            // Category filter
            const matchesCategory =
                selectedCategory === "All" || medicine.category.name === selectedCategory;

            // Manufacturer filter
            const matchesManufacturer =
                selectedManufacturer === "All" || medicine.manufacturer === selectedManufacturer;

            // Price filter
            const matchesPrice =
                priceRange &&
                medicine.price >= priceRange.min &&
                medicine.price <= priceRange.max;

            return matchesSearch && matchesCategory && matchesManufacturer && matchesPrice;
        });
    }, [medicines, searchQuery, selectedCategory, selectedManufacturer, selectedPriceRange]);

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("All");
        setSelectedManufacturer("All");
        setSelectedPriceRange("All Prices");
    };

    const hasActiveFilters =
        searchQuery !== "" ||
        selectedCategory !== "All" ||
        selectedManufacturer !== "All" ||
        selectedPriceRange !== "All Prices";



    // Loading state
    if (isLoadingMedicines || isLoadingCategories) {
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

    // Error state
    if (medicinesError) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <p className="text-destructive mb-2">Failed to load medicines</p>
                        {/* <p className="text-sm text-muted-foreground">{medicinesError?.message}</p> */}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Browse Medicines</h1>
                <p className="text-muted-foreground">
                    Find the right medicine for your needs from our extensive collection
                </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search medicines by name or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Filter Row */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Category Filter */}
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All</SelectItem>
                            {categories?.map((category) => (
                                <SelectItem key={category?.id} value={category?.name}>
                                    {category?.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Manufacturer Filter */}
                    <Select
                        value={selectedManufacturer}
                        onValueChange={setSelectedManufacturer}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Manufacturer" />
                        </SelectTrigger>
                        <SelectContent>
                            {MANUFACTURERS.map((manufacturer) => (
                                <SelectItem key={manufacturer} value={manufacturer}>
                                    {manufacturer}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Price Filter */}
                    <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Price Range" />
                        </SelectTrigger>
                        <SelectContent>
                            {PRICE_RANGES.map((range) => (
                                <SelectItem key={range.label} value={range.label}>
                                    {range.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                        <Button variant="outline" size="sm" onClick={clearFilters}>
                            <X className="mr-2 h-4 w-4" />
                            Clear Filters
                        </Button>
                    )}
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                    Showing {filteredMedicines.length} of {medicines.length} products
                </p>
            </div>

            {/* Products Grid */}
            {filteredMedicines.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredMedicines.map((medicine) => (
                        <MedicineCard key={medicine.id} {...medicine} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 rounded-full bg-muted p-6">
                        <Search className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">No medicines found</h3>
                    <p className="mb-4 text-sm text-muted-foreground max-w-md">
                        We could not find any medicines matching your search criteria. Try
                        adjusting your filters or search terms.
                    </p>
                    {hasActiveFilters && (
                        <Button variant="outline" onClick={clearFilters}>
                            <X className="mr-2 h-4 w-4" />
                            Clear All Filters
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default MedicinesPage;
