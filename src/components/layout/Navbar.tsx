"use client";

import {
    Heart,
    LogOut,
    Menu,
    Package,
    Settings,
    ShoppingCart,
    User,
    X
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
import { navLinks } from "@/constants";
import Image from "next/image";
import { ToggleTheme } from "./ToggleTheme";



export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [cartItemsCount] = React.useState(3); // Replace with actual cart state
    const [isLoggedIn] = React.useState(false); // Replace with actual auth state

    return (
        <header className=" sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <nav className="container flex h-16 items-center justify-between ">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <Image
                        src="/assets/logo/logo.svg"
                        alt="logo"
                        width={150}
                        height={150}
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href}>
                            <Button className="hover:text-white" variant="ghost" size="sm">
                                {link.label}
                            </Button>
                        </Link>
                    ))}
                </div>


                {/* Right Section */}
                <div className="flex items-center gap-2">


                    {/* Shopping Cart */}
                    <Link href="/cart">
                        <Button className="hover:text-white" variant="ghost" size="icon" >
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
                        <Button className="hover:text-white" variant="ghost" size="icon">
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
                            <Link href="/auth/login">
                                <Button className="hover:text-white" variant="ghost" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link className="hover:text-white" href="/auth/register">
                                <Button size="sm">Register</Button>
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
                <div className="lg:hidden bg-background">
                    <div className="container px-4 py-4 space-y-3">


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
                                <div className="pt-2 " />
                                <div className="flex flex-col gap-2 sm:hidden">
                                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full" size="sm">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link
                                        href="/auth/register"
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
