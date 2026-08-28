// =========================================================
// KONFIGURASI & TEKS
// =========================================================

const KONFIG = {
  audio: "./assets/audio/djikhlas.mp3",
  nomorWhatsapp: "6281250217363",
  maxPanjangNama: 10,
  lebarSaljuMax: 90,
  jumlahSaljuMax: 100,
  intervalSalju: 400,
};

const TEKS = {
  kataPembuka: "Aku Ada Sesuatu Nih 🤣❤️",
  kumpulCinta: "Klik 4 LOVE di Bawah! 😆❤️",
  tunggu: "Tunggu...",
  ciee: "Ciee.. Ada yang Ultah Nih 🤣❤️",
  ulangTahun: "Happy Birthday,",
  nambahTua: "Nambah tua aja ya, hehe",
  traktiran: "Moga panjang umur biar tiap tahun bisa traktirin aku wkwk 😆❤️",
  sehat: "Sehat selalu ya!",
  canda: "Canda wkwwk :v",
  doa: "Oh iya, semoga di hari spesialmu ini kamu dapat menjadi pribadi yang lebih baik yaa.. 🥳❤️",
  levelUp: "Happy Level Up Day!! 🥳",
  lanjut: "Klik untuk Lanjut",
  mauKado: "Mau Kado Gak Nih? 😶❤️",
  ayoJawab: "Ayo jawab 😆",
  tombolMau: "Mau",
  tombolEngga: "Engga",
};

// =========================================================
// ELEMEN DOM
// =========================================================

const $ = (id) => document.getElementById(id);

const el = {
  konten: $("Content"),
  wallpaper: $("wallpaper"),
  blur: $("bodyblur"),
  kado: $("kadoIn"),
  teksKado: $("ket"),
  halo: $("halo"),
  kartu: $("bq"),
  kalimat: $("kalimat"),
  lanjut: $("opsL"),
  tombol: $("Tombol"),
  tombolLink: $("By"),
  kolomCinta: $("kolombaru"),
  love: [$("lv1"), $("lv2"), $("lv3"), $("lv4")],
  lelucon: $("katatambahan"),
  stikerTolak: $("stikerditolak"),
  teksTolak: $("kataditolak"),
  stikerUtama: $("fotostiker"),
  fotoPertanyaan: $("fotostiker6"),
  pesan: {
    ciee: $("pesan3"),
    tua: $("pesan5"),
    traktir: $("pesan6"),
    sehat: $("pesan7"),
    canda: $("pesan8"),
  },
};

// Tangkap tautan stiker (jangan ikut berubah saat src utama diganti)
const DAFTAR_STIKER = [
  el.stikerUtama.src,
  $("fotostiker1").src,
  $("fotostiker2").src,
  $("fotostiker3").src,
  $("fotostiker4").src,
  $("fotostiker5").src,
];

// Kosongkan semua pesan supaya teks asli di HTML tidak bocor tampil
const ID_PESAN = [
  "kalimat",
  "pesan1",
  "pesan2",
  "pesan3",
  "pesan4",
  "pesan5",
  "pesan6",
  "pesan7",
  "pesan8",
  "pesan9",
  "pesan10",
];
ID_PESAN.forEach((id) => {
  $(id).innerHTML = "";
});

// =========================================================
// STATE
// =========================================================

const state = {
  kadoTerbuka: false,
  lanjutSiap: false,
  loveTerkumpul: 0,
  // 0 = tanpa aksi tombol, 1 = tombol "Lanjut", 2 = tombol "Balas"
  langkah: 0,
  nama: null,
};

// =========================================================
// AUDIO & SWEETALERT
// =========================================================

const audio = new Audio(KONFIG.audio);

const sweet = {
  info: Swal.mixin({
    timer: 2300,
    allowOutsideClick: false,
    showConfirmButton: false,
    timerProgressBar: true,
    imageHeight: 90,
  }),
  tanya: Swal.mixin({
    allowOutsideClick: false,
    cancelButtonColor: "#FF0040",
    imageHeight: 80,
  }),
};

// =========================================================
// UTILITAS
// =========================================================

const jeda = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function tik(elemen, teks, { kecepatan = 45, tunda = 1, kursor = true } = {}) {
  return new Promise((resolve) => {
    new TypeIt(elemen, {
      strings: [teks],
      speed: kecepatan,
      cursor: kursor,
      deleteSpeed: 30,
      breakLines: false,
      waitUntilVisible: true,
      lifelike: true,
      startDelay: tunda,
      afterComplete: () => resolve(),
    }).go();
  });
}

function tikGanti(elemen, daftarTeks, { kecepatan = 45, kecepatanHapus = 30 } = {}) {
  return new Promise((resolve) => {
    new TypeIt(elemen, {
      strings: daftarTeks,
      speed: kecepatan,
      cursor: true,
      deleteSpeed: kecepatanHapus,
      breakLines: false,
      waitUntilVisible: true,
      lifelike: true,
      startDelay: 20,
      afterComplete: () => resolve(),
    }).go();
  });
}

// =========================================================
// STIKER
// =========================================================

