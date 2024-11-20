<template>
  <div>

    <!-- Các component thực tế -->
    <AppHeaderDocGia v-if="!isAuthenticated || role === 'docgia'" />
    <AppHeaderNhanVien v-else-if="role === 'nhanvien'" />
  </div>
</template>

<script>
import AppHeaderDocGia from "./AppHeader_Docgia.vue";
import AppHeaderNhanVien from "./AppHeader_Nhanvien.vue";

export default {
  components: {
    AppHeaderDocGia,
    AppHeaderNhanVien,
  },
  data() {
    return {
      token: null, // Lưu trạng thái token
      role: null, // Khởi tạo role là null
    };
  },
  computed: {
    isAuthenticated() {
      return !!this.token; // Kiểm tra token để xác nhận người dùng đã đăng nhập
    },
  },
  methods: {
    updateRoleAndToken() {
      this.role = localStorage.getItem("role") || "docgia"; // Lấy role từ localStorage
      this.token = localStorage.getItem("token"); // Lấy token từ localStorage
    },
    saveTokenToLocalStorage(token, role) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      this.token = token; // Đồng bộ với biến reactive
      this.role = role;
    },
  },
  mounted() {
    this.updateRoleAndToken(); // Cập nhật khi component được mount
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.updateRoleAndToken(); // Cập nhật role khi thay đổi route
      },
    },
  },
};
</script>
