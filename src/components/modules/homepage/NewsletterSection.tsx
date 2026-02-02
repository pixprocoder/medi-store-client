"use client";

import * as React from "react";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
    const [email, setEmail] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        // Add newsletter subscription logic here
        console.log("Subscribe:", email);

        setTimeout(() => {
            setIsLoading(false);
            setEmail("");
        }, 1000);
    }

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-background  p-8 md:p-12">
                    <div className="text-center">
                        <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Mail className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Stay Updated with Health Tips
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Subscribe to our newsletter for exclusive deals, health
                            tips, and latest product updates
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 flex flex-col gap-3 sm:flex-row"
                    >
                        <Input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                            className="h-12 flex-1"
                        />
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isLoading}
                            className="sm:w-auto"
                        >
                            {isLoading ? "Subscribing..." : "Subscribe"}
                        </Button>
                    </form>

                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    );
}