function gantiStiker(indeks) {
  el.stikerUtama.src = DAFTAR_STIKER[indeks] ?? DAFTAR_STIKER[0];
  el.stikerUtama.style.display = "inline-flex";
  el.stikerUtama.style.opacity = "1";
  el.stikerUtama.style.transform = "scale(1)";
}

function sembunyikanStiker() {
  el.stikerUtama.style.opacity = "0";
  el.stikerUtama.style.transition = "all .7s ease";
  el.stikerUtama.style.transform = "scale(.1)";
}

async function gantiStikerLembut(indeks) {
  sembunyikanStiker();
  await jeda(280);
  gantiStiker(indeks);
}

// =========================================================
// SALJU
// =========================================================

function buatSalju() {
  const keping = document.createElement("i");
  keping.className = "fas fa-snowflake salju";
  keping.style.left = Math.random() * KONFIG.lebarSaljuMax + "vw";
  keping.style.animationDuration = Math.random() * 3 + 2 + "s";
  keping.style.animationDelay = Math.random() * 2 + "s";
  keping.style.fontSize = Math.random() * 10 + 8 + "px";
  document.body.appendChild(keping);
}

let timerSalju = null;
function mulaiSalju() {
  if (timerSalju) return;
  timerSalju = setInterval(buatSalju, KONFIG.intervalSalju);
}

setInterval(() => {
  const keping = document.querySelectorAll(".salju");
  if (keping.length > KONFIG.jumlahSaljuMax) keping[0].remove();
}, 100);

// =========================================================
// TOMBOL
// =========================================================

function munculkanTombol() {
  el.wallpaper.style.transform = "scale(1)";
  el.tombol.style.opacity = "1";
  el.tombol.style.transform = "scale(1)";
  if (state.langkah === 2) {
    el.tombolLink.innerHTML = "&#128140; Balas";
  }
}

// =========================================================
// ALUR: KADO DIBUKA
// =========================================================

async function bukaKado() {
  if (state.kadoTerbuka) return;
  state.kadoTerbuka = true;

  audio.play().catch(() => {});

  el.kado.style.transition = "all .8s ease";
  el.kado.style.transform = "scale(10)";
  el.kado.style.opacity = "0";
  el.teksKado.style.display = "none";
  el.wallpaper.style.transform = "scale(1.5)";

  await jeda(300);
  el.kado.style.display = "none";
  el.konten.style.marginTop = "0";
  el.blur.style.opacity = ".7";

  await jeda(200);
  await alurPembuka();
}

async function mintaNama() {
  let nama = "";
  while (!nama || nama.length > KONFIG.maxPanjangNama) {
    const { value } = await sweet.tanya.fire({
      title: "Masukin Nama Kamu",
      input: "text",
    });
    nama = value || "";
    if (!nama || nama.length > KONFIG.maxPanjangNama) {
      await sweet.tanya.fire(
        "Ups!",
        "Nama tidak boleh kosong atau lebih dari 10 karakter, ya!"
      );
    }
  }
  return nama;
}

async function alurPembuka() {
  state.nama = await mintaNama();
  if (!state.nama) return;

  gantiStiker(0);
  await jeda(200);
  el.blur.style.opacity = ".7";
  el.wallpaper.style.transform = "scale(1)";

  const teksHalo = `Hai, ${state.nama} ✨`;
  await tik(el.halo, teksHalo, { kecepatan: 40, tunda: 50 });
  el.halo.innerHTML = teksHalo;
  await jeda(200);

  // Tampilkan kartu ucapan
  el.kartu.style.position = "relative";
  el.kartu.style.opacity = "1";
  el.kartu.style.visibility = "visible";
  el.kartu.style.transform = "scale(1)";
  el.kartu.style.marginTop = "0";

  await tik(el.kalimat, TEKS.kataPembuka, { kecepatan: 20, tunda: 400, kursor: false });
  el.kalimat.innerHTML = TEKS.kataPembuka;

  // Aktifkan petunjuk "klik untuk lanjut"
  el.lanjut.innerHTML = TEKS.lanjut;
  el.lanjut.style.opacity = ".8";
  state.lanjutSiap = true;
}

// =========================================================
// ALUR: KOLOM LOVE
// =========================================================

function tampilkanKolomCinta() {
  el.kolomCinta.style.position = "relative";
  el.kolomCinta.style.opacity = "1";
  el.kolomCinta.style.transform = "scale(1)";
}

function saatKlikKartu() {
  if (!state.lanjutSiap) return;
  state.lanjutSiap = false;
  el.lanjut.style.opacity = "0";

  el.kalimat.innerHTML = TEKS.kumpulCinta;
  tampilkanKolomCinta();
  gantiStikerLembut(1);
}

