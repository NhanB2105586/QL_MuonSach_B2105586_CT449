<template>
  <div class="container mt-4">
    <BookForm :book="book" :isEdit="true" @save="handleSave" @cancel="goBack" />
  </div>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import axios from "axios";

export default {
  components: {
    BookForm,
  },
  data() {
    return {
      book: null,
    };
  },
  async created() {
    const bookId = this.$route.params.id;
    try {
      const response = await axios.get(`http://localhost:3000/api/sach/${bookId}`);
      this.book = response.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sách:", error);
      alert("Không thể lấy thông tin sách.");
      this.$router.push({ name: "sach" });
    }
  },
  methods: {
   async handleSave(book) {
  try {
    console.log("ID sách:", book._id);
    console.log("Dữ liệu gửi đi:", book);
    console.log(`URL request: http://localhost:3000/api/sach/${book._id}`);

    await axios.put(`http://localhost:3000/api/sach/${book._id}`, book, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Cập nhật sách thành công!");
    this.$router.push({ name: "sach" });
  } catch (error) {
    console.error("Lỗi khi cập nhật sách:", error.response?.data || error.message);
    alert("Có lỗi xảy ra khi cập nhật sách.");
  }
}
,
    goBack() {
      this.$router.push({ name: "sach" });
    },
  },
};
</script>
