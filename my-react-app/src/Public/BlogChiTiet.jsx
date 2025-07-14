import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import HeaderCustomer from '../components/HeaderCustomer';
import HeaderGuest from '../components/HeaderGuest';
import Footer from '../components/Footer';

// Dữ liệu tất cả blog chi tiết
const BLOG_DATA = {
    '1': {
        id: '1',
        title: 'CHU KÌ KINH NGUYỆT LÀ GÌ?',
        shortTitle: 'Chu kỳ kinh nguyệt là gì?',
        date: '1 tháng trước',
        image: 'https://i.postimg.cc/VNWkMvYr/chu-k.png',
        content: `
      <h2>Chu kỳ kinh nguyệt là gì?</h2>
      <p>Chu kỳ kinh nguyệt là quá trình sinh lý tự nhiên của phụ nữ, điều khiển bởi hormone estrogen và progesterone. Mỗi chu kỳ, lớp nội mạc tử cung dày lên để chuẩn bị mang thai. Nếu không thụ tinh, lớp này sẽ bong ra dưới dạng máu kinh.</p>
      
      <h2>Chu kỳ bình thường là bao nhiêu ngày?</h2>
      <p>Một chu kỳ bình thường kéo dài 28 ngày, nhưng có thể dao động từ 21-35 ngày. Quan trọng nhất là sự đều đặn giữa các chu kỳ.</p>
      <p>Ví dụ: Bắt đầu ngày 1/6 và chu kỳ tiếp theo bắt đầu ngày 29/6 ⇒ Chu kỳ dài 28 ngày.</p>
      <h2>Các giai đoạn của chu kỳ kinh nguyệt</h2>
      <ul>
        <li><strong>Giai đoạn kinh nguyệt (1-5 ngày):</strong> Lớp nội mạc tử cung bong ra, gây chảy máu</li>
        <li><strong>Giai đoạn nang trứng (6-14 ngày):</strong> Nang trứng phát triển, estrogen tăng</li>
        <li><strong>Giai đoạn rụng trứng (14-15 ngày):</strong> Trứng được giải phóng khỏi buồng trứng</li>
        <li><strong>Giai đoạn hoàng thể (16-28 ngày):</strong> Progesterone tăng, chuẩn bị cho thai kỳ</li>
      </ul>
      <h2>Triệu chứng bình thường trong chu kỳ</h2>
      <ul>
        <li>Đau bụng nhẹ đến trung bình</li> <li>Thay đổi tâm trạng</li> <li>Mệt mỏi, đau lưng</li> <li>Ngực căng tức</li> <li>Thèm ăn hoặc chán ăn</li>
      </ul>
      <h2>Khi nào cần đi khám?</h2>
      <ul>
        <li>Chu kỳ quá ngắn (dưới 21 ngày) hoặc quá dài (trên 35 ngày)</li> <li>Ra máu nhiều, đau dữ dội ảnh hưởng sinh hoạt</li> <li>Mất kinh trên 3 tháng</li>
        <li>Chu kỳ không đều đặn</li> <li>Xuất hiện máu giữa chu kỳ</li>
      </ul>
      
      <h2>Cách theo dõi chu kỳ</h2>
      <p>Ghi chép ngày bắt đầu kinh nguyệt mỗi tháng để tính toán chu kỳ và phát hiện bất thường sớm.</p>
      
      <div class="alert-box">
        <strong>Lưu ý:</strong> Theo dõi chu kỳ giúp phát hiện sớm các bất thường về sức khỏe sinh sản và tăng khả năng thụ thai.
      </div>
    `
    },
    '2': {
        id: '2',
        title: 'HƯỚNG DẪN ĐỌC KẾT QUẢ XÉT NGHIỆM HPV',
        shortTitle: 'Hướng dẫn đọc kết quả xét nghiệm HPV',
        date: '1 tuần trước',
        image: 'https://i.postimg.cc/bJCVTgrB/H-nh-tin-t-c-8.jpg',
        content: `
      <h2>HPV là gì?</h2>
      <p>HPV (Human Papillomavirus) là virus lây truyền qua đường tình dục, có thể gây ung thư cổ tử cung và mụn cóc sinh dục. Có hơn 100 loại HPV, trong đó 14 loại có nguy cơ cao gây ung thư.</p>
      
      <h2>Các loại xét nghiệm HPV</h2>
      <ul>
        <li><strong>Xét nghiệm HPV DNA:</strong> Phát hiện sự hiện diện của virus</li>
        <li><strong>Xét nghiệm HPV RNA:</strong> Phát hiện hoạt động của virus</li>
        <li><strong>Xét nghiệm định type:</strong> Xác định chính xác loại HPV</li>
      </ul>
      
      <h2>Cách đọc kết quả xét nghiệm HPV</h2>
      <ul>
        <li><strong>Âm tính:</strong> Không phát hiện virus nguy cơ cao. Cần tái khám định kỳ theo lịch.</li>
        <li><strong>Dương tính:</strong> Có virus nguy cơ cao, cần theo dõi và tái khám định kỳ.</li>
        <li><strong>Không xác định:</strong> Cần làm lại xét nghiệm sau 3-6 tháng.</li>
      </ul>
      
      <h2>Các type HPV nguy hiểm</h2>
      <ul>
        <li><strong>Type 16, 18:</strong> Nguy cơ cao nhất gây ung thư cổ tử cung</li>
        <li><strong>Type 31, 33, 45, 52, 58:</strong> Nguy cơ cao</li>
        <li><strong>Type 6, 11:</strong> Gây mụn cóc sinh dục, ít nguy cơ ung thư</li>
      </ul>
      
      <h2>Khi nào cần xét nghiệm HPV?</h2>
      <ul>
        <li>Phụ nữ từ 25-65 tuổi</li>
        <li>Có kết quả Pap smear bất thường</li>
        <li>Tiền sử nhiễm HPV</li>
        <li>Quan hệ tình dục không an toàn</li>
      </ul>
      
      <h2>Điều trị sau khi nhiễm HPV</h2>
      <p>Không có thuốc điều trị đặc hiệu cho HPV. Hệ miễn dịch có thể tự loại bỏ virus trong 1-2 năm. Cần theo dõi định kỳ và điều trị các tổn thương tiền ung thư nếu có.</p>
      
      <div class="alert-box">
        <strong>Lưu ý:</strong> Kết quả dương tính không đồng nghĩa bị ung thư, nhưng cần theo dõi sát và tái khám định kỳ theo chỉ định của bác sĩ.
      </div>
    `
    },
    '3': {
        id: '3',
        title: 'CÁC BỆNH TÌNH DỤC NỮ LÀ GÌ? DẤU HIỆU BỆNH',
        shortTitle: 'Bệnh lý thường gặp ở nữ giới',
        date: '2 tuần trước',
        image: 'https://i.postimg.cc/YqB2XQhG/B-nh-n.png',
        content: `
      <h2>Các bệnh phụ khoa phổ biến</h2>
      
      <h3>1. Viêm âm đạo</h3>
      <p><strong>Nguyên nhân:</strong> Nhiễm nấm Candida, vi khuẩn, ký sinh trùng</p>
      <p><strong>Triệu chứng:</strong> Ngứa, khí hư bất thường, đau rát khi quan hệ</p>
      <p><strong>Điều trị:</strong> Thuốc kháng nấm, kháng sinh theo chỉ định</p>
      
      <h3>2. Viêm cổ tử cung</h3>
      <p><strong>Nguyên nhân:</strong> Nhiễm khuẩn, chlamydia, lậu</p>
      <p><strong>Triệu chứng:</strong> Đau bụng dưới, ra máu bất thường, khí hư nhiều</p>
      <p><strong>Điều trị:</strong> Kháng sinh, điều trị bạn tình</p>
      
      <h3>3. U xơ tử cung</h3>
      <p><strong>Nguyên nhân:</strong> Tăng sinh mô cơ tử cung do hormone</p>
      <p><strong>Triệu chứng:</strong> Rong kinh, đau bụng kinh, tiểu nhiều</p>
      <p><strong>Điều trị:</strong> Thuốc hormone, phẫu thuật nếu cần</p>
      
      <h3>4. Lạc nội mạc tử cung</h3>
      <p><strong>Nguyên nhân:</strong> Mô nội mạc phát triển ngoài tử cung</p>
      <p><strong>Triệu chứng:</strong> Đau vùng chậu, đau khi quan hệ, khó thụ thai</p>
      <p><strong>Điều trị:</strong> Thuốc giảm đau, hormone, phẫu thuật</p>
      
      <h3>5. Hội chứng buồng trứng đa nang (PCOS)</h3>
      <p><strong>Nguyên nhân:</strong> Rối loạn hormone, kháng insulin</p>
      <p><strong>Triệu chứng:</strong> Rối loạn kinh nguyệt, tăng cân, mụn, rậm lông</p>
      <p><strong>Điều trị:</strong> Thuốc điều chỉnh hormone, thay đổi lối sống</p>
      
      <h2>Phòng ngừa bệnh phụ khoa</h2>
      <ul>
        <li>Vệ sinh vùng kín đúng cách</li> <li>Quan hệ tình dục an toàn</li> <li>Khám phụ khoa định kỳ 6-12 tháng/lần</li>
        <li>Tiêm vaccine HPV</li> <li>Duy trì cân nặng hợp lý</li>
      </ul>
      
      <h2>Dấu hiệu cần đi khám ngay</h2>
      <ul>
        <li>Ra máu bất thường</li> <li>Đau bụng dữ dội</li> <li>Khí hư có mùi hôi</li> <li>Ngứa rát kéo dài</li> <li>Đau khi quan hệ</li>
      </ul>
      
      <div class="alert-box">
        <strong>Lưu ý:</strong> Khám phụ khoa định kỳ giúp phát hiện sớm và điều trị hiệu quả các bệnh phụ khoa.
      </div>
    `
    },
    '4': {
        id: '4',
        title: 'CÁC BỆNH TÌNH DỤC NAM LÀ GÌ? DẤU HIỆU BỆNH',
        shortTitle: 'Bệnh lý thường gặp ở nam giới',
        date: '2 tuần trước',
        image: 'https://i.postimg.cc/WznywRd7/B-nh-nam.png',
        content: `
      <h2>Các bệnh nam khoa thường gặp</h2>
      
      <h3>1. Viêm niệu đạo</h3>
      <p><strong>Nguyên nhân:</strong> Nhiễm khuẩn lậu, chlamydia, E.coli</p>
      <p><strong>Triệu chứng:</strong> Tiểu buốt, tiểu rắt, tiểu ra mủ</p>
      <p><strong>Điều trị:</strong> Kháng sinh theo kháng sinh đồ</p>
      
      <h3>2. Viêm tuyến tiền liệt</h3>
      <p><strong>Nguyên nhân:</strong> Nhiễm khuẩn, ứ đọng nước tiểu</p>
      <p><strong>Triệu chứng:</strong> Đau vùng chậu, tiểu khó, tiểu đêm</p>
      <p><strong>Điều trị:</strong> Kháng sinh, thuốc giãn cơ</p>
      
      <h3>3. Ung thư tuyến tiền liệt</h3>
      <p><strong>Nguyên nhân:</strong> Tuổi tác, di truyền, hormone</p>
      <p><strong>Triệu chứng:</strong> Tiểu đêm, tiểu ra máu, đau xương</p>
      <p><strong>Điều trị:</strong> Phẫu thuật, xạ trị, hormone</p>
      
      <h3>4. Rối loạn cương dương</h3>
      <p><strong>Nguyên nhân:</strong> Bệnh tim mạch, tiểu đường, stress</p>
      <p><strong>Triệu chứng:</strong> Khó duy trì sự cương cứng</p>
      <p><strong>Điều trị:</strong> Thuốc hỗ trợ, điều trị nguyên nhân</p>
      
      <h3>5. Giãn tĩnh mạch thừng tinh</h3>
      <p><strong>Nguyên nhân:</strong> Suy van tĩnh mạch tinh hoàn</p>
      <p><strong>Triệu chứng:</strong> Đau tinh hoàn, sưng bìu</p>
      <p><strong>Điều trị:</strong> Phẫu thuật thắt tĩnh mạch</p>
      
      <h3>6. Viêm tinh hoàn</h3>
      <p><strong>Nguyên nhân:</strong> Nhiễm virus quai bị, vi khuẩn</p>
      <p><strong>Triệu chứng:</strong> Sưng đau tinh hoàn, sốt</p>
      <p><strong>Điều trị:</strong> Kháng sinh, thuốc giảm đau</p>
      
      <h2>Phòng ngừa bệnh nam khoa</h2>
      <ul>
        <li>Vệ sinh bộ phận sinh dục sạch sẽ</li> <li>Quan hệ tình dục an toàn</li>
        <li>Khám sức khỏe định kỳ</li> <li>Duy trì cân nặng hợp lý</li> <li>Tránh hút thuốc, uống rượu quá mức</li>
      </ul>
      
      <h2>Dấu hiệu cần đi khám ngay</h2>
      <ul>
        <li>Tiểu ra máu</li> <li>Đau tinh hoàn dữ dội</li>
        <li>Sưng bìu</li> <li>Tiểu khó kéo dài</li> <li>Rối loạn cương dương</li>
      </ul>
      
      <div class="alert-box">
        <strong>Lưu ý:</strong> Chủ động khám sức khỏe nam khoa để phòng ngừa biến chứng và phát hiện sớm các bệnh lý.
      </div>
    `
    },
    '5': {
        id: '5',
        title: 'BỆNH HERPES LÂY QUA ĐƯỜNG NÀO?',
        shortTitle: 'Herpes sinh dục',
        date: '3 tuần trước',
        image: 'https://i.postimg.cc/SNjR5c4m/Herpes.png',
        content: `
      <h2>Herpes sinh dục là gì?</h2>
      <p>Bệnh lây truyền qua đường tình dục do virus HSV (Herpes Simplex Virus) gây ra, biểu hiện bằng mụn nước đau ở vùng sinh dục. Có 2 loại HSV: HSV-1 (thường gây herpes môi) và HSV-2 (thường gây herpes sinh dục).</p>
      
      <h2>Nguyên nhân lây nhiễm</h2>
      <ul>
        <li>Quan hệ tình dục không an toàn</li>
        <li>Tiếp xúc trực tiếp với vết loét herpes</li>
        <li>Lây từ mẹ sang con khi sinh</li>
        <li>Dùng chung đồ dùng cá nhân</li>
      </ul>
      
      <h2>Triệu chứng</h2>
      <h3>Triệu chứng ban đầu (lần đầu nhiễm):</h3>
      <p> Mụn nước nhỏ, đau rát ở vùng sinh dục. Ngứa, cảm giác châm chích. Sốt, đau cơ, sưng hạch bẹn. Đau khi đi tiểu. Vết loét có thể kéo dài 2-4 tuần
      </p>
      <h2>Tái phát</h2>
      <ul>
        <li>Nhẹ hơn lần đầu</li>
        <li>Thường ở cùng vị trí</li>
        <li>Kéo dài 3-7 ngày</li>
      </ul>
      
      <h2>Điều trị</h2>
      <p>Chưa có thuốc chữa khỏi hoàn toàn herpes, nhưng có thể kiểm soát triệu chứng và giảm tần suất tái phát:</p>
    
      <h3>Điều trị theo giai đoạn:</h3>
      <ul>
        <li><strong>Lần đầu:</strong> Thuốc kháng virus 7-10 ngày</li>
        <li><strong>Tái phát:</strong> Thuốc kháng virus 3-5 ngày</li>
        <li><strong>Ức chế:</strong> Thuốc kháng virus liều thấp hàng ngày</li>
      </ul>
      
      <h2>Biến chứng</h2>
      <ul>
        <li>Lây truyền cho bạn tình</li>
        <li>Lây từ mẹ sang con khi sinh</li>
        <li>Tăng nguy cơ nhiễm HIV</li>
        <li>Viêm màng não herpes</li>
        <li>Loét giác mạc (herpes mắt)</li>
      </ul>
      
      <h2>Phòng ngừa</h2>
      <ul>
        <li>Sử dụng bao cao su đúng cách</li>
        <li>Tránh quan hệ khi có triệu chứng</li>
        <li>Không dùng chung đồ dùng cá nhân</li>
        <li>Thông báo cho bạn tình</li>
        <li>Khám sức khỏe định kỳ</li>
      </ul>
      
      <div class="alert-box">
        <strong>Lưu ý:</strong> Quan hệ an toàn để phòng tránh lây nhiễm. Người nhiễm herpes vẫn có thể sống khỏe mạnh với điều trị đúng cách.
      </div>
    `
    },
    '6': {
        id: '6',
        title: 'NHIỄM HPV CÓ MANG THAI ĐƯỢC KHÔNG?',
        shortTitle: 'HPV có mang thai được không?',
        date: '1 tháng trước',
        image: 'https://i.postimg.cc/J4SNY6j3/Mang-Thai.png',
        content: `
      <h2>HPV và khả năng mang thai</h2>
      <p>HPV thường không ảnh hưởng trực tiếp đến khả năng thụ thai, nhưng có thể làm tăng nguy cơ biến chứng thai kỳ như sinh non, lây truyền cho trẻ sơ sinh.</p>
      
      <h2>Ảnh hưởng của HPV đến thai kỳ</h2>
      
      <h3>Trước khi mang thai:</h3>
      <ul>
        <li>HPV có thể gây tổn thương cổ tử cung</li>
        <li>Làm tăng nguy cơ sảy thai</li>
        <li>Ảnh hưởng đến chất lượng trứng</li>
      </ul>
      
      <h3>Trong thai kỳ:</h3>
      <ul>
        <li>Hormone thai kỳ có thể làm HPV hoạt động mạnh hơn</li>
        <li>Tăng nguy cơ sinh non</li>
        <li>Có thể lây truyền cho trẻ sơ sinh</li>
        <li>Gây u nhú thanh quản ở trẻ</li>
      </ul>
      
      <h2>Chẩn đoán HPV khi mang thai</h2>
      <ul>
        <li><strong>Khám phụ khoa:</strong> Quan sát tổn thương</li>
        <li><strong>Xét nghiệm Pap smear:</strong> Phát hiện tế bào bất thường</li>
        <li><strong>Xét nghiệm HPV:</strong> Xác định type virus</li>
        <li><strong>Soi cổ tử cung:</strong> Quan sát chi tiết tổn thương</li>
      </ul>
      
      <h2>Điều trị HPV khi mang thai</h2>
      
      <h3>Nguyên tắc điều trị:</h3>
      <ul>
        <li>Ưu tiên theo dõi nếu tổn thương nhẹ</li>
        <li>Điều trị tích cực nếu có tổn thương nặng</li>
        <li>Tránh điều trị trong 3 tháng đầu thai kỳ</li>
        <li>Phẫu thuật chỉ khi thực sự cần thiết</li>
      </ul>
      
      <h3>Phương pháp điều trị:</h3>
      <ul>
        <li><strong>Đốt điện:</strong> Điều trị tổn thương cổ tử cung</li>
        <li><strong>Laser:</strong> Loại bỏ tổn thương</li>
        <li><strong>Thuốc bôi:</strong> Điều trị mụn cóc sinh dục</li>
      </ul>
      
      <h2>Lời khuyên cho phụ nữ nhiễm HPV</h2>
      
      <h3>Trước khi mang thai:</h3>
      <ul>
        <li>Điều trị HPV triệt để</li>
        <li>Khám sức khỏe tổng quát</li>
        <li>Tiêm vaccine HPV nếu chưa tiêm</li>
        <li>Tham khảo ý kiến bác sĩ chuyên khoa</li>
      </ul>
      
      <h3>Trong thai kỳ:</h3>
      <ul>
        <li>Khám thai định kỳ</li>
        <li>Theo dõi sát tổn thương HPV</li>
        <li>Báo cáo mọi thay đổi bất thường</li>
        <li>Chuẩn bị tâm lý cho sinh nở</li>
      </ul>
      
      <h3>Sau sinh:</h3>
      <ul>
        <li>Điều trị HPV tiếp tục</li>
        <li>Khám sức khỏe định kỳ</li>
        <li>Theo dõi sức khỏe trẻ sơ sinh</li>
      </ul>
      
      <h2>Phòng ngừa lây truyền cho trẻ</h2>
      <ul>
        <li>Điều trị HPV trước khi sinh</li>
        <li>Khám sức khỏe thai kỳ đầy đủ</li>
        <li>Chọn phương pháp sinh phù hợp</li>
        <li>Theo dõi sức khỏe trẻ sau sinh</li>
      </ul>
      
      <div class="alert-box">
        <strong>Lưu ý:</strong> Nên điều trị HPV trước khi mang thai và tuân thủ hướng dẫn của bác sĩ để đảm bảo an toàn cho cả mẹ và bé.
      </div>
    `
    },
    '7': {
        id: '7',
        title: 'SINH LÝ NỮ GIỚI TUỔI MÃN KINH THAY ĐỔI THẾ NÀO?',
        shortTitle: 'Sinh lý nữ giới tuổi mãn kinh',
        date: '1 tuần trước',
        image: 'https://i.postimg.cc/cLwjSfkv/H-nh-tin-t-c-7.jpg',
        content: `
      <h2>Mãn kinh là gì?</h2>
      <p>Mãn kinh là giai đoạn tự nhiên khi buồng trứng ngừng hoạt động, kinh nguyệt dừng lại và khả năng sinh sản kết thúc. Thường xảy ra ở phụ nữ 45-55 tuổi.</p>
      
      <h2>Các giai đoạn của mãn kinh</h2>
      
      <h3>1. Tiền mãn kinh:</h3>
      <ul>
        <li>Bắt đầu 2-8 năm trước mãn kinh</li>
        <li>Kinh nguyệt không đều</li>
        <li>Bắt đầu có triệu chứng bốc hỏa, mất ngủ</li>
      </ul>
      
      <h3>2. Mãn kinh:</h3>
      <ul>
        <li>Kinh nguyệt dừng hoàn toàn trong 12 tháng liên tiếp</li>
        <li>Buồng trứng ngừng sản xuất hormone</li>
        <li>Không còn khả năng sinh sản</li>
      </ul>
      
      <h3>3. Hậu mãn kinh:</h3>
      <ul>
        <li>Giai đoạn sau khi mãn kinh</li>
        <li>Nồng độ hormone ổn định ở mức thấp</li>
        <li>Tăng nguy cơ các bệnh liên quan đến thiếu estrogen</li>
      </ul>
      
      <h2>Thay đổi sinh lý chính</h2>
      
      <h3>Thay đổi hormone:</h3>
      <ul>
        <li><strong>Estrogen:</strong> Giảm mạnh, gây bốc hỏa, đổ mồ hôi đêm</li>
        <li><strong>Progesterone:</strong> Giảm, ảnh hưởng chu kỳ kinh nguyệt</li>
        <li><strong>FSH và LH:</strong> Tăng cao do cơ thể cố gắng kích thích buồng trứng</li>
      </ul>
      
      <h3>Thay đổi hệ sinh dục:</h3>
      <ul>
        <li><strong>Âm đạo:</strong> Khô, teo, dễ viêm nhiễm, đau khi quan hệ</li>
        <li><strong>Tử cung:</strong> Teo nhỏ, giảm kích thước</li>
        <li><strong>Buồng trứng:</strong> Ngừng hoạt động, teo nhỏ</li>
      </ul>
      
      <h3>Thay đổi hệ tim mạch:</h3>
        <li>Tăng cholesterol xấu, giảm cholesterol tốt, tăng huyết áp, nguy cơ bệnh tim mạch</li>
      
      <h3>Thay đổi hệ xương:</h3>
        <li>Loãng xương do thiếu estrogen => tăng nguy cơ gãy xương</li

      <h3>Thay đổi hệ thần kinh:</h3>
      <ul>
        <li>Bốc hỏa, đổ mồ hôi đêm</li>
        <li>Mất ngủ, thay đổi tâm trạng</li>
        <li>Giảm trí nhớ, khó tập trung</li>
      </ul>
      
      <h3>Thay đổi hệ tiết niệu:</h3>
        <li>Sa tiểu không tự chủ, tiểu gấp, sa tử cung, sa bàng quang</li>
      
      <h2>Triệu chứng thường gặp</h2>
      
      <h3>Triệu chứng sớm:</h3>
      <ul>
        <li>Kinh nguyệt không đều</li>
        <li>Bốc hỏa nhẹ</li>
        <li>Mất ngủ, thay đổi tâm trạng</li>
      </ul>
      
      <h3>Triệu chứng trong giai đoạn mãn kinh:</h3>
      <ul>
        <li>Bốc hỏa nặng, có thể kéo dài 2-10 năm</li>
        <li>Đổ mồ hôi đêm</li>
        <li>Khô âm đạo, đau khi quan hệ</li>
        <li>Giảm ham muốn tình dục</li>
        <li>Mệt mỏi, thiếu năng lượng</li>
        <li>Khó tập trung, giảm trí nhớ</li>
        <li>Tăng cân, đặc biệt ở vùng bụng</li>
      </ul>
      
      <h2>Chẩn đoán</h2>
      <ul>
        <li>Không có kinh nguyệt trong 12 tháng liên tiếp</li>
        <li>Có các triệu chứng điển hình</li>
        <li>Tuổi phù hợp (45-55 tuổi)</li>
        <li>Xét nghiệm FSH tăng cao (>25 mIU/ml)</li>
        <li>Estradiol giảm thấp (<20 pg/ml)</li>
      </ul>
      
      <h2>Điều trị và quản lý</h2>
      
      <h3>Liệu pháp hormone thay thế (HRT):</h3>
      <ul>
        <li>Bổ sung estrogen và progesterone</li>
        <li>Giảm triệu chứng bốc hỏa, khô âm đạo</li>
        <li>Phòng ngừa loãng xương</li>
        <li>Cần tham khảo ý kiến bác sĩ</li>
      </ul>
      
      <h3>Điều trị không dùng hormone:</h3>
      <ul>
        <li>Thuốc chống trầm cảm giảm bốc hỏa</li>
        <li>Thuốc bôi estrogen giảm khô âm đạo</li>
      </ul>
      
      <h3>Thay đổi lối sống:</h3>
      <ul>
        <li>Ăn nhiều rau xanh, trái cây, ngũ cốc nguyên hạt</li>
        <li>Bổ sung canxi, vitamin D, omega-3</li>
        <li>Tập thể dục: đi bộ, yoga, bơi lội</li>
        <li>Quản lý stress: thiền, hít thở sâu</li>
        <li>Ngủ đủ giấc 7-8 giờ/ngày</li>
      </ul>
      
      <h2>Biến chứng</h2>
      
      <h3>Biến chứng ngắn hạn:</h3>
      <ul>
        <li>Trầm cảm, lo âu</li>
        <li>Rối loạn giấc ngủ</li>
        <li>Giảm chất lượng cuộc sống</li>
      </ul>
      
      <h3>Biến chứng dài hạn:</h3>
      <ul>
        <li><strong>Loãng xương:</strong> Tăng nguy cơ gãy xương</li>
        <li><strong>Bệnh tim mạch:</strong> Tăng cholesterol, huyết áp</li>
        <li><strong>Sa tử cung:</strong> Do yếu cơ sàn chậu</li>
      </ul>
      
      <h2>Lời khuyên</h2>
      
      <h3>Chăm sóc sức khỏe:</h3>
      <ul>
        <li>Khám sức khỏe định kỳ 6-12 tháng/lần</li>
        <li>Đo mật độ xương định kỳ</li>
        <li>Kiểm tra cholesterol, huyết áp</li>
        <li>Khám phụ khoa định kỳ</li>
      </ul>
      
      <h3>Dinh dưỡng:</h3>
      <ul>
        <li>Ăn nhiều rau xanh, trái cây</li>
        <li>Bổ sung canxi 1200mg/ngày</li>
        <li>Vitamin D 800-1000 IU/ngày</li>
        <li>Hạn chế muối, đường, chất béo</li>
      </ul>
      
      <h3>Tập thể dục:</h3>
      <ul>
        <li>Tập thể dục 150 phút/tuần</li>
        <li>Tập sức mạnh 2-3 lần/tuần</li>
        <li>Yoga, pilates để tăng cường cơ sàn chậu</li>
        <li>Đi bộ, bơi lội</li>
      </ul>
      
      <div class="alert-box">
        <strong>Lưu ý:</strong> Mãn kinh là giai đoạn tự nhiên, không phải bệnh. Với chăm sóc đúng cách, phụ nữ vẫn có thể sống khỏe mạnh và hạnh phúc trong giai đoạn này.
      </div>
    `
    },
    '8': {
        id: '8',
        title: 'U XƠ TỬ CUNG CÓ NGUY HIỂM KHÔNG?',
        shortTitle: 'U xơ tử cung có nguy hiểm không',
        date: '1 tuần trước',
        image: 'https://i.postimg.cc/nzLXJ07F/images-3.jpg',
        content: `
      <h2>U xơ tử cung là gì?</h2>
      <p>U xơ tử cung là khối u lành tính phát triển từ cơ tử cung. Đây là bệnh phụ khoa phổ biến, ảnh hưởng đến 20-80% phụ nữ trong độ tuổi sinh sản.</p>
      
      <h2>Nguyên nhân</h2>
      <ul>
        <li>Rối loạn hormone estrogen và progesterone</li>
        <li>Yếu tố di truyền</li>
        <li>Tuổi tác (thường gặp ở phụ nữ 30-50 tuổi)</li>
        <li>Béo phì</li>
        <li>Chưa sinh con</li>
      </ul>
      
      <h2>Triệu chứng</h2>
      
      <h3>Triệu chứng thường gặp:</h3>
      <ul>
        <li>Rong kinh, rong huyết</li>
        <li>Đau bụng kinh dữ dội</li>
        <li>Đau vùng chậu</li>
        <li>Tiểu nhiều, tiểu gấp</li>
        <li>Táo bón</li>
        <li>Đau khi quan hệ tình dục</li>
      </ul>
      
      <h3>Triệu chứng nặng:</h3>
      <ul>
        <li>Thiếu máu do mất máu nhiều</li>
        <li>Khó thụ thai</li>
        <li>Sảy thai</li>
        <li>Sinh non</li>
      </ul>
      
      <h2>Chẩn đoán</h2>
      <ul>
        <li>Khám phụ khoa</li>
        <li>Siêu âm tử cung</li>
        <li>Chụp MRI (nếu cần)</li>
        <li>Sinh thiết (hiếm khi cần)</li>
      </ul>
      
      <h2>Điều trị</h2>
      
      <h3>Điều trị nội khoa:</h3>
      <ul>
        <li>Thuốc giảm đau: ibuprofen, paracetamol</li>
        <li>Thuốc hormone: thuốc tránh thai, progestin</li>
        <li>Thuốc ức chế hormone: GnRH agonists</li>
      </ul>
      
      <h3>Điều trị ngoại khoa:</h3>
      <ul>
        <li>Phẫu thuật bóc tách u xơ</li>
        <li>Cắt tử cung (trong trường hợp nặng)</li>
        <li>Thuyên tắc động mạch tử cung</li>
        <li>Đốt sóng cao tần</li>
      </ul>
      
      <h2>Biến chứng</h2>
      <ul>
        <li>Thiếu máu nặng</li>
        <li>Vô sinh</li>
        <li>Biến chứng thai kỳ</li>
        <li>Nhiễm trùng</li>
        <li>Xoắn u xơ (hiếm gặp)</li>
      </ul>
      
      <h2>Phòng ngừa</h2>
      <ul>
        <li>Khám phụ khoa định kỳ</li>
        <li>Duy trì cân nặng hợp lý</li>
        <li>Ăn nhiều rau xanh, trái cây</li>
        <li>Tập thể dục đều đặn</li>
        <li>Tránh stress</li>
      </ul>
      
      <h2>Khi nào cần đi khám</h2>
      <ul>
        <li>Rong kinh, rong huyết kéo dài</li>
        <li>Đau bụng kinh dữ dội</li>
        <li>Đau vùng chậu</li>
        <li>Khó thụ thai</li>
        <li>Triệu chứng ảnh hưởng sinh hoạt</li>
      </ul>
      
      <div class="alert-box">
        <strong>Lưu ý:</strong> U xơ tử cung thường lành tính nhưng cần theo dõi và điều trị kịp thời để tránh biến chứng. Khám phụ khoa định kỳ giúp phát hiện sớm.
      </div>
    `
    },
    '9': {
        id: '9',
        title: 'CÁCH PHÂN BIỆT CẢM CÚM VÀ CẢM LẠNH',
        shortTitle: 'Cách phân biệt cảm cúm và cảm lạnh',
        date: '1 tuần trước',
        image: 'https://i.postimg.cc/Rh6q3hX2/images-4.jpg',
        content: `
      <h2>Phân biệt cảm cúm và cảm lạnh</h2>
      <p>Cảm lạnh và cảm cúm đều do virus gây ra nhưng có mức độ nghiêm trọng khác nhau. Cảm lạnh thường nhẹ, cảm cúm có thể gây biến chứng nặng.</p>
      
      <h2>Điểm khác biệt chính</h2>
      
      <h3>Cảm lạnh:</h3>
      <ul>
        <li><strong>Nguyên nhân:</strong> Rhinovirus, coronavirus</li>
        <li><strong>Khởi phát:</strong> Từ từ, triệu chứng nhẹ</li>
        <li><strong>Sốt:</strong> Hiếm gặp hoặc nhẹ</li>
        <li><strong>Triệu chứng:</strong> Nghẹt mũi, hắt hơi, đau họng nhẹ</li>
        <li><strong>Thời gian:</strong> 7-10 ngày</li>
      </ul>
      
      <h3>Cảm cúm:</h3>
      <ul>
        <li><strong>Nguyên nhân:</strong> Virus cúm A, B, C</li>
        <li><strong>Khởi phát:</strong> Đột ngột, triệu chứng nặng</li>
        <li><strong>Sốt:</strong> Cao (38-40°C), kéo dài</li>
        <li><strong>Triệu chứng:</strong> Đau cơ, đau đầu, mệt mỏi nặng</li>
        <li><strong>Thời gian:</strong> 1-2 tuần</li>
      </ul>
      
      <h2>Bảng so sánh nhanh</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f3f4f6;">
          <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left;">Triệu chứng</th>
          <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left;">Cảm lạnh</th>
          <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left;">Cảm cúm</th>
        </tr>
        <tr>
          <td style="border: 1px solid #d1d5db; padding: 12px;"><strong>Sốt</strong></td>
          <td style="border: 1px solid #d1d5db; padding: 12px;">Hiếm, nhẹ</td>
          <td style="border: 1px solid #d1d5db; padding: 12px;">Cao, kéo dài</td>
        </tr>
        <tr style="background-color: #f9fafb;">
          <td style="border: 1px solid #d1d5db; padding: 12px;"><strong>Đau cơ</strong></td>
          <td style="border: 1px solid #d1d5db; padding: 12px;">Nhẹ</td>
          <td style="border: 1px solid #d1d5db; padding: 12px;">Nặng</td>
        </tr>
        <tr>
          <td style="border: 1px solid #d1d5db; padding: 12px;"><strong>Mệt mỏi</strong></td>
          <td style="border: 1px solid #d1d5db; padding: 12px;">Nhẹ</td>
          <td style="border: 1px solid #d1d5db; padding: 12px;">Nặng, kéo dài</td>
        </tr>
        <tr style="background-color: #f9fafb;">
          <td style="border: 1px solid #d1d5db; padding: 12px;"><strong>Nghẹt mũi</strong></td>
          <td style="border: 1px solid #d1d5db; padding: 12px;">Phổ biến</td>
          <td style="border: 1px solid #d1d5db; padding: 12px;">Ít gặp</td>
        </tr>
        <tr>
          <td style="border: 1px solid #d1d5db; padding: 12px;"><strong>Biến chứng</strong></td>
          <td style="border: 1px solid #d1d5db; padding: 12px;">Hiếm</td>
          <td style="border: 1px solid #d1d5db; padding: 12px;">Có thể nặng</td>
        </tr>
      </table>
      
      <h2>Điều trị</h2>
      
      <h3>Cảm lạnh:</h3>
      <ul>
        <li>Nghỉ ngơi, uống nhiều nước</li>
        <li>Thuốc giảm triệu chứng</li>
        <li>Vitamin C tăng cường miễn dịch</li>
      </ul>
      
      <h3>Cảm cúm:</h3>
      <ul>
        <li>Thuốc kháng virus (trong 48 giờ đầu)</li>
        <li>Nghỉ ngơi tuyệt đối</li>
        <li>Theo dõi biến chứng</li>
      </ul>
      
      <h2>Phòng ngừa</h2>
      <ul>
        <li>Rửa tay thường xuyên</li>
        <li>Tránh tiếp xúc người bệnh</li>
        <li>Tiêm vaccine cúm hàng năm</li>
        <li>Ăn đủ chất, ngủ đủ giấc</li>
      </ul>
      
      <h2>Khi nào cần đi khám</h2>
      <ul>
        <li>Sốt cao kéo dài</li>
        <li>Khó thở, đau ngực</li>
        <li>Triệu chứng nặng không cải thiện</li>
        <li>Người già, trẻ em, phụ nữ mang thai</li>
      </ul>
      
      <div class="alert-box">
        <strong>Lưu ý:</strong> Cảm cúm có thể gây biến chứng nghiêm trọng. Không tự ý dùng kháng sinh vì cả hai bệnh đều do virus gây ra.
      </div>
    `
    },
    '10': {
        id: '10',
        title: 'PHÒNG TRÁNH BỆNH LÂY QUA ĐƯỜNG MÁU',
        shortTitle: 'Phòng tránh bệnh lây qua đường máumáu',
        date: '1 tuần trước',
        image: 'https://i.postimg.cc/fyGyYsPy/images-5.jpg',
        content: `
      <h2>Bệnh lây truyền qua đường tình dục (STD)</h2>
      <p>STD là các bệnh lây qua quan hệ tình dục không an toàn. Có hơn 30 loại STD khác nhau, bao gồm virus, vi khuẩn, ký sinh trùng và nấm. Nhiều bệnh không có triệu chứng rõ ràng nhưng có thể gây biến chứng nghiêm trọng.</p>
      
      <h2>Các bệnh STD phổ biến</h2>
      
      <h3>1. Bệnh do virus:</h3>
      <ul>
        <li><strong>HIV/AIDS:</strong> Suy giảm miễn dịch</li>
        <li><strong>HPV:</strong> Ung thư cổ tử cung, mụn cóc sinh dục</li>
        <li><strong>Herpes:</strong> Mụn nước đau ở vùng sinh dục</li>
        <li><strong>Hepatitis B:</strong> Viêm gan B</li>
      </ul>
      
      <h3>2. Bệnh do vi khuẩn:</h3>
      <ul>
        <li><strong>Lậu:</strong> Viêm niệu đạo, tiết dịch</li>
        <li><strong>Giang mai:</strong> Loét, phát ban, tổn thương thần kinh</li>
        <li><strong>Chlamydia:</strong> Viêm cổ tử cung, ống dẫn trứng</li>
        <li><strong>Trichomonas:</strong> Viêm âm đạo, ngứa</li>
      </ul>
      
      <h3>3. Bệnh do ký sinh trùng:</h3>
      <ul>
        <li><strong>Rận mu:</strong> Ngứa vùng lông mu</li>
        <li><strong>Ghẻ:</strong> Ngứa, mụn nước</li>
      </ul>
      
      <h2>Triệu chứng của STD</h2>
      
      <h3>Triệu chứng chung:</h3>
      <ul>
        <li>Tiết dịch bất thường từ âm đạo/dương vật</li>
        <li>Đau rát khi đi tiểu</li>
        <li>Ngứa, đau vùng sinh dục</li>
        <li>Loét, mụn nước ở vùng sinh dục</li>
        <li>Đau bụng dưới</li>
        <li>Sốt, mệt mỏi</li>
      </ul>
      
      <h3>Lưu ý quan trọng:</h3>
      <ul>
        <li>Nhiều STD không có triệu chứng</li>
        <li>Triệu chứng có thể xuất hiện sau vài ngày đến vài năm</li>
        <li>Cần xét nghiệm để chẩn đoán chính xác</li>
      </ul>
      
      <h2>Phòng ngừa STD</h2>
      
      <h3>1. Sử dụng bao cao su đúng cách:</h3>
      <ul>
        <li>Sử dụng bao cao su mới mỗi lần quan hệ</li>
        <li>Đặt bao cao su đúng cách trước khi quan hệ</li>
        <li>Không sử dụng bao cao su đã rách, hết hạn</li>
        <li>Sử dụng chất bôi trơn gốc nước</li>
      </ul>
      
      <h3>2. Quan hệ tình dục an toàn:</h3>
      <ul>
        <li>Chung thủy một bạn tình</li>
        <li>Tránh quan hệ với nhiều người</li>
        <li>Không quan hệ khi có triệu chứng STD</li>
        <li>Thông báo cho bạn tình nếu nhiễm STD</li>
      </ul>
      
      <h3>3. Vệ sinh cá nhân:</h3>
      <ul>
        <li>Rửa vùng sinh dục sạch sẽ</li>
        <li>Không dùng chung đồ dùng cá nhân</li>
        <li>Tránh tiếp xúc với máu, dịch tiết</li>
      </ul>
      
      <h3>4. Tiêm vaccine phòng bệnh:</h3>
      <ul>
        <li>Vaccine HPV</li>
        <li>Vaccine viêm gan B</li>
        <li>Vaccine viêm gan A</li>
      </ul>
      
      <h2>Khám sức khỏe định kỳ</h2>
      
      <h3>Đối tượng cần khám:</h3>
      <ul>
        <li>Người có quan hệ tình dục</li>
        <li>Người có nhiều bạn tình</li>
        <li>Người có triệu chứng STD</li>
        <li>Phụ nữ mang thai</li>
        <li>Người tiêm chích ma túy</li>
      </ul>
      
      <h2>Xét nghiệm STD</h2>
      
      <h3>Các xét nghiệm cần thiết:</h3>
      <ul>
        <li><strong>Xét nghiệm máu:</strong> HIV, giang mai, viêm gan B</li>
        <li><strong>Xét nghiệm nước tiểu:</strong> Lậu, chlamydia</li>
        <li><strong>Xét nghiệm dịch tiết:</strong> Trichomonas, nấm</li>
        <li><strong>Xét nghiệm HPV:</strong> Pap smear, HPV test</li>
      </ul>
      
      <h3>Khi nào cần xét nghiệm:</h3>
      <ul>
        <li>Khi có triệu chứng STD</li>
        <li>Sau quan hệ tình dục không an toàn</li>
        <li>Trước khi kết hôn</li>
        <li>Khi chuẩn bị mang thai</li>
        <li>Định kỳ theo khuyến nghị</li>
      </ul>
      
      <h2>Điều trị STD</h2>
      
      <h3>Nguyên tắc điều trị:</h3>
      <ul>
        <li>Điều trị sớm để tránh biến chứng</li>
        <li>Điều trị cả bạn tình</li>
        <li>Tuân thủ đúng phác đồ điều trị</li>
        <li>Tái khám để đánh giá hiệu quả</li>
      </ul>
      
      <h2>Biến chứng của STD</h2>
      <ul>
        <li>Vô sinh</li>
        <li>Ung thư cổ tử cung, dương vật</li>
        <li>Biến chứng thai kỳ</li>
        <li>Tổn thương thần kinh</li>
        <li>Tử vong (HIV/AIDS)</li>
      </ul>
      
      <div class="alert-box">
        <strong>Lưu ý:</strong> Nhiều bệnh không có triệu chứng rõ ràng, nên chủ động phòng ngừa và khám sức khỏe định kỳ để phát hiện sớm và điều trị hiệu quả.
      </div>
    `
    },
    '11': {
        id: '11',
        title: 'BỔ SUNG SẮT ĐÚNG CÁCH CHO PHỤ NỮ',
        shortTitle: 'Bổ sung sắt đúng cách',
        date: '1 tuần trước',
        image: 'https://i.postimg.cc/bYWs70vP/download-2.jpg',
        content: `
      <h2>Hệ miễn dịch và sức khỏe phụ nữ</h2>
      <p>Hệ miễn dịch đóng vai trò quan trọng trong việc bảo vệ cơ thể khỏi bệnh tật. Phụ nữ có hệ miễn dịch mạnh sẽ ít mắc bệnh, phục hồi nhanh và có sức khỏe sinh sản tốt hơn.</p>
      
      <h2>Đặc điểm hệ miễn dịch ở phụ nữ</h2>
      
      <h3>Thay đổi theo chu kỳ:</h3>
      <ul>
        <li>Hệ miễn dịch suy yếu trong thời kỳ kinh nguyệt</li>
        <li>Dễ nhiễm trùng trong thời kỳ rụng trứng</li>
        <li>Hormone estrogen ảnh hưởng đến miễn dịch</li>
        <li>Stress ảnh hưởng đến chức năng miễn dịch</li>
      </ul>
      
      <h3>Giai đoạn đặc biệt:</h3>
      <ul>
        <li>Mang thai: Hệ miễn dịch thay đổi để bảo vệ thai nhi</li>
        <li>Sau sinh: Hệ miễn dịch suy yếu</li>
        <li>Mãn kinh: Thay đổi hormone ảnh hưởng miễn dịch</li>
      </ul>
      
      <h2>Dinh dưỡng tăng cường miễn dịch</h2>
      
      <h3>Vitamin và khoáng chất:</h3>
      <ul>
        <li><strong>Vitamin C:</strong> Cam, chanh, ổi, kiwi, rau xanh</li>
        <li><strong>Vitamin D:</strong> Ánh nắng mặt trời, cá hồi, lòng đỏ trứng</li>
        <li><strong>Vitamin E:</strong> Hạt hướng dương, hạnh nhân, dầu oliu</li>
        <li><strong>Vitamin A:</strong> Cà rốt, khoai lang, rau bina</li>
        <li><strong>Kẽm:</strong> Thịt đỏ, hải sản, hạt bí</li>
        <li><strong>Selen:</strong> Cá, hạt Brazil, trứng</li>
      </ul>
      
      <h3>Thực phẩm giàu chất chống oxy hóa:</h3>
      <ul>
        <li>Quả mọng: Dâu tây, việt quất, mâm xôi</li>
        <li>Rau xanh: Cải bó xôi, cải xoăn, bông cải xanh</li>
        <li>Trái cây: Lựu, nho đỏ, táo</li>
        <li>Gia vị: Nghệ, gừng, tỏi</li>
      </ul>
      
      <h3>Thực phẩm giàu protein:</h3>
      <ul>
        <li>Thịt nạc: Thịt bò, thịt gà, thịt lợn</li>
        <li>Cá: Cá hồi, cá thu, cá mòi</li>
        <li>Đậu: Đậu đen, đậu đỏ, đậu lăng</li>
        <li>Trứng và sữa</li>
      </ul>
      
      <h2>Lối sống lành mạnh</h2>
      
      <h3>Ngủ đủ giấc:</h3>
      <ul>
        <li>Ngủ 7-9 giờ mỗi đêm</li>
        <li>Đi ngủ và thức dậy đúng giờ</li>
        <li>Tạo môi trường ngủ thoải mái</li>
        <li>Tránh sử dụng thiết bị điện tử trước khi ngủ</li>
      </ul>
      
      <h3>Tập thể dục đều đặn:</h3>
      <ul>
        <li>Tập thể dục 150 phút/tuần</li>
        <li>Kết hợp cardio và strength training</li>
        <li>Yoga, pilates để giảm stress</li>
        <li>Đi bộ 30 phút/ngày</li>
      </ul>
      
      <h3>Quản lý stress:</h3>
      <ul>
        <li>Thiền, hít thở sâu</li>
        <li>Massage, spa</li>
        <li>Nghe nhạc, đọc sách</li>
        <li>Dành thời gian cho sở thích</li>
      </ul>
      
      <h2>Chăm sóc sức khỏe sinh sản</h2>
      
      <h3>Khám sức khỏe định kỳ:</h3>
      <ul>
        <li>Khám phụ khoa 6-12 tháng/lần</li>
        <li>Xét nghiệm máu định kỳ</li>
        <li>Tiêm vaccine phòng bệnh</li>
        <li>Theo dõi chu kỳ kinh nguyệt</li>
      </ul>
      
      <h3>Vệ sinh cá nhân:</h3>
      <ul>
        <li>Vệ sinh vùng kín đúng cách</li>
        <li>Sử dụng sản phẩm vệ sinh phù hợp</li>
        <li>Tránh thụt rửa âm đạo</li>
        <li>Mặc quần lót cotton</li>
      </ul>
      
      <h2>Bổ sung thực phẩm chức năng</h2>
      <ul>
        <li><strong>Probiotics:</strong> Tăng cường hệ vi sinh đường ruột</li>
        <li><strong>Omega-3:</strong> Giảm viêm, tăng miễn dịch</li>
        <li><strong>Vitamin D:</strong> Tăng cường miễn dịch</li>
        <li><strong>Kẽm:</strong> Tăng sản xuất tế bào miễn dịch</li>
      </ul>
      
      <h2>Tránh các yếu tố suy yếu miễn dịch</h2>
      <ul>
        <li>Không hút thuốc lá</li>
        <li>Hạn chế uống rượu bia</li>
        <li>Tránh thức ăn nhiều đường, chất béo</li>
        <li>Không lạm dụng thuốc kháng sinh</li>
        <li>Tránh stress kéo dài</li>
        <li>Không ngủ quá ít hoặc quá nhiều</li>
      </ul>
      <div class="alert-box">
        <strong>Lưu ý:</strong> Khám sức khỏe định kỳ để theo dõi hệ miễn dịch và phát hiện sớm các vấn đề sức khỏe.
      </div>
    `
    },
    '12': {
        id: '12',
        title: 'CHẾ ĐỘ ĂN TỐT CHO SỨC KHỎE SINH SẢN',
        shortTitle: 'Chế độ ăn tốt cho sức khỏe sinh sản',
        date: '1 tuần trước',
        image: 'https://i.postimg.cc/3JGdYyyv/download-3.jpg',
        content: `
      <h2>Chế độ ăn ảnh hưởng đến sức khỏe sinh sản</h2>
      <p>Dinh dưỡng đóng vai trò quan trọng trong việc duy trì sức khỏe sinh sản cho cả nam và nữ. Chế độ ăn hợp lý giúp cân bằng hormone, tăng khả năng thụ thai, và đảm bảo sức khỏe tổng thể của hệ sinh sản.</p>
      
      <h2>Dưỡng chất quan trọng cho sức khỏe sinh sản</h2>
      
      <h3>1. Acid folic (Vitamin B9):</h3>
      <ul>
        <li><strong>Vai trò:</strong> Ngăn ngừa dị tật ống thần kinh, hỗ trợ sản xuất tế bào máu</li>
        <li><strong>Nguồn thực phẩm:</strong> Rau xanh (cải bó xôi, bông cải xanh), đậu, ngũ cốc nguyên hạt</li>
        <li><strong>Liều lượng:</strong> 400-800mcg/ngày cho phụ nữ chuẩn bị mang thai</li>
        <li><strong>Lợi ích:</strong> Giảm nguy cơ sảy thai, dị tật bẩm sinh</li>
      </ul>
      
      <h3>2. Sắt:</h3>
      <ul>
        <li><strong>Vai trò:</strong> Tạo hồng cầu, vận chuyển oxy, hỗ trợ sự phát triển của thai nhi</li>
        <li><strong>Nguồn thực phẩm:</strong> Thịt đỏ, gan, rau xanh, đậu, hạt bí</li>
        <li><strong>Liều lượng:</strong> 18mg/ngày cho phụ nữ, 27mg/ngày khi mang thai</li>
        <li><strong>Lợi ích:</strong> Phòng ngừa thiếu máu, tăng năng lượng</li>
      </ul>
      
      <h3>3. Kẽm:</h3>
      <ul>
        <li><strong>Vai trò:</strong> Hỗ trợ sản xuất hormone sinh dục, tăng chất lượng tinh trùng</li>
        <li><strong>Nguồn thực phẩm:</strong> Hàu, thịt đỏ, hạt bí, đậu, ngũ cốc</li>
        <li><strong>Liều lượng:</strong> 8-11mg/ngày</li>
        <li><strong>Lợi ích:</strong> Tăng khả năng thụ thai, hỗ trợ phát triển thai nhi</li>
      </ul>
      
      <h3>4. Vitamin D:</h3>
      <ul>
        <li><strong>Vai trò:</strong> Hấp thu canxi, hỗ trợ hệ miễn dịch, cân bằng hormone</li>
        <li><strong>Nguồn thực phẩm:</strong> Cá hồi, lòng đỏ trứng, sữa, ánh nắng mặt trời</li>
        <li><strong>Liều lượng:</strong> 600-800 IU/ngày</li>
        <li><strong>Lợi ích:</strong> Tăng khả năng thụ thai, giảm nguy cơ sảy thai</li>
      </ul>
      
      <h3>5. Omega-3:</h3>
      <ul>
        <li><strong>Vai trò:</strong> Hỗ trợ phát triển não bộ, giảm viêm, cân bằng hormone</li>
        <li><strong>Nguồn thực phẩm:</strong> Cá hồi, cá thu, hạt óc chó, hạt lanh</li>
        <li><strong>Liều lượng:</strong> 250-500mg DHA/ngày</li>
        <li><strong>Lợi ích:</strong> Tăng chất lượng trứng, hỗ trợ phát triển thai nhi</li>
      </ul>
      
      <h3>6. Vitamin E:</h3>
      <ul>
        <li><strong>Vai trò:</strong> Chống oxy hóa, bảo vệ tế bào sinh sản</li>
        <li><strong>Nguồn thực phẩm:</strong> Hạt hướng dương, hạnh nhân, dầu oliu, rau xanh</li>
        <li><strong>Liều lượng:</strong> 15mg/ngày</li>
        <li><strong>Lợi ích:</strong> Tăng chất lượng tinh trùng và trứng</li>
      </ul>
      
      <h2>Chế độ ăn cho từng đối tượng</h2>
      
      <h3>1. Phụ nữ chuẩn bị mang thai:</h3>
      <ul>
        <li><strong>Bổ sung acid folic:</strong> 3 tháng trước khi mang thai</li>
        <li><strong>Ăn nhiều rau xanh:</strong> Cải bó xôi, bông cải xanh, rau cải</li>
        <li><strong>Bổ sung sắt:</strong> Thịt đỏ, đậu, rau xanh</li>
        <li><strong>Omega-3:</strong> Cá hồi, hạt óc chó</li>
        <li><strong>Hạn chế:</strong> Caffeine, rượu bia, thực phẩm chế biến sẵn</li>
      </ul>
      
      <h3>2. Nam giới muốn tăng khả năng sinh sản:</h3>
      <ul>
        <li><strong>Bổ sung kẽm:</strong> Hàu, thịt đỏ, hạt bí</li>
        <li><strong>Vitamin C:</strong> Cam, chanh, ổi, bông cải xanh</li>
        <li><strong>Vitamin E:</strong> Hạt hướng dương, hạnh nhân</li>
        <li><strong>Lycopene:</strong> Cà chua, dưa hấu</li>
        <li><strong>Hạn chế:</strong> Rượu bia, thuốc lá, thực phẩm nhiều chất béo</li>
      </ul>
      
      <h3>3. Phụ nữ đang mang thai:</h3>
      <ul>
        <li><strong>Tăng calo:</strong> +300-500 kcal/ngày</li>
        <li><strong>Protein:</strong> Thịt nạc, cá, trứng, đậu</li>
        <li><strong>Canxi:</strong> Sữa, phô mai, rau xanh</li>
        <li><strong>DHA:</strong> Cá hồi, cá thu</li>
        <li><strong>Tránh:</strong> Thực phẩm sống, rượu bia, caffeine</li>
      </ul>
      
      <h2>Thực phẩm nên ăn thường xuyên</h2>
      
      <h3>1. Rau xanh và trái cây:</h3>
      <ul>
        <li><strong>Rau xanh:</strong> Cải bó xôi, bông cải xanh, cải xoăn, rau cải</li>
        <li><strong>Trái cây:</strong> Cam, chanh, ổi, dâu tây, việt quất</li>
        <li><strong>Lợi ích:</strong> Chứa nhiều vitamin, khoáng chất, chất chống oxy hóa</li>
      </ul>
      
      <h3>2. Protein chất lượng cao:</h3>
      <ul>
        <li><strong>Thịt nạc:</strong> Thịt bò, thịt gà, thịt lợn</li>
        <li><strong>Cá:</strong> Cá hồi, cá thu, cá mòi</li>
        <li><strong>Trứng:</strong> Chứa choline tốt cho não bộ</li>
        <li><strong>Đậu:</strong> Đậu đen, đậu đỏ, đậu lăng</li>
      </ul>
      
      <h3>3. Ngũ cốc nguyên hạt:</h3>
      <ul>
        <li><strong>Gạo lứt:</strong> Chứa nhiều vitamin B, chất xơ</li>
        <li><strong>Yến mạch:</strong> Giàu beta-glucan, tốt cho tim mạch</li>
        <li><strong>Quinoa:</strong> Protein hoàn chỉnh, không chứa gluten</li>
        <li><strong>Bánh mì nguyên cám:</strong> Chứa nhiều chất xơ, vitamin</li>
      </ul>
      
      <h3>4. Sữa và sản phẩm từ sữa:</h3>
      <ul>
        <li><strong>Sữa tươi:</strong> Giàu canxi, protein</li>
        <li><strong>Sữa chua:</strong> Chứa probiotics tốt cho đường ruột</li>
        <li><strong>Phô mai:</strong> Giàu canxi, vitamin D</li>
        <li><strong>Sữa đậu nành:</strong> Chứa isoflavone tốt cho hormone</li>
      </ul>
      
      <h3>5. Hạt và quả hạch:</h3>
      <ul>
        <li><strong>Hạt óc chó:</strong> Giàu omega-3, tốt cho não bộ</li>
        <li><strong>Hạt hướng dương:</strong> Giàu vitamin E</li>
        <li><strong>Hạt bí:</strong> Giàu kẽm, tốt cho sinh sản</li>
        <li><strong>Hạnh nhân:</strong> Giàu vitamin E, canxi</li>
      </ul>
      
      <h2>Thực phẩm cần hạn chế</h2>
      
      <h3>1. Thực phẩm chế biến sẵn:</h3>
      <ul>
        <li>Đồ ăn nhanh, thực phẩm đóng hộp</li>
        <li>Chứa nhiều muối, đường, chất béo không tốt</li>
        <li>Có thể chứa chất bảo quản, phụ gia</li>
      </ul>
      
      <h3>2. Đồ uống có cồn:</h3>
      <ul>
        <li>Rượu bia ảnh hưởng đến hormone sinh dục</li>
        <li>Giảm chất lượng tinh trùng và trứng</li>
        <li>Tăng nguy cơ sảy thai, dị tật bẩm sinh</li>
      </ul>
      
      <h3>3. Caffeine quá mức:</h3>
      <ul>
        <li>Hạn chế dưới 200mg/ngày khi mang thai</li>
        <li>Có thể ảnh hưởng đến khả năng thụ thai</li>
        <li>Tăng nguy cơ sảy thai</li>
      </ul>
      
      <h3>4. Thực phẩm nhiều đường:</h3>
      <ul>
        <li>Bánh kẹo, nước ngọt</li>
        <li>Gây tăng cân, rối loạn hormone</li>
        <li>Tăng nguy cơ tiểu đường thai kỳ</li>
      </ul>
      
      <h2>Lời khuyên dinh dưỡng</h2>
      
      <h3>1. Ăn đa dạng thực phẩm:</h3>
      <ul>
        <li>Đảm bảo đủ các nhóm chất dinh dưỡng</li>
        <li>Thay đổi thực phẩm thường xuyên</li>
        <li>Ưu tiên thực phẩm tươi, sạch</li>
      </ul>
      
      <h3>2. Chia nhỏ bữa ăn:</h3>
      <ul>
        <li>Ăn 5-6 bữa/ngày</li>
        <li>Không bỏ bữa</li>
        <li>Ăn chậm, nhai kỹ</li>
      </ul>
      
      <h3>3. Uống đủ nước:</h3>
      <ul>
        <li>Uống 2-3 lít nước/ngày</li>
        <li>Tránh đồ uống có gas</li>
        <li>Có thể uống trà xanh, nước ép trái cây</li>
      </ul>
      
      <h3>4. Vệ sinh an toàn thực phẩm:</h3>
      <ul>
        <li>Rửa tay trước khi ăn</li>
        <li>Rửa rau củ sạch sẽ</li>
        <li>Nấu chín thực phẩm</li>
        <li>Bảo quản thực phẩm đúng cách</li>
      </ul>
      
      <h2>Bổ sung vitamin và khoáng chất</h2>
      
      <h3>Khi nào cần bổ sung:</h3>
      <ul>
        <li>Chế độ ăn không đầy đủ</li>
        <li>Chuẩn bị mang thai</li>
        <li>Đang mang thai hoặc cho con bú</li>
        <li>Có bệnh mãn tính</li>
        <li>Tuổi cao</li>
      </ul>
      
      <h3>Loại bổ sung cần thiết:</h3>
      <ul>
        <li><strong>Prenatal vitamin:</strong> Cho phụ nữ chuẩn bị và đang mang thai</li>
        <li><strong>Acid folic:</strong> 400-800mcg/ngày</li>
        <li><strong>Sắt:</strong> Theo chỉ định bác sĩ</li>
        <li><strong>Vitamin D:</strong> 600-800 IU/ngày</li>
        <li><strong>Omega-3:</strong> 250-500mg DHA/ngày</li>
        <li><strong>Kẽm:</strong> 8-11mg/ngày</li>
      </ul>
      
      <h2>Lưu ý quan trọng</h2>
      
      <h3>1. Tham khảo ý kiến bác sĩ:</h3>
      <ul>
        <li>Trước khi bổ sung vitamin</li>
        <li>Khi có bệnh mãn tính</li>
        <li>Khi đang dùng thuốc</li>
      </ul>
      
      <h3>2. Theo dõi cân nặng:</h3>
      <ul>
        <li>Duy trì cân nặng hợp lý</li>
        <li>Tránh tăng cân quá mức</li>
        <li>Tập thể dục đều đặn</li>
      </ul>
      
      <h3>3. Khám sức khỏe định kỳ:</h3>
      <ul>
        <li>Kiểm tra sức khỏe tổng quát</li>
        <li>Xét nghiệm máu định kỳ</li>
        <li>Khám phụ khoa/nam khoa</li>
      </ul>
      
      <div class="alert-box">
        <strong>Lưu ý:</strong> Chế độ ăn tốt cho sức khỏe sinh sản cần được duy trì lâu dài và kết hợp với lối sống lành mạnh để đạt hiệu quả tối ưu.
      </div>
    `
    }
};

