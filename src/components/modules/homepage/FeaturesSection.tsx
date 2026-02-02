import { Shield, Truck, Headphones, CreditCard } from "lucide-react";

const features = [
    {
        name: "Genuine Products",
        description:
            "100% authentic medicines sourced directly from trusted manufacturers",
        icon: Shield,
    },
    {
        name: "Fast Delivery",
        description:
            "Same-day delivery available in select areas. Get your order quickly",
        icon: Truck,
    },
    {
        name: "24/7 Support",
        description:
            "Our healthcare experts are always available to help you",
        icon: Headphones,
    },
    {
        name: "Secure Payment",
        description:
            "Multiple payment options with 100% secure checkout process",
        icon: CreditCard,
    },
];

export function FeaturesSection() {
    return (
        <section className="bg-muted/50 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Why Choose MediStore?
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Your health and satisfaction are our top priorities
                    </p>
                </div>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.name}
                                className="relative rounded-lg bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon className="h-7 w-7" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    {feature.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
