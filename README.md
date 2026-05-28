# 🍜 Landing Page Phở Gà Ta Chính Gốc Hà Nội tại Đà Nẵng

Chào mừng bạn đến với dự án Website Landing Page giới thiệu và bán hàng trực tuyến của quán **Phở Gà Ta chính gốc Hà Nội** đặt tại **Đà Nẵng**!

Dự án này là một tác phẩm nghệ thuật kỹ thuật số, kết hợp tinh tế giữa **vị thanh nhẹ, nước dùng trong vắt tinh khiết của phở Hà Nội** cổ truyền với **bối cảnh biển xanh nắng vàng, gió mát phóng khoáng của bờ biển Mỹ Khê - Đà Nẵng**. 

---

## ✨ Điểm Nổi Bật & Ý Tưởng Thiết Kế (Design System)

- **Hệ màu sắc độc đáo**:
  - `Trắng Kem (#FAF7F2 / #FDFDFB)`: Tượng trưng cho bánh phở mềm mịn và nước dùng trong thanh nhã đặc trưng của miền Bắc.
  - `Xanh Dương Nhạt (#EBF4F6 - #2A6F86)`: Gợi không khí mát lạnh, năng động của biển miền Trung.
  - `Đỏ Gạch (#BC3B2C)`: Tạo điểm nhấn ấm cúng của bếp lửa đỏ rực đun phở và gia vị cay ấm.
- **Phông chữ tinh tế**: Sự kết hợp giữa phông serif thanh lịch cổ xưa `Playfair Display` (tiêu đề chính) và phông sans-serif hiện đại, rõ nét `Be Vietnam Pro` (nội dung, mô tả).
- **Responsive hoàn hảo**: Đảm bảo hiển thị đẹp mắt, trực quan và trơn tru trên mọi thiết bị (Desktop, Máy tính bảng, Điện thoại di động) với thanh điều hướng Glassmorphic mờ ảo tự co giãn và menu Hamburger thông minh.
- **Hiệu ứng Micro-interaction mượt mà**:
  - Tự động thay đổi độ mờ đục của thanh điều hướng khi cuộn trang.
  - Bộ lọc thực đơn (Tabs) phân loại 10 món ăn cực kỳ nhanh gọn và đẹp mắt.
  - Khi nhấp **"Chọn món"** tại bất kỳ thẻ món ăn nào, trang sẽ tự động cuộn xuống Form đặt bàn, tự động điền tên món vào ô tuyển chọn và áp dụng hiệu ứng nổi bật (shake/zoom nhẹ) vào form nhập để dẫn dắt trải nghiệm khách hàng.
  - Form đặt bàn tích hợp kiểm tra lỗi nhập (họ tên đầy đủ, số điện thoại chuẩn định dạng mạng Việt Nam).
  - Khi gửi form thành công, thông tin đơn hàng được in định dạng đẹp mắt ra **Developer Console** (`console.log`) đồng thời hiển thị **Popup Modal xác nhận đặt bàn** vô cùng hiện đại, thay thế cho hàm alert thô sơ.

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
/
├── index.html          # File cấu trúc HTML5 chuẩn SEO (tên thẻ ngữ nghĩa, meta tag đầy đủ)
├── style.css           # File thiết kế CSS chính (chứa grid, flexbox, biến CSS màu sắc, animation)
├── app.js              # Xử lý các tương tác người dùng phía frontend
├── test_landing.js     # Script kiểm thử tự động End-to-End bằng Playwright
├── package.json        # Danh sách thư viện và script của Node.js
├── README.md           # Hướng dẫn chạy và cài đặt dự án (Tệp tin này)
├── assets/             # Chứa tài nguyên hình ảnh chất lượng cao
│   ├── hero-bg.png     # Ảnh nền phần Hero (Tô phở gà bày trí cạnh biển Đà Nẵng tuyệt đẹp)
│   └── menu/           # Ảnh nhỏ các món ăn đặc sắc
│       ├── pho-ga.png
│       ├── bun-thang.png
│       ├── banh-cuon.png
│       ├── nem-chua-ran.png
│       └── chanh-mat-ong.png
```

---

## 🛠️ Hướng Dẫn Chạy Dự Án Cục Bộ

Trang landing page được phát triển bằng **HTML, CSS và JavaScript thuần** nên việc chạy thử nghiệm vô cùng dễ dàng và nhanh chóng mà không cần các bước build nặng nề:

### Cách 1: Chạy trực tiếp (Nhanh nhất)
1. Chỉ cần nhấp đúp (Double-click) trực tiếp vào tệp tin `index.html` trong thư mục dự án để mở trang web bằng bất kỳ trình duyệt nào (Chrome, Edge, Safari, Firefox).
2. Tận hưởng giao diện đẹp mắt và trải nghiệm tương tác đặt bàn!

### Cách 2: Chạy qua Live Server (Khuyên dùng khi lập trình)
Nếu bạn có Node.js cài sẵn trên máy:
```bash
# Cài đặt server siêu nhẹ toàn cục
npm install -g http-server

# Khởi chạy server tại thư mục Web
http-server .
```
Sau đó truy cập địa chỉ được hiển thị (ví dụ: `http://127.0.0.1:8080`) trên trình duyệt của bạn.

---

## 🤖 Hướng Dẫn Chạy Kiểm Thử Tự Động (Automated Testing)

Chúng tôi đã lập trình sẵn một kịch bản kiểm thử End-to-End toàn diện bằng **Playwright** để xác thực giao diện và chức năng của website:

### Các bước chuẩn bị và chạy test:
1. Đảm bảo bạn đã cài đặt các thư viện cần thiết (nếu chưa cài):
   ```bash
   npm install
   npx playwright install chromium
   ```
2. Khởi chạy script kiểm thử tự động:
   ```bash
   node test_landing.js
   ```

### Kết quả kiểm thử thu được sau khi chạy xong:
Script kiểm thử sẽ tự động thực hiện các thao tác:
1. Mở trang web ở phiên bản Desktop.
2. Mô phỏng hành động cuộn trang lên xuống của khách hàng thật để kiểm tra độ mượt.
3. Điền thông tin thử nghiệm vào Form đặt bàn, chọn món, gửi đi và xác minh các thông số xuất hiện trên Popup Modal thành công.
4. Chụp ảnh màn hình toàn bộ trang web ở giao diện máy tính: **`screenshot_desktop.png`**.
5. Thay đổi kích thước màn hình sang dạng di động iPhone 12, nhấn thử nghiệm đóng/mở Hamburger Menu.
6. Chụp ảnh màn hình toàn bộ trang web ở giao diện di động: **`screenshot_mobile.png`**.
7. Xuất ra một video ngắn ghi hình lại toàn bộ quá trình cuộn trang và điền form: **`demo_recording.webm`**.

---

## 🎨 Thông Tin Đóng Góp & Thiết Kế
* Ý tưởng giao thoa ẩm thực Hà Nội & phong cảnh Đà Nẵng: **Quán Phở Gà Ta Cổ Truyền**
* Tác giả thiết kế giao diện & lập trình: **Minh Đỗ**
