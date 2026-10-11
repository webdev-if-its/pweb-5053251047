// PERTEMUAN 5 — JavaScript Dasar dan DOM
//
// Sama seperti index.html di m01: kode ini sengaja ditulis "asal jalan".
// Sebagian fungsi punya bug kecil, sebagian lain baru separuh jadi (tandanya
// komentar TODO). Perbaiki dan lengkapi bertahap, Level 1 sampai 10.
//
// Baca SOAL.md, lalu jalankan:  npm run levels
// File yang kalian sentuh: hanya file ini. Jangan ubah index.html atau test/.

export const katalog = [
  { judul: 'Laskar Pelangi', penulis: 'Andrea Hirata', harga: 45000, tersedia: true },
  { judul: 'Bumi Manusia', penulis: 'Pramoedya Ananta Toer', harga: 60000, tersedia: false },
  { judul: 'Cantik Itu Luka', penulis: 'Eka Kurniawan', harga: 55000, tersedia: true },
  { judul: 'Negeri 5 Menara', penulis: 'Ahmad Fuadi', harga: 40000, tersedia: true },
  { judul: 'Ayat-Ayat Cinta', penulis: 'Habiburrahman El Shirazy', harga: 0, tersedia: false },
];

// Level 1 — ada bug: harga 0 malah menampilkan "Rp" tanpa angka sama sekali.
export function formatRupiah(angka) {
  if (angka == null) return 'Rp';
  return 'Rp ' + angka.toLocaleString('id-ID');
}

// Level 2 — TODO: kembalikan buku yang `tersedia` saja, TANPA mengubah
// array `daftar` yang asli (jangan pakai .sort/.splice/push ke `daftar`).
export function saringTersedia(daftar) {
  return daftar.filter((buku) => buku.tersedia);
}

// Level 3 — TODO: ambil elemen #judul-pengumuman dengan querySelector,
// lalu ubah teksnya menjadi HURUF BESAR SEMUA.
export function sorotJudulPengumuman() {
  const judul = document.querySelector('#judul-pengumuman');
  if (!judul) return;
  judul.textContent = judul.textContent.toUpperCase();
}

// Level 4 — TODO: ambil SEMUA <li> di #daftar-pengumuman dengan
// querySelectorAll. Untuk setiap <li> yang teksnya mengandung kata "tutup"
// (tanpa peduli huruf besar/kecil), tambahkan prefix "⚠ " di depan teksnya.
// Jangan tambahkan prefix dua kali kalau fungsi ini terpanggil berulang.
export function tandaiPengumumanPenting() {
  const daftarLi = document.querySelectorAll('#daftar-pengumuman li');
  for (const li of daftarLi) {
    const teks = li.textContent;
    if (teks.toLowerCase().includes('tutup') && !teks.startsWith('⚠ ')) {
      li.textContent = '⚠ ' + teks;
    }
  }
}

// Level 5 — buat SATU elemen <article> untuk satu buku, memakai
// document.createElement dan textContent (bukan cara parsing string HTML;
// aturan ini berlaku untuk seluruh file, bukan cuma fungsi ini).
// Struktur minimal: <article><h3>judul</h3><p>penulis</p><p>harga</p></article>
// Kembalikan elemen itu (jangan langsung ditempel ke halaman di sini).
export function buatKartuBuku(buku) {
  const kartu = document.createElement('article');

  const judul = document.createElement('h3');
  judul.textContent = buku.judul;

  const penulis = document.createElement('p');
  penulis.textContent = buku.penulis;

  const harga = document.createElement('p');
  harga.textContent = formatRupiah(buku.harga);

  kartu.append(judul, penulis, harga);
  return kartu;
}

// Level 6 & 10 — TODO: kosongkan #katalog, lalu render ulang dari `data`.
// Fungsi ini HARUS dipakai untuk semua kondisi tampilan katalog: daftar
// penuh, hasil pencarian, maupun daftar kosong (Level 9 dan Level 10 sama-
// sama lewat sini, jangan bikin fungsi render terpisah).
// - Perbarui #ringkasan, misalnya "5 buku ditemukan".
// - Kalau `data` kosong, tampilkan pesan di dalam #katalog, misalnya
//   "Tidak ada buku yang cocok." — jangan biarkan #katalog kosong melompong.
// - Setiap kartu yang ditampilkan harus bisa diklik (lihat Level 7).
export function render(data) {
  const wadah = document.querySelector('#katalog');
  const ringkasan = document.querySelector('#ringkasan');
 
  // Kosongkan dulu supaya tidak dobel kalau dipanggil lagi.
  wadah.textContent = '';
 
  if (ringkasan) {
    ringkasan.textContent = data.length + ' buku ditemukan';
  }
 
  // Level 10 — pesan kalau data kosong (pakai <p>, bukan kartu).
  if (data.length === 0) {
    const pesan = document.createElement('p');
    pesan.textContent = 'Tidak ada buku yang cocok.';
    wadah.append(pesan);
    return;
  }
 
  for (const buku of data) {
    const kartu = buatKartuBuku(buku);
    // Level 7 — closure: fungsi ini "mengingat" `buku` milik kartu ini.
    kartu.addEventListener('click', () => tampilkanDetail(buku));
    wadah.append(kartu);
  }
}
 
// Level 7 — tampilkan detail buku di #panel-detail.
function tampilkanDetail(buku) {
  const panel = document.querySelector('#panel-detail');
  if (!panel) return;
  panel.textContent = buku.judul + ' — ' + buku.penulis + ' — ' + formatRupiah(buku.harga);
}
 
// Level 8 & 9 — form pencarian.
export function pasangFormCari() {
  const form = document.querySelector('#form-cari');
  const input = document.querySelector('#input-cari');
  if (!form) return;
 
  form.addEventListener('submit', (event) => {
    // Level 8 — cegah reload halaman.
    event.preventDefault();
 
    // Level 9 — saring berdasarkan judul, tanpa peduli huruf besar/kecil.
    const kata = input.value.trim().toLowerCase();
    const hasil = katalog.filter((buku) => buku.judul.toLowerCase().includes(kata));
    render(hasil);
  });
}
 
// Bootstrap halaman — jangan hapus.
sorotJudulPengumuman();
tandaiPengumumanPenting();
render(katalog);
pasangFormCari();

