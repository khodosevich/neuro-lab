# 🧠 Веб-платформа для работы с моделями нейронных сетей

## 📌 Описание проекта

Данный проект — дипломная работа, представляющая собой веб-платформу для взаимодействия с предобученными моделями нейронных сетей. Платформа позволяет загружать, просматривать и использовать модели, сохранённые в форматах **ONNX** и **H5**, через удобный интерфейс.


[**Записка**](https://github.com/khodosevich/BSUIR/tree/main/диплом-доки)

---

## 🚀 Запуск проекта

### 1. Установка зависимостей

#### Серверная часть (Node.js + Python)

```bash
# Перейдите в директорию server (Node.js сервер)
cd server

# Установите зависимости Node.js
npm install

# Установите зависимости Python (FastAPI сервер)
cd ../server-models
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### Клиентская часть (React)

```bash
# Перейдите в директорию client
cd ../client

# Установите зависимости React-приложения
npm install

```

#### 2. Настройка базы данных PostgreSQL

```bash
# Создайте базу данных вручную (если ещё не создана)
createdb neuro-lab

# Восстановите структуру и тестовые данные из дампа
psql -U <ваш_пользователь> -d neuro-lab -f db/neuro-lab.sql
```

#### 3. Запуск проекта

##### Серверная часть
В первом терминале — Node.js:

```bash
cd server
node app.js
```

Во втором терминале — Python (FastAPI):

```bash
cd server-models
source venv/bin/activate
uvicorn models:app --host 0.0.0.0 --port 8001 --reload
```

##### Клиентская часть

```bash
cd client
npm run dev
```

### Доступ к приложению

```bash
http://localhost:3000
```

## 🛠️ Технологии проекта

### Клиентская часть (Frontend)
- **React**
- **Redux**
- **Material UI (MUI)**
- **Vite**

### Серверная часть (Backend Node.js)
- **Node.js** 
- **Express** 
- **PostgreSQL**

### Сервер обработки моделей (Backend Python)
- **Python 3.10+**
- **FastAPI**
- **ONNX Runtime**
- **Transformers (Hugging Face)**
