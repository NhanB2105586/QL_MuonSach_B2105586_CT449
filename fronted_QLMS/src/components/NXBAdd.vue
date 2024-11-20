<template>
  <div class="container">
    <h1>Thêm NXB mới</h1>
    <form @submit.prevent="addPublisher" class="form-container">
      <div class="form-group">
        <label for="MaNXB">Mã NXB:</label>
        <input v-model="publisher.MaNXB" id="MaNXB" required />
      </div>
      <div class="form-group">
        <label for="TenNXB">Tên:</label>
        <input v-model="publisher.TenNXB" id="TenNXB" required />
      </div>
      <div class="form-group">
        <label for="DiaChi">Địa chỉ:</label>
        <input v-model="publisher.DiaChi" id="DiaChi" required />
      </div>
      <div class="form-buttons">
        <button type="submit" class="btn btn-success">Thêm</button>
        <button type="button" class="btn btn-secondary" @click="cancel">Hủy</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      publisher: {
        MaNXB: "",
        TenNXB: "",
        DiaChi: "",
      },
    };
  },
  methods: {
    async addPublisher() {
      await axios.post("/api/nhaxuatban", this.publisher);
      this.$router.push("/nhaxuatban");
    },
    cancel() {
      this.$router.push("/nhaxuatban");
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 16px;
  margin-bottom: 5px;
  color: #555;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}

input:focus {
  border-color: #66afe9;
  outline: none;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
