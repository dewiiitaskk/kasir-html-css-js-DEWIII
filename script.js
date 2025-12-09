let keranjang = [];

// Tombol tambah barang
document.getElementById("tambahBtn").addEventListener("click", function() {
    const nama = document.getElementById("namaBarang").value;
    const harga = parseInt(document.getElementById("hargaBarang").value);
    const jumlah = parseInt(document.getElementById("jumlahBarang").value);

    if (!nama || !harga || !jumlah) {
        alert("Mohon isi semua data!");
        return;
    }

    keranjang.push({
        nama,
        harga,
        jumlah,
        total: harga * jumlah
    });

    tampilkanTabel();
    hitungTotal();

    // Reset input setelah menambahkan barang
    document.getElementById("namaBarang").value = "";
    document.getElementById("hargaBarang").value = "";
    document.getElementById("jumlahBarang").value = "";

    // Fokus kembali ke input nama barang
    document.getElementById("namaBarang").focus();
});

// Tampilkan barang di tabel
function tampilkanTabel() {
    const tbody = document.getElementById("tabelBody");
    tbody.innerHTML = "";

    keranjang.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>${item.harga}</td>
                <td>${item.jumlah}</td>
                <td>${item.total}</td>
                <td><button class="delete-btn" onclick="hapusItem(${index})">Hapus</button></td>
            </tr>
        `;
    });
}

// Hapus barang di tabel
function hapusItem(index) {
    keranjang.splice(index, 1);
    tampilkanTabel();
    hitungTotal();
}

// Hitung subtotal, diskon, pajak, total akhir
function hitungTotal() {
    let subtotal = keranjang.reduce((sum, item) => sum + item.total, 0);

    const diskonPersen = parseInt(document.getElementById("diskon").value) || 0;
    const diskon = subtotal * (diskonPersen / 100);

    const pajak = (subtotal - diskon) * 0.11;
    const totalAkhir = subtotal - diskon + pajak;

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("pajak").innerText = pajak.toFixed(2);
    document.getElementById("totalAkhir").innerText = totalAkhir.toFixed(2);
}

// Diskon langsung update ketika diketik
document.getElementById("diskon").addEventListener("input", hitungTotal);

// Tombol cetak struk
document.getElementById("cetakBtn").addEventListener("click", function() {
    window.print();
});