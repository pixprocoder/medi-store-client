import { Heart, Shield, Star, Truck } from "lucide-react";

const STATS = [
    { label: "Years of Service", value: "12+" },
    { label: "Happy Customers", value: "50K+" },
    { label: "Products Available", value: "2,400+" },
    { label: "Orders Delivered", value: "120K+" },
];

const VALUES = [
    {
        icon: Shield,
        title: "Quality Assured",
        description:
            "Every product is verified by licensed pharmacists and sourced from approved manufacturers.",
    },
    {
        icon: Truck,
        title: "Fast Delivery",
        description:
            "Same-day and next-day delivery options available to get your medicines when you need them.",
    },
    {
        icon: Heart,
        title: "Customer First",
        description:
            "24/7 support from healthcare professionals ready to help with any questions or concerns.",
    },
    {
        icon: Star,
        title: "Trusted & Certified",
        description:
            "Fully licensed and regulated online pharmacy with certified pharmacists on duty at all times.",
    },
];



export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-16 max-w-3xl">
                <h1 className="text-3xl font-bold">About MediStore</h1>
                <p className="mt-3 text-lg text-muted-foreground">
                    Your trusted online pharmacy and healthcare store, committed to
                    making quality medicines and wellness products accessible to everyone.
                </p>
            </div>

            {/* Mission */}
            <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                    <h2 className="text-2xl font-bold">Our Mission</h2>
                    <p className="mt-4 text-muted-foreground">
                        MediStore was founded with a simple goal — to bridge the gap between
                        patients and quality healthcare products. We believe that access to
                        reliable medicines and health essentials should never be a challenge.
                    </p>
                    <p className="mt-4 text-muted-foreground">
                        From our warehouse in New York, we serve customers across the country,
                        delivering prescription medicines, OTC products, vitamins, and wellness
                        essentials right to their doorstep with care and speed.
                    </p>
                </div>
                <div className="flex flex-col justify-center gap-4">
                    {STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className="flex items-center gap-6 rounded-xl bg-card p-5 shadow-sm"
                        >
                            <span className="text-3xl font-bold text-primary">{stat.value}</span>
                            <span className="text-sm text-muted-foreground">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Values */}
            <div className="mb-16">
                <h2 className="mb-8 text-2xl font-bold">Why Choose MediStore</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {VALUES.map((value) => {
                        const Icon = value.icon;
                        return (
                            <div
                                key={value.title}
                                className="rounded-xl bg-card p-6 shadow-sm"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-semibold">{value.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {value.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>


        </div>
    );
}
