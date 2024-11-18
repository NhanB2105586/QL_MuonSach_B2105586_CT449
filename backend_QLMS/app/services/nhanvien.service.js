const { ObjectId } = require("mongodb");

class NhanvienService {
  constructor(client) {
    this.NhanVien = client.db().collection("NhanVien"); // Liên kết với collection NhanVien
  }

  // Chuẩn hóa dữ liệu nhân viên
  extractNhanvienData(payload) {
    const nhanvien = {
      MSNV: payload.MSNV,
      HoTenNV: payload.HoTenNV,
      Password: payload.Password,
      ChucVu: payload.ChucVu,
      DiaChi: payload.DiaChi,
      SoDienThoai: payload.SoDienThoai,
    };

    // Loại bỏ các trường không được định nghĩa
    Object.keys(nhanvien).forEach(
      (key) => nhanvien[key] === undefined && delete nhanvien[key]
    );

    return nhanvien;
  }

  // Thêm một nhân viên mới
  async create(payload) {
    const nhanvienData = this.extractNhanvienData(payload);
    const result = await this.NhanVien.insertOne(nhanvienData);
    return result.insertedId; // Trả về ID của nhân viên vừa thêm
  }

  // Lấy danh sách tất cả nhân viên
  async getAll() {
    return await this.NhanVien.find({}).toArray();
  }

  // Lấy thông tin nhân viên theo ID
  async getById(id) {
    return await this.NhanVien.findOne({ _id: new ObjectId(id) });
  }

  // Cập nhật thông tin nhân viên
  async updateById(id, payload) {
    const updateData = this.extractNhanvienData(payload);
    const result = await this.NhanVien.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    return result.modifiedCount; // Trả về số bản ghi đã cập nhật
  }

  // Xóa một nhân viên theo ID
  async deleteById(id) {
    const result = await this.NhanVien.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount; // Trả về số bản ghi đã xóa
  }
}

module.exports = NhanvienService;
