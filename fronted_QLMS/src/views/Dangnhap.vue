<template>
  <div class="auth-container">
    <h1 class="auth-title">Login</h1>
    <form @submit.prevent="login">
      <div class="form-group" v-if="form.Role === 'docgia'">
        <label for="maDocGia">Mã độc giả</label>
        <input
          type="text"
          id="maDocGia"
          v-model="form.MaDocGia"
          class="form-control"
          placeholder="Enter your reader ID"
          required
        />
      </div>
      <div class="form-group" v-if="form.Role === 'nhanvien'">
        <label for="msnv">Mã nhân viên</label>
        <input
          type="text"
          id="msnv"
          v-model="form.MSNV"
          class="form-control"
          placeholder="Enter your employee ID"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          v-model="form.Password"
          class="form-control"
          placeholder="Enter your password"
          required
        />
      </div>
      <div class="form-group">
        <label for="role">Vai trò</label>
        <select id="role" v-model="form.Role" class="form-control" required>
          <option value="docgia">Độc giả</option>
          <option value="nhanvien">Nhân viên</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <p class="auth-footer">
      Don't have an account?
      <router-link :to="{ name: 'register' }">Register here</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        MSNV: "", // Nếu là nhân viên
        MaDocGia: "", // Nếu là độc giả
        Password: "",
        Role: "docgia", // Giá trị mặc định là "docgia"
      },
    };
  },
  methods: {
  async login() {
    try {
      const endpoint =
        this.form.Role === "docgia"
          ? "/api/docgia/login"
          : "/api/nhanvien/login";

      const payload =
        this.form.Role === "docgia"
          ? { MaDocGia: this.form.MaDocGia, Password: this.form.Password }
          : { MSNV: this.form.MSNV, Password: this.form.Password };

      const response = await axios.post(endpoint, payload);

      // Lưu token và role
     
    const { token, user } = response.data;
        
      localStorage.setItem("token", token);
      localStorage.setItem("role", this.form.Role);
     // Lưu tên theo vai trò
    localStorage.setItem("username", this.form.Role === "docgia" ? user.name : user.HoTenNV);
      if (this.form.Role === "docgia") {
        console.log("User data:", user);
       if (user.maDocGia) {
  localStorage.setItem("MaDocGia", user.maDocGia); // Lưu mã độc giả vào localStorage
} else {
  console.error("MaDocGia is undefined or null");
}
      }
      

      alert("Đăng nhập thành công!");
       // Điều hướng dựa trên vai trò
      if (this.form.Role === "docgia") {
        this.$router.push("/sach/docgia"); // Trang dành cho độc giả
      } else {
        this.$router.push("/"); // Trang chính dành cho nhân viên (cập nhật URL nếu cần)
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error.response?.data || error.message);
      alert("Thông tin đăng nhập không chính xác!");
    }
  },
},

};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.auth-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-primary {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}

.auth-footer {
  text-align: center;
  margin-top: 20px;
}

.btn-primary:hover {
  background-color: #000000;
}
.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}


</style>
