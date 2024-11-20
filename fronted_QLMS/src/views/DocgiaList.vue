<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>📚 QUẢN LÍ ĐỘC GIẢ</h2>
      <button class="btn btn-success" @click="goToCreate"><h3>+&nbsp;</h3> Thêm độc giả mới</button>
    </div>

    <div v-if="docgias.length > 0">
      <table class="table table-striped table-hover align-middle shadow-sm rounded">
        <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Mã Độc Giả</th>
            <th scope="col">Họ Lót</th>
            <th scope="col">Tên</th>
            <th scope="col">Ngày Sinh</th>
            <th scope="col">Phái</th>
            <th scope="col">Địa Chỉ</th>
            <th scope="col">Điện Thoại</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(docgia, index) in docgias" :key="docgia._id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ docgia.MaDocGia }}</td>
            <td>{{ docgia.HoLot }}</td>
            <td>{{ docgia.Ten }}</td>
            <td>{{ docgia.NgaySinh }}</td>
            <td>
              <span :class="['badge', docgia.Phai === 'Nam'  ? 'bg-primary' : 'bg-danger']" style="color: white;">
                {{ docgia.Phai }} 
              </span>
            </td>
            <td>{{ docgia.DiaChi }}</td>
            <td>{{ docgia.DienThoai }}</td>
            <td>
              <button class="btn btn-info btn-sm me-2 mb-1" @click="viewDocgia(docgia._id)" style="width: 80px;">
                👁️ Xem
              </button>
              <button class="btn btn-warning btn-sm me-2 mb-1 " @click="editDocgia(docgia._id)" style="width: 80px;">
                ✏️ Sửa
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteDocgia(docgia._id)" style="width: 80px;">
                🗑️ Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="alert alert-info text-center">
      📄 Hiện chưa có độc giả nào trong danh sách.
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      docgias: [],
    };
  },
  methods: {
    async fetchDocgias() {
      try {
        const response = await axios.get("/api/docgia");
        this.docgias = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách độc giả:", error);
      }
    },
    goToCreate() {
      this.$router.push({ name: "createDocgia" });
    },
    viewDocgia(id) {
      this.$router.push({ name: "viewDocgia", params: { id } });
    },
    editDocgia(id) {
      this.$router.push({ name: "editDocgia", params: { id } });
    },
    async deleteDocgia(id) {
      if (confirm("Bạn có chắc chắn muốn xóa độc giả này?")) {
        try {
          await axios.delete(`/api/docgia/${id}`);
          this.fetchDocgias();
        } catch (error) {
          console.error("Lỗi khi xóa độc giả:", error);
          alert("Xóa độc giả thất bại, vui lòng thử lại.");
        }
      }
    },
    formatNgaySinh(date) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString('vi-VN', options);
    },
  },
  mounted() {
    this.fetchDocgias();
  },
};
</script>

<style scoped>
h2 {
  font-weight: bold;
  color: #343a40;
}

.table {
  border-radius: 8px;
}

.table-hover tbody tr:hover {
  background-color: #c4dcf4;
}

.btn {
  display: flex;
  align-items: center;
}

.btn-info {
  color: #fff;
}

.alert {
  margin-top: 20px;
  font-size: 1.1rem;
}

.badge {
  font-size: 0.9rem;
  padding: 0.4em 0.6em;
}
</style>
