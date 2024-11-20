<template>
  <div class="borrowing-management">
    <h1 style="text-align: center">Quản lí mượn trả sách của độc giả</h1>
    <!-- Hiển thị khi không có phiếu mượn -->
<p v-if="records.length === 0">Không có phiếu mượn nào.</p>

    <table class="table">
      <thead>
        <tr>
          <th>Mã sách</th>
          <th>Tên sách</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in records" :key="record._id">
          <td>{{ record.MaSach }}</td>
          <td>{{ getBookTitle(record.MaSach) }}</td>
          <td>{{ formatDate(record.NgayMuon) }}</td>
          <td>{{ formatDate(record.NgayTra) || "Chưa trả" }}</td>
          <td>
            <button class="btn btn-info" @click="generatePDF(record)">
              In phiếu mượn
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="form-container" v-if="showForm">
      <form @submit.prevent="handleSubmit">
        <h2>{{ formMode }} Phiếu mượn sách</h2>
        <div class="form-group">
          <label for="MaSach">Mã sách:</label>
          <select class="form-control" v-model="form.MaSach" id="MaSach" required>
            <option v-for="book in books" :key="book.id" :value="book.maSach">
              {{ book.maSach }} - {{ book.title }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="NgayMuon">Ngày mượn:</label>
          <input class="form-control" type="date" v-model="form.NgayMuon" id="NgayMuon" required />
        </div>

        <div class="form-group">
          <label for="NgayTra">Ngày trả:</label>
          <input class="form-control" type="date" v-model="form.NgayTra" id="NgayTra" />
        </div>

        <div class="form-actions">
          <button class="btn btn-success" type="submit">{{ formMode }}</button>
          <button class="btn btn-secondary" type="button" @click="closeForm">
            Hủy
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'; // Import vue-router

export default {
  name: "ReaderBorrowingManagement",
  setup() {
    const apiUrl = "http://localhost:3000/api/theodoi";
    const bookUrl = "http://localhost:3000/api/sach";
    const router = useRouter(); // Khởi tạo router

    const records = ref([]);
    const books = ref([]);
    const showForm = ref(false);
    const formMode = ref("Add");

    const form = ref({
      _id: null,
      MaSach: "",
      NgayMuon: "",
      NgayTra: "",
    });

    // Fetch the current reader's borrowing records
    const fetchRecords = async () => {
      try {
        const readerId = localStorage.getItem("MaDocGia");
        if (!readerId) {
          alert("Bạn cần đăng nhập để xem phiếu mượn.");
          router.push("/login");  // Chuyển hướng đến trang đăng nhập
          return;
        }

        const response = await axios.get(`${apiUrl}?maDocGia=${readerId}`);
        records.value = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy phiếu mượn:", error);
      }
    };

    // Fetch all books
    const fetchBooks = async () => {
      try {
        const response = await axios.get(bookUrl);
        books.value = response.data.map((book) => ({
          id: book._id,
          maSach: book.MaSach,
          title: book.TenSach,
        }));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    // Get book title by ID
    const getBookTitle = (maSach) => {
      const book = books.value.find((book) => book.maSach === maSach);
      return book ? book.title : "Unknown Book";
    };

    // Format date
    const formatDate = (date) => {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    };

    // Generate PDF for borrowing record
    const generatePDF = (record) => {
      if (!record) {
        alert("Không có phiếu mượn nào để in.");
        return;
      }

      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("PHIEU MUON SACH", 20, 20);
      doc.setFontSize(12);
      doc.text(`Ma sach: ${record.MaSach}`, 20, 40);
      doc.text("Ten sach:", 20, 50); // Label
      doc.text(getBookTitle(record.MaSach), 50, 50); // Book title
      doc.text(`Ngay muon: ${formatDate(record.NgayMuon)}`, 20, 60);
      doc.text(`Ngay tra: ${formatDate(record.NgayTra) || "Chưa trả"}`, 20, 70);
      doc.save(`Borrowing_Record_${record.MaSach}.pdf`);
    };

    // Open form to add or edit a borrowing record
    const openForm = (record = null) => {
      form.value = record
        ? { ...record }
        : { _id: null, MaSach: "", NgayMuon: "", NgayTra: "" };
      formMode.value = record ? "Edit" : "Add";
      showForm.value = true;
    };

    // Close the form
    const closeForm = () => {
      showForm.value = false;
    };

    // Handle form submission (add or edit borrowing record)
    const handleSubmit = async () => {
      try {
        const readerId = localStorage.getItem("MaDocGia"); // Get MaDocGia from localStorage
        if (!readerId) {
          alert("Bạn cần đăng nhập để thực hiện thao tác này.");
          router.push("/login");
          return;
        }

        const payload = { ...form.value, MaDocGia: readerId }; // Add MaDocGia to the payload
        if (formMode.value === "Add") {
          await axios.post(apiUrl, payload);
        } else {
          await axios.put(`${apiUrl}/${payload._id}`, payload);
        }
        fetchRecords(); // Fetch the updated records
        closeForm();
      } catch (error) {
        console.error("Lỗi khi lưu phiếu mượn:", error);
      }
    };

    // On mounted, fetch records and books
    onMounted(() => {
      fetchRecords();
      fetchBooks();
    });

    return {
      records,
      books,
      showForm,
      formMode,
      form,
      fetchRecords,
      openForm,
      closeForm,
      handleSubmit,
      generatePDF,
      getBookTitle,
      formatDate,
    };
  },
};
</script>



<style scoped>
.lichsu-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
}

.table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f4f4f4;
}

.badge {
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
}

.badge-warning {
  background-color: #ffcc00;
  color: white;
}

.badge-success {
  background-color: #4caf50;
  color: white;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #ffcc00;
}

.no-history {
  text-align: center;
  font-size: 18px;
  color: #ff6347;
}
</style>
