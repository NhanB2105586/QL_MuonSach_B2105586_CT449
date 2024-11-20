<template>
  <div class="auth-container">
    <h1 class="auth-title">Register</h1>
    <form @submit.prevent="register">
      <div class="form-group">
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
      <div class="form-group">
        <label for="hoLot">Họ và tên đệm</label>
        <input
          type="text"
          id="hoLot"
          v-model="form.HoLot"
          class="form-control"
          placeholder="Enter your last name"
          required
        />
      </div>
      <div class="form-group">
        <label for="ten">Tên</label>
        <input
          type="text"
          id="ten"
          v-model="form.Ten"
          class="form-control"
          placeholder="Enter your first name"
          required
        />
      </div>
      <div class="form-group">
        <label for="ngaySinh">Ngày sinh</label>
        <input
          type="date"
          id="ngaySinh"
          v-model="form.NgaySinh"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="phai">Giới tính</label>
        <select
          id="phai"
          v-model="form.Phai"
          class="form-control"
          required
        >
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
      </div>
      <div class="form-group">
        <label for="diaChi">Địa chỉ</label>
        <input
          type="text"
          id="diaChi"
          v-model="form.DiaChi"
          class="form-control"
          placeholder="Enter your address"
        />
      </div>
      <div class="form-group">
        <label for="dienThoai">Số điện thoại</label>
        <input
          type="text"
          id="dienThoai"
          v-model="form.DienThoai"
          class="form-control"
          placeholder="Enter your phone number"
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
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <p class="auth-footer">
      Already have an account? <router-link :to="{ name: 'login' }">Login here</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        MaDocGia: "",
        HoLot: "",
        Ten: "",
        NgaySinh: "",
        Phai: "Nam", // Giá trị mặc định
        DiaChi: "",
        DienThoai: "",
        Password: "",
      },
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post("/api/docgia/register", this.form);
        alert("Registration successful!");
        this.$router.push("/login");
      } catch (error) {
        console.error("Error during registration:", error.response?.data || error.message);
        alert("Registration failed! Please check your input.");
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
</style>
