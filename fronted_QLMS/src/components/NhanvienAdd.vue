<template>
  <div class="container">
    <h1 class="title">Add New Employee</h1>
    <form @submit.prevent="addNhanvien" class="form">
      <div class="form-group">
        <label>Employee ID:</label>
        <input v-model="nhanvien.MSNV" required placeholder="Enter Employee ID" />
      </div>
      <div class="form-group">
        <label>Name:</label>
        <input v-model="nhanvien.HoTenNV" required placeholder="Enter Employee Name" />
      </div>
      <div class="form-group">
        <label>Position:</label>
        <input v-model="nhanvien.ChucVu" required placeholder="Enter Position" />
      </div>
      <div class="form-group">
        <label>Address:</label>
        <input v-model="nhanvien.DiaChi" placeholder="Enter Address" />
      </div>
      <div class="form-group">
        <label>Phone:</label>
        <input v-model="nhanvien.SoDienThoai" placeholder="Enter Phone Number" />
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Add</button>
        <button type="button" @click="cancel" class="btn btn-secondary">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nhanvien: {
        MSNV: "", // Mã nhân viên
        HoTenNV: "", // Họ tên nhân viên
        ChucVu: "", // Chức vụ
        DiaChi: "", // Địa chỉ
        SoDienThoai: "", // Số điện thoại
      },
    };
  },
  methods: {
    async addNhanvien() {
      try {
        await axios.post("/api/nhanvien", this.nhanvien);
        this.$router.push("/nhanvien");
      } catch (error) {
        console.error("Error adding employee:", error);
        alert("Failed to add employee. Please try again.");
      }
    },
    cancel() {
      this.$router.push("/nhanvien");
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-size: 1rem;
  margin-bottom: 5px;
  display: block;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group input:focus {
  border-color: #007bff;
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