const BlogChiTiet = ({ userType = 'guest' }) => {
    const { id } = useParams();
    const blogData = BLOG_DATA[id];

    useEffect(() => {
        if (blogData) {
            document.title = `${blogData.shortTitle} | Blog y tế An Giới`;
        }
    }, [blogData]);

    // Nếu không tìm thấy blog
    if (!blogData) {
        return (
            <div>
                {userType === 'customer' ? <HeaderCustomer /> : <HeaderGuest />}
                <main style={{ marginTop: '110px', padding: '40px 24px', textAlign: 'center' }}>
                    <h1>Không tìm thấy bài viết</h1>
                    <p>Bài viết bạn đang tìm kiếm không tồn tại.</p>
                    <Link to="/blog" style={{ color: '#10b981', textDecoration: 'underline' }}>
                        Quay lại trang blog
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            {userType === 'customer' ? <HeaderCustomer /> : <HeaderGuest />}
            <style>{`
        body {
          font-family: 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
        }
        .main-content {
          margin-top: 110px;
          min-height: calc(100vh - 110px);
          display: block;
        }
        a {
          text-decoration: none;
        }
        a:hover {
          text-decoration: none;
        }
        @media (max-width: 768px) {
          .main-content {
            margin-top: 80px;
            min-height: calc(100vh - 80px);
          }
        }
        main {
          width: 100%;
          padding: 40px 24px;
          background: none;
          border-radius: 0;
          box-shadow: none;
          margin: 0;
        }
        .breadcrumb {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 10px;
        }
        .main-title {
          font-size: 2rem;
          color: #111827;
          margin-bottom: 1.5rem;
        }
        .content h2 {
          margin-top: 2rem;
          color: #0f172a;
          font-size: 1.25rem;
          border-left: 4px solid #10b981;
          padding-left: 0.5rem;
        }
        .section {
          margin-bottom: 30px;
        }
        .section h2 {
          font-size: 24px;
          color: #111827;
          margin-bottom: 12px;
        }
        ul {
          padding-left: 20px;
        }
        ul li {
          margin-bottom: 8px;
          list-style: none;
        }
        .alert-box {
          padding: 15px;
          background-color: #fff7ed;
          border-left: 5px solid #f97316;
          border-radius: 8px;
          color: #92400e;
          margin-top: 16px;
        }
        .final-call {
          font-size: 16px;
          padding: 16px;
          background: #f0f9ff;
          border-left: 5px solid #0a8e76;
          border-radius: 8px;
          margin-top: 40px;
          color: #0369a1;
        }
        .final-call a {
          color: #0a8e76;
          font-weight: 500;
          text-decoration: underline;
        }
        .main-image {
          width: 100%;
          max-width: 600px;
          display: block;
          margin: 24px auto;
          border-radius: 12px;
        }
        .date {
          color: #888;
          font-size: 14px;
          margin-bottom: 16px;
        }
      `}</style>
            <main className="main-content">
                <Link to="/blog">
                    <div className="breadcrumb">Kiến thức y khoa & Xét nghiệm</div>
                </Link>
                <h1 className="main-title">{blogData.title}</h1>
                <p className="date">Ngày đăng: {blogData.date}</p>
                <section className="content">
                    {blogData.image && (
                        <img
                            src={blogData.image}
                            alt={blogData.shortTitle}
                            className="main-image"
                        />
                    )}
                    <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default BlogChiTiet; 