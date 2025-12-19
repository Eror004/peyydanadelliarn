
export const config = {
  // 1. DATA PASANGAN
  couple: {
    names: {
      groom: "Mpey",
      bride: "Adelliarn",
      // Nama gabungan untuk logo/judul
      full: "Mpey & Adelliarn", 
    },
    hashtag: "#MpeyAdelliarn",
    greeting: "We are tying the knot!",
  },

  // 2. WAKTU & TANGGAL
  event: {
    // Format ISO: YYYY-MM-DDTHH:mm:ss+07:00 (WIB)
    dateIso: "2026-05-25T10:00:00+07:00", 
    displayDate: "Senin, 25 Mei 2026",
    
    // Detail Acara
    schedule: {
      akad: {
        title: "AKAD NIKAH",
        time: "10.00 WIB",
        dresscode: "Putih / Cream",
      },
      resepsi: {
        title: "RESEPSI",
        time: "11.00 WIB - Selesai",
        dresscode: "Colorful Pastel / Casual",
      },
    },
  },

  // 3. LOKASI & MAPS
  location: {
    name: "Mekarjaya, Ciomas, Bogor",
    address: "Jl. Raya Ciomas No. 123, Bogor, Jawa Barat",
    // Link Embed Google Maps (Ambil dari Google Maps -> Share -> Embed a map)
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.268779698539!2d106.7725!3d-6.6135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5e8c8c8c8c9%3A0x0!2sMekarjaya%2C%20Ciomas%2C%20Bogor!5e0!3m2!1sen!2sid!4v1690000000000!5m2!1sen!2sid",
    // Link tombol "Petunjuk Arah"
    googleMapsLink: "https://maps.google.com/?q=Mekarjaya,+Ciomas,+Bogor",
  },

  // 4. KONTAK & RSVP
  contact: {
    // Nomor WA format internasional (tanpa +)
    whatsapp: "6283812671022", 
  },

  // 5. HADIAH DIGITAL (GIFT)
  gift: {
    bank: {
      name: "BCA",
      number: "1234567890",
      holder: "Mpey (Contoh)",
    },
    // Ganti URL ini dengan URL gambar QRIS kamu sendiri (Simpan di public/images/qris.jpg)
    qrisUrl: "/images/qris.jpg",
  },

  // 6. AUDIO / MUSIK
  audio: {
    // PENTING: Bisa pakai link MP3 (akhiran .mp3) ATAU link YouTube biasa.
    // Contoh Youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    // Contoh MP3: "/music/wedding-song.mp3" (Simpan di public/music/)
    source: "https://www.youtube.com/watch?v=5qap5aO4i9A", 
  },

  // 7. GAMBAR & GALERI
  // Pastikan kamu membuat folder "images" di dalam folder "public"
  // Lalu masukkan file gambar sesuai nama di bawah ini.
  images: {
    // Foto Utama di Halaman Depan
    hero: "/images/hero.jpg", 
    
    // Foto-foto di bagian Story/Gallery
    // Simpan file sebagai 1.jpg, 2.jpg, dst di folder public/images/
    gallery: [
      "/images/1.jpg",
      "/images/2.jpg",
      "/images/3.jpg",
      "/images/4.jpg",
      "/images/5.jpg",
    ]
  },

  // 8. CERITA CINTA (TIMELINE)
  story: [
    { 
      year: '2022', 
      title: 'The Meet Cute', 
      desc: 'Ketemu di coffee shop, rebutan kursi terakhir. Awkward but memorable.' 
    },
    { 
      year: '2024', 
      title: 'The Yes', 
      desc: 'Surprise proposal pas lagi hiking. Capek tapi happy banget!' 
    },
    { 
      year: '2026', 
      title: 'The Big Day', 
      desc: 'Finally, tying the knot with our favorite people.' 
    },
  ]
};
