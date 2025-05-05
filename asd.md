# FallApp Backend API

Bu proje, FallApp uygulamasının backend API'sini içerir. Node.js, Express ve PostgreSQL kullanılarak geliştirilmiştir.

## Kurulum

1. PostgreSQL veritabanını kurun ve çalıştırın
2. `.env` dosyasındaki veritabanı bilgilerini kendi ortamınıza göre düzenleyin
3. Bağımlılıkları yükleyin:
   ```
   npm install
   ```
4. Sunucuyu başlatın:
   ```
   npm run dev
   ```

## API Endpointleri

### Kimlik Doğrulama

- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `GET /api/auth/profile` - Kullanıcı profili (kimlik doğrulama gerektirir)
- `PUT /api/auth/profile/update` - Kullanıcı bilgilerini güncelleme (e-posta ve telefon hariç tüm bilgiler, kimlik doğrulama gerektirir)

#### Örnek Kullanım: Profil Güncelleme

**Endpoint:** `PUT /api/auth/profile/update`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "Ahmet",
  "lastName": "Yılmaz",
  "age": 30,
  "gender": "male",
  "maritalStatus": "married",
  "profileImage": "https:
  "password": "yeniSifre123"
}
```

**Başarılı Yanıt:**
```json
{
  "success": true,
  "message": "Kullanıcı bilgileri başarıyla güncellendi.",
  "data": {
    "id": 1,
    "firstName": "Ahmet",
    "lastName": "Yılmaz",
    "email": "kullanici@example.com",
    "phone": "5551234567",
    "age": 30,
    "gender": "male",
    "maritalStatus": "married",
    "profileImage": "https:
    "createdAt": "2023-08-15T10:30:00.000Z",
    "updatedAt": "2023-08-20T15:45:00.000Z"
  }
}
```

## Veritabanı Modeli

### User

- `id` - Otomatik artan birincil anahtar
- `firstName` - Kullanıcının adı
- `lastName` - Kullanıcının soyadı
- `email` - Kullanıcının e-posta adresi (benzersiz)
- `phone` - Kullanıcının telefon numarası
- `password` - Kullanıcının şifresi (hashlenir)
- `age` - Kullanıcının yaşı
- `gender` - Kullanıcının cinsiyeti (male, female, other)
- `maritalStatus` - Kullanıcının medeni durumu (single, married, divorced, widowed)
- `profileImage` - Kullanıcının profil resmi (isteğe bağlı)
- `createdAt` - Kayıt tarihi
- `updatedAt` - Son güncelleme tarihi 