// Enums (Định nghĩa các tập giá trị cố định)

export enum OrderStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
}

export enum PaymentMethod {
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
    PAYPAL = "PAYPAL",
    BANK_TRANSFER = "BANK_TRANSFER",
}

export enum CustomerTier {
    STANDARD = "STANDARD",
    PREMIUM = "PREMIUM",
    VIP = "VIP",
}

// Genric Type (Kiểu dữ liệu tổng quát)

export interface BaseEntity<TId = string> {
    id: TId;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    timestamp: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// Core Interfaces (Các Interfaces chính)

export interface Product extends BaseEntity<string> {
    name: string;
    sku: string;
    desc?: string;
    price: number;
    stockQuantity: number;
    category: string;
    isActive: boolean;
}

export interface Address {
    street: string;
    ward?: string;
    district: string;
    city: string;
    country: string;
}

export interface Customer extends BaseEntity<string> {
    email: string;
    fullName: string;
    phone?: string;
    address?: Address;
    tier: CustomerTier;
}

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    discount?: number;
}

export interface Order extends BaseEntity<string> {
    orderCode: string;
    customerId: string;
    customer?: Customer;
    items: OrderItem[];
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    shippingAddress: Address;
    totalAmount: number;
    discountAmount?: number;
    notes?: string;
}

// UTILITY TYPES & DTOs (Data Transfer Objects)

// Omit

// khi tạo mới sản phẩm thì loại bỏ id, created at, updated
export type CreateProductDTO = Omit<Product, "id" | "createdAt" | "updatedAt">;

export type CreateCustomerDTO = Omit<Customer, "id" | "createdAt" | "updatedAt" | "tier">;

// khi tạo item trong đơn thì subTotal sẽ do hệ thống tự tính 
export type CreateOrderItemDTO = Omit<OrderItem, "subtotal">;

// parital 
// cho phép các thuộc tính là optional (tùy chọn)
export type UpdateProductDTO = Partial<CreateProductDTO>;
export type UpdateCustomerDTO = Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>;
export type UpdateOrderStatusDTO = Pick<Order, 'status'> & { note?: string };

// pick 
// chỉ lấy ra các thuộc tính mong muốn
export type ProductSummary = Pick<Product, 'id' | 'name' | 'price' | 'category' | 'isActive'>;
export type CustomerSummary = Pick<Customer, 'id' | 'fullName' | 'email' | 'tier'>;
export type OrderSummary = Pick<Order, 'id' | 'orderCode' | 'totalAmount' | 'status' | 'createdAt'>;

// readonly 
// đảm bảo các thuộc tính ko thể thay đổi

export type ImutableOrder = Readonly<Order>;
export type ImutableCustomer = Readonly<Customer>;
export type ImutableProduct = Readonly<Product>;


// Hàm Generic chuẩn hóa dữ liệu trả về của API
export function createApiResponse<T>(data: T, message = 'Success'): ApiResponse<T> {
    return {
        success: true,
        data,
        message,
        timestamp: new Date().toISOString(),
    };
}


// Hàm Generic tính tổng giá trị một thuộc tính số trong mảng (vd: tính tổng tiền)
export function calculateTotal<T>(items: T[], key: keyof T): number {
    return items.reduce((sum, item) => sum + (Number(item[key]) || 0), 0);
}