import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Add item to cart or increment quantity if exists
      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          // Item exists, increment quantity
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          // New item, add with quantity 1
          set({
            items: [...items, { ...item, quantity: 1 }],
          });
        }
      },

      // Remove item from cart
      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      // Update item quantity
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          // If quantity is 0 or less, remove item
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      // Clear all items
      clearCart: () => {
        set({ items: [] });
      },

      // Toggle cart sheet
      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      // Open cart sheet
      openCart: () => {
        set({ isOpen: true });
      },

      // Close cart sheet
      closeCart: () => {
        set({ isOpen: false });
      },
    }),
    {
      name: "medistore-cart", // localStorage key
      // Only persist items, not the isOpen state
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Selectors for computed values
export const useTotalItems = () => useCartStore((state) => state.items.length);
export const useTotalPrice = () =>
  useCartStore((state) =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  );
