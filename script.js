// === Variabel & Konstanta ===
const body = document.body;
const Content = document.getElementById("Content");
const wallpaper = document.getElementById("wallpaper");
const bodyblur = document.getElementById("bodyblur");
const kadoIn = document.getElementById("kadoIn");
const ket = document.getElementById("ket");
const fotostiker = document.getElementById("fotostiker");
const fotostiker1 = document.getElementById("fotostiker1");
const fotostiker2 = document.getElementById("fotostiker2");
const fotostiker3 = document.getElementById("fotostiker3");
const fotostiker4 = document.getElementById("fotostiker4");
const fotostiker5 = document.getElementById("fotostiker5");
const fotostiker6 = document.getElementById("fotostiker6");
const halo = document.getElementById("halo");
const bq = document.getElementById("bq");
const kalimat = document.getElementById("kalimat");
const pesan1 = document.getElementById("pesan1");
const pesan2 = document.getElementById("pesan2");
const pesan3 = document.getElementById("pesan3");
const pesan4 = document.getElementById("pesan4");
const pesan5 = document.getElementById("pesan5");
const pesan6 = document.getElementById("pesan6");
const pesan7 = document.getElementById("pesan7");
const pesan8 = document.getElementById("pesan8");
const pesan9 = document.getElementById("pesan9");
const pesan10 = document.getElementById("pesan10");
const opsL = document.getElementById("opsL");
const Tombol = document.getElementById("Tombol");
const By = document.getElementById("By");
const kolombaru = document.getElementById("kolombaru");
const lv1 = document.getElementById("lv1");
const lv2 = document.getElementById("lv2");
const lv3 = document.getElementById("lv3");
const lv4 = document.getElementById("lv4");
const katatambahan = document.getElementById("katatambahan");
const pesanditolak = document.getElementById("pesanditolak");
const stikerditolak = document.getElementById("stikerditolak");
const kataditolak = document.getElementById("kataditolak");
const linkmp3 = document.getElementById("linkmp3");

const swalst = Swal.mixin({
  timer: 2300,
  allowOutsideClick: false,
  showConfirmButton: false,
  timerProgressBar: true,
  imageHeight: 90,
});
const swals = Swal.mixin({
  allowOutsideClick: false,
  cancelButtonColor: "#FF0040",
  imageHeight: 80,
});

const audio = new Audio(linkmp3.src);
let ftganti = 0;
let fungsi = 0;
let fungsiAwal = 0;
const deffotostiker = fotostiker.src;

// === Efek Salju ===
function berjatuhan() {
  const heart = document.createElement("div");
  heart.className = "fas fa-snowflake";
  heart.style.left = Math.random() * 90 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 2 + "s";
  body.appendChild(heart);
}
setInterval(() => {
  const heartArr = document.querySelectorAll(".fa-snowflake");
  if (heartArr.length > 100) heartArr[0].remove();
}, 100);

// === Inisialisasi Konten ===
Content.style.opacity = "1";
Content.style.marginTop = "16vh";

// === Event Kado ===
kadoIn.onclick = () => {
  if (fungsiAwal === 0) {
    audio.play();
    fungsiAwal = 1;
    kadoIn.style.transition = "all .8s ease";
    kadoIn.style.transform = "scale(10)";
    kadoIn.style.opacity = "0";
    wallpaper.style.transform = "scale(1.5)";
    ket.style.display = "none";
    setTimeout(initengahan, 300);
    setTimeout(inipesan, 500);
  }
};

// === Input Nama ===
async function inipesan() {
  const { value: nama } = await swals.fire({
    title: "Masukin Nama Kamu",
    input: "text",
  });
  if (nama && nama.length < 11) {
    window.nama = nama;
    vketikhalo = `Hai, ${nama} ✨`;
    mulainama();
  } else {
    await swals.fire("Ups!", "Nama tidak boleh kosong atau lebih dari 10 karakter, ya!");
    inipesan();   
  }
}

// === Efek Tengah ===
function initengahan() {
  kadoIn.style.display = "none";
  ket.style.display = "none";
  Content.style.opacity = "1";
  Content.style.marginTop = "0";
  bodyblur.style.opacity = ".7";
  wallpaper.style.transform = "scale(1.5)";
}

// === Mulai Nama & Stiker ===
async function mulainama() {
  bodyblur.style.opacity = ".7";
  wallpaper.style.transform = "scale(1)";
  fotostiker.style.display = "inline-flex";
  setTimeout(ftmuncul, 200);
  setTimeout(kethalo, 500);
}

function ftmuncul() {
  const stikerList = [
    deffotostiker,
    fotostiker1.src,
    fotostiker2.src,
    fotostiker3.src,
    fotostiker4.src,
    fotostiker5.src,
  ];
  fotostiker.src = stikerList[ftganti] || deffotostiker;
  fotostiker.style.display = "inline-flex";
  fotostiker.style.opacity = "1";
  fotostiker.style.transform = "scale(1)";
}
function fthilang() {
  fotostiker.style.opacity = "0";
  fotostiker.style.transition = "all .7s ease";
  fotostiker.style.transform = "scale(.1)";
}

