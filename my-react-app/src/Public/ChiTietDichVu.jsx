import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderGuest from '../components/HeaderGuest';
import Footer from '../components/Footer';
import HeaderCustomer from '../components/HeaderCustomer';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Styled-components for layout and style
const Main = styled.main`
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  width: 100vw;
  margin: 0;
  padding: 2rem 0;
  margin-top: 100px;
`;
const SectionTitle = styled.h2`
  font-size: 26px;
  color: #111827;
  margin-bottom: 20px;
  text-transform: uppercase;
`;
const Box = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #2563eb;
  }
  p, ul {
    font-size: 15px;
    color: #374151;
  }
  ul {
    padding-left: 20px;
    margin-top: 8px;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  th, td {
    padding: 14px;
    border: 1px solid #e5e7eb;
    text-align: left;
  }
  th {
    background-color: #f3f4f6;
    font-weight: 600;
    color: #111827;
  }
`;
const BackSection = styled.div`
  text-align: center;
  margin-top: 30px;
  padding: 20px;
`;
const BackLink = styled.a`
  display: inline-block;
  color: #10b981;
  text-decoration: none;
  font-weight: 600;
  padding: 10px 20px;
  border: 2px solid #10b981;
  border-radius: 6px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #10b981;
    color: white;
    text-decoration: none;
  }
`;
const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: #f9f9f9;
  border-radius: 10px;
  margin: 20px 0;
  h2 {
    color: #d32f2f;
    margin-bottom: 15px;
  }
  p {
    color: #666;
    margin-bottom: 20px;
  }
`;

