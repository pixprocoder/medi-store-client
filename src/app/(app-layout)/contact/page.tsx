"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
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

const CONTACT_INFO = [
    {
        icon: MapPin,
        title: "Address",
        detail: "123 Healthcare Street, Medical District, NY 10001",
    },
    {
        icon: Phone,
        title: "Phone",
        detail: "+1 (555) 123-4567",
    },
    {
        icon: Mail,
        title: "Email",
        detail: "support@medistore.com",
    },
    {
        icon: Clock,
        title: "Hours",
        detail: "Mon – Fri: 8AM – 10PM | Sat – Sun: 9AM – 6PM",
    },
];

const SUBJECTS = [
    "General Inquiry",
    "Order Support",
    "Prescription Help",
    "Product Question",
    "Complaint",
    "Other",
];

export default function ContactPage() {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = React.useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-12 max-w-2xl">
                <h1 className="text-3xl font-bold">Contact Us</h1>
                <p className="mt-3 text-muted-foreground">
                    Have a question or need support? We are here to help. Reach out to
                    our team and we will get back to you as soon as possible.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                {/* Contact Info Cards */}
                <div className="flex flex-col gap-4">
                    {CONTACT_INFO.map((info) => {
                        const Icon = info.icon;
                        return (
                            <div
                                key={info.title}
                                className="flex items-start gap-4 rounded-xl bg-card p-5 shadow-sm"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{info.title}</h3>
                                    <p className="mt-0.5 text-sm text-muted-foreground">
                                        {info.detail}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                    {submitted ? (
                        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-card p-10 shadow-sm text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                                <Mail className="h-8 w-8" />
                            </div>
                            <h2 className="text-xl font-bold">Message Sent!</h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Thank you for reaching out. Our team will get back to you within 24 hours.
                            </p>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-xl bg-card p-6 shadow-sm"
                        >
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {/* Name */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="mt-5 flex flex-col gap-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Select
                                    value={formData.subject}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({ ...prev, subject: value }))
                                    }
                                >
                                    <SelectTrigger id="subject">
                                        <SelectValue placeholder="Select a subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SUBJECTS.map((s) => (
                                            <SelectItem key={s} value={s}>
                                                {s}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Message */}
                            <div className="mt-5 flex flex-col gap-2">
                                <Label htmlFor="message">Message</Label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                />
                            </div>

                            {/* Submit */}
                            <Button type="submit" size="lg" className="mt-6 w-full">
                                Send Message
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