// === Halo Ketik ===
function kethalo() {
  new TypeIt("#halo", {
    strings: [vketikhalo],
    startDelay: 50,
    speed: 40,
    waitUntilVisible: true,
    afterComplete: () => {
      halo.innerHTML = vketikhalo;
      setTimeout(bqmuncul, 200);
    },
  }).go();
}

// === Blockquote Muncul/Hilang ===
function bqmuncul() {
  bq.style.position = "relative";
  bq.style.opacity = "1";
  bq.style.visibility = "visible";
  bq.style.transform = "scale(1)";
  bq.style.marginTop = "0";
  mulaiketik1();
}
function bqhilang() {
  wallpaper.style.transform = "scale(2)";
  bodyblur.style.opacity = ".3";
  bq.style.position = "relative";
  bq.style.transition = "all .7s ease";
}

// === Tombol Lanjut/Balas ===
function tombol() {
  wallpaper.style.transform = "scale(1)";
  Tombol.style.opacity = "1";
  Tombol.style.transform = "scale(1)";
  if (fungsi === 2) By.innerHTML = "&#128140; Balas";
}
By.onclick = () => {
  if (fungsi === 1) {
    Tombol.style = "";
    fthilang();
    fungsi = 0;
    pertanyaan();
  }
  if (fungsi === 2) {
    Tombol.style = "";
    menuju();
  }
};

// === Ucapan Otomatis Berdasarkan Waktu ===
const waktuSekarang = new Date().getHours();
let ucapan = "Selamat Malam, ";
if (waktuSekarang < 10) ucapan = "Selamat Pagi, ";
else if (waktuSekarang < 16) ucapan = "Selamat Siang, ";
else if (waktuSekarang < 19) ucapan = "Selamat Sore, ";

// === Animasi Ketik Pesan ===
let vketikhalo = "";
let vketik1 = kalimat.innerHTML;
kalimat.innerHTML = "";
function mulaiketik1() {
  new TypeIt("#kalimat", {
    strings: [vketik1],
    startDelay: 400,
    speed: 20,
    cursor: false,
    deleteSpeed: 20,
    breakLines: false,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: aktiopsL,
  }).go();
}

// === Blockquote OpsL ===
let opsLclick = 0;
let opsLcheck = 0;
const defopsL = opsL.innerHTML;
bq.onclick = () => {
  if (opsLclick === 1) {
    if (opsLcheck === 1) {
      setTimeout(aktipesan1, 400);
      fthilang();
      ftganti = 1;
      setTimeout(ftmuncul, 300);
    }
    if (opsLcheck === 2) mulaiketik3();
    if (opsLcheck === 3) mulaiketik4();
    if (opsLcheck === 4) mulaiketik5();
    if (opsLcheck === 5) kethalo2 && kethalo2();
    otomatis();
    opsL.style.opacity = "0";
    opsLclick = 0;
  }
};
function aktiopsL() {
  opsL.innerHTML = defopsL;
  opsL.style.opacity = ".8";
  opsLclick = 1;
  opsLcheck += 1;
}

// === Kolom LOVE ===
let slov = 0;
[lv1, lv2, lv3, lv4].forEach((lv, idx) => {
  lv.onclick = function () {
    this.style.opacity = "0";
    slov += 1;
    this.onclick = null;
    checkslov();
  };
});
function checkslov() {
  if (slov === 4) {
    kolombaru.style.position = "relative";
    kolombaru.style.transform = "scale(1)";
    otomatis();
    setTimeout(aktipesan2, 400);
  }
}