// Service data (copy from your JS)
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
        ],
        detail: (
            <>
                <b>Ưu điểm nổi bật:</b>
                <ul>
                    <li>Phát hiện sớm HIV chỉ sau 2-3 tuần phơi nhiễm nhờ phát hiện đồng thời kháng nguyên p24 và kháng thể HIV.</li>
                    <li>Độ nhạy và độ đặc hiệu cao hơn các thế hệ trước.</li>
                    <li>Bảo mật tuyệt đối thông tin khách hàng.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Kết quả dương tính sẽ được tư vấn miễn phí các bước tiếp theo và hỗ trợ kết nối với các cơ sở điều trị uy tín.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Nếu cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
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
        ],
        detail: (
            <>
                <b>Kết hợp hai phương pháp:</b>
                <ul>
                    <li><b>RPR</b>: Sàng lọc nhanh, phát hiện kháng thể không đặc hiệu.</li>
                    <li><b>TPHA</b>: Xác định kháng thể đặc hiệu với xoắn khuẩn giang mai.</li>
                </ul>
                <b>Ý nghĩa:</b>
                <span> Giúp chẩn đoán chính xác giang mai ở mọi giai đoạn, phù hợp cho cả sàng lọc và theo dõi điều trị.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Phụ nữ mang thai nên xét nghiệm giang mai ít nhất một lần trong thai kỳ để phòng ngừa lây truyền cho thai nhi.<br />Nếu cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
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
        ],
        detail: (
            <>
                <b>Kỹ thuật hiện đại:</b>
                <ul>
                    <li><b>PCR</b>: Độ nhạy và đặc hiệu cao, phát hiện cả trường hợp không triệu chứng.</li>
                    <li><b>Nhuộm soi</b>: Áp dụng cho trường hợp cấp tính, cho kết quả nhanh.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Phát hiện và điều trị sớm giúp phòng ngừa biến chứng vô sinh và lây lan cho bạn tình.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Việc tuân thủ hướng dẫn lấy mẫu giúp tăng độ chính xác của kết quả.<br />Nếu cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
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
        ],
        detail: (
            <>
                <b>Chlamydia</b> là nguyên nhân hàng đầu gây vô sinh do tắc vòi trứng ở nữ giới nếu không được phát hiện và điều trị kịp thời.<br />
                <ul>
                    <li>Xét nghiệm PCR giúp phát hiện chính xác ngay cả khi không có triệu chứng.</li>
                    <li>Khuyến cáo xét nghiệm định kỳ cho phụ nữ trẻ có hoạt động tình dục.</li>
                </ul>
            </>
        ),
        moreInfo: (
            <>
                <span>Việc phát hiện sớm và điều trị đúng phác đồ giúp bảo vệ sức khỏe sinh sản lâu dài.<br />Nếu cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'XT005': {
        title: 'Xét nghiệm viêm gan B (HBsAg, Anti-HBs)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm viêm gan B giúp phát hiện sớm tình trạng nhiễm virus HBV và đánh giá khả năng miễn dịch với viêm gan B.',
        suitableFor: [
            'Người chưa tiêm phòng viêm gan B',
            'Người có nguy cơ lây nhiễm qua đường máu, tình dục',
            'Phụ nữ mang thai',
            'Người có triệu chứng nghi ngờ viêm gan',
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
            'Thực hiện xét nghiệm HBsAg, Anti-HBs',
            'Nhận kết quả sau 1-3 giờ'
        ],
        detail: (
            <>
                <b>Ý nghĩa xét nghiệm:</b>
                <ul>
                    <li><b>HBsAg</b>: Phát hiện người đang nhiễm virus viêm gan B.</li>
                    <li><b>Anti-HBs</b>: Đánh giá khả năng miễn dịch với viêm gan B.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Kết quả dương tính sẽ được tư vấn miễn phí các bước tiếp theo và hỗ trợ kết nối với các cơ sở điều trị uy tín.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Nếu cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'XT006': {
        title: 'Xét nghiệm HPV (Human Papillomavirus)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm HPV giúp phát hiện sớm nguy cơ ung thư cổ tử cung và các bệnh lý liên quan đến virus HPV.',
        suitableFor: [
            'Phụ nữ từ 21 tuổi trở lên',
            'Người có quan hệ tình dục không an toàn',
            'Người có tiền sử nhiễm HPV',
            'Người muốn tầm soát ung thư cổ tử cung',
            'Người có triệu chứng bất thường vùng sinh dục'
        ],
        preparation: [
            'Không quan hệ tình dục 48h trước xét nghiệm',
            'Không sử dụng thuốc đặt âm đạo 48h trước xét nghiệm',
            'Không thực hiện khi đang có kinh nguyệt',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn và khám lâm sàng',
            'Lấy mẫu tế bào cổ tử cung',
            'Thực hiện xét nghiệm HPV',
            'Nhận kết quả sau 3-5 ngày'
        ],
        detail: (
            <>
                <b>Ưu điểm:</b>
                <ul>
                    <li>Phát hiện sớm nguy cơ ung thư cổ tử cung.</li>
                    <li>Đánh giá nguy cơ nhiễm các chủng HPV nguy hiểm.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Xét nghiệm định kỳ giúp bảo vệ sức khỏe sinh sản lâu dài.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Nếu cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'XT007': {
        title: 'Xét nghiệm viêm gan C (Anti-HCV)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm Anti-HCV giúp phát hiện kháng thể chống lại virus viêm gan C, hỗ trợ chẩn đoán sớm bệnh viêm gan C.',
        suitableFor: [
            'Người có nguy cơ lây nhiễm qua đường máu',
            'Người từng truyền máu, chạy thận nhân tạo',
            'Người có triệu chứng nghi ngờ viêm gan',
            'Người có kết quả men gan tăng',
            'Người muốn kiểm tra sức khỏe định kỳ'
        ],
        preparation: [
            'Không cần nhịn ăn',
            'Có thể uống nước bình thường',
            'Thông báo cho nhân viên y tế nếu đang dùng thuốc',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin cá nhân',
            'Tư vấn trước xét nghiệm',
            'Lấy mẫu máu tĩnh mạch',
            'Thực hiện xét nghiệm Anti-HCV',
            'Nhận kết quả sau 1-3 giờ'
        ],
        detail: (
            <>
                <b>Ý nghĩa:</b>
                <ul>
                    <li>Phát hiện sớm người nhiễm hoặc từng nhiễm virus viêm gan C.</li>
                    <li>Hỗ trợ chẩn đoán và theo dõi điều trị.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Kết quả dương tính cần làm thêm các xét nghiệm chuyên sâu để xác định tình trạng nhiễm virus.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Nếu cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'XT008': {
        title: 'Xét nghiệm đường huyết (Glucose)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm đường huyết giúp đánh giá nồng độ glucose trong máu, hỗ trợ chẩn đoán và theo dõi bệnh tiểu đường.',
        suitableFor: [
            'Người có triệu chứng nghi ngờ tiểu đường',
            'Người có tiền sử gia đình mắc tiểu đường',
            'Phụ nữ mang thai (tầm soát đái tháo đường thai kỳ)',
            'Người muốn kiểm tra sức khỏe định kỳ',
            'Người có yếu tố nguy cơ chuyển hóa'
        ],
        preparation: [
            'Nhịn ăn ít nhất 8 tiếng trước khi lấy máu',
            'Có thể uống nước lọc',
            'Không sử dụng đồ uống có đường, cà phê trước xét nghiệm',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn trước xét nghiệm',
            'Lấy mẫu máu tĩnh mạch',
            'Thực hiện xét nghiệm glucose',
            'Nhận kết quả sau 1-2 giờ'
        ],
        detail: (
            <>
                <b>Ý nghĩa:</b>
                <ul>
                    <li>Phát hiện sớm nguy cơ tiểu đường hoặc rối loạn dung nạp glucose.</li>
                    <li>Hỗ trợ theo dõi hiệu quả điều trị tiểu đường.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Kết quả bất thường cần được tư vấn và làm thêm các xét nghiệm chuyên sâu.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Nếu cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'XT009': {
        title: 'Xét nghiệm mỡ máu (Lipid profile)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm mỡ máu giúp đánh giá các chỉ số cholesterol, triglycerid, HDL, LDL trong máu, hỗ trợ phòng ngừa bệnh tim mạch.',
        suitableFor: [
            'Người trên 40 tuổi',
            'Người có tiền sử bệnh tim mạch, đột quỵ',
            'Người béo phì, tăng huyết áp',
            'Người hút thuốc lá, uống rượu bia',
            'Người muốn kiểm tra sức khỏe định kỳ'
        ],
        preparation: [
            'Nhịn ăn ít nhất 8-12 tiếng trước khi lấy máu',
            'Có thể uống nước lọc',
            'Không sử dụng đồ uống có cồn, chất béo trước xét nghiệm',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn trước xét nghiệm',
            'Lấy mẫu máu tĩnh mạch',
            'Thực hiện xét nghiệm lipid profile',
            'Nhận kết quả sau 2-3 giờ'
        ],
        detail: (
            <>
                <b>Ý nghĩa:</b>
                <ul>
                    <li>Đánh giá nguy cơ mắc bệnh tim mạch, xơ vữa động mạch.</li>
                    <li>Hỗ trợ theo dõi hiệu quả điều trị rối loạn lipid máu.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Kết quả bất thường cần được tư vấn chế độ ăn uống, luyện tập và điều trị phù hợp.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Nếu cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'XT010': {
        title: 'Xét nghiệm nước tiểu tổng quát',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm nước tiểu tổng quát giúp phát hiện sớm các bệnh lý về thận, tiết niệu, tiểu đường và các rối loạn chuyển hóa.',
        suitableFor: [
            'Người có triệu chứng tiểu buốt, tiểu rắt, tiểu máu',
            'Người có tiền sử bệnh thận, tiết niệu',
            'Phụ nữ mang thai',
            'Người muốn kiểm tra sức khỏe định kỳ',
            'Người có yếu tố nguy cơ chuyển hóa'
        ],
        preparation: [
            'Lấy mẫu nước tiểu giữa dòng buổi sáng',
            'Không sử dụng thuốc nhuộm màu nước tiểu trước xét nghiệm',
            'Không ăn thực phẩm có màu đậm trước xét nghiệm',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn trước xét nghiệm',
            'Hướng dẫn lấy mẫu nước tiểu',
            'Thực hiện xét nghiệm tổng quát nước tiểu',
            'Nhận kết quả sau 1-2 giờ'
        ],
        detail: (
            <>
                <b>Ý nghĩa:</b>
                <ul>
                    <li>Phát hiện sớm các bệnh lý thận, tiết niệu, tiểu đường.</li>
                    <li>Hỗ trợ theo dõi hiệu quả điều trị các bệnh lý liên quan.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Kết quả bất thường cần được tư vấn và làm thêm các xét nghiệm chuyên sâu.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Nếu cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'XT011': {
        title: 'Xét nghiệm chức năng gan (AST, ALT, GGT, ...)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm chức năng gan giúp đánh giá hoạt động của gan, phát hiện sớm các bệnh lý gan như viêm gan, xơ gan, gan nhiễm mỡ.',
        suitableFor: [
            'Người có triệu chứng mệt mỏi, vàng da, đau hạ sườn phải',
            'Người uống rượu bia thường xuyên',
            'Người có tiền sử bệnh gan',
            'Người dùng thuốc dài ngày',
            'Người muốn kiểm tra sức khỏe định kỳ'
        ],
        preparation: [
            'Nhịn ăn ít nhất 8 tiếng trước khi lấy máu',
            'Có thể uống nước lọc',
            'Không sử dụng rượu bia trước xét nghiệm',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn trước xét nghiệm',
            'Lấy mẫu máu tĩnh mạch',
            'Thực hiện xét nghiệm chức năng gan',
            'Nhận kết quả sau 2-3 giờ'
        ],
        detail: (
            <>
                <b>Ý nghĩa:</b>
                <ul>
                    <li>Đánh giá hoạt động của gan, phát hiện sớm các bệnh lý gan.</li>
                    <li>Hỗ trợ theo dõi hiệu quả điều trị các bệnh lý gan.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Kết quả bất thường cần được tư vấn và làm thêm các xét nghiệm chuyên sâu.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Nếu cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'XT012': {
        title: 'Xét nghiệm chức năng thận (Urea, Creatinin, ...)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm chức năng thận giúp đánh giá khả năng lọc máu của thận, phát hiện sớm các bệnh lý thận mãn tính, suy thận.',
        suitableFor: [
            'Người có triệu chứng phù, tiểu ít, tiểu đêm',
            'Người có tiền sử bệnh thận, tăng huyết áp',
            'Người lớn tuổi',
            'Người dùng thuốc dài ngày',
            'Người muốn kiểm tra sức khỏe định kỳ'
        ],
        preparation: [
            'Nhịn ăn ít nhất 8 tiếng trước khi lấy máu',
            'Có thể uống nước lọc',
            'Không sử dụng rượu bia trước xét nghiệm',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn trước xét nghiệm',
            'Lấy mẫu máu tĩnh mạch',
            'Thực hiện xét nghiệm chức năng thận',
            'Nhận kết quả sau 2-3 giờ'
        ],
        detail: (
            <>
                <b>Ý nghĩa:</b>
                <ul>
                    <li>Đánh giá khả năng lọc máu của thận, phát hiện sớm các bệnh lý thận.</li>
                    <li>Hỗ trợ theo dõi hiệu quả điều trị các bệnh lý thận.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Kết quả bất thường cần được tư vấn và làm thêm các xét nghiệm chuyên sâu.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Nếu cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'XT013': {
        title: 'Xét nghiệm tổng phân tích tế bào máu (CBC)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm tổng phân tích tế bào máu (CBC) giúp đánh giá các thành phần máu như hồng cầu, bạch cầu, tiểu cầu, hỗ trợ phát hiện sớm các bệnh lý về máu và nhiễm trùng.',
        suitableFor: [
            'Người có triệu chứng mệt mỏi, xanh xao, chảy máu bất thường',
            'Người nghi ngờ nhiễm trùng',
            'Người muốn kiểm tra sức khỏe định kỳ',
            'Trẻ em, người già',
            'Người chuẩn bị phẫu thuật'
        ],
        preparation: [
            'Không cần nhịn ăn',
            'Có thể uống nước bình thường',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn trước xét nghiệm',
            'Lấy mẫu máu tĩnh mạch',
            'Thực hiện xét nghiệm tổng phân tích tế bào máu',
            'Nhận kết quả sau 1-2 giờ'
        ],
        detail: (
            <>
                <b>Ý nghĩa:</b>
                <ul>
                    <li>Phát hiện sớm thiếu máu, nhiễm trùng, rối loạn đông máu.</li>
                    <li>Hỗ trợ theo dõi hiệu quả điều trị các bệnh lý về máu.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Kết quả bất thường cần được tư vấn và làm thêm các xét nghiệm chuyên sâu.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Nếu cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'XT014': {
        title: 'Xét nghiệm định lượng hormone sinh dục (FSH, LH, Estradiol, ...)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm định lượng hormone sinh dục giúp đánh giá chức năng sinh sản, phát hiện các rối loạn nội tiết tố ở nam và nữ.',
        suitableFor: [
            'Phụ nữ rối loạn kinh nguyệt, khó có thai',
            'Nam giới có dấu hiệu suy giảm sinh lý',
            'Người muốn kiểm tra sức khỏe sinh sản',
            'Người điều trị vô sinh hiếm muộn',
            'Người có triệu chứng bất thường về nội tiết'
        ],
        preparation: [
            'Nên lấy máu vào buổi sáng',
            'Không sử dụng thuốc nội tiết trước xét nghiệm (nếu có chỉ định của bác sĩ)',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn trước xét nghiệm',
            'Lấy mẫu máu tĩnh mạch',
            'Thực hiện xét nghiệm hormone',
            'Nhận kết quả sau 1-2 ngày'
        ],
        detail: (
            <>
                <b>Ý nghĩa:</b>
                <ul>
                    <li>Đánh giá chức năng sinh sản, phát hiện rối loạn nội tiết tố.</li>
                    <li>Hỗ trợ theo dõi điều trị vô sinh, hiếm muộn.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Kết quả cần được bác sĩ chuyên khoa tư vấn và giải thích cụ thể.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Nếu cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'XT015': {
        title: 'Xét nghiệm tầm soát ung thư cổ tử cung (Pap smear)',
        type: 'Xét nghiệm',
        overview: 'Xét nghiệm Pap smear giúp phát hiện sớm các bất thường tế bào cổ tử cung, phòng ngừa ung thư cổ tử cung hiệu quả.',
        suitableFor: [
            'Phụ nữ từ 21 tuổi trở lên',
            'Phụ nữ đã quan hệ tình dục',
            'Phụ nữ có tiền sử gia đình ung thư cổ tử cung',
            'Người muốn tầm soát ung thư định kỳ',
            'Phụ nữ có triệu chứng bất thường vùng kín'
        ],
        preparation: [
            'Không quan hệ tình dục 48h trước xét nghiệm',
            'Không sử dụng thuốc đặt âm đạo 48h trước xét nghiệm',
            'Không thực hiện khi đang có kinh nguyệt',
            'Mang theo CMND/CCCD'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Tư vấn và khám lâm sàng',
            'Lấy mẫu tế bào cổ tử cung',
            'Thực hiện xét nghiệm Pap smear',
            'Nhận kết quả sau 3-5 ngày'
        ],
        detail: (
            <>
                <b>Ý nghĩa:</b>
                <ul>
                    <li>Phát hiện sớm các bất thường tế bào cổ tử cung.</li>
                    <li>Giảm nguy cơ mắc ung thư cổ tử cung nhờ tầm soát định kỳ.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Nên thực hiện xét nghiệm Pap smear định kỳ theo khuyến cáo của bác sĩ.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Nếu cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'TV001': {
        title: 'Tư vấn sức khỏe sinh sản tiền hôn nhân',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn sức khỏe sinh sản tiền hôn nhân giúp các cặp đôi chuẩn bị kết hôn hiểu rõ về sức khỏe sinh sản, phòng tránh các bệnh lây truyền và lên kế hoạch sinh con an toàn.',
        suitableFor: [
            'Các cặp đôi chuẩn bị kết hôn',
            'Người muốn tìm hiểu về sức khỏe sinh sản',
            'Người có kế hoạch sinh con',
            'Người muốn phòng tránh các bệnh lây truyền qua đường tình dục',
            'Người cần tư vấn về tiêm phòng trước mang thai'
        ],
        preparation: [
            'Chuẩn bị các câu hỏi, thắc mắc cần tư vấn',
            'Mang theo hồ sơ sức khỏe (nếu có)',
            'Đặt lịch hẹn trước để được phục vụ tốt nhất'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Gặp chuyên gia tư vấn',
            'Trao đổi, giải đáp các thắc mắc',
            'Nhận tài liệu hướng dẫn, tư vấn thêm nếu cần',
            'Lên kế hoạch kiểm tra sức khỏe tổng quát (nếu cần)'
        ],
        detail: (
            <>
                <b>Nội dung tư vấn:</b>
                <ul>
                    <li>Kiến thức về sức khỏe sinh sản, vệ sinh cá nhân.</li>
                    <li>Phòng tránh các bệnh lây truyền qua đường tình dục.</li>
                    <li>Lập kế hoạch sinh con an toàn, tư vấn tiêm phòng trước mang thai.</li>
                    <li>Giải đáp các thắc mắc về tâm lý, sức khỏe tiền hôn nhân.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Tư vấn hoàn toàn bảo mật, riêng tư và tận tâm.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Để đặt lịch tư vấn hoặc cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'TV002': {
        title: 'Tư vấn phòng tránh thai và kế hoạch hóa gia đình',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn phòng tránh thai và kế hoạch hóa gia đình giúp khách hàng lựa chọn phương pháp tránh thai phù hợp, an toàn và hiệu quả, đồng thời lên kế hoạch sinh con hợp lý.',
        suitableFor: [
            'Người chưa muốn có con',
            'Các cặp vợ chồng trẻ',
            'Người muốn tìm hiểu về các biện pháp tránh thai',
            'Người có tiền sử dị ứng với một số biện pháp tránh thai',
            'Người cần tư vấn về sức khỏe sinh sản'
        ],
        preparation: [
            'Chuẩn bị các câu hỏi, thắc mắc cần tư vấn',
            'Mang theo hồ sơ sức khỏe (nếu có)',
            'Đặt lịch hẹn trước để được phục vụ tốt nhất'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Gặp chuyên gia tư vấn',
            'Trao đổi, giải đáp các thắc mắc',
            'Nhận tài liệu hướng dẫn, tư vấn thêm nếu cần',
            'Lên kế hoạch kiểm tra sức khỏe tổng quát (nếu cần)'
        ],
        detail: (
            <>
                <b>Nội dung tư vấn:</b>
                <ul>
                    <li>Giới thiệu các phương pháp tránh thai hiện đại và truyền thống.</li>
                    <li>Hướng dẫn sử dụng đúng cách các biện pháp tránh thai.</li>
                    <li>Tư vấn lựa chọn phương pháp phù hợp với từng đối tượng.</li>
                    <li>Giải đáp các thắc mắc về tác dụng phụ, hiệu quả và an toàn.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Tư vấn hoàn toàn bảo mật, riêng tư và tận tâm.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Để đặt lịch tư vấn hoặc cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'TV003': {
        title: 'Tư vấn sức khỏe tiền thai sản',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn sức khỏe tiền thai sản giúp các cặp đôi chuẩn bị mang thai có kiến thức về dinh dưỡng, tiêm phòng, kiểm tra sức khỏe và phòng tránh các nguy cơ cho mẹ và bé.',
        suitableFor: [
            'Các cặp đôi chuẩn bị mang thai',
            'Người muốn tìm hiểu về sức khỏe tiền thai sản',
            'Người có tiền sử bệnh lý di truyền',
            'Người cần tư vấn về tiêm phòng trước mang thai',
            'Người muốn lên kế hoạch sinh con an toàn'
        ],
        preparation: [
            'Chuẩn bị các câu hỏi, thắc mắc cần tư vấn',
            'Mang theo hồ sơ sức khỏe (nếu có)',
            'Đặt lịch hẹn trước để được phục vụ tốt nhất'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Gặp chuyên gia tư vấn',
            'Trao đổi, giải đáp các thắc mắc',
            'Nhận tài liệu hướng dẫn, tư vấn thêm nếu cần',
            'Lên kế hoạch kiểm tra sức khỏe tổng quát (nếu cần)'
        ],
        detail: (
            <>
                <b>Nội dung tư vấn:</b>
                <ul>
                    <li>Chế độ dinh dưỡng, sinh hoạt trước khi mang thai.</li>
                    <li>Tiêm phòng các bệnh lý cần thiết trước mang thai.</li>
                    <li>Tư vấn kiểm tra sức khỏe tổng quát, sàng lọc di truyền.</li>
                    <li>Giải đáp các thắc mắc về tâm lý, sức khỏe tiền thai sản.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Tư vấn hoàn toàn bảo mật, riêng tư và tận tâm.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Để đặt lịch tư vấn hoặc cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'TV004': {
        title: 'Tư vấn sức khỏe thai kỳ',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn sức khỏe thai kỳ giúp phụ nữ mang thai và gia đình hiểu rõ về chế độ dinh dưỡng, chăm sóc sức khỏe, phòng tránh các nguy cơ trong suốt thai kỳ.',
        suitableFor: [
            'Phụ nữ đang mang thai',
            'Gia đình có người mang thai',
            'Người muốn tìm hiểu về sức khỏe thai kỳ',
            'Người có tiền sử thai kỳ nguy cơ cao',
            'Người cần tư vấn về tiêm phòng, dinh dưỡng thai kỳ'
        ],
        preparation: [
            'Chuẩn bị các câu hỏi, thắc mắc cần tư vấn',
            'Mang theo hồ sơ sức khỏe (nếu có)',
            'Đặt lịch hẹn trước để được phục vụ tốt nhất'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Gặp chuyên gia tư vấn',
            'Trao đổi, giải đáp các thắc mắc',
            'Nhận tài liệu hướng dẫn, tư vấn thêm nếu cần',
            'Lên kế hoạch kiểm tra sức khỏe tổng quát (nếu cần)'
        ],
        detail: (
            <>
                <b>Nội dung tư vấn:</b>
                <ul>
                    <li>Chế độ dinh dưỡng, vận động, nghỉ ngơi cho bà bầu.</li>
                    <li>Phòng tránh các nguy cơ trong thai kỳ.</li>
                    <li>Tư vấn tiêm phòng, khám thai định kỳ.</li>
                    <li>Giải đáp các thắc mắc về tâm lý, sức khỏe thai kỳ.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Tư vấn hoàn toàn bảo mật, riêng tư và tận tâm.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Để đặt lịch tư vấn hoặc cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'TV005': {
        title: 'Tư vấn nuôi con bằng sữa mẹ và chăm sóc trẻ sơ sinh',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn nuôi con bằng sữa mẹ và chăm sóc trẻ sơ sinh giúp các bà mẹ và gia đình hiểu rõ về lợi ích của sữa mẹ, kỹ năng chăm sóc trẻ sơ sinh và phòng tránh các bệnh thường gặp.',
        suitableFor: [
            'Phụ nữ sau sinh',
            'Gia đình có trẻ sơ sinh',
            'Người muốn tìm hiểu về nuôi con bằng sữa mẹ',
            'Người cần tư vấn về chăm sóc trẻ sơ sinh',
            'Người có thắc mắc về dinh dưỡng cho trẻ nhỏ'
        ],
        preparation: [
            'Chuẩn bị các câu hỏi, thắc mắc cần tư vấn',
            'Mang theo hồ sơ sức khỏe (nếu có)',
            'Đặt lịch hẹn trước để được phục vụ tốt nhất'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Gặp chuyên gia tư vấn',
            'Trao đổi, giải đáp các thắc mắc',
            'Nhận tài liệu hướng dẫn, tư vấn thêm nếu cần',
            'Lên kế hoạch kiểm tra sức khỏe tổng quát (nếu cần)'
        ],
        detail: (
            <>
                <b>Nội dung tư vấn:</b>
                <ul>
                    <li>Lợi ích của sữa mẹ đối với trẻ sơ sinh và mẹ.</li>
                    <li>Kỹ năng cho con bú đúng cách, xử lý các vấn đề thường gặp.</li>
                    <li>Chăm sóc trẻ sơ sinh: tắm, vệ sinh, phòng tránh bệnh.</li>
                    <li>Giải đáp các thắc mắc về dinh dưỡng, phát triển của trẻ.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Tư vấn hoàn toàn bảo mật, riêng tư và tận tâm.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Để đặt lịch tư vấn hoặc cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'TV006': {
        title: 'Tư vấn sức khỏe vị thành niên',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn sức khỏe vị thành niên giúp các bạn trẻ hiểu rõ về sự phát triển tâm sinh lý, phòng tránh các nguy cơ sức khỏe và xây dựng lối sống lành mạnh.',
        suitableFor: [
            'Học sinh, sinh viên',
            'Phụ huynh có con trong độ tuổi vị thành niên',
            'Người muốn tìm hiểu về sức khỏe vị thành niên',
            'Người cần tư vấn về tâm lý, giới tính',
            'Người có thắc mắc về các vấn đề tuổi dậy thì'
        ],
        preparation: [
            'Chuẩn bị các câu hỏi, thắc mắc cần tư vấn',
            'Mang theo hồ sơ sức khỏe (nếu có)',
            'Đặt lịch hẹn trước để được phục vụ tốt nhất'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Gặp chuyên gia tư vấn',
            'Trao đổi, giải đáp các thắc mắc',
            'Nhận tài liệu hướng dẫn, tư vấn thêm nếu cần',
            'Lên kế hoạch kiểm tra sức khỏe tổng quát (nếu cần)'
        ],
        detail: (
            <>
                <b>Nội dung tư vấn:</b>
                <ul>
                    <li>Kiến thức về sự phát triển tâm sinh lý tuổi dậy thì.</li>
                    <li>Phòng tránh các nguy cơ sức khỏe, bệnh lây truyền qua đường tình dục.</li>
                    <li>Tư vấn về giới tính, tâm lý, xây dựng lối sống lành mạnh.</li>
                    <li>Giải đáp các thắc mắc về sức khỏe vị thành niên.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Tư vấn hoàn toàn bảo mật, riêng tư và tận tâm.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Để đặt lịch tư vấn hoặc cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'TV007': {
        title: 'Tư vấn sức khỏe nam khoa',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn sức khỏe nam khoa giúp nam giới hiểu rõ về các bệnh lý nam khoa, phòng tránh các nguy cơ và nâng cao chất lượng cuộc sống.',
        suitableFor: [
            'Nam giới ở mọi lứa tuổi',
            'Người có triệu chứng bất thường về sinh lý',
            'Người muốn tìm hiểu về sức khỏe nam khoa',
            'Người cần tư vấn về phòng tránh bệnh lây truyền qua đường tình dục',
            'Người có thắc mắc về sức khỏe sinh sản nam'
        ],
        preparation: [
            'Chuẩn bị các câu hỏi, thắc mắc cần tư vấn',
            'Mang theo hồ sơ sức khỏe (nếu có)',
            'Đặt lịch hẹn trước để được phục vụ tốt nhất'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Gặp chuyên gia tư vấn',
            'Trao đổi, giải đáp các thắc mắc',
            'Nhận tài liệu hướng dẫn, tư vấn thêm nếu cần',
            'Lên kế hoạch kiểm tra sức khỏe tổng quát (nếu cần)'
        ],
        detail: (
            <>
                <b>Nội dung tư vấn:</b>
                <ul>
                    <li>Kiến thức về các bệnh lý nam khoa thường gặp.</li>
                    <li>Phòng tránh các bệnh lây truyền qua đường tình dục.</li>
                    <li>Tư vấn về sức khỏe sinh sản, sinh lý nam.</li>
                    <li>Giải đáp các thắc mắc về sức khỏe nam khoa.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Tư vấn hoàn toàn bảo mật, riêng tư và tận tâm.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Để đặt lịch tư vấn hoặc cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
    'TV008': {
        title: 'Tư vấn sức khỏe phụ khoa',
        type: 'Tư vấn',
        overview: 'Dịch vụ tư vấn sức khỏe phụ khoa giúp nữ giới hiểu rõ về các bệnh lý phụ khoa, phòng tránh các nguy cơ và nâng cao chất lượng cuộc sống.',
        suitableFor: [
            'Nữ giới ở mọi lứa tuổi',
            'Người có triệu chứng bất thường về sinh lý',
            'Người muốn tìm hiểu về sức khỏe phụ khoa',
            'Người cần tư vấn về phòng tránh bệnh lây truyền qua đường tình dục',
            'Người có thắc mắc về sức khỏe sinh sản nữ'
        ],
        preparation: [
            'Chuẩn bị các câu hỏi, thắc mắc cần tư vấn',
            'Mang theo hồ sơ sức khỏe (nếu có)',
            'Đặt lịch hẹn trước để được phục vụ tốt nhất'
        ],
        process: [
            'Đăng ký và khai báo thông tin',
            'Gặp chuyên gia tư vấn',
            'Trao đổi, giải đáp các thắc mắc',
            'Nhận tài liệu hướng dẫn, tư vấn thêm nếu cần',
            'Lên kế hoạch kiểm tra sức khỏe tổng quát (nếu cần)'
        ],
        detail: (
            <>
                <b>Nội dung tư vấn:</b>
                <ul>
                    <li>Kiến thức về các bệnh lý phụ khoa thường gặp.</li>
                    <li>Phòng tránh các bệnh lây truyền qua đường tình dục.</li>
                    <li>Tư vấn về sức khỏe sinh sản, sinh lý nữ.</li>
                    <li>Giải đáp các thắc mắc về sức khỏe phụ khoa.</li>
                </ul>
                <b>Lưu ý:</b>
                <span> Tư vấn hoàn toàn bảo mật, riêng tư và tận tâm.</span>
            </>
        ),
        moreInfo: (
            <>
                <span>Để đặt lịch tư vấn hoặc cần hỗ trợ thêm, vui lòng liên hệ tổng đài <b>1900 8484</b> hoặc đến trực tiếp phòng khám.</span>
            </>
        )
    },
};

function getCurrentPage() {
    const loggedIn = localStorage.getItem('loggedIn');
    const role = localStorage.getItem('role');
    if (loggedIn === 'true' && role === 'customer') {
        return 'customer';
    }
    return 'guest';
}
function getBackUrl() {
    const currentPage = getCurrentPage();
    if (currentPage === 'customer') {
        return '/customer/service';
    } else {
        return '/service';
    }
}

const ChiTietDichVu = () => {
    const { serviceCode } = useParams();
    const [serviceDetail, setServiceDetail] = useState(serviceDetails[serviceCode]);
    const [isCustomer, setIsCustomer] = useState(false);

    useEffect(() => {
        setServiceDetail(serviceDetails[serviceCode]);
        if (serviceDetails[serviceCode]) {
            document.title = `${serviceDetails[serviceCode].title} - An Giới`;
        }
        // Role logic
        const loggedIn = localStorage.getItem('loggedIn');
        const role = localStorage.getItem('role');
        if (loggedIn !== 'true') {
            setIsCustomer(false);
        } else {
            setIsCustomer(role === 'customer');
        }
    }, [serviceCode]);

    if (!serviceCode || !serviceDetail) {
        return (
            <>
                {isCustomer ? <HeaderCustomer /> : <HeaderGuest />}
                <Main>
                    <ErrorMessage>
                        <h2>Không tìm thấy thông tin dịch vụ</h2>
                        <p>Mã dịch vụ không hợp lệ hoặc chưa có thông tin chi tiết.</p>
                        <BackLink as={Link} to={getBackUrl()}>← Quay lại danh sách dịch vụ</BackLink>
                    </ErrorMessage>
                </Main>
                <Footer />
            </>
        );
    }

    return (
        <>
            {isCustomer ? <HeaderCustomer /> : <HeaderGuest />}
            <Main>
                <section>
                    <SectionTitle>{serviceDetail.title.toUpperCase()}</SectionTitle>
                    <Box>
                        <h3>Tổng quan về {serviceDetail.type.toLowerCase()}</h3>
                        <p>{serviceDetail.overview}</p>
                    </Box>
                    <Box>
                        <h3>{serviceDetail.type} phù hợp dành cho đối tượng nào?</h3>
                        <ul>
                            {serviceDetail.suitableFor.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                    </Box>
                    <Box>
                        <h3>Lưu ý trước khi thực hiện {serviceDetail.type.toLowerCase()}</h3>
                        <ul>
                            {serviceDetail.preparation.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                    </Box>
                </section>
                <section>
                    <SectionTitle>QUY TRÌNH {serviceDetail.type.toUpperCase()}</SectionTitle>
                    <Table>
                        <thead>
                            <tr>
                                <th>Bước</th>
                                <th>Mô tả</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceDetail.process.map((step, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{step}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </section>
                {/* Chi tiết dịch vụ bổ sung nếu có */}
                {serviceDetail.detail && (
                    <Box>
                        <h3>Chi tiết dịch vụ</h3>
                        <div>{serviceDetail.detail}</div>
                    </Box>
                )}
                {serviceDetail.moreInfo && (
                    <Box>
                        <h3>Thông tin bổ sung</h3>
                        <div>{serviceDetail.moreInfo}</div>
                    </Box>
                )}
                <BackSection>
                    <BackLink as={Link} to={getBackUrl()}>← Quay lại danh sách dịch vụ</BackLink>
                </BackSection>
            </Main>
            <Footer />
        </>
    );
};

export default ChiTietDichVu;
