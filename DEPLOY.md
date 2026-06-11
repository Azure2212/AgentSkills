# Deploy AgentSkills lên Vercel

Dự án đã được điều chỉnh để chạy trên **Vercel** (serverless):

- **Frontend tĩnh** → thư mục `public/` (Vercel phục vụ trực tiếp).
- **Backend** → 1 serverless function `api/index.js` xử lý mọi `/api/*` (dùng chung router/controller/model với bản local).
- **Session** → cookie ký HMAC (stateless), không cần lưu RAM nên hợp serverless.
- **MongoDB** → kết nối được cache qua các lần gọi function.

---

## Bước 1 — MongoDB Atlas: mở Network Access
IP của Vercel là động, nên phải cho phép mọi IP:
1. Atlas → **Network Access** → **Add IP Address** → **Allow access from anywhere** (`0.0.0.0/0`) → Confirm.

## Bước 2 — Đẩy code lên GitHub
```bash
cd SharedAITutorial
git init && git add . && git commit -m "AgentSkills"
git branch -M main
git remote add origin <repo-cua-ban>.git
git push -u origin main
```
> `node_modules/` và `data/` đã được `.gitignore` bỏ qua.

## Bước 3 — Import vào Vercel
1. vercel.com → **Add New… → Project** → chọn repo.
2. **Framework Preset:** Other. **Build Command:** để trống. **Output Directory:** `public`.
   (File `vercel.json` đã khai báo sẵn nên thường Vercel tự nhận.)

## Bước 4 — Đặt Environment Variables (Project → Settings → Environment Variables)
| Key | Value |
|---|---|
| `MONGODB_URI` | `mongodb+srv://…@aisharingskills.d7tjwq7.mongodb.net/?appName=AISharingSkills` |
| `DB_NAME` | `agentskills` |
| `SESSION_SECRET` | một chuỗi ngẫu nhiên dài (vd: `openssl rand -hex 32`) |

> ⚠️ **Bảo mật:** đừng để mật khẩu Mongo trong `config.js` khi repo công khai — dùng env var ở trên và **đổi mật khẩu DB** vì nó đã từng nằm trong code. `config.js` chỉ giữ giá trị fallback cho chạy local.

## Bước 5 — Deploy
Bấm **Deploy**. Xong sẽ có domain `https://<project>.vercel.app`.

Dữ liệu đã nằm sẵn trên Atlas nên không cần seed lại. Tài khoản admin: **Azure**.

---

## Lưu ý / giới hạn trên Vercel
- **Cold start:** lần gọi đầu sau thời gian rảnh sẽ chậm ~1s (kết nối Mongo). Sau đó nhanh.
- **Thời lượng function:** đã đặt `maxDuration: 30s`. Tải “tất cả” (zip) với dữ liệu rất lớn có thể chạm giới hạn gói Hobby — hiện dữ liệu nhỏ nên không sao.
- **Seed:** chỉ chạy khi DB rỗng và đọc `GUIDES_DIR` ở máy local. Trên Vercel không seed (DB Atlas đã có dữ liệu). Muốn seed lại từ máy: `npm run seed`.

## Chạy local (không đổi)
```bash
npm install
npm start      # http://localhost:3000
```
Local vẫn dùng `npm start` (= `node local-server.js`, server thường trú) — không ảnh hưởng tới bản Vercel.
Trên Vercel chỉ dùng function `api/index.js` + static `public/` (file `local-server.js` Vercel bỏ qua).
