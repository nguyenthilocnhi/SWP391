// Lấy mã dịch vụ từ URL
function getServiceCode() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('ma');
}

// Xác định trang hiện tại (Guest hay Customer)
function getCurrentPage() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/Customer/')) {
        return 'customer';
    } else {
        return 'guest';
    }
}

// Lấy URL quay lại phù hợp
function getBackUrl() {
    const currentPage = getCurrentPage();
    if (currentPage === 'customer') {
        return 'DichVuCustomer.html';
    } else {
        return 'dichvu.html';
    }
}

// Dữ liệu chi tiết dịch vụ
const serviceDetails = {
    'XT001': {
        title: 'HIV Ag/Ab combo (HIV test thế hệ 4)',
        type: 'Xét nghiệm',
        overview: 'Đây là xét nghiệm HIV thế hệ 4, có khả năng phát hiện cả kháng nguyên p24 và kháng thể HIV. Xét nghiệm này có độ nhạy cao và có thể phát hiện HIV sớm hơn so với các thế hệ trước.',
        suitableFor: [
            'Người có nguy cơ lây nhiễm HIV',
            'Người có quan hệ tình dục không an toàn',
            'Người tiêm chích ma túy',
            'Người có triệu chứng nghi ngờ HIV',
            'Người muốn kiểm tra sức khỏe định kỳ'
        ],
        preparation: [
            'Không cần nhịn ăn',
            'Có thể uống nước bình thường',
            'Thông báo cho nhân viên y tế nếu đang dùng thuốc',
            'Mang theo CMND/CCCD khi đến xét nghiệm'
        ],
        process: [
            'Đăng ký và khai báo thông tin cá nhân',
            'Tư vấn trước xét nghiệm',
            'Lấy mẫu máu tĩnh mạch',
            'Thực hiện xét nghiệm trong phòng lab',
            'Nhận kết quả sau 1-3 giờ'
        ]
    },
    'XT002': {
        title: 'Xét nghiệm giang mai (RPR/TPHA)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm giang mai bao gồm RPR (Rapid Plasma Reagin) và TPHA (Treponema Pallidum Hemagglutination Assay) để phát hiện bệnh giang mai một cách chính xác.',
        suitableFor: [
            'Người có triệu chứng nghi ngờ giang mai',
            'Người có quan hệ tình dục không an toàn',
            'Phụ nữ mang thai (sàng lọc bắt buộc)',
            'Người có vết loét sinh dục',
            'Người có phát ban không rõ nguyên nhân'
        ],
        preparation: [
            'Không cần nhịn ăn',
            'Thông báo nếu đang dùng kháng sinh',
            'Không quan hệ tình dục 24h trước xét nghiệm',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn và khám lâm sàng',
            'Lấy mẫu máu tĩnh mạch',
            'Thực hiện xét nghiệm RPR và TPHA',
            'Nhận kết quả sau 2-24 giờ'
        ]
    },
    'XT003': {
        title: 'Xét nghiệm lậu (PCR hoặc nhuộm soi)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm lậu sử dụng kỹ thuật PCR (Polymerase Chain Reaction) hoặc nhuộm soi để phát hiện vi khuẩn Neisseria gonorrhoeae gây bệnh lậu. Đây là một trong những bệnh lây truyền qua đường tình dục phổ biến nhất.',
        suitableFor: [
            'Người có triệu chứng viêm niệu đạo',
            'Người có quan hệ tình dục không an toàn',
            'Người có tiết dịch bất thường',
            'Người có đau khi đi tiểu',
            'Người muốn kiểm tra sức khỏe định kỳ'
        ],
        preparation: [
            'Không đi tiểu 2-3 giờ trước khi lấy mẫu',
            'Không quan hệ tình dục 24h trước xét nghiệm',
            'Không sử dụng thuốc kháng sinh trước xét nghiệm',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin cá nhân',
            'Tư vấn trước xét nghiệm',
            'Lấy mẫu từ niệu đạo hoặc cổ tử cung',
            'Thực hiện xét nghiệm PCR hoặc nhuộm soi',
            'Nhận kết quả sau 3-24 giờ'
        ]
    },
    'XT004': {
        title: 'Chlamydia (PCR)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm Chlamydia sử dụng kỹ thuật PCR để phát hiện vi khuẩn Chlamydia trachomatis. Đây là bệnh lây truyền qua đường tình dục phổ biến và có thể gây vô sinh nếu không được điều trị.',
        suitableFor: [
            'Người có quan hệ tình dục không an toàn',
            'Phụ nữ dưới 25 tuổi có hoạt động tình dục',
            'Người có triệu chứng viêm niệu đạo',
            'Người có tiền sử STI',
            'Cặp đôi chuẩn bị có con'
        ],
        preparation: [
            'Không đi tiểu 2-3 giờ trước khi lấy mẫu',
            'Không quan hệ tình dục 24h trước xét nghiệm',
            'Không sử dụng thuốc kháng sinh',
            'Phụ nữ không thực hiện khi có kinh nguyệt'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn và khám lâm sàng',
            'Lấy mẫu từ niệu đạo hoặc cổ tử cung',
            'Thực hiện xét nghiệm PCR',
            'Nhận kết quả sau 1-2 ngày'
        ]
    },
    'XT005': {
        title: 'HBsAg, Anti-HBs',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm viêm gan B bao gồm HBsAg (kháng nguyên bề mặt) và Anti-HBs (kháng thể bề mặt) để xác định tình trạng nhiễm virus viêm gan B và khả năng miễn dịch.',
        suitableFor: [
            'Người có nguy cơ lây nhiễm viêm gan B',
            'Người tiêm chích ma túy',
            'Nhân viên y tế',
            'Người có quan hệ tình dục không an toàn',
            'Người muốn kiểm tra miễn dịch sau tiêm vaccine'
        ],
        preparation: [
            'Không cần nhịn ăn',
            'Có thể uống nước bình thường',
            'Thông báo nếu đang dùng thuốc',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn trước xét nghiệm',
            'Lấy mẫu máu tĩnh mạch',
            'Thực hiện xét nghiệm huyết thanh',
            'Nhận kết quả sau 2-8 giờ'
        ]
    },
    'XT006': {
        title: 'HCV Ab',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm HCV Ab (kháng thể viêm gan C) để phát hiện sự hiện diện của kháng thể chống lại virus viêm gan C trong máu. Đây là bước đầu tiên trong chẩn đoán viêm gan C.',
        suitableFor: [
            'Người có nguy cơ lây nhiễm viêm gan C',
            'Người tiêm chích ma túy',
            'Người nhận truyền máu trước 1992',
            'Người có men gan cao',
            'Người có triệu chứng mệt mỏi kéo dài'
        ],
        preparation: [
            'Không cần nhịn ăn',
            'Có thể uống nước bình thường',
            'Thông báo nếu đang dùng thuốc',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn trước xét nghiệm',
            'Lấy mẫu máu tĩnh mạch',
            'Thực hiện xét nghiệm ELISA',
            'Nhận kết quả sau 4-24 giờ'
        ]
    },
    'XT007': {
        title: 'Xét nghiệm HSV 1 & 2 (Herpes Simplex Virus)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm HSV 1 & 2 để phát hiện virus herpes simplex type 1 và type 2. HSV-1 thường gây mụn rộp ở miệng, HSV-2 thường gây mụn rộp sinh dục.',
        suitableFor: [
            'Người có mụn rộp ở miệng hoặc sinh dục',
            'Người có quan hệ tình dục không an toàn',
            'Người có triệu chứng ngứa, đau vùng sinh dục',
            'Phụ nữ mang thai có tiền sử herpes',
            'Người có hệ miễn dịch suy yếu'
        ],
        preparation: [
            'Không cần nhịn ăn',
            'Thông báo nếu đang dùng thuốc kháng virus',
            'Không quan hệ tình dục 24h trước xét nghiệm',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn và khám lâm sàng',
            'Lấy mẫu từ vết loét hoặc máu',
            'Thực hiện xét nghiệm PCR hoặc huyết thanh',
            'Nhận kết quả sau 1-2 ngày'
        ]
    },
    'XT008': {
        title: 'Pap smear (Tế bào học cổ tử cung)',
        type: 'Xét nghiệm',
        overview: 'Pap smear là xét nghiệm sàng lọc ung thư cổ tử cung bằng cách lấy mẫu tế bào từ cổ tử cung để kiểm tra dưới kính hiển vi. Đây là xét nghiệm quan trọng cho phụ nữ.',
        suitableFor: [
            'Phụ nữ từ 21 tuổi trở lên',
            'Phụ nữ có hoạt động tình dục',
            'Phụ nữ có tiền sử gia đình ung thư cổ tử cung',
            'Phụ nữ nhiễm HPV',
            'Phụ nữ có kinh nguyệt không đều'
        ],
        preparation: [
            'Không quan hệ tình dục 24-48 giờ trước xét nghiệm',
            'Không sử dụng thuốc đặt âm đạo',
            'Không thực hiện khi đang có kinh nguyệt',
            'Không tắm rửa âm đạo 24h trước xét nghiệm'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn và khám phụ khoa',
            'Lấy mẫu tế bào từ cổ tử cung',
            'Nhuộm và soi dưới kính hiển vi',
            'Nhận kết quả sau 1-3 ngày'
        ]
    },
    'XT009': {
        title: 'Trichomonas vaginalis',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm Trichomonas vaginalis để phát hiện ký sinh trùng Trichomonas vaginalis gây viêm âm đạo. Đây là bệnh lây truyền qua đường tình dục phổ biến ở phụ nữ.',
        suitableFor: [
            'Phụ nữ có triệu chứng viêm âm đạo',
            'Phụ nữ có tiết dịch âm đạo bất thường',
            'Phụ nữ có ngứa vùng sinh dục',
            'Phụ nữ có quan hệ tình dục không an toàn',
            'Phụ nữ có mùi hôi vùng sinh dục'
        ],
        preparation: [
            'Không quan hệ tình dục 24h trước xét nghiệm',
            'Không sử dụng thuốc đặt âm đạo',
            'Không thực hiện khi đang có kinh nguyệt',
            'Không tắm rửa âm đạo 24h trước xét nghiệm'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn và khám phụ khoa',
            'Lấy mẫu dịch âm đạo',
            'Soi tươi hoặc nuôi cấy',
            'Nhận kết quả sau vài giờ'
        ]
    },
    'XT010': {
        title: 'Xét nghiệm HPV (Sùi mào gà)',
        type: 'Xét nghiệm',
        overview: 'Đây là xét nghiệm nhằm xác định sự hiện diện của virus HPV, chủ yếu lây qua đường tình dục. Xét nghiệm này giúp phát hiện sớm nguy cơ ung thư cổ tử cung, đặc biệt ở phụ nữ từ 30 tuổi trở lên.',
        suitableFor: [
            'Phụ nữ trên 30 tuổi',
            'Phụ nữ có hoạt động tình dục, chưa tiêm HPV',
            'Người có kết quả PAP smear bất thường',
            'Người đã điều trị tổn thương cổ tử cung',
            'Người có người thân từng mắc ung thư cổ tử cung'
        ],
        preparation: [
            'Không quan hệ tình dục 24-48 giờ trước khi lấy mẫu',
            'Không sử dụng dung dịch vệ sinh phụ nữ hoặc thuốc đặt âm đạo',
            'Không thực hiện khi đang có kinh nguyệt',
            'Thông báo nếu đang dùng thuốc kháng virus'
        ],
        process: [
            'Khách hàng đặt lịch xét nghiệm trên hệ thống',
            'Điền thông tin y tế và nhận phiếu xét nghiệm có mã QR',
            'Thực hiện lấy mẫu xét nghiệm tại cơ sở hoặc phòng khám',
            'Nhận kết quả xét nghiệm sau 2 - 5 ngày'
        ]
    },
    'XT011': {
        title: 'Chancroid (Hạ cam mềm)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm Chancroid để phát hiện vi khuẩn Haemophilus ducreyi gây bệnh hạ cam mềm. Đây là bệnh lây truyền qua đường tình dục gây loét sinh dục đau đớn.',
        suitableFor: [
            'Người có vết loét sinh dục đau',
            'Người có quan hệ tình dục không an toàn',
            'Người có hạch bẹn sưng đau',
            'Người có tiền sử STI',
            'Người có triệu chứng viêm niệu đạo'
        ],
        preparation: [
            'Không quan hệ tình dục 24h trước xét nghiệm',
            'Không sử dụng thuốc kháng sinh',
            'Không rửa vùng sinh dục 24h trước xét nghiệm',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn và khám lâm sàng',
            'Lấy mẫu từ vết loét',
            'Nuôi cấy vi khuẩn',
            'Nhận kết quả sau 2-4 ngày'
        ]
    },
    'XT012': {
        title: 'Rận mu (Pubic lice)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm rận mu để phát hiện ký sinh trùng Phthirus pubis gây bệnh rận mu. Đây là bệnh lây truyền qua đường tình dục gây ngứa dữ dội vùng sinh dục.',
        suitableFor: [
            'Người có ngứa dữ dội vùng sinh dục',
            'Người có quan hệ tình dục không an toàn',
            'Người có vết cắn nhỏ màu xanh ở vùng sinh dục',
            'Người có rận mu trong quần áo',
            'Người có triệu chứng ngứa về đêm'
        ],
        preparation: [
            'Không tắm rửa vùng sinh dục 24h trước xét nghiệm',
            'Không sử dụng thuốc diệt rận',
            'Mang theo quần áo có nghi ngờ rận',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn và khám lâm sàng',
            'Soi hiển vi vùng sinh dục',
            'Kiểm tra quần áo và lông mu',
            'Nhận kết quả sau 1-2 giờ'
        ]
    },
    'XT013': {
        title: 'Virus Zika (PCR)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm virus Zika bằng kỹ thuật PCR để phát hiện sự hiện diện của virus Zika trong máu hoặc nước tiểu. Virus Zika có thể lây qua đường tình dục và gây dị tật bẩm sinh.',
        suitableFor: [
            'Người có triệu chứng sốt Zika',
            'Người đi du lịch vùng dịch Zika',
            'Phụ nữ mang thai có nguy cơ',
            'Người có quan hệ tình dục với người nhiễm Zika',
            'Người có triệu chứng phát ban, đau khớp'
        ],
        preparation: [
            'Không cần nhịn ăn',
            'Thông báo nếu đang dùng thuốc',
            'Mang theo thông tin du lịch nếu có',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn và khám lâm sàng',
            'Lấy mẫu máu và nước tiểu',
            'Thực hiện xét nghiệm PCR',
            'Nhận kết quả sau 3-7 ngày'
        ]
    },
    'XT014': {
        title: 'Mycoplasma genitalium',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm Mycoplasma genitalium để phát hiện vi khuẩn Mycoplasma genitalium gây viêm niệu đạo và viêm vùng chậu. Đây là bệnh lây truyền qua đường tình dục mới được phát hiện.',
        suitableFor: [
            'Người có triệu chứng viêm niệu đạo',
            'Người có quan hệ tình dục không an toàn',
            'Phụ nữ có viêm vùng chậu',
            'Người có tiết dịch niệu đạo',
            'Người có đau khi đi tiểu'
        ],
        preparation: [
            'Không đi tiểu 2-3 giờ trước khi lấy mẫu',
            'Không quan hệ tình dục 24h trước xét nghiệm',
            'Không sử dụng thuốc kháng sinh',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn và khám lâm sàng',
            'Lấy mẫu từ niệu đạo hoặc cổ tử cung',
            'Thực hiện xét nghiệm PCR',
            'Nhận kết quả sau 1-3 ngày'
        ]
    },
    'XT015': {
        title: 'Ureaplasma urealyticum',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm Ureaplasma urealyticum để phát hiện vi khuẩn Ureaplasma urealyticum có thể gây viêm niệu đạo, viêm phụ khoa và vô sinh. Đây là vi khuẩn thường gặp trong đường sinh dục.',
        suitableFor: [
            'Người có triệu chứng viêm niệu đạo',
            'Phụ nữ có viêm âm đạo tái phát',
            'Cặp đôi hiếm muộn',
            'Người có quan hệ tình dục không an toàn',
            'Phụ nữ có tiết dịch âm đạo bất thường'
        ],
        preparation: [
            'Không đi tiểu 2-3 giờ trước khi lấy mẫu',
            'Không quan hệ tình dục 24h trước xét nghiệm',
            'Không sử dụng thuốc kháng sinh',
            'Phụ nữ không thực hiện khi có kinh nguyệt'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn và khám lâm sàng',
            'Lấy mẫu từ niệu đạo hoặc âm đạo',
            'Nuôi cấy vi khuẩn',
            'Nhận kết quả sau 1-3 ngày'
        ]
    },
    'TV001': {
        title: 'Tư vấn trước khi làm xét nghiệm STI',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn chuyên nghiệp giúp bạn hiểu rõ về các loại xét nghiệm STI, đánh giá nguy cơ lây nhiễm và lựa chọn xét nghiệm phù hợp với tình trạng cá nhân.',
        suitableFor: [
            'Người lần đầu làm xét nghiệm STI',
            'Người có quan hệ tình dục không an toàn',
            'Người có triệu chứng nghi ngờ',
            'Cặp đôi muốn kiểm tra sức khỏe',
            'Người muốn tư vấn về phòng tránh STI'
        ],
        preparation: [
            'Chuẩn bị thông tin về tiền sử quan hệ tình dục',
            'Ghi chép các triệu chứng nếu có',
            'Mang theo CMND/CCCD',
            'Đến đúng giờ hẹn'
        ],
        process: [
            'Đăng ký và khai báo thông tin cá nhân',
            'Tư vấn viên đánh giá nguy cơ lây nhiễm',
            'Giải thích các loại xét nghiệm phù hợp',
            'Hướng dẫn chuẩn bị cho xét nghiệm',
            'Đặt lịch xét nghiệm nếu cần'
        ]
    },
    'TV002': {
        title: 'Tư vấn sau khi nhận kết quả xét nghiệm',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn chuyên sâu giúp bạn hiểu rõ kết quả xét nghiệm, giải thích ý nghĩa của các chỉ số và hướng dẫn các bước tiếp theo cần thực hiện.',
        suitableFor: [
            'Người vừa nhận kết quả xét nghiệm STI',
            'Người có kết quả dương tính',
            'Người có kết quả không rõ ràng',
            'Người cần hướng dẫn điều trị',
            'Người muốn tư vấn về phòng tránh tái nhiễm'
        ],
        preparation: [
            'Mang theo kết quả xét nghiệm',
            'Chuẩn bị câu hỏi về kết quả',
            'Ghi chép các triệu chứng hiện tại',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn viên phân tích kết quả xét nghiệm',
            'Giải thích ý nghĩa của các chỉ số',
            'Hướng dẫn các bước tiếp theo',
            'Đặt lịch tái khám nếu cần'
        ]
    },
    'TV003': {
        title: 'Tư vấn xét nghiệm định kỳ',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn giúp bạn xây dựng lịch trình xét nghiệm định kỳ phù hợp với lối sống và mức độ nguy cơ lây nhiễm của bản thân.',
        suitableFor: [
            'Người có hoạt động tình dục thường xuyên',
            'Người có nhiều bạn tình',
            'Người có tiền sử STI',
            'Người muốn duy trì sức khỏe tình dục',
            'Cặp đôi muốn kiểm tra định kỳ'
        ],
        preparation: [
            'Chuẩn bị thông tin về lối sống tình dục',
            'Ghi chép tiền sử STI',
            'Mang theo kết quả xét nghiệm trước đó',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn viên đánh giá mức độ nguy cơ',
            'Đề xuất lịch trình xét nghiệm phù hợp',
            'Giải thích tầm quan trọng của từng xét nghiệm',
            'Đặt lịch xét nghiệm định kỳ'
        ]
    },
    'TV004': {
        title: 'Tư vấn lựa chọn gói xét nghiệm phù hợp',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn giúp bạn hiểu rõ về các gói xét nghiệm khác nhau, combo test và lợi ích của từng loại để lựa chọn phù hợp với nhu cầu và ngân sách.',
        suitableFor: [
            'Người lần đầu làm xét nghiệm STI',
            'Người muốn tiết kiệm chi phí',
            'Người có ngân sách hạn chế',
            'Người muốn xét nghiệm toàn diện',
            'Cặp đôi muốn kiểm tra cùng lúc'
        ],
        preparation: [
            'Chuẩn bị thông tin về ngân sách',
            'Xác định mức độ nguy cơ lây nhiễm',
            'Ghi chép các triệu chứng nếu có',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn viên đánh giá nhu cầu',
            'Giới thiệu các gói xét nghiệm phù hợp',
            'So sánh chi phí và lợi ích',
            'Đặt lịch xét nghiệm theo gói đã chọn'
        ]
    },
    'TV005': {
        title: 'Tư vấn cho cặp đôi trước QHTD không bao',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn chuyên biệt dành cho cặp đôi chuẩn bị quan hệ tình dục không sử dụng bao cao su, giúp đảm bảo an toàn và sức khỏe cho cả hai.',
        suitableFor: [
            'Cặp đôi chuẩn bị quan hệ không dùng bao',
            'Cặp đôi muốn có con',
            'Cặp đôi trong mối quan hệ lâu dài',
            'Cặp đôi muốn kiểm tra sức khỏe trước khi tiến xa',
            'Cặp đôi có kế hoạch kết hôn'
        ],
        preparation: [
            'Cả hai người cùng tham gia',
            'Chuẩn bị thông tin về tiền sử tình dục',
            'Ghi chép các mối quan hệ trước đó',
            'Mang theo CMND/CCCD của cả hai'
        ],
        process: [
            'Đăng ký và khai báo thông tin cặp đôi',
            'Tư vấn viên đánh giá nguy cơ của cả hai',
            'Đề xuất gói xét nghiệm phù hợp',
            'Hướng dẫn về phòng tránh thai',
            'Đặt lịch xét nghiệm cho cả hai'
        ]
    },
    'TV006': {
        title: 'Tư vấn sức khỏe sinh sản',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn toàn diện về sức khỏe sinh sản, bao gồm phòng tránh thai, kế hoạch hóa gia đình, và các vấn đề liên quan đến sinh sản.',
        suitableFor: [
            'Cặp đôi muốn có con',
            'Cặp đôi muốn tránh thai',
            'Phụ nữ có vấn đề về kinh nguyệt',
            'Nam giới có vấn đề về sinh sản',
            'Cặp đôi hiếm muộn'
        ],
        preparation: [
            'Chuẩn bị thông tin về tiền sử sinh sản',
            'Ghi chép chu kỳ kinh nguyệt (nếu có)',
            'Mang theo kết quả xét nghiệm trước đó',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn viên đánh giá tình trạng sinh sản',
            'Giải thích các phương pháp phòng tránh thai',
            'Hướng dẫn về kế hoạch hóa gia đình',
            'Đề xuất xét nghiệm cần thiết'
        ]
    },
    'TV007': {
        title: 'Tư vấn tình dục an toàn',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn cung cấp kiến thức về quan hệ tình dục an toàn, cách bảo vệ bản thân khỏi lây nhiễm và tránh mang thai ngoài ý muốn.',
        suitableFor: [
            'Thanh niên mới bắt đầu quan hệ tình dục',
            'Người có nhiều bạn tình',
            'Người muốn học cách bảo vệ bản thân',
            'Cặp đôi muốn quan hệ an toàn',
            'Người có nguy cơ lây nhiễm cao'
        ],
        preparation: [
            'Chuẩn bị câu hỏi về tình dục an toàn',
            'Ghi chép các mối quan hệ hiện tại',
            'Mang theo CMND/CCCD',
            'Đến đúng giờ hẹn'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn viên đánh giá mức độ nguy cơ',
            'Giáo dục về tình dục an toàn',
            'Hướng dẫn sử dụng bao cao su',
            'Đề xuất xét nghiệm định kỳ'
        ]
    },
    'TV008': {
        title: 'Tư vấn dậy thì và sức khỏe giới tính cho thanh thiếu niên',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn chuyên biệt dành cho thanh thiếu niên, giúp hiểu về sự phát triển cơ thể, giới tính, cách bảo vệ bản thân và xây dựng mối quan hệ lành mạnh.',
        suitableFor: [
            'Thanh thiếu niên từ 13-19 tuổi',
            'Phụ huynh muốn tư vấn cho con',
            'Thanh niên có thắc mắc về dậy thì',
            'Thanh thiếu niên có vấn đề về giới tính',
            'Thanh niên muốn hiểu về tình dục an toàn'
        ],
        preparation: [
            'Phụ huynh có thể tham gia cùng con',
            'Chuẩn bị câu hỏi về dậy thì',
            'Ghi chép các thay đổi cơ thể',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn viên tạo không gian thoải mái',
            'Giải thích về sự phát triển cơ thể',
            'Hướng dẫn về giới tính và tình dục an toàn',
            'Đưa ra lời khuyên phù hợp với lứa tuổi'
        ]
    }
};

