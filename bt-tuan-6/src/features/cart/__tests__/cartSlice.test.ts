import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  CartState,
} from '../cartSlice';
import type { Product } from '../../products/productsSlice';

describe('cartSlice Unit Tests', () => {
  const initialEmptyState: CartState = {
    items: [],
  };

  const mockProduct1: Product = {
    id: 1,
    name: 'Bàn phím cơ DareU EK87',
    price: 650000,
    image: 'keyboard.jpg',
    description: 'Bàn phím cơ DareU gõ êm',
    category: 'Phụ kiện',
  };

  it('1. should return the initial state when passed an empty action', () => {
    const state = cartReducer(undefined, { type: 'unknown_action' });
    expect(state).toEqual({ items: [] });
  });

  it('2. should add a new product to an empty cart with quantity 1', () => {
    const state = cartReducer(initialEmptyState, addToCart(mockProduct1));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({
      id: 1,
      name: 'Bàn phím cơ DareU EK87',
      price: 650000,
      image: 'keyboard.jpg',
      quantity: 1,
    });
  });

  it('3. should increment quantity when adding an already existing product', () => {
    let state = cartReducer(initialEmptyState, addToCart(mockProduct1));
    state = cartReducer(state, addToCart(mockProduct1));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('4. should remove a product from cart by id with removeFromCart', () => {
    let state: CartState = {
      items: [
        { id: 1, name: 'Item 1', price: 100, image: 'img1', quantity: 2 },
        { id: 2, name: 'Item 2', price: 200, image: 'img2', quantity: 1 },
      ],
    };

    state = cartReducer(state, removeFromCart(1));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(2);
  });

  it('5. should update quantity directly with updateQuantity when quantity > 0', () => {
    let state: CartState = {
      items: [{ id: 1, name: 'Item 1', price: 100, image: 'img1', quantity: 2 }],
    };

    state = cartReducer(state, updateQuantity({ id: 1, quantity: 5 }));
    expect(state.items[0].quantity).toBe(5);
  });

  it('6. should remove item if updateQuantity is set to 0 or negative', () => {
    let state: CartState = {
      items: [{ id: 1, name: 'Item 1', price: 100, image: 'img1', quantity: 2 }],
    };

    state = cartReducer(state, updateQuantity({ id: 1, quantity: 0 }));
    expect(state.items).toHaveLength(0);

    // Test with negative number
    state = {
      items: [{ id: 2, name: 'Item 2', price: 200, image: 'img2', quantity: 1 }],
    };
    state = cartReducer(state, updateQuantity({ id: 2, quantity: -3 }));
    expect(state.items).toHaveLength(0);
  });

  it('7. should increment quantity by 1 with increaseQuantity', () => {
    let state: CartState = {
      items: [{ id: 1, name: 'Item 1', price: 100, image: 'img1', quantity: 2 }],
    };

    state = cartReducer(state, increaseQuantity(1));
    expect(state.items[0].quantity).toBe(3);
  });

  it('8. should decrement quantity by 1 with decreaseQuantity when quantity > 1', () => {
    let state: CartState = {
      items: [{ id: 1, name: 'Item 1', price: 100, image: 'img1', quantity: 3 }],
    };

    state = cartReducer(state, decreaseQuantity(1));
    expect(state.items[0].quantity).toBe(2);
  });

  it('9. should remove item with decreaseQuantity when current quantity is 1', () => {
    let state: CartState = {
      items: [{ id: 1, name: 'Item 1', price: 100, image: 'img1', quantity: 1 }],
    };

    state = cartReducer(state, decreaseQuantity(1));
    expect(state.items).toHaveLength(0);
  });

  it('10. should clear all items when clearCart is dispatched', () => {
    let state: CartState = {
      items: [
        { id: 1, name: 'Item 1', price: 100, image: 'img1', quantity: 2 },
        { id: 2, name: 'Item 2', price: 200, image: 'img2', quantity: 3 },
      ],
    };

    state = cartReducer(state, clearCart());
    expect(state.items).toEqual([]);
  });

  it('11. should not mutate state when updateQuantity, increaseQuantity, or decreaseQuantity is called on non-existent id', () => {
    const originalState: CartState = {
      items: [{ id: 1, name: 'Item 1', price: 100, image: 'img1', quantity: 2 }],
    };

    let state = cartReducer(originalState, updateQuantity({ id: 999, quantity: 10 }));
    expect(state.items[0].quantity).toBe(2);

    state = cartReducer(state, increaseQuantity(999));
    expect(state.items[0].quantity).toBe(2);

    state = cartReducer(state, decreaseQuantity(999));
    expect(state.items[0].quantity).toBe(2);
  });
});
