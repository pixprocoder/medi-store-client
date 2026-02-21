"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useCartStore, useTotalPrice } from "@/store/useCartStore";
import { IShippingAddress } from "@/types/checkout.types";



const EMPTY_SHIPPING: IShippingAddress = {
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
};

// --- Order Summary ---
function OrderSummary({ totalPrice }: { totalPrice: number }) {
    const { items } = useCartStore();
    const shipping = totalPrice > 50 ? 0 : 4.99;
    const total = totalPrice + shipping;

    return (
        <div className="w-full rounded-xl bg-card p-6 shadow-sm">
            <h3 className="mb-4 font-semibold">Order Summary</h3>

            <div className="max-h-48 space-y-3 overflow-y-auto">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                            <Image
                                src={item.image || "/test.webp"}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />
                            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                {item.quantity}
                            </span>
                        </div>
                        <p className="flex-1 line-clamp-2 text-sm">{item.name}</p>
                        <p className="text-sm font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-5 space-y-2 border-t pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "font-medium text-green-600" : ""}>
                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                </div>
                <div className="flex justify-between border-t pt-2 text-base font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}

// --- Main Checkout Component ---
export function Checkout() {
    const router = useRouter();
    const { items, clearCart } = useCartStore();
    const totalPrice = useTotalPrice();

    const [shippingAddress, setShippingAddress] = React.useState<IShippingAddress>(EMPTY_SHIPPING);
    const [paymentMethod, setPaymentMethod] = React.useState<"COD" | "card">("COD");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Empty cart — redirect to medicines
    if (items.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-muted p-6">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-bold">Your cart is empty</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Add items before proceeding to checkout.
                </p>
                <Button asChild className="mt-6">
                    <Link href="/medicines">Browse Medicines</Link>
                </Button>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Prepare order data
        const orderData = {
            items: items.map((item) => ({
                medicineId: item.id,
                quantity: item.quantity,
            })),
            shippingAddress,
            paymentMethod,
        };

        const toastId = toast.loading("Placing your order...");

        try {
            const response = await api.post<any>("/orders", orderData);

            if (response.success) {
                const order = response.data[0];
                toast.success(
                    `${response.message || "Order placed successfully!"} Order #${order.orderNumber}`,
                    { id: toastId, duration: 5000 }
                );

                // Clear cart and reset form
                clearCart();
                setShippingAddress(EMPTY_SHIPPING);

                router.push("/dashboard");


            } else {
                toast.error(response.message || "Failed to place order", { id: toastId });
            }
        } catch (error: any) {
            console.error("Error placing order:", error);
            const errorMessage = error?.response?.data?.message || error?.message || "Failed to place order. Please try again.";
            toast.error(errorMessage, { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    const shipping = totalPrice > 50 ? 0 : 4.99;
    const total = totalPrice + shipping;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Shipping Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="rounded-xl bg-card p-6 shadow-sm">
                            <h3 className="mb-4 font-semibold">Shipping Information</h3>

                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        value={shippingAddress.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+40712345678"
                                        value={shippingAddress.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="address">Street Address</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        placeholder="Str. Victoriei, Nr. 45, Apt. 12"
                                        value={shippingAddress.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            placeholder="Bucharest"
                                            value={shippingAddress.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="postalCode">Postal Code</Label>
                                        <Input
                                            id="postalCode"
                                            name="postalCode"
                                            placeholder="010101"
                                            value={shippingAddress.postalCode}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input
                                        id="country"
                                        name="country"
                                        placeholder="Romania"
                                        value={shippingAddress.country}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="rounded-xl bg-card p-6 shadow-sm">
                            <h3 className="mb-4 font-semibold">Payment Method</h3>

                            <div className="space-y-3">
                                {/* Cash on Delivery */}
                                <label
                                    className={`flex cursor-pointer items-start gap-4 rounded-lg border-2 p-4 transition-colors ${paymentMethod === "COD"
                                        ? "border-primary bg-primary/5"
                                        : "border-muted hover:border-muted-foreground/20"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        checked={paymentMethod === "COD"}
                                        onChange={(e) => setPaymentMethod(e.target.value as "COD")}
                                        className="mt-1 h-4 w-4 accent-primary"
                                    />
                                    <div className="flex-1">
                                        <div className="font-semibold">Cash on Delivery</div>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Pay with cash when your order is delivered
                                        </p>
                                    </div>
                                </label>

                                {/* Card Payment - Disabled */}
                                <label className="flex cursor-not-allowed items-start gap-4 rounded-lg border-2 border-muted bg-muted/30 p-4 opacity-50">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        disabled
                                        className="mt-1 h-4 w-4"
                                    />
                                    <div className="flex-1">
                                        <div className="font-semibold">Card Payment</div>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Coming soon - Currently unavailable
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Placing Order..." : `Place Order - $${total.toFixed(2)}`}
                        </Button>
                    </form>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8">
                        <OrderSummary totalPrice={totalPrice} />
                    </div>
                </div>
            </div>
        </div>
    );
}
