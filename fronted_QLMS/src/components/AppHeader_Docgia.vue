<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container-fluid">
      <a href="/sach/docgia" class="navbar-brand">
        <i class="fa-solid fa-book me-2"></i> 📚 Quản lý mượn sách
      </a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'sach_docgia' }" class="nav-link">
              <i class="fa-solid fa-book me-2"></i>Sách
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'lichsu' }" class="nav-link">
              <i class="fa-solid fa-clock-rotate-left me-2"></i>Lịch sử mượn
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'login' }" class="nav-link">
              <i class="fa-solid fa-sign-in-alt me-2"></i>Đăng nhập
            </router-link>
          </li>
          <li
            v-if="isLoggedIn"
            class="nav-item dropdown"
            @mouseover="showDropdown = true"
            @mouseleave="showDropdown = false"
          >
            <span class="nav-link" style="cursor: pointer">
              <i class="fa-solid fa-user me-2"></i>Xin chào, {{ username }}
            </span>
            <div
              v-if="showDropdown"
              class="dropdown-menu show"
              aria-labelledby="navbarDropdown"
            >
              <router-link to="/profile" class="dropdown-item">
                Hồ sơ
              </router-link>
              <a href="#" class="dropdown-item" @click="logout">Đăng xuất</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
      isLoggedIn: !!localStorage.getItem("token"),
      username: localStorage.getItem("username") || "Người dùng", // Sử dụng giá trị trong localStorage
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.isLoggedIn = false;
      this.username = "Người dùng";
      this.$router.push({ name: "login" });
    },
    login() {
      // Giả sử đây là phương thức bạn gọi khi đăng nhập thành công
      localStorage.setItem("token", "your-token");
      localStorage.setItem("username", "Người dùng"); // Lưu username vào localStorage
      this.isLoggedIn = true;
      this.username = "Người dùng"; // Cập nhật ngay trong component

      this.$router.push({ name: "home" }); // Chuyển hướng về trang chính
    },
  },
  mounted() {
    this.isLoggedIn = !!localStorage.getItem("token");
    this.username = localStorage.getItem("username") || "Người dùng";

    window.addEventListener("storage", () => {
      // Đồng bộ trạng thái khi localStorage thay đổi
      this.isLoggedIn = !!localStorage.getItem("token");
      this.username = localStorage.getItem("username") || "Người dùng";
    });
  },
};
</script>

<style scoped>
.navbar {
  background-color: #343a40 !important;
  padding: 10px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  display: flex;
  align-items: center;
}

.navbar-brand i {
  font-size: 1.8rem;
}

.nav-link {
  color: #fff !important;
  font-size: 1.1rem;
  padding: 10px 15px;
}

.nav-link:hover {
  color: #ddd !important;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}

.navbar-nav .nav-item {
  margin-left: 15px;
}

.navbar-nav .nav-item.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #343a40;
  border-radius: 5px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  min-width: 200px;
  z-index: 1000;
}

.dropdown-item {
  color: #fff;
  padding: 10px 20px;
  font-size: 1.1rem;
}

.dropdown-item:hover {
  background-color: #495057;
  color: #fff;
  text-decoration: none;
}

.navbar-nav .nav-item .nav-link i {
  font-size: 1.4rem;
}

.navbar-nav .ms-auto {
  margin-left: auto;
}
</style>
