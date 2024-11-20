<template>
  <div class="sach-docgia-container">
    <h1>Danh Sách Sách</h1>

    <!-- Card danh sách sách -->
    <div class="book-cards">
      <div class="book-card" v-for="book in books" :key="book._id">
        <div class="book-cover-wrapper">
          <img :src="`http://localhost:3000${book.AnhBia}`" alt="Book Cover" class="book-cover" />
        </div>

        <div class="book-info">
          <h3>{{ book.TenSach }}</h3>
          <p>Mã Sách: {{ book.MaSach }}</p>
          <p>Đơn Giá: {{ book.DonGia }} VND</p>
          <p>Số Quyển: {{ book.SoQuyen }}</p>
          <p>Năm Xuất Bản: {{ book.NamXuatBan }}</p>
          <p>Mã NXB: {{ book.MaNXB }}</p>
        </div>

        <div class="book-actions">
          <button @click="openBorrowModal(book)" title="Mượn">
            <i class="fas fa-book-reader"></i> Mượn
          </button>
        </div>
      </div>
    </div>

    <!-- Modal chọn ngày trả -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Chọn Ngày Trả</h2>
        <p>{{ selectedBook?.TenSach }}</p>
        <label for="returnDate">Ngày Trả:</label>
        <input type="date" id="returnDate" v-model="returnDate" />

        <div class="modal-actions">
          <button @click="confirmBorrow">Xác Nhận</button>
          <button @click="closeBorrowModal">Hủy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SachDocGia",
  data() {
    return {
      books: [],
      showModal: false,
      selectedBook: null,
      returnDate: "",
    };
  },
  created() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get("http://localhost:3000/api/sach");
        this.books = response.data;
      } catch (error) {
        console.error("Lỗi khi tải danh sách sách:", error);
      }
    },
    openBorrowModal(book) {
      this.selectedBook = book;
      this.returnDate = ""; // Reset ngày trả
      this.showModal = true;
    },
    closeBorrowModal() {
      this.showModal = false;
      this.selectedBook = null;
    },
    async confirmBorrow() {
  if (!this.returnDate) {
    alert("Vui lòng chọn ngày trả!");
    return;
  }

  try {
    // Retrieve MaDocGia and username from localStorage
    const MaDocGia = localStorage.getItem("MaDocGia");
    const username = localStorage.getItem("username");

    if (!MaDocGia || !username) {
      alert("Bạn cần đăng nhập để mượn sách.");
      return;
    }

    // Tạo payload cho bản ghi mượn
    const payload = {
      MaDocGia: MaDocGia,  // Lấy MaDocGia từ localStorage
      TenDocGia: username, // Lấy tên độc giả từ localStorage
      MaSach: this.selectedBook.MaSach,
      NgayMuon: new Date().toISOString().split("T")[0], // Ngày mượn là ngày hiện tại
      NgayTra: this.returnDate,
    };

    // Gửi dữ liệu tới API
    const response = await axios.post("http://localhost:3000/api/theodoi", payload);
    alert("Mượn sách thành công!");

    // Reset modal và cập nhật dữ liệu sách
    this.closeBorrowModal();
    this.fetchBooks();
  } catch (error) {
    console.error("Lỗi khi mượn sách:", error);
    alert("Có lỗi xảy ra khi mượn sách.");
  }
},
  },
};
</script>

<style scoped>
.sach-docgia-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
}

.book-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.book-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.book-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.book-cover-wrapper {
  overflow: hidden;
  border-radius: 5px;
}

.book-cover {
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.3s;
}

.book-cover:hover {
  transform: scale(1.05);
}

.book-info {
  margin-top: 10px;
}

.book-info h3 {
  margin: 0;
  font-size: 18px;
}

.book-info p {
  margin: 5px 0;
  font-size: 14px;
  color: #555;
}

.book-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.book-actions button {
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
}

.book-actions button:hover {
  background-color: #45a049;
}

.book-actions .fas.fa-book-reader {
  margin-right: 5px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.modal-actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.modal-actions button:first-child {
  background-color: #4caf50;
  color: #fff;
}

.modal-actions button:last-child {
  background-color: #f44336;
  color: #fff;
}

.modal-actions button:hover {
  opacity: 0.9;
}
</style>
