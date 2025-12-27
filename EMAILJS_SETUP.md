# 📧 EmailJS Kurulum Rehberi - Contact Form Email Gönderimi

## 🚀 Hızlı Başlangıç

Contact formunuz artık **gerçek email gönderebilir**! Sadece EmailJS hesabınızı oluşturup API bilgilerinizi eklemeniz gerekiyor.

---

## ✅ Adım 1: EmailJS Hesabı Oluştur

1. **EmailJS'e git**: https://www.emailjs.com/
2. **Sign Up** ile ücretsiz hesap oluştur
3. Email doğrulama yap

---

## ⚙️ Adım 2: Email Servisi Ekle

1. **EmailJS Dashboard**'a git
2. Sol menüden **"Email Services"** tıkla
3. **"Add New Service"** butonuna bas
4. **Gmail** veya başka bir email service seç
   - Gmail öneriyorum (kolay kurulum)
5. Gmail hesabınızla bağlan
6. **Service ID**'yi kaydet (örnek: `service_xyz123`)

---

## 📝 Adım 3: Email Template Oluştur

1. Sol menüden **"Email Templates"** tıkla
2. **"Create New Template"** butonuna bas
3. Template'i şu şekilde düzenle:

### Template İçeriği:

**Subject:**
```
New Contact Form Message: {{subject}}
```

**Content (Body):**
```
Yeni bir mesaj aldın!

İsim: {{from_name}}
Email: {{from_email}}
Konu: {{subject}}

Mesaj:
{{message}}

---
Bu mesaj CV sitenizdeki contact formundan gönderildi.
```

4. **Save** butonuna bas
5. **Template ID**'yi kaydet (örnek: `template_abc456`)

---

## 🔑 Adım 4: Public Key Al

1. Sol menüden **"Account"** tıkla
2. **"General"** sekmesinde **Public Key** bulunur
3. Public Key'i kopyala (örnek: `user_xyz789abc`)

---

## 💻 Adım 5: Kodda Güncellemeleri Yap

`src/components/Contact.tsx` dosyasını aç ve şu satırları bul:

```typescript
// EmailJS configuration
const serviceId = 'YOUR_SERVICE_ID';  // Buraya Service ID'ni yaz
const templateId = 'YOUR_TEMPLATE_ID'; // Buraya Template ID'ni yaz
const publicKey = 'YOUR_PUBLIC_KEY';   // Buraya Public Key'i yaz
```

**Öncesi:**
```typescript
const serviceId = 'YOUR_SERVICE_ID';
const templateId = 'YOUR_TEMPLATE_ID';
const publicKey = 'YOUR_PUBLIC_KEY';
```

**Sonrası (Örnek):**
```typescript
const serviceId = 'service_xyz123';
const templateId = 'template_abc456';
const publicKey = 'user_xyz789abc';
```

Dosyayı kaydet!

---

## 🧪 Adım 6: Test Et!

1. Siteyi aç: `http://localhost:5173`
2. Contact section'a git
3. Formu doldur:
   - **Name**: Test User
   - **Email**: test@example.com
   - **Subject**: Test Message
   - **Message**: This is a test!
4. **Send Message** butonuna bas
5. Başarılı olursa yeşil mesaj görürsün: **"✅ Message sent successfully!"**
6. Email'ini kontrol et - mesaj gelmiş olmalı!

---

## 📧 EmailJS Template Değişkenleri

Contact formundaki field'lar EmailJS template'inde şu şekilde eşleşir:

| Form Field | EmailJS Variable | Açıklama |
|-----------|------------------|----------|
| Name | `{{from_name}}` | Gönderen kişinin adı |
| Email | `{{from_email}}` | Gönderen kişinin emaili |
| Subject | `{{subject}}` | Mesaj konusu |
| Message | `{{message}}` | Mesaj içeriği |

---

## ✨ Özellikler

### Mevcut Özellikler ✅
- ✅ Gerçek email gönderimi
- ✅ Loading state (butonda "Sending... ⏳")
- ✅ Success message (yeşil bildirim)
- ✅ Error message (kırmızı bildirim)
- ✅ Form validation
- ✅ Auto-clear form after success
- ✅ Disabled state during sending

### Form Akışı:
1. Kullanıcı formu doldurur
2. "Send Message" butonuna basar
3. Buton "Sending... ⏳" olur (disabled)
4. EmailJS API'ye request gider
5. Başarılı ise:
   - ✅ Yeşil success message gösterilir
   - Form otomatik temizlenir
   - 5 saniye sonra mesaj kaybolur
6. Hata olursa:
   - ❌ Kırmızı error message gösterilir
   - Form korunur (tekrar deneyebilir)
   - 5 saniye sonra mesaj kaybolur

---

## 🔒 Güvenlik Notları

### ⚠️ DİKKAT: Public Key'ler Frontend'te Görünür
- EmailJS Public Key'ler **frontend**'te görünür (normal)
- Sensitive bilgiler yok (sadece email gönderir)
- EmailJS dashboard'dan günlük limit koyabilirsin (spam koruması)

### 📊 Ücretsiz Plan Limitleri
- **200 email/ay** ücretsiz
- Daha fazla için ücretli plan gerekli

---

## 🛠️ Troubleshooting

### Problem: "Failed to send message" hatası

**Olası Çözümler:**
1. **Service ID, Template ID, Public Key doğru mu?**
   - EmailJS dashboard'dan kontrol et
   - Copy-paste yaparken boşluk olmasın

2. **EmailJS servisi aktif mi?**
   - Dashboard'dan "Email Services" kontrol et
   - Gmail bağlantısı kopmuş olabilir - yeniden bağla

3. **Template field isimleri doğru mu?**
   - Template'de `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}` olmalı
   - Form field name'leri: `from_name`, `from_email`, `subject`, `message`

4. **Console'u kontrol et**
   - Browser'da F12 aç
   - Console'da hata mesajı var mı?

5. **Internet bağlantısı var mı?**
   - EmailJS API'ye ulaşamıyor olabilir

---

## 🎯 Sonraki Adımlar (Opsiyonel)

### 1. Auto-Reply Email Ekle
EmailJS'de ikinci bir template oluştur ve kullanıcıya "Mesajınız alındı" emaili gönder.

### 2. reCAPTCHA Ekle
Spam koruması için Google reCAPTCHA ekle.

### 3. Email Analytics
EmailJS dashboard'dan gönderilen emailleri izle.

### 4. Custom Domain Email
Gmail yerine kendi domain'inden email gönder (örn: contact@onurkocak.dev)

---

## 📞 Yardım

Sorun yaşarsan:
1. EmailJS documentation: https://www.emailjs.com/docs/
2. EmailJS support: support@emailjs.com
3. Console error mesajlarını kontrol et

---

## ✅ Kurulum Checklist

- [ ] EmailJS hesabı oluşturuldu
- [ ] Email servisi eklendi (Gmail)
- [ ] Template oluşturuldu
- [ ] Service ID, Template ID, Public Key kopyalandı
- [ ] Contact.tsx dosyasında güncellemeler yapıldı
- [ ] Test email gönderildi
- [ ] Başarılı çalıştı! ✨

---

**Kurulum tamamlandığında contact form %100 çalışır durumda olacak!** 🚀

Herhangi bir sorun yaşarsan bana sor! 😊
