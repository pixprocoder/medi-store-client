"use client";

import { CheckCircle, ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCartStore, useTotalPrice } from "@/store/useCartStore";

const STEPS = ["Shipping", "Payment", "Confirmation"] as const;
type Step = (typeof STEPS)[number];

const US_STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming",
];

interface ShippingData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
}

interface PaymentData {
    cardNumber: string;
    expiry: string;
    cvv: string;
    nameOnCard: string;
}

const EMPTY_SHIPPING: ShippingData = {
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "",
};

const EMPTY_PAYMENT: PaymentData = {
    cardNumber: "", expiry: "", cvv: "", nameOnCard: "",
};

// --- Order Summary (shared sidebar) ---
function OrderSummary({ totalPrice }: { totalPrice: number }) {
    const { items } = useCartStore();
    const shipping = totalPrice > 50 ? 0 : 4.99;
    const total = totalPrice + shipping;

    return (
        <div className="rounded-xl bg-card p-6 shadow-sm">
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

// --- Step Indicator ---
function StepIndicator({ currentStep }: { currentStep: Step }) {
    const currentIndex = STEPS.indexOf(currentStep);
    return (
        <div className="flex items-center justify-center gap-2">
            {STEPS.map((step, index) => {
                const isComplete = index < currentIndex;
                const isActive = index === currentIndex;
                return (
                    <React.Fragment key={step}>
                        <div className="flex items-center gap-2">
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                                    isComplete
                                        ? "bg-primary text-primary-foreground"
                                        : isActive
                                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                                        : "bg-muted text-muted-foreground"
                                }`}
                            >
                                {isComplete ? (
                                    <CheckCircle className="h-5 w-5" />
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <span
                                className={`text-sm ${
                                    isActive ? "font-semibold" : "text-muted-foreground"
                                }`}
                            >
                                {step}
                            </span>
                        </div>
                        {index < STEPS.length - 1 && (
                            <div
                                className={`h-px w-10 ${
                                    isComplete ? "bg-primary" : "bg-muted"
                                }`}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

// --- Shipping Form ---
function ShippingForm({
    data,
    onChange,
    onNext,
}: {
    data: ShippingData;
    onChange: (data: ShippingData) => void;
    onNext: () => void;
}) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" placeholder="John" value={data.firstName} onChange={handleChange} required />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" placeholder="Doe" value={data.lastName} onChange={handleChange} required />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" value={data.email} onChange={handleChange} required />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" value={data.phone} onChange={handleChange} required />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" name="address" placeholder="123 Main Street, Apt 4B" value={data.address} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" placeholder="New York" value={data.city} onChange={handleChange} required />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="state">State</Label>
                    <Select value={data.state} onValueChange={(value) => onChange({ ...data, state: value })}>
                        <SelectTrigger id="state">
                            <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                            {US_STATES.map((state) => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" name="zip" placeholder="10001" value={data.zip} onChange={handleChange} required />
                </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
                Continue to Payment
                <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
        </form>
    );
}

// --- Payment Form ---
function PaymentForm({
    data,
    onChange,
    onBack,
    onPlace,
}: {
    data: PaymentData;
    onChange: (data: PaymentData) => void;
    onBack: () => void;
    onPlace: () => void;
}) {
    const totalPrice = useTotalPrice();
    const shipping = totalPrice > 50 ? 0 : 4.99;
    const total = totalPrice + shipping;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onPlace();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-2">
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input id="nameOnCard" name="nameOnCard" placeholder="John Doe" value={data.nameOnCard} onChange={handleChange} required />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={data.cardNumber}
                    onChange={handleChange}
                    maxLength={19}
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" name="expiry" placeholder="MM / YY" value={data.expiry} onChange={handleChange} maxLength={5} required />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" name="cvv" placeholder="123" value={data.cvv} onChange={handleChange} maxLength={4} required />
                </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">You will be charged</p>
                <p className="text-2xl font-bold text-primary">${total.toFixed(2)}</p>
            </div>

            <div className="flex gap-3">
                <Button type="button" variant="outline" size="lg" className="w-full" onClick={onBack}>
                    Back
                </Button>
                <Button type="submit" size="lg" className="w-full">
                    Place Order
                </Button>
            </div>
        </form>
    );
}

// --- Confirmation ---
function Confirmation({ orderNumber }: { orderNumber: string }) {
    return (
        <div className="flex flex-col items-center py-8 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold">Order Placed!</h2>
            <p className="mt-2 text-muted-foreground">
                Thank you for your purchase. Your order is being prepared.
            </p>
            <div className="mt-6 rounded-lg bg-muted/50 px-6 py-3">
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="text-lg font-bold">{orderNumber}</p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
                A confirmation email will be sent to your registered email address.
            </p>
            <Button asChild size="lg" className="mt-8">
                <Link href="/medicines">Continue Shopping</Link>
            </Button>
        </div>
    );
}

// --- Main Checkout Component ---
export function Checkout() {
    const { items, clearCart } = useCartStore();
    const totalPrice = useTotalPrice();

    const [step, setStep] = React.useState<Step>("Shipping");
    const [shipping, setShipping] = React.useState<ShippingData>(EMPTY_SHIPPING);
    const [payment, setPayment] = React.useState<PaymentData>(EMPTY_PAYMENT);
    const [orderNumber, setOrderNumber] = React.useState("");

    // Empty cart — redirect to cart
    if (items.length === 0 && !orderNumber) {
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

    const handlePlaceOrder = () => {
        // Mock order number
        const id = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
        setOrderNumber(id);
        clearCart();
        setStep("Confirmation");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

            <StepIndicator currentStep={step} />

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Form area */}
                <div className="lg:col-span-2">
                    {step === "Shipping" && (
                        <ShippingForm
                            data={shipping}
                            onChange={setShipping}
                            onNext={() => setStep("Payment")}
                        />
                    )}
                    {step === "Payment" && (
                        <PaymentForm
                            data={payment}
                            onChange={setPayment}
                            onBack={() => setStep("Shipping")}
                            onPlace={handlePlaceOrder}
                        />
                    )}
                    {step === "Confirmation" && <Confirmation orderNumber={orderNumber} />}
                </div>

                {/* Order summary sidebar */}
                {step !== "Confirmation" && (
                    <div className="lg:col-span-1">
                        <OrderSummary totalPrice={totalPrice} />
                    </div>
                )}
            </div>
        </div>
    );
}
