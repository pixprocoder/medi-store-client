"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

interface ReviewFormProps {
    medicineId: string;
    onSuccess?: () => void;
}

export function ReviewForm({ medicineId, onSuccess }: ReviewFormProps) {
    const [rating, setRating] = React.useState(0);
    const [hoveredRating, setHoveredRating] = React.useState(0);
    const [comment, setComment] = React.useState("");
    const queryClient = useQueryClient();

    const { mutate: submitReview, isPending } = useMutation({
        mutationFn: async (data: { rating: number; comment: string }) => {
            return api.post(`/reviews/${medicineId}`, data);
        },
        onSuccess: (response: any) => {
            // Show success toast
            toast.success(response.message || "Review submitted successfully!");

            // Reset form
            setRating(0);
            setComment("");

            // Invalidate medicine query to refetch with new review
            queryClient.invalidateQueries({ queryKey: ["medicine", medicineId] });

            // Call optional success callback
            onSuccess?.();
        },
        onError: (error: any) => {
            // Show error toast with message from backend
            const errorMessage = error?.response?.data?.message || error?.message || "Failed to submit review. Please try again.";
            // Reset form
            setRating(0);
            setComment("");
            toast.error(errorMessage);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        if (!comment.trim()) {
            toast.error("Please write a review comment");
            return;
        }

        submitReview({
            rating,
            comment: comment.trim(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold">Write a Review</h3>

            {/* Rating Stars */}
            <div className="space-y-2">
                <label className="text-xs font-medium">Your Rating</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="transition-transform hover:scale-110"
                        >
                            <Star
                                className={`h-5 w-5 ${star <= (hoveredRating || rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Comment Textarea */}
            <div className="space-y-2">
                <label htmlFor="comment" className="text-xs font-medium">
                    Your Review
                </label>
                <Textarea
                    id="comment"
                    placeholder="Share your experience with this medicine..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="resize-none"
                />
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isPending || rating === 0}>
                {isPending ? "Submitting..." : "Submit Review"}
            </Button>
        </form>
    );
}
