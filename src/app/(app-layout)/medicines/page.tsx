"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
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

// Mock data - replace with actual API call
const MOCK_MEDICINES = [
    {
        id: 1,
        name: "Paracetamol 500mg Tablets",
        category: "Pain Relief",
        manufacturer: "PharmaCorp",
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
        manufacturer: "HealthMed",
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
        manufacturer: "MediCare",
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
        manufacturer: "VitaLife",
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
        manufacturer: "PharmaCorp",
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
        manufacturer: "HealthMed",
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
        manufacturer: "MediCare",
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
        manufacturer: "VitaLife",
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
        manufacturer: "VitaLife",
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
        manufacturer: "PharmaCorp",
        price: 28.99,
        originalPrice: 34.99,
        rating: 4.9,
        reviews: 92,
        inStock: true,
        image: "/test.webp",
    },
];

const CATEGORIES = ["All", "Pain Relief", "Antibiotics", "Vitamins", "Allergy", "Digestive Health"];
const MANUFACTURERS = ["All", "PharmaCorp", "HealthMed", "MediCare", "VitaLife"];
const PRICE_RANGES = [
    { label: "All Prices", min: 0, max: Infinity },
    { label: "Under $10", min: 0, max: 10 },
    { label: "$10 - $20", min: 10, max: 20 },
    { label: "$20 - $30", min: 20, max: 30 },
    { label: "Above $30", min: 30, max: Infinity },
];

function MedicinesPage() {

    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("All");
    const [selectedManufacturer, setSelectedManufacturer] = React.useState("All");
    const [selectedPriceRange, setSelectedPriceRange] = React.useState("All Prices");

    // Filter logic
    const filteredMedicines = React.useMemo(() => {
        const priceRange = PRICE_RANGES.find((range) => range.label === selectedPriceRange);

        return MOCK_MEDICINES.filter((medicine) => {
            // Search filter
            const matchesSearch =
                searchQuery === "" ||
                medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                medicine.category.toLowerCase().includes(searchQuery.toLowerCase());

            // Category filter
            const matchesCategory =
                selectedCategory === "All" || medicine.category === selectedCategory;

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
    }, [searchQuery, selectedCategory, selectedManufacturer, selectedPriceRange]);

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
                            {CATEGORIES.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
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
                    Showing {filteredMedicines.length} of {MOCK_MEDICINES.length} products
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
