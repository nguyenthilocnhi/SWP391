import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import HeaderGuest from '../components/HeaderGuest';
import HeaderCustomer from '../components/HeaderCustomer';
import Footer from '../components/Footer'; 

// Component helper để render header dựa trên trạng thái đăng nhập
const renderHeader = (userType) => {
  // Kiểm tra token để xác định người dùng đã đăng nhập chưa
  const token = localStorage.getItem('token');
  
  if (token) {
    // Nếu có token = đã đăng nhập, sử dụng HeaderCustomer (có thông báo và profile)
    return <HeaderCustomer />;
  } else {
    // Nếu không có token = chưa đăng nhập, sử dụng HeaderGuest
    return <HeaderGuest />;
  }
};

const tuvanvien = [
  {
    id: 'K', name: 'GS. Trương Thanh K', image: 'https://i.postimg.cc/Y2QtdmMC/Tr-ng-Thanh.png', specialty: 'Trưởng khoa Sức khỏe sinh sản', experience: '12 năm', education: 'ĐH Y Dược TPHCM, 2005 – 2013',
    introduction: 'GS. Trương Thanh K là chuyên gia đầu ngành trong lĩnh vực Sức khỏe sinh sản, với hơn 12 năm kinh nghiệm làm việc và giảng dạy. Sau khi tốt nghiệp ĐH Y Dược TP.HCM, bà công tác tại nhiều bệnh viện lớn và giảng dạy tại các trường y khoa. Bà từng là cố vấn chuyên môn tại BV Từ Dũ, tham gia các đề tài nghiên cứu cấp Nhà nước, đặc biệt trong điều trị hiếm muộn, chu kỳ kinh nguyệt bất thường và rối loạn nội tiết. Hiện bà là Trưởng khoa tại An Giới Health Center. Với tư duy học thuật sắc bén và kinh nghiệm thực tế, GS. K luôn đặt sự toàn diện về thể chất và tâm lý làm trọng tâm trong điều trị.',
    certificates: [
      'Điều trị vô sinh – ĐH Monash (Úc), 2017',
      'Nội tiết sinh sản – ĐH Y Dược TP.HCM, 2016',
      'Tư vấn SKSS vị thành niên – WHO Đông Nam Á, 2018'
    ],
    degrees: [
      'ĐH Y Dược TP.HCM – Bác sĩ Y khoa, 2005 – 2013',
      'Sau đại học Sản phụ khoa – ĐH Quốc gia Singapore, 2014 – 2015'
    ],
    achievements: [
      'Đồng tác giả 3 bài báo quốc tế về nội tiết nữ',
      'Diễn giả Hội nghị SKSS Việt Nam 2023',
      'Top 10 Giảng viên Y khoa xuất sắc TP.HCM năm 2022'
    ]
  },
  {
    id: 'H', name: 'TS. Ngô Cẩm H', image: 'https://i.postimg.cc/SNQHcXK5/Ng-C-m.png', specialty: 'Tư vấn chuyên khoa sinh lý nữ', experience: '7 năm', education: 'ĐH Y khoa Phạm Ngọc Thạch, 2010 – 2018',
    introduction: 'TS. Ngô Cẩm H là chuyên gia về sinh lý nữ, nổi bật với hơn 7 năm kinh nghiệm trong lĩnh vực tư vấn và nghiên cứu nội tiết tố nữ. Sau khi tốt nghiệp xuất sắc từ ĐH Y khoa Phạm Ngọc Thạch, cô tiếp tục học lên cao học và tiến sĩ, chuyên sâu về các vấn đề rối loạn nội tiết và sức khỏe sinh sản nữ giới. Bà từng cộng tác với nhiều tổ chức quốc tế như WHO, đồng thời là giảng viên thỉnh giảng tại nhiều trường y danh tiếng. Phong cách tư vấn của bà nhẹ nhàng, khoa học và hướng đến sự thấu hiểu tâm lý người bệnh. TS. Ngô Cẩm H hiện là một trong những tư vấn viên chính tại An Giới Health Center, chuyên hỗ trợ các vấn đề tiền mãn kinh, mất cân bằng hormone và rối loạn sinh lý nữ.',
    certificates: [
      'Chứng chỉ tư vấn sức khỏe sinh lý nữ – Bộ Y tế, 2019',
      'Khóa nội tiết và hormone nữ – ĐH Mahidol (Thái Lan), 2020',
      'Đào tạo sức khỏe giới tính – WHO khu vực Châu Á, 2021'
    ],
    degrees: [
      'ĐH Y khoa Phạm Ngọc Thạch – Bác sĩ Y khoa, 2010 – 2016',
      'Thạc sĩ Y học giới tính – ĐH Quốc gia TP.HCM, 2016 – 2018',
      'Tiến sĩ Nội tiết học – ĐH Melbourne (Chương trình liên kết), 2019 – 2022'
    ],
    achievements: [
      'Thành viên nhóm nghiên cứu nội tiết nữ – Bộ Y tế, 2020',
      'Chủ biên tài liệu "Hiểu đúng về hormone nữ giới" (2022)',
      'Khách mời Talkshow VTV2 "Chuyện phụ nữ", 2023'
    ]
  },
  {
    id: 'N', name: 'ThS. Lý Ngọc N', image: 'https://i.postimg.cc/Dw6G1cmw/L-Ng-c.jpg', specialty: 'Tư vấn sức khỏe sinh sản', experience: '8 năm', education: 'ĐH Y Dược TPHCM, 2009 – 2017',
    introduction: 'Thạc sĩ Lý Ngọc N là chuyên gia trong lĩnh vực tư vấn sức khỏe sinh sản với hơn 8 năm kinh nghiệm tại các bệnh viện chuyên khoa lớn ở TP.HCM. Với nền tảng học thuật vững chắc và khả năng kết nối tốt với bệnh nhân, cô luôn là lựa chọn đáng tin cậy cho các cặp đôi đang gặp khó khăn trong việc sinh sản. Sau khi tốt nghiệp Bác sĩ Y khoa tại Đại học Y Dược TP.HCM, cô tiếp tục hoàn thành chương trình Thạc sĩ chuyên ngành Sản phụ khoa. Trong suốt sự nghiệp, cô tham gia nhiều chương trình khám sức khỏe cộng đồng, giáo dục sinh sản và tư vấn tiền hôn nhân cho giới trẻ. Hiện tại, cô đang là tư vấn viên chính tại Trung tâm Y khoa An Giới, nơi cô hỗ trợ hàng trăm ca tư vấn mỗi năm về các vấn đề như hiếm muộn, vệ sinh sinh sản, và chăm sóc sức khỏe tiền thai kỳ.',
    certificates: [
      'Chứng chỉ Tư vấn sức khỏe sinh sản toàn diện – Bộ Y tế cấp, 2019',
      'Chứng nhận Đào tạo chăm sóc tiền sản – Đại học Mahidol (Thái Lan), 2020',
      'Chứng chỉ đào tạo phòng ngừa bệnh lây qua đường tình dục – Viện Pasteur TP.HCM, 2021'
    ],
    degrees: [
      'ĐH Y Dược TP.HCM – Bác sĩ Y khoa, 2009 – 2015',
      'Thạc sĩ Sản phụ khoa – ĐH Y Dược TP.HCM, 2015 – 2017'
    ],
    achievements: [
      'Giải Nhất cuộc thi Sáng kiến Chăm sóc Sức khỏe Phụ nữ 2020',
      'Thành viên nhóm nghiên cứu cộng đồng về giáo dục giới tính',
      'Khách mời chương trình "Khỏe & Đẹp" – VTV9, số tháng 4/2023'
    ]
  },
  {
    id: 'T', name: 'CV. Nguyễn Thu T', image: 'https://i.postimg.cc/d3hrKmBp/Nguy-n-Thu.png', specialty: 'Tư vấn chuyên khoa sinh lý nữ', experience: '4 năm', education: 'ĐH Y Hà Nội, 2013 – 2021',
    introduction: 'Cử nhân Nguyễn Thu T là tư vấn viên chuyên về sinh lý nữ và sức khỏe giới tính với hơn 4 năm kinh nghiệm. Tốt nghiệp loại giỏi từ Đại học Y Hà Nội, chị đã có nền tảng kiến thức vững chắc và được đánh giá cao bởi sự tận tâm trong quá trình hỗ trợ khách hàng. Thu T từng tham gia nhiều dự án cộng đồng về giáo dục giới tính, đặc biệt tập trung vào đối tượng phụ nữ trẻ và vị thành niên. Chị không chỉ giúp người bệnh hiểu rõ hơn về cơ thể mình, mà còn đồng hành cùng họ trong việc cải thiện sức khỏe thể chất lẫn tinh thần. Hiện chị đang giữ vai trò tư vấn chính tại Trung tâm Y khoa An Giới, nơi chị cung cấp các dịch vụ như tư vấn chu kỳ kinh nguyệt, sức khỏe nội tiết nữ, và các vấn đề về tâm sinh lý trong tuổi dậy thì và tiền mãn kinh.',
    certificates: [
      'Chứng chỉ tư vấn tâm lý và giới tính – ĐH Y Hà Nội, 2020',
      'Đào tạo nâng cao về sinh lý nữ – Hội Y học Giới tính Việt Nam, 2022',
      'Tham gia chương trình phòng chống rối loạn nội tiết nữ WHO, 2023'
    ],
    degrees: [
      'Cử nhân Y tế công cộng – ĐH Y Hà Nội, 2013 – 2017',
      'Chứng chỉ Sau đại học chuyên ngành Tư vấn sức khỏe sinh lý nữ, 2018 – 2021'
    ],
    achievements: [
      'Tham gia triển khai mô hình tư vấn sinh lý học đường tại Hà Nội',
      'Diễn giả chương trình "Hiểu đúng về cơ thể" trên HTV2',
      'Tư vấn trực tuyến cho hơn 1000 khách hàng chỉ trong năm 2023'
    ]
  },
  {
    id: 'F', name: 'TS. Trần Văn F', image: 'https://i.postimg.cc/KvmC0ZJv/Tr-n-V-n.jpg', specialty: 'Tư vấn sức khỏe sinh sản', experience: '5 năm', education: 'ĐH Y Dược Huế, 2012 – 2020',
    introduction: 'TS. Trần Văn F là chuyên gia trẻ, năng động trong lĩnh vực tư vấn sức khỏe sinh sản, đặc biệt là các vấn đề liên quan đến khả năng sinh sản ở nam và nữ giới. Với kiến thức chuyên sâu và kỹ năng giao tiếp hiệu quả, anh đã giúp hàng trăm bệnh nhân cải thiện nhận thức và hành vi về sức khỏe sinh sản. Sau khi hoàn thành chương trình bác sĩ đa khoa tại ĐH Y Dược Huế, TS. F tiếp tục học lên cao học và tham gia nghiên cứu chuyên sâu về tình trạng vô sinh – hiếm muộn tại các bệnh viện lớn. Anh được đánh giá cao bởi cách tiếp cận tư vấn toàn diện, vừa khoa học, vừa nhân văn. Hiện TS. F đang công tác tại An Giới Health Center, nơi anh thực hiện vai trò tư vấn và hướng dẫn cá nhân hóa kế hoạch chăm sóc sinh sản cho từng khách hàng.',
    certificates: [
      'Chứng chỉ tư vấn sức khỏe sinh sản – ĐH Y Dược Huế, 2019',
      'Khóa đào tạo quản lý sinh sản và kế hoạch hóa gia đình – UNFPA, 2020',
      'Đào tạo chuyên sâu về tư vấn hiếm muộn – Trung tâm IVF Quốc gia, 2021'
    ],
    degrees: [
      'Bác sĩ Y khoa – ĐH Y Dược Huế, 2012 – 2020',
      'Tiến sĩ Sức khỏe cộng đồng – ĐH Y tế Công cộng TP.HCM, 2020 – 2023'
    ],
    achievements: [
      'Thành viên nhóm nghiên cứu về sức khỏe sinh sản Việt Nam – Nhật Bản',
      'Diễn giả chính tại Hội thảo "Nam giới và trách nhiệm kế hoạch hóa", 2022',
      'Tham gia phát triển tài liệu hướng dẫn tư vấn sinh sản tại cộng đồng'
    ]
  },
  {
    id: 'A', name: 'TS. Lý Minh A', image: 'https://i.postimg.cc/RZ5fjtnp/L-Minh.png', specialty: 'Tư vấn chuyên khoa sinh lý nam', experience: '8 năm', education: 'ĐH Y Dược TPHCM, 2009 – 2017',
    introduction: 'TS. Lý Minh A là chuyên gia trong lĩnh vực sinh lý nam giới và nội tiết nam, với gần một thập kỷ kinh nghiệm trong nghiên cứu, điều trị và tư vấn. Anh nổi bật với khả năng kết hợp giữa kiến thức y học hiện đại và phương pháp tiếp cận tâm lý cá nhân hóa để hỗ trợ bệnh nhân hiệu quả. Sau khi tốt nghiệp Bác sĩ Y khoa tại ĐH Y Dược TP.HCM, TS. A đã học chuyên sâu về nam khoa và nội tiết nam tại các cơ sở đào tạo quốc tế, trong đó có các chương trình trao đổi học thuật tại Hàn Quốc và Đức. Anh đặc biệt quan tâm đến các vấn đề như rối loạn cương, hormone nam, mãn dục nam và vô sinh. Hiện nay, TS. A là một trong những chuyên gia chính tại An Giới Health Center, nơi anh tham gia tư vấn, lên kế hoạch điều trị cho bệnh nhân và tham gia vào các dự án giáo dục cộng đồng về sức khỏe sinh lý nam giới.',
    certificates: [
      'Chứng chỉ Nam khoa lâm sàng – ĐH Y Dược TP.HCM, 2016',
      'Đào tạo Nội tiết nam – Đại học Ulsan (Hàn Quốc), 2018',
      'Chứng chỉ tư vấn điều trị mãn dục nam – Hiệp hội Nội tiết châu Á, 2019'
    ],
    degrees: [
      'Bác sĩ Y khoa – ĐH Y Dược TP.HCM, 2009 – 2015',
      'Thạc sĩ Y học nam khoa – Viện Y học Việt – Đức, 2015 – 2017',
      'Tiến sĩ Y học nội tiết – Viện Y học TP.HCM, 2018 – 2022'
    ],
    achievements: [
      'Thành viên chính của nhóm nghiên cứu "Nội tiết và sinh lý nam giới Việt Nam"',
      'Đại diện Việt Nam tại Diễn đàn Nội tiết châu Á – 2022',
      'Giảng viên chuyên đề "Chăm sóc sinh lý nam toàn diện" – ĐH Y khoa Phạm Ngọc Thạch'
    ]
  },
  {
    id: 'D', name: 'ThS. Nguyễn Minh D', image: 'https://i.postimg.cc/Kz4qs1Kw/Nguy-n-Minh.jpg', specialty: 'Tư vấn sinh lý vị thành niên', experience: '5 năm', education: 'ĐH Y Cần Thơ, 2012 – 2020',
    introduction: 'ThS. Nguyễn Minh D là một trong những chuyên gia trẻ đầy nhiệt huyết trong lĩnh vực tư vấn sức khỏe sinh lý vị thành niên. Với nền tảng đào tạo vững chắc và quá trình thực hành tại các cơ sở y tế chuyên biệt, anh có cái nhìn sâu sắc về các vấn đề tâm sinh lý ở lứa tuổi dậy thì. Sau khi tốt nghiệp Đại học Y Cần Thơ, anh tiếp tục hoàn thành chương trình thạc sĩ chuyên ngành Sức khỏe vị thành niên, đồng thời tham gia nhiều khóa đào tạo của UNICEF, WHO về giáo dục giới tính và tâm lý học phát triển. Hiện tại, anh là thành viên chủ chốt của nhóm cố vấn cộng đồng tại An Giới Health Center, đảm nhận công tác tư vấn trực tiếp và xây dựng các chương trình giáo dục sức khỏe sinh sản học đường.',
    certificates: [
      'Chứng chỉ tư vấn vị thành niên – Bộ Y tế Việt Nam, 2020',
      'Khóa đào tạo Tâm lý học phát triển – UNICEF Việt Nam, 2021',
      'Chứng chỉ Giảng viên chương trình giáo dục giới tính học đường – WHO, 2022'
    ],
    degrees: [
      'Bác sĩ đa khoa – ĐH Y Cần Thơ, 2012 – 2018',
      'Thạc sĩ Y học vị thành niên – Học viện Y học Dự phòng, 2018 – 2020'
    ],
    achievements: [
      'Đồng sáng lập Dự án "Sức khỏe học đường an toàn" tại TP.HCM',
      'Diễn giả chương trình tư vấn tâm lý học đường tại hơn 30 trường THPT',
      'Thành viên Ban chuyên môn Mạng lưới tư vấn SKSS vị thành niên Việt Nam'
    ]
  },
  {
    id: 'B', name: 'ThS. Lê Nhã B', image: 'https://i.postimg.cc/fWf637Mm/L-Nh.png', specialty: 'Tư vấn sinh lý nam', experience: '7 năm', education: 'ĐH Y Dược Huế, 2010 – 2018',
    introduction: 'Thạc sĩ Lê Nhã B là một chuyên gia uy tín trong lĩnh vực tư vấn sinh lý nam, với kinh nghiệm lâm sàng và tư vấn thực tế hơn 7 năm tại các trung tâm sức khỏe lớn. Anh được biết đến với phong cách tư vấn thẳng thắn, cởi mở nhưng vẫn khoa học và mang tính giáo dục cao. Sau khi tốt nghiệp Đại học Y Dược Huế, ThS. B đã tham gia chương trình đào tạo chuyên sâu về nam khoa tại Singapore và Nhật Bản, tập trung vào các vấn đề rối loạn sinh lý, suy giảm nội tiết tố nam và sức khỏe sinh sản nam giới trong độ tuổi từ 18–45. Hiện tại, anh công tác tại An Giới Health Center với vai trò chuyên viên tư vấn chính trong lĩnh vực sinh lý nam và sức khỏe giới tính nam giới, đặc biệt là các chương trình phục hồi sinh lý sau stress, áp lực công việc hoặc thay đổi nội tiết.',
    certificates: [
      'Chứng chỉ chuyên sâu về Nam khoa – Trường ĐH Quốc gia Singapore, 2019',
      'Khóa học Nội tiết tố nam – Đại học Tokyo, Nhật Bản, 2021',
      'Chứng chỉ Tư vấn tâm lý nam giới trẻ – Tổ chức UNFPA Việt Nam, 2020'
    ],
    degrees: [
      'Bác sĩ đa khoa – ĐH Y Dược Huế, 2010 – 2016',
      'Thạc sĩ Y học giới tính nam – Học viện Y học Quốc gia, 2016 – 2018'
    ],
    achievements: [
      'Chuyên gia đồng hành trong chương trình "Hiểu đúng về nam giới" của Đài Truyền hình Việt Nam',
      'Tác giả sách "Bí mật sinh lý nam tuổi 30+" – tái bản lần 2 năm 2023',
      'Được mời làm chuyên gia khách mời tại hơn 20 hội thảo y học giới tính tại Việt Nam & Singapore'
    ]
  },
  {
    id: 'M', name: 'ThS. Lâm Ánh M', image: 'https://i.postimg.cc/28zNTc00/L-m-nh.png', specialty: 'Tư vấn sinh lý nữ', experience: '5 năm', education: 'ĐH Y Dược TPHCM, 2012 – 2020',
    introduction: 'Thạc sĩ Lâm Ánh M là chuyên viên tư vấn có nền tảng chuyên sâu về sinh lý nữ và nội tiết, với 5 năm kinh nghiệm làm việc tại các trung tâm y tế lớn tại TP.HCM. Với khả năng giao tiếp thân thiện, cô luôn mang lại cảm giác thoải mái và tin tưởng cho khách hàng khi trao đổi về các vấn đề thầm kín liên quan đến sức khỏe sinh lý. Ngoài công việc tư vấn trực tiếp, ThS. Ánh M còn là khách mời thường xuyên trong các chương trình truyền thông sức khỏe cộng đồng, đồng thời tham gia viết bài chuyên môn trên các diễn đàn y học và tạp chí phụ nữ. Cô tập trung tư vấn cho các đối tượng nữ giới ở độ tuổi dậy thì, sinh sản và tiền mãn kinh, với định hướng khoa học, tâm lý và nhân văn trong chăm sóc sức khỏe toàn diện.',
    certificates: [
      'Chứng chỉ tư vấn tâm lý sức khỏe sinh sản nữ – ĐH Y Dược TP.HCM',
      'Khóa đào tạo nội tiết phụ nữ – Hội Y học giới tính Việt Nam, 2021',
      'Chứng chỉ giáo dục sức khỏe cộng đồng – Viện Nghiên cứu Dân số & Phát triển'
    ],
    degrees: [
      'Bác sĩ Đa khoa – ĐH Y Dược TP.HCM, 2012 – 2018',
      'Thạc sĩ Tâm lý học sức khỏe – ĐH KHXH&NV TP.HCM, 2018 – 2020'
    ],
    achievements: [
      'Diễn giả tại chương trình "Sức khỏe nữ giới học đường" – Sở Y tế TP.HCM',
      'Thành viên nhóm nghiên cứu "Tâm lý & nội tiết nữ tuổi dậy thì", 2021',
      'Biên tập viên chuyên mục Sinh lý phụ nữ – Tạp chí Y học Gia đình'
    ]
  },
  {
    id: 'O', name: 'CV. Hoàng Phúc O', image: 'https://i.postimg.cc/7YcXbbJS/Ho-ng-Ph-c.png', specialty: 'Tư vấn sinh lý vị thành niên', experience: '7 năm', education: 'ĐH Y Phạm Ngọc Thạch, 2010 – 2018',
    introduction: 'Chuyên viên Hoàng Phúc O là người tiên phong trong tư vấn sức khỏe sinh lý cho lứa tuổi vị thành niên, với 7 năm kinh nghiệm làm việc tại các trung tâm tư vấn sức khỏe học đường và bệnh viện tuyến quận. Anh được biết đến với phong cách làm việc thân thiện, dễ gần và đặc biệt phù hợp với tâm lý thanh thiếu niên. Sau khi tốt nghiệp Đại học Y Phạm Ngọc Thạch, anh lựa chọn tập trung vào lĩnh vực giáo dục sức khỏe sinh sản tuổi dậy thì – nơi đang rất cần những chuyên gia trẻ có khả năng kết nối và truyền cảm hứng cho học sinh, phụ huynh và nhà trường. Anh thường xuyên tham gia các chương trình truyền hình giáo dục giới tính, tổ chức talkshow tại trường học và là cố vấn chuyên môn cho nhiều chiến dịch nâng cao nhận thức về sức khỏe giới tính an toàn cho tuổi teen.',
    certificates: [
      'Chứng chỉ tư vấn tâm lý vị thành niên – Bộ Y tế cấp',
      'Khóa đào tạo "Giáo dục giới tính toàn diện học đường" – UNESCO Việt Nam',
      'Chứng chỉ kỹ năng giao tiếp và ứng xử với thanh thiếu niên – UNICEF 2020'
    ],
    degrees: [
      'Bác sĩ Y khoa – Đại học Y Phạm Ngọc Thạch, 2010 – 2018',
      'Chứng chỉ sau đại học: Giáo dục sức khỏe học đường – Viện Y tế Công cộng TP.HCM'
    ],
    achievements: [
      'Trưởng nhóm Dự án "Chăm sóc sức khỏe sinh sản học đường" tại TP.HCM (2022 – nay)',
      'Khách mời cố định chương trình "Góc tuổi mới lớn" – Đài truyền hình TP.HCM',
      'Được vinh danh "Chuyên viên tư vấn tiêu biểu ngành giáo dục sức khỏe năm 2023"'
    ]
  },
  {
    id: 'V', name: 'CV. Đỗ Minh V', image: 'https://i.postimg.cc/XJJywcTq/Minh.png', specialty: 'Tư vấn sinh lý nữ', experience: '8 năm', education: 'ĐH Y Hà Nội, 2009 – 2017',
    introduction: 'Chuyên viên Đỗ Minh V là người có nhiều năm kinh nghiệm trong lĩnh vực tư vấn sức khỏe sinh lý nữ và nội tiết tố nữ. Với 8 năm gắn bó cùng các chương trình nâng cao nhận thức cộng đồng về sức khỏe phụ nữ, chị đã tạo được uy tín và sự tin cậy từ đông đảo khách hàng nữ ở nhiều độ tuổi khác nhau. Sau khi tốt nghiệp Đại học Y Hà Nội, chị lựa chọn con đường tư vấn sức khỏe cộng đồng, với trọng tâm là chăm sóc sinh lý nữ giới, từ dậy thì đến tiền mãn kinh. Minh V được biết đến với kỹ năng giao tiếp nhẹ nhàng, giàu sự cảm thông, giúp phụ nữ dễ dàng chia sẻ và tìm được hướng đi phù hợp trong hành trình chăm sóc bản thân. Ngoài vai trò tư vấn tại trung tâm, chị còn là cộng tác viên nội dung sức khỏe cho nhiều báo điện tử và tạp chí phụ nữ. Đồng thời, chị tích cực tham gia huấn luyện cho các dự án phi lợi nhuận về giáo dục giới tính tại các vùng sâu vùng xa.',
    certificates: [
      'Chứng chỉ tư vấn nội tiết nữ – ĐH Y Hà Nội, 2018',
      'Khóa đào tạo chuyên sâu về rối loạn kinh nguyệt – Hội Nội tiết Việt Nam',
      'Giấy chứng nhận giảng viên cộng đồng về sức khỏe sinh sản nữ – Bộ Y tế, 2020'
    ],
    degrees: [
      'Bác sĩ đa khoa – Đại học Y Hà Nội, 2009 – 2017',
      'Chứng chỉ sau đại học: Chăm sóc sức khỏe phụ nữ – Trường Y tế Công cộng'
    ],
    achievements: [
      'Thành viên nhóm chuyên môn "Phụ nữ khỏe mạnh" – Chương trình Quốc gia 2022',
      'Diễn giả tại hội thảo "Sức khỏe sinh sản hiện đại cho phụ nữ Việt" (2023)',
      'Biên soạn tài liệu "Cẩm nang sức khỏe tuổi tiền mãn kinh" – Bộ Y tế phát hành'
    ]
  },
  {
    id: 'L', name: 'TS. Võ Đăng L', image: 'https://i.postimg.cc/1Rvvhv9C/V-ng.png', specialty: 'Tư vấn chuyên khoa sinh lý nam', experience: '8 năm', education: 'ĐH Y Huế, 2009 – 2017',
    introduction: 'Tiến sĩ Võ Đăng L là chuyên gia hàng đầu trong lĩnh vực tư vấn sinh lý nam giới, với hơn 8 năm kinh nghiệm trong nghiên cứu và điều trị các vấn đề liên quan đến sức khỏe sinh lý nam. Sau khi tốt nghiệp xuất sắc từ Đại học Y Huế, anh đã tiếp tục theo đuổi chương trình đào tạo chuyên sâu về nam khoa và nội tiết nam tại các trung tâm y tế lớn. Với kiến thức chuyên môn sâu rộng và phương pháp tiếp cận khoa học, TS. Võ Đăng L đã tư vấn thành công cho hàng nghìn nam giới gặp phải các vấn đề về rối loạn cương, suy giảm nội tiết tố nam, mãn dục nam và các vấn đề sinh lý khác. Anh nổi tiếng với phong cách tư vấn thẳng thắn, cởi mở nhưng vẫn đảm bảo tính chuyên môn cao. Hiện tại, TS. Võ Đăng L là một trong những chuyên gia chính tại An Giới Health Center, nơi anh tham gia tư vấn, lên kế hoạch điều trị và tham gia vào các dự án nghiên cứu về sức khỏe sinh lý nam giới Việt Nam.',
    certificates: [
      'Chứng chỉ Nam khoa lâm sàng – ĐH Y Huế, 2016',
      'Đào tạo Nội tiết nam – Viện Y học Việt – Đức, 2018',
      'Chứng chỉ tư vấn điều trị mãn dục nam – Hiệp hội Nam khoa Việt Nam, 2019'
    ],
    degrees: [
      'Bác sĩ Y khoa – ĐH Y Huế, 2009 – 2015',
      'Thạc sĩ Y học nam khoa – ĐH Y Huế, 2015 – 2017',
      'Tiến sĩ Y học nội tiết nam – Viện Y học Huế, 2018 – 2022'
    ],
    achievements: [
      'Thành viên chính của nhóm nghiên cứu "Sức khỏe sinh lý nam giới miền Trung"',
      'Đại diện Việt Nam tại Hội nghị Nam khoa châu Á – 2022',
      'Giảng viên chuyên đề "Chăm sóc sinh lý nam toàn diện" – ĐH Y Huế',
      'Tác giả của hơn 20 bài báo khoa học về nam khoa và nội tiết nam'
    ]
  }
];

