# AgentSkills — Nhật ký dự án (Project Log)

Tổng hợp **toàn bộ công việc** đã làm cho nền tảng **AgentSkills** — nền tảng mở chia sẻ *skills* (hướng dẫn file đơn) và *collections* (bộ nhiều file), từ lúc bắt đầu đến hiện tại.

> 📄 Tài liệu liên quan: [DATABASE.md](DATABASE.md) (CSDL & kiến trúc), [DEPLOY.md](DEPLOY.md) (triển khai Vercel).

---

## 1. Tổng quan

- **Sản phẩm:** website chia sẻ skills/collections cho cộng đồng — duyệt, tìm kiếm, xem chi tiết, star, bình luận, tải xuống, đóng góp; có phân quyền và trang quản trị + báo cáo.
- **Hai đối tượng nội dung:** `skill` (1 file) và `collection` (nhiều file/cấu hình).
- **Đa ngôn ngữ giao diện:** Tiếng Việt ⇄ English (nhớ lựa chọn).
- **Tổ chức:** Phòng thí nghiệm **AI In Future (AIFlab)**.

## 2. Công nghệ (hiện tại)

| Lớp | Dùng |
|---|---|
| Frontend | HTML + Tailwind (CDN) + JavaScript thuần (không build), Chart.js cho biểu đồ |
| Backend | Node.js (module `http` built-in, **không framework**), kiến trúc **MVC** |
| CSDL | **MongoDB Atlas** (driver `mongodb`) |
| Khác | `jszip` (xuất file tải về), session **cookie ký HMAC** (stateless) |
| Triển khai | **Vercel** (serverless function `api/` + static `public/`); chạy local bằng `local-server.js` |

---

## 3. Tiến trình theo từng giai đoạn

### Giai đoạn 1 — Giao diện tĩnh (prototype UI)
- Dựng 3 trang đầu tiên: **trang chủ** (browse), **chi tiết**, **đóng góp (upload)**.
- Phong cách sáng/hiện đại (Tailwind), accent tím–indigo.
- Trang chủ: hero + tìm kiếm, tab **Tất cả / Skills / Collections**, lọc danh mục, sắp xếp, lưới card (badge loại + định dạng + sao + lượt tải).
- Chi tiết: README/preview (render markdown), danh sách file (cho collection), sidebar thông tin, khu bình luận.
- Upload: chọn loại (skill/collection), vùng kéo-thả file, form metadata.

### Giai đoạn 2 — Đa ngôn ngữ + nhãn ngôn ngữ skill
- Hệ thống **i18n** (từ điển VI/EN) + công tắc **VI/EN** trên header mọi trang, lưu `localStorage`.
- Mỗi skill có **thuộc tính ngôn ngữ** (🇻🇳/🇬🇧), hiển thị badge + **bộ lọc theo ngôn ngữ**; upload có chọn ngôn ngữ.

### Giai đoạn 3 — Đăng nhập & phân quyền (ban đầu lưu file .txt)
- Tạo backend Node (zero-dependency), lưu tài khoản vào `data/users.txt`; mật khẩu **hash scrypt + salt**.
- **3 vai trò:** `admin`, `sub-admin`, `user`. Admin gốc: **Azure**.
- Trang **đăng nhập / đăng ký**; đăng nhập mạng xã hội (mô phỏng).
- Phân quyền: admin đổi mọi role; sub-admin chỉ chỉnh role bậc *user* + xoá skill; admin/sub-admin xoá skill.
- **Trang cá nhân:** tổng sao, đóng góp, phân bố danh mục, lượt xem trang.

### Giai đoạn 4 — Bỏ kiểm duyệt, quản lý danh mục, trạng thái tài khoản
- **Bỏ duyệt nội dung** — upload hiển thị ngay.
- **Quản lý danh mục** trong trang admin (thêm/sửa/xoá); sub-admin được **thêm** danh mục.
- Mỗi tài khoản có **trạng thái** (`active`/`banned`) + **ngày đăng ký / đăng nhập cuối / đóng góp cuối**; tài khoản bị cấm không đăng nhập/đóng góp được.
- Khi upload, nếu danh mục chưa có → chọn **"Khác"** rồi nhập tên VI + EN để tạo mới.

