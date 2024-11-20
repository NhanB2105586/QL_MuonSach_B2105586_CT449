<template>
  <div class="container mt-4">
    <h2>{{ isEdit ? "Chỉnh sửa độc giả" : "Thêm mới độc giả" }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label>Mã Độc Giả</label>
        <input
          v-model="docgia.MaDocGia"
          class="form-control"
          :class="{ 'is-invalid': maDocGiaError }"
          @blur="checkMaDocGia"
          required
        />
        <div v-if="maDocGiaError" class="invalid-feedback">
          Mã độc giả đã tồn tại, vui lòng chọn mã khác.
        </div>
      </div>
      <div class="mb-3">
        <label>Họ Lót</label>
        <input v-model="docgia.HoLot" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Tên</label>
        <input v-model="docgia.Ten" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Ngày Sinh</label>
        <input v-model="docgia.NgaySinh" type="date" class="form-control" />
      </div>
      <div class="mb-3">
        <label>Phái</label>
        <select v-model="docgia.Phai" class="form-control">
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>
      <div class="mb-3">
        <label>Địa Chỉ</label>
        <input v-model="docgia.DiaChi" class="form-control" />
      </div>
      <div class="mb-3">
        <label>Điện Thoại</label>
        <input v-model="docgia.DienThoai" class="form-control" />
      </div>
      <button class="btn btn-primary" :disabled="maDocGiaError">
        {{ isEdit ? "Cập nhật" : "Lưu" }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      docgia: {
        MaDocGia: "",
        HoLot: "",
        Ten: "",
        NgaySinh: "",
        Phai: "",
        DiaChi: "",
        DienThoai: "",
      },
      isEdit: false,
      maDocGiaError: false,
      originalMaDocGia: "",
    };
  },
  methods: {
    async fetchDocgia(id) {
      try {
        const response = await axios.get(`/api/docgia/${id}`);
        const docgiaData = response.data;

        // Chuyển đổi ngày sinh sang định dạng YYYY-MM-DD nếu cần
        if (docgiaData.NgaySinh) {
          const [day, month, year] = docgiaData.NgaySinh.split("/");
          docgiaData.NgaySinh = `${year}-${month}-${day}`; // Giả sử API trả về DD/MM/YYYY
        }

        this.docgia = docgiaData;
        this.originalMaDocGia = docgiaData.MaDocGia;
      } catch (error) {
        console.error("Error fetching docgia:", error);
      }
    },
    async checkMaDocGia() {
      // Kiểm tra nếu là thêm mới hoặc mã độc giả đã thay đổi khi chỉnh sửa
      if (
        !this.isEdit ||
        (this.isEdit && this.docgia.MaDocGia !== this.originalMaDocGia)
      ) {
        try {
          const response = await axios.get(
            `/api/docgia/check/${this.docgia.MaDocGia}`
          );
          this.maDocGiaError = response.data.exists;
        } catch (error) {
          console.error("Error checking MaDocGia:", error);
          this.maDocGiaError = false;
        }
      } else {
        // Nếu mã độc giả không thay đổi khi chỉnh sửa
        this.maDocGiaError = false;
      }
    },
    async handleSubmit() {
      try {
        // Chuyển đổi ngày sinh từ yyyy-MM-dd thành dd-MM-yyyy trước khi gửi
        if (this.docgia.NgaySinh) {
          const [year, month, day] = this.docgia.NgaySinh.split("-");
          this.docgia.NgaySinh = `${day}-${month}-${year}`;
        }

        if (this.isEdit) {
          // Kiểm tra mã độc giả trước khi cập nhật
          await this.checkMaDocGia();
          if (!this.maDocGiaError) {
            await axios.put(
              `/api/docgia/${this.$route.params.id}`,
              this.docgia
            );
            this.$router.push({ name: "docgia" });
          }
        } else {
          // Kiểm tra mã độc giả trước khi thêm mới
          await this.checkMaDocGia();
          if (!this.maDocGiaError) {
            await axios.post("/api/docgia", this.docgia);
            this.$router.push({ name: "docgia" });
          }
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.isEdit = true;
      this.fetchDocgia(this.$route.params.id);
    }
  },
};
</script>
