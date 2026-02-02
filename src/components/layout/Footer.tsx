"use client";

import { Mail, MapPin, Phone, Pill } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface FooterLink {
    href: string;
    label: string;
}

const quickLinks: FooterLink[] = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
];

const customerService: FooterLink[] = [
    { href: "/help", label: "Help Center" },
    { href: "/track-order", label: "Track Order" },
    { href: "/returns", label: "Returns" },
    { href: "/shipping", label: "Shipping Info" },
];

const policies: FooterLink[] = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/refund-policy", label: "Refund Policy" },
    { href: "/prescription-policy", label: "Prescription Policy" },
];

const categories: FooterLink[] = [
    { href: "/categories/medicines", label: "Medicines" },
    { href: "/categories/vitamins", label: "Vitamins & Supplements" },
    { href: "/categories/personal-care", label: "Personal Care" },
    { href: "/categories/medical-devices", label: "Medical Devices" },
];

export function Footer() {
    return (
        <footer className=" container mx-auto">
            {/* Main Footer Content */}
            <div className="container px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
                            <Image
                                src="/assets/logo/logo.svg"
                                alt="logo"
                                width={150}
                                height={150}
                            />
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                            Your trusted online pharmacy offering prescription medicines,
                            healthcare products, and wellness supplements with fast delivery
                            and expert support.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2 text-muted-foreground">
                                <MapPin className="size-4 mt-0.5 shrink-0" />
                                <span>123 Healthcare Street, Medical District, NY 10001</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="size-4 shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="size-4 shrink-0" />
                                <span>support@medistore.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-sm mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="font-semibold text-sm mb-4">Customer Service</h3>
                        <ul className="space-y-3">
                            {customerService.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-semibold text-sm mb-4">Categories</h3>
                        <ul className="space-y-3">
                            {categories.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className=" bg-muted/50">
                <div className="container px-4 py-6">
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                        {/* Copyright */}
                        <p className="text-sm text-muted-foreground">
                            © 2026 MediStore. All rights reserved.
                        </p>

                        {/* Policy Links */}
                        <div className="flex flex-wrap gap-4">
                            {policies.map((link, index) => (
                                <React.Fragment key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                    {index < policies.length - 1 && (
                                        <span className="text-muted-foreground">•</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
