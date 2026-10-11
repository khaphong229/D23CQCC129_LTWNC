import { productsApi } from '../productsApi';
import { configureStore } from '@reduxjs/toolkit';

describe('productsApi RTK Query with Mocked Async API', () => {
  let store: ReturnType<typeof createTestStore>;

  const createTestStore = () =>
    configureStore({
      reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
    });

  beforeEach(() => {
    store = createTestStore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('1. should fetch products from mocked API and transform response accurately', async () => {
    const rawFakeStoreProducts = [
      {
        id: 101,
        title: 'Fjallraven - Foldsack No. 1 Backpack',
        price: 109.95,
        description: 'Your perfect pack for everyday use and walks in the forest.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      },
      {
        id: 102,
        title: 'Mens Casual Premium Slim Fit T-Shirts',
        price: 22.3,
        description: 'Slim-fitting style, contrast raglan long sleeve.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      },
    ];

    // Dùng native Response để có đầy đủ .clone(), .json() cho RTK Query fetchBaseQuery
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve(
        new Response(JSON.stringify(rawFakeStoreProducts), {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );

    // Dispatch endpoint getProductsFromApi
    const action = store.dispatch(productsApi.endpoints.getProductsFromApi.initiate());
    const response = await action;

    expect(response.status).toBe('fulfilled');
    expect(response.data).toHaveLength(2);

    // Kiểm tra transformResponse: title -> name, price quy đổi sang VNĐ (Math.round(price * 25000))
    expect(response.data?.[0]).toEqual({
      id: 101,
      name: 'Fjallraven - Foldsack No. 1 Backpack',
      price: Math.round(109.95 * 25000), // 2748750
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      description: 'Your perfect pack for everyday use and walks in the forest.',
      category: "men's clothing",
    });

    expect(response.data?.[1].name).toBe('Mens Casual Premium Slim Fit T-Shirts');
    expect(response.data?.[1].price).toBe(Math.round(22.3 * 25000));
  });

  it('2. should handle API failure gracefully with rejected status', async () => {
    // Mock global fetch rejecting
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve(
        new Response(JSON.stringify({ message: 'Internal Server Error' }), {
          status: 500,
          statusText: 'Internal Server Error',
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );

    const action = store.dispatch(productsApi.endpoints.getProductsFromApi.initiate());
    const response = await action;

    expect(response.status).toBe('rejected');
    expect(response.isError).toBe(true);
  });
});
