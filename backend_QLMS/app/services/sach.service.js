const { ObjectId } = require("mongodb");

class SachService {
  constructor(client) {
    this.Sach = client.db().collection("Sach"); // Liên kết với collection Sach
  }

  // Chuẩn hóa dữ liệu sách
  extractSachData(payload) {
    const sach = {
      MaSach: payload.MaSach,
      TenSach: payload.TenSach,
      DonGia: payload.DonGia,
      SoQuyen: payload.SoQuyen,
      NamXuatBan: payload.NamXuatBan,
      MaNXB: payload.MaNXB,
      NguonGoc: payload.NguonGoc,
      AnhBia: payload.AnhBia,
    };

    // Loại bỏ các trường không được định nghĩa
    Object.keys(sach).forEach(
      (key) => sach[key] === undefined && delete sach[key]
    );

    return sach;
  }

  // Thêm một sách mới
  async create(payload) {
    const sachData = this.extractSachData(payload);
    const result = await this.Sach.insertOne(sachData);
    return result.insertedId; // Trả về ID của sách vừa thêm
  }

  // Lấy danh sách tất cả sách
  async getAll() {
    return await this.Sach.find({}).toArray();
  }

  // Lấy thông tin sách theo ID
  async getById(id) {
    return await this.Sach.findOne({ _id: new ObjectId(id) });
  }

  // Cập nhật thông tin sách
  async updateById(id, payload) {
    const updateData = this.extractSachData(payload);
    const result = await this.Sach.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    return result.modifiedCount; // Trả về số bản ghi đã cập nhật
  }

  // Xóa một sách theo ID
  async deleteById(id) {
    const result = await this.Sach.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount; // Trả về số bản ghi đã xóa
  }
}

module.exports = SachService;
