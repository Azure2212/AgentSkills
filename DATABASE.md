# AgentSkills — Cơ sở dữ liệu (MongoDB)

Tài liệu mô tả cách nền tảng **AgentSkills** kết nối và lưu trữ dữ liệu trên **MongoDB Atlas**.

---

## 1. Kết nối

Thông tin kết nối nằm trong [`config.js`](config.js) (có thể override bằng biến môi trường):

```js
MONGODB_URI = "mongodb+srv://<user>:<pass>@aisharingskills.d7tjwq7.mongodb.net/?appName=AISharingSkills"
DB_NAME     = "agentskills"
PORT        = 3000
```

> ⚠️ **Bảo mật:** chuỗi kết nối chứa mật khẩu. Khi đưa lên Git/production, hãy chuyển sang biến môi trường:
> ```bash
> # Windows PowerShell
> $env:MONGODB_URI="mongodb+srv://..."; npm start
> ```
> Thư mục `node_modules/` và `data/` đã được bỏ qua trong `.gitignore`.

Kết nối được khởi tạo 1 lần (singleton) ở [`src/db.js`](src/db.js).

---

## 2. Chạy dự án

```bash
npm install      # cài driver mongodb (chỉ lần đầu)
npm start        # = node local-server.js  → http://localhost:3000
```

Khi khởi động, server sẽ:
1. Kết nối MongoDB (`connect()`).
2. **Seed/di trú** dữ liệu lần đầu (`src/seed.js`): nếu một collection rỗng, nó nhập dữ liệu từ thư mục `data/` cũ (file `.txt`/`.json`) nếu có; nếu không thì dùng dữ liệu mẫu mặc định.
3. Lắng nghe HTTP, phục vụ frontend trong `public/` + API `/api/*`.

Tài khoản admin mặc định: **Azure** (mật khẩu đặt trong `src/seed.js` khi seed lần đầu).

> Dữ liệu skill/collection **không phải dữ liệu mẫu** — được import từ các guide thật trong
> `config.GUIDES_DIR` (mặc định `Vite_Code_Guides`) ở lần chạy đầu, phân loại theo danh mục.

---

## 3. Các collection & schema

Database: **`agentskills`** — gồm 4 collection.

### 3.1. `users`  (index duy nhất: `username`)
```jsonc
{
  "username": "azure",            // khoá định danh (lowercase, unique)
  "displayName": "Azure",
  "handle": "@azure",
  "salt": "…",                    // dùng cho hash mật khẩu (không trả về client)
  "passHash": "…",               // scrypt(password, salt) (không trả về client)
  "role": "admin",               // "admin" | "sub-admin" | "user"
  "provider": "local",           // local | seed | google | facebook | github
  "avatar": "AZ",
  "status": "active",            // "active" | "banned"
  "createdAt": "2026-06-10",     // ngày đăng ký
  "lastLogin": "2026-06-10",     // lần đăng nhập cuối (null nếu chưa)
  "lastContribution": "2026-06-10", // lần đóng góp cuối (null nếu chưa)
  "profileViews": 12,            // số lượt xem trang cá nhân
  "links": [ { "platform": "github", "value": "github.com/azure" } ]
}
```

### 3.2. `skills`  (index duy nhất: `id`) — chứa cả skill lẫn collection
```jsonc
{
  "id": "project-structure-templates", // slug định danh (unique)
  "type": "skill",               // "skill" (file đơn) | "collection" (nhiều file)
  "lang": "vi",                  // "vi" | "en"
  "title": "…",
  "authorUsername": "azure",     // liên kết tới users.username
  "author": { "name": "Azure", "handle": "@azure", "avatar": "AZ" },
  "description": "…",
  "category": "ai",              // liên kết tới categories.id
  "tags": ["claude", "agent"],
  "stars": 1284,
  "downloads": 8920,
  "rating": 4.9,
  "updated": "2026-06-02",
  "license": "MIT",
  "format": "MD",                // MD | XML | PDF | DOCX | JSON | …
  "files": [ { "name": "README.md", "type": "MD", "size": "12 KB" } ],
  "readme": "# …",               // markdown xem trước
  "comments": [ { "user": "…", "avatar": "…", "time": "…", "rating": 5, "text": "…" } ],
  "status": "approved",
  "edited": true,                // (tuỳ chọn) đã chỉnh sửa
  "editedAt": "2026-06-10"
}
```

### 3.3. `categories`  (index duy nhất: `id`)
```jsonc
{ "id": "ai", "vi": "AI & Prompting", "en": "AI & Prompting" }
```

### 3.4. `visits`  (1 document duy nhất)
```jsonc
{ "_id": "global", "daily": { "2026-06-10": 42, "2026-06-09": 30 } }
```
Mỗi trình duyệt được đếm **1 lần/ngày** (qua cookie `sh_seen`).

---

## 4. Kiến trúc MVC

```
config.js              → cấu hình (URI, DB_NAME, PORT)
local-server.js        → entry chạy local: connect DB → seed → HTTP server + dispatcher
api/index.js       → entry trên Vercel (serverless function)
src/
 ├─ db.js              → kết nối MongoDB (singleton)
 ├─ models/            → MODEL: users.js, skills.js, categories.js, visits.js
 ├─ controllers.js     → CONTROLLER: toàn bộ handler API
 ├─ routes.js          → bảng định tuyến (method + regex → controller)
 ├─ seed.js            → seed/di trú dữ liệu lần đầu
 └─ lib/
     ├─ http.js        → session, cookie, json, phục vụ static
     └─ helpers.js     → role, makeUser, publicUser, slugify…
public/                → VIEW: toàn bộ frontend (HTML + assets)
data/                  → (cũ) file .txt/.json — chỉ dùng để di trú lần đầu
```

---

## 5. API tóm tắt

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/me` | Người dùng hiện tại |
| POST | `/api/register` `/login` `/oauth` `/logout` | Xác thực |
| POST | `/api/me/links` | Cập nhật liên kết liên hệ của mình |
| GET | `/api/users` | Danh sách user (admin/sub-admin) |
| GET | `/api/users/:username` | Hồ sơ công khai + thống kê (tăng lượt xem) |
| POST | `/api/users/:username/role` | Đổi vai trò |
| POST | `/api/users/:username/status` | Cấm / bỏ cấm |
| GET/POST | `/api/categories` | Xem / thêm danh mục |
| PATCH/DELETE | `/api/categories/:id` | Sửa / xoá danh mục (admin) |
| GET/POST | `/api/skills` | Danh sách / tạo skill |
| GET/PATCH/DELETE | `/api/skills/:id` | Xem / sửa / xoá skill |
| POST | `/api/visit` · GET `/api/visits` | Đếm & đọc lượt truy cập |
| GET | `/api/report` | Báo cáo thống kê (admin/sub-admin) |
