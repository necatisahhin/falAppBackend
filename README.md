# FallApp Backend API

## 🇹🇷 Türkçe

### Proje Hakkında
FallApp, rüyaları kaydetmek ve analiz etmek için tasarlanmış bir mobil uygulamanın backend API'sidir. Node.js, Express ve PostgreSQL kullanılarak geliştirilmiştir.

### Özellikler
- Kullanıcı kaydı ve kimlik doğrulama
- JWT tabanlı oturum yönetimi
- Rüya kayıtlarının oluşturulması, listelenmesi, güncellenmesi ve silinmesi
- Sequelize ORM ile veritabanı yönetimi

### Teknoloji Yığını
- **Node.js** - JavaScript çalışma ortamı
- **Express.js** - Web framework
- **PostgreSQL** - İlişkisel veritabanı
- **Sequelize** - ORM (Object-Relational Mapping)
- **JWT** - Kimlik doğrulama
- **Bcrypt** - Şifre hashleme

### Kurulum

1. Repoyu klonlayın:
```bash
git clone https://github.com/yourusername/fallapp-backend.git
cd fallapp-backend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun:
```
PORT=5001
DB_NAME=fallapp
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
```

4. Veritabanını oluşturun:
PostgreSQL'de `fallapp` adında bir veritabanı oluşturun.

5. Uygulamayı başlatın:
```bash
# Geliştirme modunda
npm run dev

# Veya
npm start
```

### API Endpoints

#### Kimlik Doğrulama
- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `GET /api/auth/me` - Mevcut kullanıcı bilgilerini al

#### Rüyalar
- `GET /api/dreams` - Tüm rüyaları listele
- `POST /api/dreams` - Yeni rüya oluştur
- `GET /api/dreams/:id` - Belirli bir rüyayı getir
- `PUT /api/dreams/:id` - Rüya güncelle
- `DELETE /api/dreams/:id` - Rüya sil

---

## 🇬🇧 English

### About the Project
FallApp is a backend API for a mobile application designed to record and analyze dreams. It is developed using Node.js, Express, and PostgreSQL.

### Features
- User registration and authentication
- JWT-based session management
- Create, list, update and delete dream records
- Database management with Sequelize ORM

### Tech Stack
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Sequelize** - ORM (Object-Relational Mapping)
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fallapp-backend.git
cd fallapp-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```
PORT=5001
DB_NAME=fallapp
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
```

4. Create the database:
Create a database named `fallapp` in PostgreSQL.

5. Start the application:
```bash
# Development mode
npm run dev

# Or
npm start
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user information

#### Dreams
- `GET /api/dreams` - List all dreams
- `POST /api/dreams` - Create a new dream
- `GET /api/dreams/:id` - Get a specific dream
- `PUT /api/dreams/:id` - Update a dream
- `DELETE /api/dreams/:id` - Delete a dream 