### Giai đoạn 5 — Liên kết liên hệ trên trang cá nhân
- Người dùng thêm **liên kết liên hệ** tuỳ ý (nút ＋): chọn nền tảng (email, GitHub, Facebook, X, LinkedIn, Instagram, YouTube, Discord, Telegram, Website) + nhập link. Chỉ chủ trang sửa được; khách thấy chip bấm được.

### Giai đoạn 6 — Biểu đồ trên trang cá nhân
- **Biểu đồ tròn** phân bố danh mục (kèm %).
- **Biểu đồ cột đóng góp theo thời gian** (chọn theo tháng từ→đến, hoặc theo năm). Dùng Chart.js.

### Giai đoạn 7 — Footer dùng chung + thương hiệu
- **Footer chung** render bằng JS cho mọi trang (1 nguồn, tự dịch).
- Footer hiển thị **số lượt truy cập** website (đếm 1 lần/trình duyệt/ngày).
- **Đổi tên thương hiệu:** SkillHub → **AgentSkills** (logo, tiêu đề, toàn bộ chuỗi).
- Footer ghi **bản quyền** + dòng *"Xây dựng bởi AI In Future (AIFlab)"* (gộp vào phần mô tả).

### Giai đoạn 8 — Trang Báo cáo (admin)
- Tab **Báo cáo** trong quản trị: tổng truy cập / hôm nay, số người dùng, tổng đóng góp (skill/collection), **biểu đồ truy cập theo thời gian**, **người dùng mới đăng ký** (lọc theo khoảng ngày), **phân bố danh mục** (cao nhất/thấp nhất + %), **top người đóng góp**.

### Giai đoạn 9 — Chuyển sang MongoDB + kiến trúc MVC
- Chuyển toàn bộ lưu trữ từ file `.txt`/`.json` sang **MongoDB Atlas** (db `agentskills`, 4 collection: `users`, `skills`, `categories`, `visits`).
- Tổ chức lại theo **MVC**: `config.js`, `src/db.js`, `src/models/*`, `src/controllers.js`, `src/routes.js`, `src/seed.js`, `src/lib/*`, frontend dồn vào `public/`.
- **Chỉ 1 tài khoản:** Azure (admin) — mật khẩu đặt khi seed.
- **Dữ liệu thật, không synthetic:** import nội dung từ thư mục `Vite_Code_Guides`, phân loại:
  - `project_structure_templates` → Collection · Coding · EN (6 file)
  - `research_paper_templates` → Collection · Research · EN (3 file)
  - `Working_In_Organization` → Collection · Workflow · VI (2 file)
  - `tool_use/latex.md` → Skill · Writing · EN
- Viết [DATABASE.md](DATABASE.md).

### Giai đoạn 10 — API Download (xuất ZIP)
- 3 endpoint tải xuống, mỗi lần tải **tăng bộ đếm**:
  - `GET /api/download/skill/:id` — tải 1 skill/collection theo id.
  - `GET /api/download/category/:catId` — tải cả 1 danh mục.
  - `GET /api/download/all` — tải toàn bộ.
- UI: nút ⬇ trên mỗi card, nút Tải xuống ở trang chi tiết, nút **Tải danh mục / Tải tất cả** ở thanh công cụ trang chủ.

### Giai đoạn 11 — Triển khai Vercel
- Điều chỉnh cho **serverless**: backend thành function `api/index.js`; **session stateless** (cookie ký HMAC) thay cho Map trong RAM; cache kết nối Mongo; `readBody` tương thích Vercel.
- Cấu hình `vercel.json` (**builds** tường minh: `@vercel/node` cho `api/`, `@vercel/static` cho `public/`) — tắt auto-detect.
- Đổi tên `server.js` → `local-server.js` (tránh Vercel tự wrap), thêm script `npm run seed`.
- Khắc phục các lỗi deploy: *FUNCTION_INVOCATION_FAILED* (kết nối Mongo treo → mở **Atlas Network Access 0.0.0.0/0**, fail nhanh 8s), *No exports/No entrypoint* (do auto-detect → chuyển sang `builds`). → **Chạy thành công.**