// Load chi tiết dịch vụ
function loadServiceDetail() {
    const serviceCode = getServiceCode();
    const serviceDetail = serviceDetails[serviceCode];
    const container = document.getElementById('service-detail');

    if (!serviceCode || !serviceDetail) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Không tìm thấy thông tin dịch vụ</h2>
                <p>Mã dịch vụ không hợp lệ hoặc chưa có thông tin chi tiết.</p>
                <a href="${getBackUrl()}" class="back-link">← Quay lại danh sách dịch vụ</a>
            </div>
        `;
        return;
    }

    // Cập nhật title
    document.title = `${serviceDetail.title} - An Giới`;

    container.innerHTML = `
        <section>
            <h2 class="section-title">${serviceDetail.title.toUpperCase()}</h2>

            <div class="box">
                <h3>Tổng quan về ${serviceDetail.type.toLowerCase()}</h3>
                <p>${serviceDetail.overview}</p>
            </div>

            <div class="box">
                <h3>${serviceDetail.type} phù hợp dành cho đối tượng nào?</h3>
                <ul>
                    ${serviceDetail.suitableFor.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>

            <div class="box">
                <h3>Lưu ý trước khi thực hiện ${serviceDetail.type.toLowerCase()}</h3>
                <ul>
                    ${serviceDetail.preparation.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </section>

        <section>
            <h2 class="section-title">QUY TRÌNH ${serviceDetail.type.toUpperCase()}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Bước</th>
                        <th>Mô tả</th>
                    </tr>
                </thead>
                <tbody>
                    ${serviceDetail.process.map((step, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${step}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </section>

        <div class="back-section">
            <a href="${getBackUrl()}" class="back-link">← Quay lại danh sách dịch vụ</a>
        </div>
    `;
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', loadServiceDetail); 