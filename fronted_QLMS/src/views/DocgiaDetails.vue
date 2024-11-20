<template>
  <div class="container mt-4">
    <div class="card shadow-sm p-4 mb-4 rounded">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">📖 Thông tin chi tiết độc giả</h2>
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <strong>Mã Độc Giả:</strong>
            <span>{{ docgia.MaDocGia }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <strong>Họ Lót:</strong>
            <span>{{ docgia.HoLot }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <strong>Tên:</strong>
            <span>{{ docgia.Ten }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <strong>Ngày Sinh:</strong>
            <span>{{ docgia.NgaySinh }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <strong>Phái:</strong>
            <span :class="['badge', docgia.Phai === 'Nam' ? 'bg-primary' : 'bg-danger']">
              {{ docgia.Phai }}
            </span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <strong>Địa Chỉ:</strong>
            <span>{{ docgia.DiaChi }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <strong>Điện Thoại:</strong>
            <span>{{ docgia.DienThoai }}</span>
          </li>
        </ul>
      </div>
    </div>
    <button class="btn btn-secondary w-100" @click="$router.push({ name: 'docgia' })">
    Quay lại danh sách
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      docgia: {},
    };
  },
  methods: {
    async fetchDocgia(id) {
      try {
        const response = await axios.get(`/api/docgia/${id}`);
        this.docgia = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy thông tin độc giả:", error);
        alert("Không thể lấy thông tin độc giả, vui lòng thử lại.");
      }
    },
    formatNgaySinh(date) {
      const options = {day: '2-digit', month: '2-digit' ,year: 'numeric'};
      return new Date(date).toLocaleDateString('vi-VN', options);
    },
  },
  mounted() {
    this.fetchDocgia(this.$route.params.id);
  },
};
</script>

<style scoped>
.card {
  background-color: #f8f9fa;
  border-radius: 12px;
}

.card-title {
  font-weight: bold;
  color: #343a40;
}

.list-group-item {
  font-size: 1.1rem;
}

.badge {
  font-size: 1rem;
  padding: 0.4em 0.6em;
}

.btn-secondary {
  font-size: 1.1rem;
  padding: 0.6em;
  margin-top: 20px;
}
</style>
