const { ObjectId } = require("mongodb");

class NhaxuatbanService {
  constructor(client) {
    this.NhaXuatBan = client.db().collection("NhaXuatBan"); // Liên kết với collection NhaXuatBan
  }

  // Chuẩn hóa dữ liệu nhà xuất bản
  extractNhaxuatbanData(payload) {
    const nhaxuatban = {
      MaNXB: payload.MaNXB,
      TenNXB: payload.TenNXB,
      DiaChi: payload.DiaChi,
    };

    // Loại bỏ các trường không được định nghĩa
    Object.keys(nhaxuatban).forEach(
      (key) => nhaxuatban[key] === undefined && delete nhaxuatban[key]
    );

    return nhaxuatban;
  }

  // Thêm một nhà xuất bản mới
  async create(payload) {
    const nhaxuatbanData = this.extractNhaxuatbanData(payload);
    const result = await this.NhaXuatBan.insertOne(nhaxuatbanData);
    return result.insertedId; // Trả về ID của nhà xuất bản vừa thêm
  }

  // Lấy danh sách tất cả nhà xuất bản
  async getAll() {
    return await this.NhaXuatBan.find({}).toArray();
  }

  // Lấy thông tin nhà xuất bản theo ID
  async getById(id) {
    return await this.NhaXuatBan.findOne({ _id: new ObjectId(id) });
  }

  // Cập nhật thông tin nhà xuất bản
  async updateById(id, payload) {
    const updateData = this.extractNhaxuatbanData(payload);
    const result = await this.NhaXuatBan.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    return result.modifiedCount; // Trả về số bản ghi đã cập nhật
  }

  // Xóa một nhà xuất bản theo ID
  async deleteById(id) {
    const result = await this.NhaXuatBan.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount; // Trả về số bản ghi đã xóa
  }
}

module.exports = NhaxuatbanService;
