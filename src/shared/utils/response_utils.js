// responseUtil.js

/**
 * Tạo một response object theo chuẩn baseResponse
 * @param {Object} data - Dữ liệu cần trả về (sẽ được chuyển thành JSON)
 * @param {string} code - Mã code của response
 * @param {string|null} [errorMessage=null] - Thông báo lỗi nếu có
 * @returns {Object} - Đối tượng response
 */
function baseResponse(data, code, errorMessage = null) {
    return {
        data: JSON.stringify(data), // Chuyển đổi dữ liệu thành JSON
        code: code,
        errorMessage: errorMessage
    };
}

module.exports = baseResponse;