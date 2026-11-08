// js/script.js

// 1. Logika Login & Modal Box
const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = document.getElementById('email').value;
        const passInput = document.getElementById('password').value;

        // Validasi ke variabel dataPengguna
        const userFound = dataPengguna.find(u => u.email === emailInput && u.password === passInput);

        if (userFound) {
            alert(`Selamat datang, ${userFound.nama}!`);
            window.location.href = 'dashboard.html';
        } else {
            alert('email/password yang anda masukkan salah');
        }
    });
}

function openModal(idModal) {
    document.getElementById(idModal).style.display = 'block';
}

function closeModal(idModal) {
    document.getElementById(idModal).style.display = 'none';
}

// 2. Logika Greeting di Dashboard
function tampilkanGreeting() {
    const greetingElement = document.getElementById('greetingText');
    if (!greetingElement) return;

    const jam = new Date().getHours();
    let kataGreeting = 'Selamat Malam';

    if (jam >= 4 && jam < 11) {
        kataGreeting = 'Selamat Pagi';
    } else if (jam >= 11 && jam < 15) {
        kataGreeting = 'Selamat Siang';
    } else if (jam >= 15 && jam < 18) {
        kataGreeting = 'Selamat Sore';
    }

    greetingElement.innerText = `${kataGreeting}, Selamat Datang di Toko Buku!`;
}

// 3. Logika Tampil & Tambah Katalog (stok.html)
function renderKatalog() {
    const tbody = document.querySelector('#tabelKatalog tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    dataKatalogBuku.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${item.cover}" class="thumb" alt="${item.namaBarang}" onerror="this.src='https://via.placeholder.com/50'"></td>
            <td>${item.kodeBarang}</td>
            <td>${item.namaBarang}</td>
            <td>${item.jenisBarang}</td>
            <td>${item.edisi}</td>
            <td>${item.stok}</td>
            <td>${item.harga}</td>
        `;
        tbody.appendChild(tr);
    });
}

const formTambahStok = document.getElementById('formTambahStok');
if (formTambahStok) {
    formTambahStok.addEventListener('submit', function (e) {
        e.preventDefault();
        const kode = document.getElementById('kodeBarang').value;
        const nama = document.getElementById('namaBarang').value;
        const stok = parseInt(document.getElementById('stok').value);
        const harga = document.getElementById('harga').value;

        // Tambahkan data baru ke Array
        dataKatalogBuku.push({
            kodeBarang: kode,
            namaBarang: nama,
            jenisBarang: "Buku Ajar",
            edisi: "1",
            stok: stok,
            harga: harga,
            cover: "img/pengantar_komunikasi.jpg" // Gambar default
        });

        renderKatalog();
        formTambahStok.reset();
        alert('Stok baru berhasil ditambahkan!');
    });
}

// 4. Logika Tracking Pengiriman (tracking.html)
function cariTracking() {
    const noDO = document.getElementById('noDO').value.trim();
    const containerHasil = document.getElementById('hasilTracking');
    containerHasil.innerHTML = '';

    const data = dataTracking[noDO];

    if (!data) {
        containerHasil.innerHTML = `<p style="color:red; margin-top:15px;">Nomor DO <strong>${noDO}</strong> tidak ditemukan!</p>`;
        return;
    }

    let perjalananHTML = '<ul>';
    data.perjalanan.forEach(p => {
        perjalananHTML += `<li><strong>${p.waktu}:</strong> ${p.keterangan}</li>`;
    });
    perjalananHTML += '</ul>';

    containerHasil.innerHTML = `
        <div class="tracking-info">
            <h3>Detail Pengiriman</h3>
            <div class="progress-bar">Status: ${data.status}</div>
            <p><strong>Nama Pemesan:</strong> ${data.nama}</p>
            <p><strong>Ekspedisi:</strong> ${data.ekspedisi}</p>
            <p><strong>Tanggal Kirim:</strong> ${data.tanggalKirim}</p>
            <p><strong>Jenis Paket:</strong> ${data.paket}</p>
            <p><strong>Total Pembayaran:</strong> ${data.total}</p>
            <h4 style="margin-top:10px;">Riwayat Perjalanan:</h4>
            ${perjalananHTML}
        </div>
    `;
}

// 5. Logika Halaman Pemesanan (checkout.html)
function loadBukuOptions() {
    const select = document.getElementById('pilihBuku');
    if (!select) return;

    dataKatalogBuku.forEach(buku => {
        const option = document.createElement('option');
        option.value = buku.kodeBarang;
        option.innerText = `${buku.namaBarang} - (${buku.harga})`;
        select.appendChild(option);
    });
}

function prosesCheckout(e) {
    e.preventDefault();
    const nama = document.getElementById('namaPemesan').value;
    alert(`Terima kasih ${nama}, pemesanan Anda berhasil diproses!`);
    window.location.href = 'dashboard.html';
}