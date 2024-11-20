<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container-fluid">
      <a href="/" class="navbar-brand"> 📚 Quản lý mượn sách </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{ name: 'sach' }" class="nav-link">
              <i class="fa-solid fa-book me-2"></i>Sách
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'muonsach' }" class="nav-link">
              <i class="fa-solid fa-book-open me-2"></i>Phiếu mượn
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'docgia' }" class="nav-link">
              <i class="fa-solid fa-users me-2"></i>Độc giả
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'nhanvienList' }" class="nav-link">
              <i class="fa-solid fa-user-tie me-2"></i>Nhân viên
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'nhaxuatban' }" class="nav-link">
              <i class="fa-solid fa-building me-2"></i>NXB
            </router-link>
          </li>
        </ul>
        <!-- Tab đăng nhập -->
        <ul class="navbar-nav ms-auto">
          <li v-if="!isAuthenticated" class="nav-item">
            <router-link :to="{ name: 'login' }" class="nav-link">
              <i class="fa-solid fa-sign-in-alt me-2"></i>Đăng nhập
            </router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <a href="#" class="nav-link" @click="logout">
              <i class="fa-solid fa-sign-out-alt me-2"></i>Đăng xuất
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <button class="scroll-to-top" @click="scrollToTop">
    <i class="fa-solid fa-arrow-up"></i>
  </button>
</template>
<style scoped>
/* Navbar styling */
.navbar {
  padding: 1rem 1.5rem;
  position: sticky; /* Fix the navbar at the top */
  top: 0;
  z-index: 1030;
  background-color: #343a40; /* Darker background for the navbar */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Enhanced shadow */
}

/* Navbar links container */
.nav-link {
  font-size: 1.1rem;
  font-weight: 500;
  color: #f8f9fa; /* Light color for better contrast */
  transition: all 0.3s ease-in-out; /* Smooth transition for hover effects */
  padding: 0.5rem; /* More padding for a better clickable area */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center; /* Center text under icon */
}

.nav-link i {
  font-size: 1.5rem; /* Larger icon for better visibility */
  margin-bottom: 0.5rem; /* Space between icon and text */
}

.nav-link:hover {
  background-color: #848484; /* Blue background on hover */
  color: white; /* Change text color on hover */
}

.navbar-brand {
  font-weight: 700;
  font-size: 1.4rem; /* Slightly larger for a more prominent title */
  color: #ffffff; /* White for brand text */
}

.navbar-toggler-icon {
  background-color: #ffffff; /* White icon for better visibility */
}

/* Navbar item (small screen) */
.navbar-nav {
  margin-left: auto;
}

.navbar-nav .nav-item {
  margin-left: 1rem;
}

/* Scroll to Top button */
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1050;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.scroll-to-top.show {
  opacity: 1;
  visibility: visible;
}

/* Responsive Design */
@media (max-width: 991px) {
  .navbar {
    padding: 1rem;
  }

  .navbar-brand {
    font-size: 1.2rem;
  }

  .scroll-to-top {
    width: 50px;
    height: 50px;
  }
}
</style>

<script>
export default {
  computed: {
    // Kiểm tra xem token có trong localStorage hay không
    isAuthenticated() {
      return !!localStorage.getItem("token"); // Kiểm tra trực tiếp từ localStorage
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    logout() {
      // In giá trị role và isAuthenticated trước khi xóa
      console.log("Role trước khi logout:", localStorage.getItem("role"));
      console.log(
        "isAuthenticated trước khi logout:",
        !!localStorage.getItem("token")
      );

      // Xóa toàn bộ dữ liệu trong localStorage
      localStorage.clear();

      // Chuyển hướng về trang login
      this.$router.push({ name: "login" });

      setTimeout(() => {
        // In giá trị role và isAuthenticated sau khi xóa
        console.log("Role sau khi logout:", localStorage.getItem("role"));
        console.log(
          "isAuthenticated sau khi logout:",
          !!localStorage.getItem("token")
        );

        // Cập nhật lại giao diện
        this.$forceUpdate();
      }, 100);
    },
  },
  mounted() {
    console.log("AppHeaderNhanVien mounted!");
  },
};
</script>
