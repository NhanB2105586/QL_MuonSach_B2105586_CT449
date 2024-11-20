<template>
  <div v-if="book" class="book-form">
    <h2>{{ isEdit ? "Chỉnh sửa Sách" : "Thêm mới Sách" }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label>Mã Sách</label>
        <input v-model="book.MaSach" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Tên Sách</label>
        <input v-model="book.TenSach" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Đơn Giá</label>
        <input
          v-model="book.DonGia"
          type="number"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label>Số Quyển</label>
        <input
          v-model="book.SoQuyen"
          type="number"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label>Năm Xuất Bản</label>
        <input
          v-model="book.NamXuatBan"
          type="number"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label>Mã NXB</label>
        <input v-model="book.MaNXB" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Ảnh Bìa</label>
        <input type="file" class="form-control" @change="handleFileUpload" />
        <img
          v-if="book.AnhBia"
          :src="getFullImageUrl(book.AnhBia)"
          alt="Ảnh Bìa"
          class="preview-image"
        />
      </div>
      <button class="btn btn-primary">{{ isEdit ? "Cập nhật" : "Lưu" }}</button>
      <button
        type="button"
        class="btn btn-secondary ms-2"
        @click="$emit('cancel')"
      >
        Hủy
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    book: {
      type: Object,
      default: () => ({
        MaSach: "",
        TenSach: "",
        DonGia: 0,
        SoQuyen: 0,
        NamXuatBan: "",
        MaNXB: "",
        AnhBia: "",
      }),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleSubmit() {
      if (!this.book.AnhBia) {
        alert("Vui lòng tải ảnh lên trước khi lưu.");
        return;
      }
      this.$emit("save", this.book);
    },
    getFullImageUrl(relativePath) {
      // Thêm domain gốc vào đường dẫn tương đối
      return `http://localhost:3000${relativePath}`;
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) {
        console.error("Không có file nào được chọn.");
        return;
      }

      const formData = new FormData();
      formData.append("AnhBia", file);

      console.log("Đang upload file:", file);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/upload/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Lưu chỉ đường dẫn tương đối
        console.log("Phản hồi từ server:", response.data);
        this.book.AnhBia = response.data.url;
      } catch (error) {
        console.error("Lỗi khi tải ảnh lên:", error.response);
        alert(
          `Có lỗi xảy ra: ${error.response?.data?.message || "Không rõ lỗi"}`
        );
      }
    },
  },
};
</script>

<style scoped>
a .book-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
}

button {
  margin-top: 10px;
}

.preview-image {
  width: 200px;
  height: 350px;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
