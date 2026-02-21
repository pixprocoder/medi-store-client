"use client";

import { Star } from "lucide-react";

interface ReviewCardProps {
    id: string;
    customerId: string;
    rating: number;
    comment: string;
    createdAt: string;
    customerName?: string;
}

export function ReviewCard({
    rating,
    comment,
    createdAt,
    customerName,
}: ReviewCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="rounded-lg border border-border bg-card p-4 space-y-3">
            {/* Header: Rating and Date */}
            <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${
                                i < rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                            }`}
                        />
                    ))}
                </div>
                <span className="text-xs text-muted-foreground">
                    {formatDate(createdAt)}
                </span>
            </div>

            {/* Customer Name */}
            {customerName && (
                <p className="text-sm font-medium">{customerName}</p>
            )}

            {/* Review Comment */}
            {comment && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {comment}
                </p>
            )}
        </div>
    );
}
