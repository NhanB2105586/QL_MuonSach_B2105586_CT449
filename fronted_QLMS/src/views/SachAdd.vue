<template>
  <div class="container mt-4">
    <BookForm @save="handleSave" @cancel="goBack" />
  </div>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import axios from "axios";

export default {
  components: {
    BookForm,
  },
  methods: {
    async handleSave(book) {
      try {
        await axios.post("http://localhost:3000/api/sach", book);
        alert("Thêm sách thành công!");
        this.$router.push({ name: "sach" });
      } catch (error) {
        console.error("Lỗi khi thêm sách:", error);
        alert("Có lỗi xảy ra khi thêm sách.");
      }
    },
    goBack() {
      this.$router.push({ name: "sach" });
    },
  },
};
</script>
