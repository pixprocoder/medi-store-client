import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  items: number[];
  toggle: (id: number) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (id) => {
        const { items } = get();
        set({
          items: items.includes(id)
            ? items.filter((i) => i !== id)
            : [...items, id],
        });
      },
    }),
    {
      name: "medistore-wishlist",
    }
  )
);
