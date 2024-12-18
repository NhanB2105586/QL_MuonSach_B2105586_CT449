const { ObjectId } = require("mongodb"); // Import ObjectId từ mongodb để sử dụng khi cần truy vấn theo ID

class DocgiaService {
  constructor(client) {
    // Hàm khởi tạo nhận vào đối tượng client kết nối với MongoDB
    this.Docgia = client.db().collection("Docgia"); // Liên kết tới collection "Docgia" trong cơ sở dữ liệu
  }

  // Chuẩn hóa dữ liệu độc giả
  // Chuẩn hóa dữ liệu độc giả
  extractDocgiaData(payload) {
    const docgia = {
      MaDocGia: payload.MaDocGia,
      HoLot: payload.HoLot,
      Ten: payload.Ten,
      NgaySinh: payload.NgaySinh,
      Phai: payload.Phai,
      DiaChi: payload.DiaChi,
      DienThoai: payload.DienThoai,
      Password: payload.Password, // Thêm trường Password
    };

    // Loại bỏ các trường không được định nghĩa
    Object.keys(docgia).forEach(
      (key) => docgia[key] === undefined && delete docgia[key]
    );

    return docgia;
  }

  // Xác thực thông tin đăng nhập
  async authenticate(maDocGia, password) {
    const user = await this.Docgia.findOne({
      MaDocGia: maDocGia,
      Password: password, // Kiểm tra mật khẩu (lưu ý: không khuyến khích lưu mật khẩu dạng plaintext)
    });
    return user; // Trả về true nếu thông tin hợp lệ
  }

  // Thêm một độc giả mới (sử dụng chuẩn hóa dữ liệu)
  async create(payload) {
    const docgiaData = this.extractDocgiaData(payload);
    const result = await this.Docgia.insertOne(docgiaData);
    return result.insertedId; // Trả về ID của độc giả vừa được thêm
  }

  // Lấy danh sách tất cả độc giả
  async getAll() {
    // Sắp xếp theo MaDocGia (tăng dần)
    return await this.Docgia.find({}).sort({ MaDocGia: 1 }).toArray();
  }

  // Lấy thông tin một độc giả theo ID
  async getById(id) {
    return await this.Docgia.findOne({ _id: new ObjectId(id) });
  }

  // Cập nhật thông tin độc giả (sử dụng chuẩn hóa dữ liệu)
  async updateById(id, payload) {
    const updateData = this.extractDocgiaData(payload);
    const result = await this.Docgia.updateOne(
      { _id: new ObjectId(id) }, // Điều kiện tìm kiếm
      { $set: updateData } // Dữ liệu cần cập nhật
    );
    return result.modifiedCount; // Trả về số bản ghi đã cập nhật
  }

  // Xóa một độc giả theo ID
  async deleteById(id) {
    const result = await this.Docgia.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount; // Trả về số bản ghi đã xóa
  }

  // Kiểm tra mã độc giả có tồn tại hay không
  async checkMaDocGia(maDocGia) {
    const result = await this.Docgia.findOne({ MaDocGia: maDocGia });
    return result !== null;
  }
}



module.exports = DocgiaService; // Xuất class DocgiaService để sử dụng ở các file khác
