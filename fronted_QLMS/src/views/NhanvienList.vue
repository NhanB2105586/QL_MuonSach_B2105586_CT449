<template>
  <div class="container">
    <h1 class="title">QUẢN LÍ NHÂN VIÊN</h1>
    <button class="btn btn-primary" @click="navigateToAdd">+ Thêm nhân viên mới</button>
    <table class="employee-table">
      <thead >
        <tr>
          <th style="text-align: center;">Mã nhân viên</th>
          <th style="text-align: center;">Tên</th>
          <th style="text-align: center;">Chức vụ</th>
          <th style="text-align: center;">SDT</th>
          <th style="text-align: center;">Địa chỉ</th>
          <th style="text-align: center;">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="nhanvien in nhanviens" :key="nhanvien._id" >
          <td >{{ nhanvien.MSNV }}</td>
          <td>{{ nhanvien.HoTenNV }}</td>
          <td>{{ nhanvien.ChucVu }}</td>
          <td>{{ nhanvien.SoDienThoai }}</td>
          <td>{{ nhanvien.DiaChi }}</td>
          <td>
            <button class="btn btn-edit" @click="editNhanvien(nhanvien._id)">Sửa</button>
            <button class="btn btn-delete" @click="deleteNhanvien(nhanvien._id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nhanviens: [], // Danh sách nhân viên
    };
  },
  methods: {
    // Lấy danh sách nhân viên từ API
    async fetchData() {
      try {
        const response = await axios.get("/api/nhanvien");
        this.nhanviens = response.data;
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },
    // Chuyển đến trang thêm mới
    navigateToAdd() {
      this.$router.push("/nhanvien/add");
    },
    // Chuyển đến trang chỉnh sửa
    editNhanvien(id) {
      this.$router.push(`/nhanvien/edit/${id}`);
    },
    // Xóa nhân viên
    async deleteNhanvien(id) {
      if (confirm("Are you sure you want to delete this employee?")) {
        try {
          await axios.delete(`/api/nhanvien/${id}`);
          this.fetchData(); // Cập nhật lại danh sách sau khi xóa
        } catch (error) {
          console.error("Error deleting employee:", error);
        }
      }
    },
  },
  // Lấy dữ liệu khi component được tạo
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: 600;
  color: #333;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.employee-table thead {
  background-color: #343a40;
  color: #fff;
  text-transform: uppercase;
}

.employee-table th,
.employee-table td {
  text-align: left;
  padding: 12px 18px;
  border: 1px solid #ddd;
  font-size: 1rem;
}

.employee-table tbody tr:nth-child(even) {
  background-color: #f4f4f4;
}

.employee-table tbody tr:hover {
  background-color: #e9ecef;
  transform: scale(1.02);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.employee-table tbody tr td {
  font-size: 1rem;
  color: #495057;
}

.btn {
  padding: 10px 16px;
  font-size: 1rem;
  margin: 5px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.btn-edit {
  background-color: #28a745;
  color: white;
}

.btn-edit:hover {
  background-color: #218838;
  transform: translateY(-2px);
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.btn-primary, .btn-edit, .btn-delete {
  border: none;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
}

button {
  display: inline-block;
}

.employee-table td button {
  margin-right: 8px; /* Adds space between action buttons */
}

@media (max-width: 768px) {
  .employee-table th,
  .employee-table td {
    font-size: 0.9rem;
    padding: 10px;
  }

  .btn {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
}

</style>