### Giai đoạn 12 — Hiện thực hoá các phần "mô phỏng"
- ⭐ **Star** thật: toggle theo user, lưu `starredBy` + đếm `stars`.
- 💬 **Bình luận** thật: lưu DB, yêu cầu đăng nhập, tự tính **rating trung bình**.
- 🔐 **Đăng nhập:** gỡ bỏ các nút Google/Facebook/GitHub mô phỏng → chỉ còn **đăng nhập bằng tài khoản (username/mật khẩu) + đăng ký**; gỡ dòng lộ tài khoản admin trên trang login.

---

## 4. Tính năng hiện có

**Người dùng:** duyệt/tìm/lọc (loại, danh mục, ngôn ngữ, sắp xếp) · xem chi tiết + README · ⭐ star · 💬 bình luận + chấm sao · ⬇ tải xuống (skill / danh mục / tất cả) · đăng ký/đăng nhập · trang cá nhân (thống kê + biểu đồ + liên kết liên hệ) · đổi ngôn ngữ VI/EN.

**Đóng góp:** upload skill/collection, chọn/ tạo danh mục mới, đặt ngôn ngữ; chủ sở hữu **sửa** nội dung của mình (gắn nhãn "Đã chỉnh sửa").

**Quản trị (admin/sub-admin):** đổi vai trò, **cấm/bỏ cấm** tài khoản, quản lý danh mục, xoá skill, **xem báo cáo thống kê**.

## 5. Cấu trúc thư mục

```
config.js              cấu hình (Mongo URI, DB, port, SESSION_SECRET, GUIDES_DIR)
local-server.js        chạy local (server thường trú)
api/index.js           entry serverless trên Vercel
vercel.json            cấu hình deploy (builds + routes)
src/
 ├─ db.js              kết nối MongoDB (singleton, cache)
 ├─ models/            users · skills · categories · visits
 ├─ controllers.js     toàn bộ handler API
 ├─ routes.js          bảng định tuyến
 ├─ seed.js            seed lần đầu (Azure + import guide thật)
 └─ lib/               http (session/cookie/json/static) · helpers (role/makeUser/slugify)
scripts/seed.js        seed thủ công: npm run seed
public/                frontend: index/detail/upload/profile/login/register/admin + assets/
DATABASE.md · DEPLOY.md · PROJECT_LOG.md
```

## 6. Chạy & triển khai

**Local**
```bash
npm install
npm start        # = node local-server.js → http://localhost:3000
```
**Vercel:** xem [DEPLOY.md](DEPLOY.md) — mở Atlas Network Access `0.0.0.0/0`, đặt env `MONGODB_URI` / `DB_NAME` / `SESSION_SECRET`, push GitHub → Vercel tự deploy.

Tài khoản admin: **Azure** (mật khẩu đặt khi seed).

## 7. Việc còn lại / khuyến nghị
- 🔐 **Đổi mật khẩu MongoDB** trong Atlas (vì từng nằm trong `config.js` đã push GitHub) và chỉ dùng qua Environment Variables.
- Đặt `SESSION_SECRET` thật trên Vercel (đừng dùng giá trị fallback).
- (Tuỳ chọn) OAuth thật Google/GitHub — cần tạo OAuth App + cấp Client ID/Secret.
- (Tuỳ chọn) Lưu **toàn bộ nội dung từng file** của collection vào DB để gói ZIP đầy đủ (hiện chỉ lưu README/preview + metadata).
- (Tuỳ chọn) Lưu file upload thật vào storage (hiện upload lưu metadata + README).
