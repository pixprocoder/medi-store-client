"use client";

import {
    Heart,
    LogOut,
    Menu,
    Package,
    Pill,
    Search,
    Settings,
    ShoppingCart,
    User,
    X,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleTheme } from "./ToggleTheme";

interface NavLink {
    href: string;
    label: string;
}

const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [cartItemsCount] = React.useState(3); // Replace with actual cart state
    const [isLoggedIn] = React.useState(false); // Replace with actual auth state

    return (
        <header className="container mx-auto sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <nav className="container flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <div className="flex items-center justify-center size-9 rounded-lg bg-primary text-primary-foreground">
                        <Pill className="size-5" />
                    </div>
                    <span className="hidden sm:inline-block">MediStore</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href}>
                            <Button variant="ghost" size="sm">
                                {link.label}
                            </Button>
                        </Link>
                    ))}
                </div>

                {/* Search Bar - Desktop */}
                <div className="hidden md:flex flex-1 max-w-md mx-4">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search medicines..."
                            className="w-full h-9 pl-10 pr-4 rounded-md border bg-background text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">
                    {/* Search Icon - Mobile */}
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Search className="size-5" />
                        <span className="sr-only">Search</span>
                    </Button>

                    {/* Shopping Cart */}
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="size-5" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex items-center justify-center size-5 text-xs font-bold text-white bg-primary rounded-full">
                                    {cartItemsCount}
                                </span>
                            )}
                            <span className="sr-only">Shopping cart</span>
                        </Button>
                    </Link>

                    {/* Wishlist */}
                    <Link href="/wishlist" className="hidden sm:inline-flex">
                        <Button variant="ghost" size="icon">
                            <Heart className="size-5" />
                            <span className="sr-only">Wishlist</span>
                        </Button>
                    </Link>

                    {/* Theme Toggle */}
                    <ToggleTheme />

                    {/* User Account Dropdown */}
                    {isLoggedIn ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <User className="size-5" />
                                    <span className="sr-only">User menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="cursor-pointer">
                                        <User className="mr-2 size-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/orders" className="cursor-pointer">
                                        <Package className="mr-2 size-4" />
                                        My Orders
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/wishlist" className="cursor-pointer">
                                        <Heart className="mr-2 size-4" />
                                        Wishlist
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings" className="cursor-pointer">
                                        <Settings className="mr-2 size-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive cursor-pointer">
                                    <LogOut className="mr-2 size-4" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="hidden sm:flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">Sign Up</Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t bg-background">
                    <div className="container px-4 py-4 space-y-3">
                        {/* Mobile Search */}
                        <div className="md:hidden relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Search medicines..."
                                className="w-full h-10 pl-10 pr-4 rounded-md border bg-background text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
                            />
                        </div>

                        {/* Mobile Navigation Links */}
                        <div className="flex flex-col space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start"
                                        size="sm"
                                    >
                                        {link.label}
                                    </Button>
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Auth Buttons */}
                        {!isLoggedIn && (
                            <>
                                <div className="pt-2 border-t" />
                                <div className="flex flex-col gap-2 sm:hidden">
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full" size="sm">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Button className="w-full" size="sm">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            </>
                        )}

                        {/* Mobile Wishlist Link */}
                        {isLoggedIn && (
                            <div className="sm:hidden pt-2 border-t">
                                <Link
                                    href="/wishlist"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start"
                                        size="sm"
                                    >
                                        <Heart className="mr-2 size-4" />
                                        Wishlist
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
