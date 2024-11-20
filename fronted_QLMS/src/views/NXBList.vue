<template>
  <div class="container">
    <h1>QUẢN LÍ NHÀ XUẤT BẢN</h1>
    <button class="btn btn-primary" @click="navigateToAdd">Thêm NXB mới</button>
    <table class="table">
      <thead>
        <tr>
          <th>MÃ NXB</th>
          <th>TÊN </th>
          <th>ĐẠI CHỈ</th>
          <th>HÀNH ĐỘNG</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="publisher in publishers" :key="publisher._id">
          <td>{{ publisher.MaNXB }}</td>
          <td>{{ publisher.TenNXB }}</td>
          <td>{{ publisher.DiaChi }}</td>
          <td>
            <button class="btn btn-secondary" @click="editPublisher(publisher._id)">Edit</button>
            <button class="btn btn-danger" @click="deletePublisher(publisher._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      publishers: [],
    };
  },
  methods: {
    async fetchData() {
      const response = await axios.get("/api/nhaxuatban");
      this.publishers = response.data;
    },
    navigateToAdd() {
      this.$router.push("/nhaxuatban/add");
    },
    editPublisher(id) {
      this.$router.push(`/nhaxuatban/edit/${id}`);
    },
    async deletePublisher(id) {
      if (confirm("Are you sure you want to delete this publisher?")) {
        await axios.delete(`/api/nhaxuatban/${id}`);
        this.fetchData();
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 30px;
}

.btn {
  padding: 8px 16px;
  margin: 5px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-primary {
  background-color: #04a12e;
  color: #fff;
}

.btn-primary:hover {
  background-color: #065614;
  transform: scale(1.05);
}

.btn-secondary {
  background-color: #28a745;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c82333;
  transform: scale(1.05);
}

.table {
  width: 100%;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-collapse: collapse;
}

.table th, .table td {
  text-align: left;
  padding: 12px 15px;
  border: 1px solid #ddd;
  font-size: 1rem;
}

.table th {
  background-color: #343a40;
  color: #fff;
  text-transform: uppercase;
}

.table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

.table tbody tr:hover {
  background-color: #e9ecef;
  cursor: pointer;
}

.table td button {
  width: 90px;
  margin-right: 10px;
}

.table td button:last-child {
  margin-right: 0;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .btn {
    padding: 6px 12px;
    font-size: 0.9rem;
  }

  .table th, .table td {
    padding: 8px;
    font-size: 0.9rem;
  }
}

</style>
