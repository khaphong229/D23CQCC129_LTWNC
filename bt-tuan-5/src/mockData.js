const categories = ['Điện tử', 'Thời trang', 'Gia dụng', 'Sách', 'Thể thao']

export function generateProducts(count = 10000) {
  const items = []
  for (let i = 1; i <= count; i++) {
    const category = categories[i % categories.length]
    items.push({
      id: i,
      name: `Sản phẩm mẫu số ${i} - ${category}`,
      category,
      price: (i * 17) % 500000 + 10000,
      stock: (i * 7) % 200 + 1,
      rating: ((i % 5) + 1).toFixed(1)
    })
  }
  return items
}

export const initialProducts = generateProducts(10000)
