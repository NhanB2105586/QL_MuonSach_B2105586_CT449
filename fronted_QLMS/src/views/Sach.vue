<template>
  <div class="sach-container">
    <h1>QUẢN LÍ SÁCH</h1>

    <!-- Nút thêm sách -->
    <button class="add-button" @click="$router.push({ name: 'addBook' })">+ Thêm Sách</button>

    <!-- Card danh sách sách -->
    <div class="book-cards">
      <div class="book-card" v-for="book in books" :key="book._id">
        <div class="book-cover-wrapper">
          <img :src="`http://localhost:3000${book.AnhBia}`" alt="Book Cover" class="book-cover" />
        </div>

        <div class="book-info">
          <h3>{{ book.TenSach }}</h3>
          <p>Mã Sách: {{ book.MaSach }}</p>
          <p>Đơn Giá: {{ book.DonGia}} VND</p>
          <p>Số Quyển: {{ book.SoQuyen }}</p>
          <p>Năm Xuất Bản: {{ book.NamXuatBan }}</p>
          <p>Mã NXB: {{ book.MaNXB }}</p>
        </div>

        <div class="book-actions">
          <button @click="$router.push({ name: 'editBook', params: { id: book._id } })" title="Sửa">
            <i class="fas fa-edit"></i>
          </button>
          <button @click="deleteBook(book._id)" title="Xóa">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import BookForm from "@/components/BookForm.vue";

export default {
  name: "Sach",
  components: {
    BookForm,
  },
  data() {
    return {
      books: [],
      selectedBook: null,
      showAddForm: false,
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
    editBook(book) {
      this.selectedBook = { ...book };
      this.showAddForm = true;
    },
    async handleSave(book) {
      try {
        if (book._id) {
          await axios.put(`http://localhost:3000/api/sach/${book._id}`, book);
          alert("Cập nhật sách thành công!");
        } else {
          await axios.post("http://localhost:3000/api/sach", book);
          alert("Thêm sách thành công!");
        }
        this.fetchBooks();
        this.cancelForm();
      } catch (error) {
        console.error("Lỗi khi lưu sách:", error);
        alert("Có lỗi xảy ra khi lưu sách.");
      }
    },
    async deleteBook(bookId) {
      try {
        if (confirm("Bạn có chắc chắn muốn xóa sách này?")) {
          await axios.delete(`http://localhost:3000/api/sach/${bookId}`);
          this.fetchBooks();
          alert("Xóa sách thành công!");
        }
      } catch (error) {
        console.error("Lỗi khi xóa sách:", error);
        alert("Có lỗi xảy ra khi xóa sách.");
      }
    },
    cancelForm() {
      this.selectedBook = null;
      this.showAddForm = false;
    },
  },
};
</script>

<style scoped>
.sach-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
}

.add-button {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

.add-button:hover {
  background-color: #45a049;
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
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #333;
}

.book-actions button:hover {
  color: #007bff;
}

.book-actions .fas.fa-edit {
  color: #4caf50;
}

.book-actions .fas.fa-trash {
  color: #f44336;
}
</style>
