import Accordion from "./Accordion";
import usePagination from "./usePagination";

type Product = {
  id: number;
  name: string;
  price: number;
};

const danhSachSP: Product[] = [
  { id: 1, name: "Áo thun", price: 150000 },
  { id: 2, name: "Quần jean", price: 350000 },
  { id: 3, name: "Giày thể thao", price: 800000 },
  { id: 4, name: "Nón lưỡi trai", price: 120000 },
  { id: 5, name: "Balo", price: 450000 },
  { id: 6, name: "Ví da", price: 200000 },
  { id: 7, name: "Đồng hồ", price: 1500000 },
  { id: 8, name: "Kính mát", price: 300000 },
  { id: 9, name: "Dây nịt", price: 180000 },
  { id: 10, name: "Tất", price: 50000 },
  { id: 11, name: "Áo khoác", price: 600000 },
  { id: 12, name: "Áo sơ mi", price: 250000 },
];

function App() {
  const { currentPage, totalPages, currentItems, next, prev, goToPage } =
    usePagination<Product>(danhSachSP, 4);

  return (
    <div style={{ maxWidth: 600, margin: "30px auto", fontFamily: "sans-serif" }}>
      <h1>Bài tập React</h1>

      <h2>1. Accordion (Compound Component)</h2>
      <Accordion>
        <Accordion.Item index={0} title="React là gì?">
          React là thư viện JavaScript để xây dựng giao diện người dùng.
        </Accordion.Item>
        <Accordion.Item index={1} title="Context API là gì?">
          Context API giúp truyền dữ liệu qua các component mà không cần props drilling.
        </Accordion.Item>
        <Accordion.Item index={2} title="Custom Hook là gì?">
          Custom Hook là hàm bắt đầu bằng "use" để tái sử dụng logic giữa các component.
        </Accordion.Item>
      </Accordion>

      <hr style={{ margin: "30px 0" }} />

      <h2>2. usePagination - Danh sách sản phẩm</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {currentItems.map((sp) => (
          <li
            key={sp.id}
            style={{
              padding: "10px 14px",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{sp.name}</span>
            <span>{sp.price.toLocaleString()}đ</span>
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

export default App;
