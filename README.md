# TODOSNOW

### Anggota Kelompok

1. Muhammad Daffa Satria Negara
2. Faris ali Naufal
3. Rayhans Danendra

### Getting Started

#### Pastikan sudah mendownload Node js dan PostgreSQL untuk menjalankan projek ini.

1. Masuk dulu ke folder Backend dengan perintah `cd backend`
2. Jalankan perintah `npm install`
3. pada folder backend, terdapat file **.env.example**; salin isi dari file tersebut dan buat file baru dengan nama **.env**, dan sesuaikan dengan konfigurasi pada postgreSQL anda.
4. setelah itu, jalankan perintah:
   `npm run migrate`
   **Note :** untuk migrasi data kedalam database.
5. jika migrate berhasil, jalankan perintah `npm run dev`
   perintah diatas untuk menjalankan folder backend yang sudah dibuat.
6. ini buat cek API yang sudah dibuat di backend menggunakan postman:
   ```bash
   https://api.postman.com/collections/30131488-92b614c5-8e2e-49da-a947-3af0f253f002?access_key=PMAT-01HJ6NZ8RTSF8T4JTQRGSKF1RA
   ```
7. jika backend sudah berjalan dengan sempurna, akses folder frontend dengan perintah `cd frontend`
8. setelah itu, jalankan perintah `npm install`
9. setelah itu, copy isi dari file **.env.example** dan buat file baru dengan nama **.env** ; **note :** jangan lupa konfigurasi dengan alamat dari backend anda. example: ``API_URL='http://localhost:3000/api/v1``
10. jalankan perintah `npm run dev` untuk menjalankan program pada frontend.
11. happy coding :)

jika terdapat kendala, bisa menghubungi saya lewat email : **daffasatria036@gmail.com**