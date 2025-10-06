# 📋 MERN Todo App

Ứng dụng Todo fullstack với **MERN stack** (MongoDB, Express, React, Node.js).  
Người dùng có thể thêm, sửa trạng thái và xóa công việc.

---

## 🚀 Demo

- **Frontend (Vercel):** [https://mern-todo-five-eta.vercel.app/](https://mern-todo-five-eta.vercel.app/)  
- **Backend (Render):** [https://mern-todo-urow.onrender.com](https://mern-todo-urow.onrender.com)

---

## 🛠 Công nghệ sử dụng

- **Frontend:** React + Vite + TailwindCSS  
- **Backend:** Node.js + Express  
- **Database:** MongoDB Atlas  
- **Triển khai:** Render (BE) + Vercel (FE)

---

## 📂 Cấu trúc dự án

```

mern-todo/
├── client/   # React frontend
└── server/   # Express backend

````

---

## ⚙️ Cách chạy local

### 1. Clone repo
```bash
git clone https://github.com/Kietptk2k4/Mern_Todo.git
cd Mern_Todo
````

### 2. Cài đặt dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 3. Tạo file `.env` trong **server/**

```env
PORT=5000
MONGO_URI=mongodb+srv://<your-mongo-uri>
CLIENT_URL=http://localhost:5173
```

### 4. Chạy project

```bash
# Terminal 1
cd server
npm start

# Terminal 2
cd client
npm run dev
```

---

## 🌐 API Endpoints

* `GET /api/todos` → Lấy danh sách task
* `POST /api/todos` → Tạo task
* `PUT /api/todos/:id` → Cập nhật trạng thái task
* `DELETE /api/todos/:id` → Xóa task

---

## 📸 Giao diện

Todo app với UI gọn nhẹ, responsive, hỗ trợ CRUD đầy đủ.

```

