import { useState } from "react";

function usePagination<T>(data: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const next = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return { currentPage, totalPages, currentItems, next, prev, goToPage };
}

export default usePagination;


type Product = {
  id: number;
  name: string;
  price: number;
};

const fakeProducts: Product[] = [
  { id: 1, name: "Ao thun", price: 150000 },
  { id: 2, name: "Quan jean", price: 350000 },
  { id: 3, name: "Giay the thao", price: 800000 },
  { id: 4, name: "Non luoi trai", price: 120000 },
  { id: 5, name: "Balo", price: 450000 },
  { id: 6, name: "Vi da", price: 200000 },
  { id: 7, name: "Dong ho", price: 1500000 },
  { id: 8, name: "Kinh mat", price: 300000 },
  { id: 9, name: "Day nit", price: 180000 },
  { id: 10, name: "Tat", price: 50000 },
  { id: 11, name: "Ao khoac", price: 600000 },
  { id: 12, name: "Ao so mi", price: 250000 },
];

function ProductList() {
  const { currentPage, totalPages, currentItems, next, prev, goToPage } =
    usePagination<Product>(fakeProducts, 4);

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Danh sach san pham</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {currentItems.map((p) => (
          <li
            key={p.id}
            style={{
              padding: "10px 14px",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{p.name}</span>
            <span>{p.price.toLocaleString()}đ</span>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 16 }}>
        <button onClick={prev} disabled={currentPage === 1}>
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            style={{
              fontWeight: page === currentPage ? "bold" : "normal",
              backgroundColor: page === currentPage ? "#333" : "#fff",
              color: page === currentPage ? "#fff" : "#333",
              border: "1px solid #ccc",
              padding: "4px 10px",
              cursor: "pointer",
              borderRadius: 4,
            }}
          >
            {page}
          </button>
        ))}

        <button onClick={next} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <p style={{ marginTop: 8, color: "#888", fontSize: 14 }}>
        Trang {currentPage} / {totalPages}
      </p>
    </div>
  );
}

export { ProductList };
