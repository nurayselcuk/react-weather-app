# 🌤️ React Hava Durumu Uygulaması

Modern, responsive ve Türkçe destekli bir hava durumu uygulaması.

## Özellikler

- Gerçek zamanlı hava durumu
- Şehir arama
- Sıcaklık, nem, rüzgar, basınç bilgileri
- Modern ve mobil uyumlu arayüz

## Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone <repository-url>
   cd react-havadurumu
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. API anahtarınızı ekleyin:
   - [OpenWeatherMap](https://openweathermap.org/api) sitesinden ücretsiz API anahtarı alın
   - `.env.example` dosyasını `.env` olarak kopyalayın
   - `.env` dosyasındaki `your_api_key_here` yerine kendi API anahtarınızı yazın
   - **Önemli**: `.env` dosyası asla git'e commit edilmemelidir!

4. Uygulamayı başlatın:
   ```bash
   npm start
   ```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde açılacaktır.

## Teknolojiler
- React 18 + TypeScript
- CSS3 (gradient ve animasyonlar)
- OpenWeatherMap API