const Main = styled.main`
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8 0%, #e9f7f7 100%);
  width: 100vw;
  margin: 0;
  padding: 2rem 0;
  margin-top: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 8px 32px rgba(16, 185, 129, 0.10), 0 1.5px 6px rgba(0,0,0,0.04);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  max-width: 720px;
  width: 100%;
  margin: 0 auto 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding: 1.2rem 0.5rem 1.5rem 0.5rem;
    max-width: 98vw;
  }
`;

const Avatar = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  object-position: center;
  background: #e6f9f1;
  border-radius: 50%;
  border: 5px solid #e0f7ef;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.13);
  margin: 0 auto 24px auto;
  display: block;
`;

const Name = styled.h2`
  text-align: center;
  color: #0f172a;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Info = styled.p`
  text-align: left;
  color: #374151;
  font-size: 1.13rem;
  margin-bottom: 8px;
  width: 100%;
`;

const BackLink = styled(RouterLink)`
  display: block;
  color: #fff;
  background: linear-gradient(90deg, #10b981 60%, #34d399 100%);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 14px 0;
  border: none;
  border-radius: 2rem;
  margin: 32px auto 0 auto;
  width: 80%;
  max-width: 340px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(16,185,129,0.10);
  transition: all 0.25s cubic-bezier(.4,0,.2,1);
  &:hover {
    background: linear-gradient(90deg, #34d399 60%, #10b981 100%);
    color: #fff;
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 6px 18px rgba(16,185,129,0.13);
    text-decoration: none;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: #fff;
  border-radius: 1.5rem;
  margin: 20px 0;
  box-shadow: 0 4px 16px rgba(211,47,47,0.07);
  h2 {
    color: #d32f2f;
    margin-bottom: 15px;
    font-size: 1.6rem;
  }
  p {
    color: #666;
    margin-bottom: 20px;
  }
`;

const SectionTitle = styled.h3`
  color: #0f172a;
  font-size: 1.35rem;
  font-weight: 700;
  margin-top: 28px;
  margin-bottom: 12px;
  width: 100%;
  border-left: 5px solid #10b981;
  padding-left: 12px;
`;

const CustomList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 0.5rem;
  width: 100%;
`;
const CustomListItem = styled.li`
  position: relative;
  padding-left: 2.1em;
  margin-bottom: 0.5em;
  font-size: 1.05rem;
  line-height: 1.6;
  &:before {
    content: '\2713';
    color: #10b981;
    font-weight: bold;
    position: absolute;
    left: 0;
    top: 0.1em;
    font-size: 1.2em;
  }
`;

function ChiTietTuVanVien(props) {
  const { id } = useParams();
  const advisor = tuvanvien.find(tv => tv.id === id);

  // Xác định userType từ props hoặc localStorage
  let userType = props?.userType;
  if (!userType) {
    const savedRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    
    // Nếu có token thì người dùng đã đăng nhập
    if (token) {
      // Mapping số về chuỗi role
      if (savedRole === "1") userType = "customer";
      else if (savedRole === "2") userType = "consultant";
      else if (savedRole === "3") userType = "staff";
      else if (savedRole === "4") userType = "admin";
      else userType = "customer"; // Mặc định là customer nếu có token
    } else {
      userType = "guest"; // Không có token = chưa đăng nhập
    }
  }

  if (!advisor) {
    return (
      <div>
        {renderHeader(userType)}
        <Main>
          <ErrorMessage>
            <h2>Không tìm thấy tư vấn viên</h2>
            <p>ID không hợp lệ hoặc chưa có thông tin chi tiết.</p>
            <BackLink to={`/${userType === 'customer' ? 'customer/tu-van-vien' : 'tu-van-vien'}`}>← Quay lại danh sách tư vấn viên</BackLink>
          </ErrorMessage>
        </Main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      {renderHeader(userType)}
      <Main>
        <Card>
          <Avatar src={advisor.image} alt={advisor.name} />
          <Name>{advisor.name}</Name>
          <Info><strong>Chuyên môn:</strong> {advisor.specialty}</Info>
          <Info><strong>Kinh nghiệm:</strong> {advisor.experience}</Info>
          <Info><strong>Học vấn:</strong> {advisor.education}</Info>
          {/* Hiển thị các trường chi tiết nếu có */}
          {advisor.introduction && (
            <>
              <SectionTitle>Giới thiệu</SectionTitle>
              <Info style={{ textAlign: 'left' }}>{advisor.introduction}</Info>
            </>
          )}
          {advisor.certificates && (
            <>
              <SectionTitle>Chứng chỉ</SectionTitle>
              <CustomList>
                {advisor.certificates.map((c, i) => <CustomListItem key={i}>{c}</CustomListItem>)}
              </CustomList>
            </>
          )}
          {advisor.degrees && (
            <>
              <SectionTitle>Bằng cấp</SectionTitle>
              <CustomList>
                {advisor.degrees.map((d, i) => <CustomListItem key={i}>{d}</CustomListItem>)}
              </CustomList>
            </>
          )}
          {advisor.achievements && (
            <>
              <SectionTitle>Thành tựu nổi bật</SectionTitle>
              <CustomList>
                {advisor.achievements.map((a, i) => <CustomListItem key={i}>{a}</CustomListItem>)}
              </CustomList>
            </>
          )}
          <BackLink to={`/${userType === 'customer' ? 'customer/tu-van-vien' : 'tu-van-vien'}`}>
          ← Quay lại danh sách tư vấn viên
          </BackLink>
        </Card>
      </Main>
      <Footer />
    </div>
  );
}

export default ChiTietTuVanVien; 