// === Proses Pesan Bertahap ===
function otomatis() {
  pesan3.style.transition = "none";
  pesan8.style.display = "none";
  kalimat.style.opacity = "0";
  if (!otoaktipesan) setTimeout(otolanj, 400);
}
function otolanj() {
  kalimat.style.opacity = "1";
}
function aktipesan1() {
  kalimat.innerHTML = pesan1.innerHTML;
  kolombaru.style.position = "relative";
  kolombaru.style.opacity = "1";
  kolombaru.style.transform = "scale(1)";
}
let vketik2 = pesan2.innerHTML;
function aktipesan2() {
  wallpaper.style.transform = "scale(1.5)";
  kolombaru.style = "";
  kalimat.innerHTML = "";
  new TypeIt("#kalimat", {
    strings: [vketik2],
    startDelay: 20,
    speed: 40,
    cursor: true,
    deleteSpeed: 50,
    breakLines: false,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: () => setTimeout(aktipesan3, 500),
  }).go();
}
let vketik3 = pesan3.innerHTML;
pesan3.innerHTML = "";
function aktipesan3() {
  kalimat.style.display = "none";
  pesan3.style.position = "relative";
  pesan3.style.opacity = "1";
  pesan3.style.transform = "scale(1)";
  wallpaper.style.transform = "scale(1)";
  fthilang();
  ftganti = 2;
  setTimeout(ftmuncul, 300);
  new TypeIt("#pesan3", {
    strings: [vketik3],
    startDelay: 1,
    speed: 45,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: () => {
      pesan3.innerHTML = vketik3;
      setTimeout(otomatis, 600);
      setTimeout(aktipesan4, 1010);
    },
  }).go();
}
function aktipesan4() {
  wallpaper.style.transform = "scale(1.5)";
  kalimat.innerHTML = pesan4.innerHTML + window.nama + " 🥳";
  kalimat.style.transform = "scale(1.2)";
  setTimeout(aktipesan5, 1000);
}
let vketik5 = pesan5.innerHTML;
pesan5.innerHTML = "";
function aktipesan5() {
  fthilang();
  ftganti = 3;
  setTimeout(ftmuncul, 300);
  wallpaper.style.transform = "scale(1)";
  new TypeIt("#pesan5", {
    strings: [vketik5],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: () => {
      pesan5.innerHTML = vketik5 + " ><";
      setTimeout(aktipesan6, 800);
    },
  }).go();
}
let vketik6 = pesan6.innerHTML;
pesan6.innerHTML = "";
function aktipesan6() {
  wallpaper.style.transform = "scale(1.5)";
  new TypeIt("#pesan6", {
    strings: [vketik6],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: () => {
      pesan6.innerHTML = vketik6;
      setTimeout(aktipesan7, 800);
    },
  }).go();
}
let vketik7 = pesan7.innerHTML;
pesan7.innerHTML = "";
function aktipesan7() {
  fthilang();
  ftganti = 1;
  setTimeout(ftmuncul, 300);
  wallpaper.style.transform = "scale(1)";
  new TypeIt("#pesan7", {
    strings: [vketik7],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: () => {
      pesan7.innerHTML = vketik7;
      fungsi = 1;
      setTimeout(tombol, 400);
    },
  }).go();
}

// === Pesan Akhir & Pertanyaan ===
let vketik81 = pesan8.innerHTML;
pesan8.innerHTML = "";
let vketik9 = pesan9.innerHTML;
pesan9.innerHTML = "";
let vketik10 = pesan10.innerHTML;
pesan10.innerHTML = "";
let otoaktipesan = 0;
function aktipesan8() {
  pesan5.style.display = "none";
  pesan6.style.display = "none";
  pesan7.style.display = "none";
  pesan8.style.display = "";
  wallpaper.style.transform = "scale(1)";
  ftganti = 4;
  ftmuncul();
  new TypeIt("#pesan8", {
    strings: [vketik8, vketik9],
    startDelay: 20,
    speed: 45,
    cursor: true,
    deleteSpeed: 30,
    breakLines: false,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: () => {
      pesan8.innerHTML = vketik9;
      setTimeout(otomatis, 1300);
      setTimeout(aktipesan10, 1710);
    },
  }).go();
}
function aktipesan10() {
  wallpaper.style.transform = "scale(1.5)";
  fthilang();
  ftganti = 5;
  setTimeout(ftmuncul, 300);
  otoaktipesan = 1;
  otomatis();
  setTimeout(toaktipesan, 300);
  setInterval(berjatuhan, 400);
  fungsi = 2;
  setTimeout(tombol, 2000);
}
function toaktipesan() {
  kalimat.innerHTML = vketik10;
  kalimat.style.transform = "scale(1)";
  kalimat.style.fontSize = "24px";
  kalimat.style.fontFamily = "var(--gaya-font2)";
}

// === Pertanyaan Akhir ===
const tanya = "Mau Kado Gak Nih? 😶❤️";
const opstanya = "Ayo jawab 😆";
const tompositif = "Mau";
const tomnegatif = "Engga";

async function pertanyaan() {
  const { isConfirmed: prtanya } = await swals.fire({
    title: window.nama + " " + tanya,
    text: opstanya,
    imageUrl: fotostiker6.src,
    showCancelButton: true,
    confirmButtonText: tompositif,
    cancelButtonText: tomnegatif,
  });
  if (prtanya) {
    await swalst.fire({
      title: katatambahan.innerHTML,
      timer: 2000,
      imageUrl: stikerditolak.src,
    });
    vketik8 = vketik81;
    aktipesan8();
  } else {
    await swalst.fire({
      title: kataditolak.innerHTML,
      timer: 2000,
      imageUrl: stikerditolak.src,
    });
    vketik8 = "";
    aktipesan8();
  }
}

// === Menuju WhatsApp ===
async function menuju() {
  const pesanwhatsapp = `Makasii udah ngucapin ${window.nama} ultah ><`;
  await swals.fire("OK!", "Kirim jawabannya ke WhatsApp aku, ya!", "success");
  window.location.href = `https://api.whatsapp.com/send?phone=6281250217363&text=${encodeURIComponent(pesanwhatsapp)}`;
}
