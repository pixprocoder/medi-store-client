"use client";

import { IReview } from "@/types/review.types";
import { Star } from "lucide-react";
import * as React from "react";
import { ReviewCard } from "./ReviewCard";



interface ReviewListProps {
    reviews: IReview[];
    averageRating?: number;
    totalReviews?: number;
}

export function ReviewList({
    reviews,
    averageRating,
    totalReviews,
}: ReviewListProps) {
    // Calculate rating distribution
    const ratingCounts = React.useMemo(() => {
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach((review) => {
            if (review.rating >= 1 && review.rating <= 5) {
                counts[review.rating as keyof typeof counts]++;
            }
        });
        return counts;
    }, [reviews]);

    const totalCount = totalReviews || reviews.length;
    const avgRating = averageRating || 0;

    if (reviews.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">No reviews yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Be the first to review this product
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Rating Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg bg-muted/50">
                {/* Average Rating */}
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-5xl font-bold">{avgRating.toFixed(1)}</div>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-5 w-5 ${i < Math.floor(avgRating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Based on {totalCount} {totalCount === 1 ? "review" : "reviews"}
                    </p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = ratingCounts[star as keyof typeof ratingCounts];
                        const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;

                        return (
                            <div key={star} className="flex items-center gap-2">
                                <span className="text-sm font-medium w-8">{star}</span>
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-400 transition-all"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="text-sm text-muted-foreground w-12 text-right">
                                    {count}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Reviews List */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} {...review} />
                    ))}
                </div>
            </div>
        </div>
    );
}
