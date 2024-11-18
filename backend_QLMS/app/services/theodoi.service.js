const { ObjectId } = require("mongodb");

class TheodoiService {
  constructor(client) {
    this.TheoDoiMuonSach = client.db().collection("TheoDoiMuonSach"); // Liên kết với collection TheoDoiMuonSach
  }

  // Chuẩn hóa dữ liệu theo dõi
  extractTheodoiData(payload) {
    const theodoi = {
      MaDocGia: payload.MaDocGia,
      MaSach: payload.MaSach,
      NgayMuon: payload.NgayMuon,
      NgayTra: payload.NgayTra,
    };

    // Loại bỏ các trường không được định nghĩa
    Object.keys(theodoi).forEach(
      (key) => theodoi[key] === undefined && delete theodoi[key]
    );

    return theodoi;
  }

  // Thêm một bản ghi theo dõi mới
  async create(payload) {
    const theodoiData = this.extractTheodoiData(payload);
    const result = await this.TheoDoiMuonSach.insertOne(theodoiData);
    return result.insertedId; // Trả về ID của bản ghi vừa thêm
  }

  // Lấy danh sách tất cả các bản ghi theo dõi
  async getAll() {
    return await this.TheoDoiMuonSach.find({}).toArray();
  }

  // Lấy thông tin theo ID
  async getById(id) {
    return await this.TheoDoiMuonSach.findOne({ _id: new ObjectId(id) });
  }

  // Cập nhật thông tin theo ID
  async updateById(id, payload) {
    const updateData = this.extractTheodoiData(payload);
    const result = await this.TheoDoiMuonSach.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    return result.modifiedCount; // Trả về số bản ghi đã cập nhật
  }

  // Xóa một bản ghi theo ID
  async deleteById(id) {
    const result = await this.TheoDoiMuonSach.deleteOne({
      _id: new ObjectId(id),
    });
    return result.deletedCount; // Trả về số bản ghi đã xóa
  }
}

module.exports = TheodoiService;