async function alurUcapan() {
  el.wallpaper.style.transform = "scale(1.5)";
  el.kolomCinta.style = "";

  await jeda(400);

  // "Tunggu..."
  el.kalimat.innerHTML = "";
  await tik(el.kalimat, TEKS.tunggu, { kecepatan: 40 });
  await jeda(500);

  // "Ciee.. Ada yang Ultah Nih 🤣❤️"
  el.kalimat.style.display = "none";
  el.pesan.ciee.style.position = "relative";
  el.pesan.ciee.style.opacity = "1";
  el.pesan.ciee.style.transform = "scale(1)";
  el.wallpaper.style.transform = "scale(1)";
  await gantiStikerLembut(2);
  await tik(el.pesan.ciee, TEKS.ciee);
  el.pesan.ciee.innerHTML = TEKS.ciee;

  await jeda(1010);

  // "Happy Birthday, [nama] 🥳"
  el.wallpaper.style.transform = "scale(1.5)";
  el.kalimat.style.display = "";
  el.kalimat.style.opacity = "1";
  el.kalimat.innerHTML = `${TEKS.ulangTahun} ${state.nama} 🥳`;
  el.kalimat.style.transform = "scale(1.2)";

  await jeda(1000);

  // "Nambah tua aja ya, hehe ><"
  el.wallpaper.style.transform = "scale(1)";
  await gantiStikerLembut(3);
  await tik(el.pesan.tua, TEKS.nambahTua, { kecepatan: 52 });
  el.pesan.tua.innerHTML = TEKS.nambahTua + " ><";

  await jeda(800);

  // "Moga panjang umur..."
  el.wallpaper.style.transform = "scale(1.5)";
  await tik(el.pesan.traktir, TEKS.traktiran, { kecepatan: 52 });
  el.pesan.traktir.innerHTML = TEKS.traktiran;

  await jeda(800);

  // "Sehat selalu ya!"
  el.wallpaper.style.transform = "scale(1)";
  await gantiStikerLembut(1);
  await tik(el.pesan.sehat, TEKS.sehat, { kecepatan: 52 });
  el.pesan.sehat.innerHTML = TEKS.sehat;

  // Tampilkan tombol "Lanjut"
  state.langkah = 1;
  await jeda(400);
  munculkanTombol();
}

// =========================================================
// ALUR AKHIR: PERTANYAAN & PESAN PENUTUP
// =========================================================

async function saatTombol() {
  if (state.langkah === 1) {
    el.tombol.style = "";
    sembunyikanStiker();
    state.langkah = 0;
    await alurPertanyaan();
    await alurTerakhir();
  } else if (state.langkah === 2) {
    bukaWhatsapp();
  }
}

async function alurPertanyaan() {
  const { isConfirmed: mau } = await sweet.tanya.fire({
    title: `${state.nama} ${TEKS.mauKado}`,
    text: TEKS.ayoJawab,
    imageUrl: el.fotoPertanyaan.src,
    showCancelButton: true,
    confirmButtonText: TEKS.tombolMau,
    cancelButtonText: TEKS.tombolEngga,
  });

  // Umpan balik lucu sesuai pilihan
  const pesanBalasan = mau ? el.lelucon.innerHTML : el.teksTolak.innerHTML;
  await sweet.info.fire({ title: pesanBalasan, timer: 2000, imageUrl: el.stikerTolak.src });

  // Sembunyikan pesan sebelumnya
  el.pesan.tua.style.display = "none";
  el.pesan.traktir.style.display = "none";
  el.pesan.sehat.style.display = "none";
  el.wallpaper.style.transform = "scale(1)";
  gantiStiker(4);

  // "Canda wkwwk :v" hanya saat mau, lalu diganti doa
  const penutup = mau ? [TEKS.canda, TEKS.doa] : [TEKS.doa];
  await tikGanti(el.pesan.canda, penutup);
  el.pesan.canda.innerHTML = TEKS.doa;

  await jeda(1710);
}

async function alurTerakhir() {
  el.wallpaper.style.transform = "scale(1.5)";
  await gantiStikerLembut(5);

  // Pesan terakhir dimunculkan kembali (perbaikan bug opacity/display)
  el.kalimat.style.display = "";
  el.kalimat.style.opacity = "1";
  el.kalimat.innerHTML = TEKS.levelUp;
  el.kalimat.style.transform = "scale(1)";
  el.kalimat.style.fontSize = "24px";
  el.kalimat.style.fontFamily = "var(--gaya-font2)";

  mulaiSalju();

  state.langkah = 2;
  await jeda(2000);
  munculkanTombol();
}

async function bukaWhatsapp() {
  await sweet.tanya.fire("OK!", "Kirim jawabannya ke WhatsApp aku, ya!", "success");
  const pesanTeks = `Makasii udah ngucapin ${state.nama} ultah ><`;
  const url = `https://api.whatsapp.com/send?phone=${KONFIG.nomorWhatsapp}&text=${encodeURIComponent(pesanTeks)}`;
  window.location.href = url;
}

// =========================================================
// INISIALISASI & EVENT
// =========================================================

el.konten.style.opacity = "1";
el.konten.style.marginTop = "16vh";

el.kado.onclick = bukaKado;
el.kartu.onclick = saatKlikKartu;
el.tombolLink.onclick = saatTombol;

el.love.forEach((love) => {
  love.onclick = () => {
    love.style.opacity = "0";
    love.onclick = null;
    state.loveTerkumpul += 1;
    if (state.loveTerkumpul === el.love.length) {
      alurUcapan();
    }
  };
});