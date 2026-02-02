import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
    return (
        <section className="relative bg-linear-to-b from-primary/5 to-background py-20 md:py-32">
            <div >
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        Your Trusted Online
                        <span className="text-primary"> Pharmacy</span>
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                        Quality medicines and healthcare products delivered to your
                        doorstep. Fast, reliable, and affordable.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Button asChild size="lg" className="gap-2">
                            <Link href="/medicines">
                                Shop Now
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/categories">Browse Categories</Link>
                        </Button>
                    </div>

                    <div className="mt-12 mx-auto max-w-2xl">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search for medicines, health products..."
                                className="h-12 pl-10 pr-4"
                            />
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">10K+</div>
                            <div className="mt-1 text-sm text-muted-foreground">
                                Products
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">50K+</div>
                            <div className="mt-1 text-sm text-muted-foreground">
                                Customers
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">24/7</div>
                            <div className="mt-1 text-sm text-muted-foreground">
                                Support
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">Fast</div>
                            <div className="mt-1 text-sm text-muted-foreground">
                                Delivery
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
