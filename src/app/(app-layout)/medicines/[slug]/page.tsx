"use client";

import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";

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
        description:
            "Paracetamol 500mg is a widely used analgesic and antipyretic medication. It is effective for relieving mild to moderate pain such as headaches, toothaches, and muscle aches. Also helps reduce fever caused by infections or other conditions.",
        dosage: "Take 1–2 tablets every 4–6 hours as needed. Do not exceed 8 tablets in 24 hours.",
        sideEffects: "Rarely causes side effects when taken as directed. Consult a doctor if you experience nausea, skin rash, or allergic reactions.",
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
        description:
            "Ibuprofen 400mg capsules provide effective relief from pain, inflammation, and fever. Commonly used for arthritis, menstrual cramps, and general pain management.",
        dosage: "Take 1 capsule every 6–8 hours with food. Do not exceed 3 capsules in 24 hours without medical advice.",
        sideEffects: "May cause stomach upset, nausea, or digestive issues. Avoid if you have a history of stomach ulcers.",
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
        description:
            "Amoxicillin 250mg is a broad-spectrum antibiotic used to treat bacterial infections including respiratory tract infections, urinary tract infections, and skin infections. Always complete the full course as prescribed.",
        dosage: "Take as directed by your doctor. Typically 1 capsule three times a day for the prescribed duration.",
        sideEffects: "Common side effects include diarrhea, nausea, and skin rash. Stop immediately if you experience difficulty breathing or swelling.",
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
        description:
            "High-quality Vitamin D3 supplements to support bone health, immune function, and overall wellness. Each capsule contains 1000 IU of Vitamin D3 sourced from natural sunflower oil.",
        dosage: "Take 1 capsule daily with a meal containing some fat for optimal absorption.",
        sideEffects: "Generally well tolerated. Excessive intake may cause nausea, weakness, or kidney issues. Consult your doctor before use.",
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
        description:
            "Low-dose aspirin 75mg tablets are commonly used for cardiovascular protection and blood thinning. Also suitable for mild pain and fever relief when taken at higher doses under medical supervision.",
        dosage: "For cardiovascular protection: 1 tablet daily. For pain relief, consult your doctor for appropriate dosage.",
        sideEffects: "May cause stomach irritation or bleeding. Not suitable for children under 16. Consult a doctor if you are on blood thinners.",
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
        description:
            "Cetirizine 10mg is a second-generation antihistamine for effective allergy relief. It helps reduce symptoms of hay fever, allergic rhinitis, and skin reactions without causing significant drowsiness.",
        dosage: "Take 1 tablet once daily, preferably in the evening. Can be taken with or without food.",
        sideEffects: "May cause mild drowsiness or dry mouth in some individuals. Avoid alcohol while taking this medication.",
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
        description:
            "Omeprazole 20mg is a proton pump inhibitor used to reduce stomach acid production. Effective for treating heartburn, acid reflux, and peptic ulcers.",
        dosage: "Take 1 capsule 30–60 minutes before breakfast. Duration of treatment as prescribed by your doctor.",
        sideEffects: "Long-term use may affect nutrient absorption. Common side effects include headache and diarrhea.",
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
        description:
            "A comprehensive multivitamin complex containing over 20 essential vitamins and minerals. Formulated to support daily nutritional needs and overall health for adults.",
        dosage: "Take 1 tablet daily with a glass of water, preferably with a meal.",
        sideEffects: "Generally safe when taken as directed. May cause mild stomach upset in some individuals.",
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
        description:
            "Pure calcium carbonate 500mg tablets for bone health and strength. Enriched with Vitamin D for better calcium absorption and utilization.",
        dosage: "Take 2 tablets daily, split into two doses. Best absorbed when taken with food.",
        sideEffects: "May cause constipation or bloating. Drink plenty of water. Consult a doctor if you have kidney stones.",
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
        description:
            "Azithromycin 250mg is a macrolide antibiotic used to treat a wide range of bacterial infections including respiratory, skin, and sexually transmitted infections. Typically prescribed as a short 3–5 day course.",
        dosage: "Take as directed by your doctor. Usually 500mg on day 1, then 250mg on days 2–5. Complete the full course.",
        sideEffects: "May cause stomach upset, diarrhea, or nausea. Rare but serious side effects include liver issues — contact your doctor immediately.",
    },
];

export default function MedicineDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = React.use(params);
    const medicine = MOCK_MEDICINES.find((m) => m.id === Number(slug));

    const { addItem, openCart } = useCartStore();
    const [quantity, setQuantity] = React.useState(1);
    const [isAdding, setIsAdding] = React.useState(false);

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
        ? Math.round(((medicine.originalPrice - medicine.price) / medicine.originalPrice) * 100)
        : 0;

    const handleAddToCart = () => {
        setIsAdding(true);
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: medicine.id,
                name: medicine.name,
                category: medicine.category,
                price: medicine.price,
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
                    <button className="absolute right-4 top-4 rounded-full bg-background/80 p-2 shadow-sm transition-colors hover:bg-background">
                        <Heart className="h-5 w-5" />
                    </button>
                </div>

                {/* Right — Details */}
                <div className="flex flex-col space-y-5">
                    {/* Category Badge */}
                    <span className="w-fit rounded-md bg-accent/20 px-3 py-1 text-sm font-medium text-accent-foreground">
                        {medicine.category}
                    </span>

                    {/* Name */}
                    <h1 className="text-3xl font-bold leading-tight">{medicine.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-5 w-5 ${i < Math.floor(medicine.rating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "fill-gray-200 text-gray-200"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-medium">{medicine.rating}</span>
                        <span className="text-sm text-muted-foreground">
                            ({medicine.reviews} reviews)
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-destructive">
                            ${medicine.price.toFixed(2)}
                        </span>
                        {medicine.originalPrice && (
                            <span className="text-lg text-muted-foreground line-through">
                                ${medicine.originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    {/* Manufacturer & Stock */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span>Manufacturer: <span className="font-medium text-foreground">{medicine.manufacturer}</span></span>
                        <span
                            className={`font-medium ${medicine.inStock ? "text-green-600" : "text-destructive"
                                }`}
                        >
                            {medicine.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                    </div>

                    {/* Divider */}
                    <hr className="border-muted" />

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {medicine.description}
                    </p>

                    {/* Dosage & Side Effects */}
                    <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-sm">
                        <p>
                            <span className="font-semibold text-foreground">Dosage:</span>{" "}
                            <span className="text-muted-foreground">{medicine.dosage}</span>
                        </p>
                        <p>
                            <span className="font-semibold text-foreground">Side Effects:</span>{" "}
                            <span className="text-muted-foreground">{medicine.sideEffects}</span>
                        </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">Quantity</span>
                        <div className="flex items-center rounded-lg border border-muted">
                            <button
                                className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-muted disabled:opacity-50"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                disabled={quantity <= 1 || !medicine.inStock}
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="flex h-10 w-10 items-center justify-center text-sm font-medium">
                                {quantity}
                            </span>
                            <button
                                className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-muted disabled:opacity-50"
                                onClick={() => setQuantity((q) => q + 1)}
                                disabled={!medicine.inStock}
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <Button
                        size="lg"
                        className="w-full"
                        disabled={!medicine.inStock || isAdding}
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        {medicine.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
