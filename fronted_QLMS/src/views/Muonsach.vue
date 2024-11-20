    <template>
    <div class="borrowing-management">
        <h1 style="text-align: center">Quản lí mượn trả sách</h1>
        <button class="btn btn-primary" @click="openForm()">Thêm phiếu mượn</button>

        <table class="table">
        <thead>
            <tr>
            <th>Mã đọc giả</th>
            <th>Tên đọc giả</th>
            <th>Mã sách</th>
            <th>Tên sách</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Hành động</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="record in records" :key="record._id">
            <td>{{ record.MaDocGia }}</td>
            <td>{{ getReaderName(record.MaDocGia) }}</td>
            <td>{{ record.MaSach }}</td>
            <td>{{ getBookTitle(record.MaSach) }}</td>
            <td>{{ formatDate(record.NgayMuon) }}</td>
            <td>{{ formatDate(record.NgayTra) || "Chưa trả" }}</td>
            <td>
                <button class="btn btn-secondary " @click="openForm(record)" style="margin-right: 3px;">
                Sửa
                </button>
                <button class="btn btn-danger" @click="deleteRecord(record._id)" style="margin-right: 3px;">
                Xóa
                </button>
                <button class="btn btn-info" @click="generatePDF(record)">
                In phiếu
                </button>
            </td>
            </tr>
        </tbody>
        </table>

        <div class="form-container" v-if="showForm">
        <form @submit.prevent="handleSubmit">
            <h2>{{ formMode }} Borrowing Record</h2>
            <div class="form-group">
            <label for="MaDocGia">Reader ID:</label>
            <select
                class="form-control"
                v-model="form.MaDocGia"
                id="MaDocGia"
                required
            >
                <option
                v-for="reader in readers"
                :key="reader.id"
                :value="reader.maDocGia"
                >
                {{ reader.maDocGia }} - {{ reader.name }}
                </option>
            </select>
            </div>

            <div class="form-group">
            <label for="MaSach">Book ID:</label>
            <select
                class="form-control"
                v-model="form.MaSach"
                id="MaSach"
                required
            >
                <option v-for="book in books" :key="book.id" :value="book.maSach">
                {{ book.maSach }} - {{ book.title }}
                </option>
            </select>
            </div>

            <div class="form-group">
            <label for="NgayMuon">Borrow Date:</label>
            <input
                class="form-control"
                type="date"
                v-model="form.NgayMuon"
                id="NgayMuon"
                required
            />
            </div>

            <div class="form-group">
            <label for="NgayTra">Return Date:</label>
            <input
                class="form-control"
                type="date"
                v-model="form.NgayTra"
                id="NgayTra"
            />
            </div>

            <div class="form-actions">
            <button class="btn btn-success" type="submit">{{ formMode }}</button>
            <button class="btn btn-secondary" type="button" @click="closeForm">
                Cancel
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

    export default {
    name: "BorrowingManagement",
    setup() {
        const apiUrl = "http://localhost:3000/api/theodoi";
        const readerUrl = "http://localhost:3000/api/docgia";
        const bookUrl = "http://localhost:3000/api/sach";

        const records = ref([]);
        const readers = ref([]);
        const books = ref([]);
        const showForm = ref(false);
        const formMode = ref("Add");

        const form = ref({
        _id: null,
        MaDocGia: "",
        MaSach: "",
        NgayMuon: "",
        NgayTra: "",
        });

        const fetchRecords = async () => {
        try {
            const response = await axios.get(apiUrl);
            records.value = response.data;
        } catch (error) {
            console.error("Error fetching records:", error);
        }
        };

        const fetchReaders = async () => {
        try {
            const response = await axios.get(readerUrl);
            readers.value = response.data.map((reader) => ({
            id: reader._id,
            maDocGia: reader.MaDocGia,
            name: `${reader.HoLot} ${reader.Ten}`,
            }));
        } catch (error) {
            console.error("Error fetching readers:", error);
        }
        };

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

        const getReaderName = (maDocGia) => {
        const reader = readers.value.find(
            (reader) => reader.maDocGia === maDocGia
        );
        return reader ? reader.name : "Unknown Reader";
        };

        const getBookTitle = (maSach) => {
        const book = books.value.find((book) => book.maSach === maSach);
        return book ? book.title : "Unknown Book";
        };

        const formatDate = (date) => {
        if (!date) return null;
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
        };

        const generatePDF = (record) => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("PHIEU MUON SACH", 20, 20);
        doc.setFontSize(12);
        doc.text(`Ma doc gia: ${record.MaDocGia}`, 20, 40);
        doc.setFontSize(12);
        doc.text("Ten doc gia:", 20, 50); // Dòng 1: Label
        doc.text(getReaderName(record.MaDocGia), 50, 50); // Dòng 2: Tên (cách dòng 1)

        doc.text(`Ma sach: ${record.MaSach}`, 20, 60);
        doc.setFontSize(12);
        doc.text("Ten sach:", 20, 70); // Dòng 1: Label
        doc.text(getBookTitle(record.MaSach), 50, 70); // Dòng 2: Tên sách (cùng dòng nhưng cách ra)

        doc.text(`Ngay muon: ${formatDate(record.NgayMuon)}`, 20, 80);
        doc.text(`Ngay tra: ${formatDate(record.NgayTra) || "Chưa trả"}`, 20, 90);
        doc.save(`Borrowing_Record_${record.MaDocGia}.pdf`);
        };

        const openForm = (record = null) => {
        form.value = record
            ? { ...record }
            : { _id: null, MaDocGia: "", MaSach: "", NgayMuon: "", NgayTra: "" };
        formMode.value = record ? "Edit" : "Add";
        showForm.value = true;
        };

        const closeForm = () => {
        showForm.value = false;
        };

        const handleSubmit = async () => {
        try {
            const payload = { ...form.value };
            if (formMode.value === "Add") {
            await axios.post(apiUrl, payload);
            } else {
            await axios.put(`${apiUrl}/${payload._id}`, payload);
            }
            fetchRecords();
            closeForm();
        } catch (error) {
            console.error("Error saving record:", error);
        }
        };

        const deleteRecord = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            fetchRecords();
        } catch (error) {
            console.error("Error deleting record:", error);
        }
        };

        onMounted(() => {
        fetchRecords();
        fetchReaders();
        fetchBooks();
        });

        return {
        records,
        readers,
        books,
        showForm,
        formMode,
        form,
        fetchRecords,
        openForm,
        closeForm,
        handleSubmit,
        deleteRecord,
        generatePDF,
        getReaderName,
        getBookTitle,
        formatDate,
        };
    },
    };
    </script>

    <style scoped>
/* Global styling */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

/* Container for the borrowing management section */
.borrowing-management {
  max-width: 1200px;
  margin: 30px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Title Styling */
.borrowing-management h1 {
  text-align: center;
  color: #000000;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: bold;
}

/* Button Styling */
.btn {
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #06b35f;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #046c30;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
  border: none;
}

.btn-info:hover {
  background-color: #138496;
}

/* Table Styling */
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
}

.table th, .table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #dee2e6;
}

.table th {
  background-color: #2d2b2b;
  color: white;
  font-weight: 600;
}

.table tr:hover {
  background-color: #b4c0e3;
}

/* Form container styling */
.form-container {
  margin-top: 40px;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #000000;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: 600;
  color: #333;
}

select,
input {
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

select:focus,
input:focus {
  outline: none;
  border-color: #007bff;
}

/* Form actions */
.form-actions {
  text-align: center;
  margin-top: 20px;
}

.form-actions .btn {
  width: 150px;
  margin: 0 10px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .table th, .table td {
    padding: 8px;
  }

  .form-container {
    padding: 15px;
  }

  .form-actions .btn {
    width: 100%;
    margin-bottom: 10px;
  }
}


</style>

