#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import re

new_articles = [
    {
        "id": 9,
        "title": "Top Các Mẫu Khu Lăng Mộ Đá Xanh Rêu Đẹp & Bền Bỉ Nhất 2026 - Ninh Bình",
        "category": "cam-nang",
        "categoryName": "Cẩm Nang Lăng Mộ",
        "date": "24/09/2026",
        "author": "KTS Nguyễn Văn Hướng",
        "readTime": "8 phút",
        "views": "2,650",
        "image": "https://res.cloudinary.com/g3beqqle/image/upload/v1789377577/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/1.%20L%C4%83ng%20th%E1%BB%9D/l%C4%83ng%20c%C3%A1nh%202%20m%C3%A1i%20%C4%91%C3%A1%20xanh%20r%C3%AAu/a.jpg",
        "excerpt": "Đá xanh rêu tự nhiên đang là chất liệu dẫn đầu xu hướng xây dựng khu lăng mộ gia tộc năm 2026. Tìm hiểu đặc tính cơ học vượt trội, các mẫu lăng thờ cánh, mộ đá xanh rêu sang trọng và bảng dự toán chi phí.",
        "content": """<p>Trong những năm gần đây, xu hướng thi công <strong>khu lăng mộ đá xanh rêu</strong> cao cấp tại làng nghề truyền thống Ninh Vân - Ninh Bình đang ngày càng được đông đảo các dòng họ trên toàn quốc tin tưởng lựa chọn. Sở hữu độ dai đá vượt bậc cùng sắc xanh bóng như ngọc thạch theo thời gian, đá xanh rêu được tôn vinh là chất liệu 'vua' trong kiến trúc tâm linh trường tồn muôn đời.</p>

<p>Tại xưởng chế tác của <strong>Kiến Trúc Đá Tâm Linh</strong>, dưới bàn tay tài hoa của các nghệ nhân cùng sự cố vấn phong thủy của <strong>KTS Nguyễn Văn Hướng</strong>, các công trình lăng mộ đá xanh rêu luôn đạt chuẩn mực cao nhất về tính thẩm mỹ cổ truyền, kết cấu vĩnh cửu và tỷ lệ âm trạch tương thích phong thủy.</p>

<figure style="margin: 30px auto; text-align: center; width: 100%; display: flex; flex-direction: column; align-items: center;">
    <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377577/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/1.%20L%C4%83ng%20th%E1%BB%9D/l%C4%83ng%20c%C3%A1nh%202%20m%C3%A1i%20%C4%91%C3%A1%20xanh%20r%C3%AAu/a.jpg" alt="Mẫu lăng thờ cánh 2 mái đá xanh rêu cao cấp gia tộc" style="max-width: 100%; max-height: 480px; width: auto; height: auto; object-fit: contain; border-radius: 8px; border: 1.5px solid var(--gold-primary, #c5a059); box-shadow: 0 4px 20px rgba(0,0,0,0.5);" loading="lazy">
    <figcaption style="font-size: 0.9rem; color: #a0aec0; margin-top: 10px; font-style: italic; text-align: center;">Hình 1: Mẫu lăng thờ cánh đá xanh rêu bề thế – trái tim hội tụ linh khí của khu lăng mộ gia tộc</figcaption>
</figure>

<h2>1. Tại Sao Khu Lăng Mộ Đá Xanh Rêu Lại Được Ưa Chuộng Hàng Đầu?</h2>
<p>Khai thác chủ yếu từ những dãy núi đá ngầm cổ xưa thuộc vùng Hà Trung (Thanh Hóa) và Ninh Bình, đá xanh rêu sở hữu những ưu điểm vượt trội mà không loại đá nhân tạo hay gạch vữa nào có thể sánh kịp:</p>
<ul>
    <li><strong>Độ dai cơ học cực cao:</strong> Khác với đá vôi giòn dễ om nứt, thớ đá xanh rêu rất dẻo dai và sít đặc. Điều này cho phép nghệ nhân chạm khắc kênh bong nổi 3D các chi tiết siêu mảnh như râu rồng, vân mây, cánh sen mà không lo nứt mẻ. Quý vị có thể tham khảo thêm bài phân tích chi tiết tại <a href="#article-3" onclick="openArticleModal(3); return false;" style="color: var(--gold-primary); text-decoration: underline;">So sánh ưu nhược điểm đá xanh rêu, xanh đen và granite</a>.</li>
    <li><strong>Chống chịu mưa nắng & thời tiết khắc nghiệt:</strong> Càng phơi sương gió nắng mưa, bề mặt đá xanh rêu lại càng lên tông màu xanh thẫm cổ kính, bóng mịn tự nhiên và kháng rêu mốc cực tốt.</li>
    <li><strong>Vẻ đẹp ngọc thạch quyền quý:</strong> Màu xanh rêu đại diện cho hành Mộc và sinh khí trường xuân, mang lại cảm giác thanh tĩnh, trang nghiêm và vương giả cho chốn an nghỉ vĩnh hằng của ông bà tổ tiên.</li>
</ul>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 30px 0;">
    <figure style="margin: 0; background: rgba(10, 20, 42, 0.6); border: 1px solid rgba(197, 160, 89, 0.4); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
        <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377587/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/2.%20M%E1%BB%99/m%E1%BB%99%203%20%C4%91%C3%A1%20xanh%20r%C3%AAu/FB_IMG_1732020757427.jpg" alt="Mẫu mộ 3 mái đá xanh rêu nguyên khối" style="width: 100%; height: 220px; object-fit: cover; border-radius: 6px;" loading="lazy">
        <figcaption style="font-size: 0.85rem; color: #cbd5e1; margin-top: 10px; text-align: center;">Mẫu mộ tam mái đá xanh rêu uốn đao rồng kiêu hãnh</figcaption>
    </figure>
    <figure style="margin: 0; background: rgba(10, 20, 42, 0.6); border: 1px solid rgba(197, 160, 89, 0.4); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
        <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377585/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/2.%20M%E1%BB%99/m%E1%BB%99%202%20m%C3%A1i%20%C4%91%C3%A1%20xanh%20r%C3%AAu%20kt%20167x275/IMG_20230315_221542.jpg" alt="Mộ đôi hai mái đá xanh rêu chuẩn phong thủy" style="width: 100%; height: 220px; object-fit: cover; border-radius: 6px;" loading="lazy">
        <figcaption style="font-size: 0.85rem; color: #cbd5e1; margin-top: 10px; text-align: center;">Mộ đôi hai mái đá xanh rêu chế tác chuẩn Lỗ Ban</figcaption>
    </figure>
</div>

<h2>2. Các Hạng Mục Cốt Lõi Trong Khu Lăng Mộ Đá Xanh Rêu Hoàn Chỉnh</h2>
<p>Một khuôn viên lăng tẩm chuẩn phong thủy cần được quy hoạch khoa học, đồng bộ về chất liệu và kiến trúc:</p>
<ol>
    <li><strong>Lăng thờ chung (Long đình đá xanh rêu):</strong> Đặt tại vị trí trung tâm cao nhất phía sau, là nơi thờ tự thổ địa linh thần và bài vị tổ tiên chung. Mẫu phổ biến gồm lăng đơn 3 mái hoặc lăng cánh 3 mái bề thế (xem chi tiết tại bài viết <a href="#article-1" onclick="openArticleModal(1); return false;" style="color: var(--gold-primary); text-decoration: underline;">Mẫu Lăng Mộ Đá 3 mái đẹp Ninh Bình</a>).</li>
    <li><strong>Hệ thống mộ đá xanh rêu con cháu:</strong> Tùy theo vai vế để bố trí mộ đơn, mộ đôi, mộ tròn hoặc mộ tam cấp theo nguyên tắc tiền thấp hậu cao.</li>
    <li><strong>Cuốn thư đá chắn tà khí:</strong> Đặt phía trong cổng chính, có tác dụng ngăn luồng sát khí và bảo vệ vượng khí cho toàn bộ âm trạch.</li>
    <li><strong>Lan can và Cổng tứ trụ đá:</strong> Bao quanh định rõ ranh giới linh thiêng, ngăn gia súc và bụi bặm xâm hại nơi an nghỉ.</li>
</ol>

<h2>3. Kích Thước Lăng Mộ Chuẩn Thước Lỗ Ban 38.8cm</h2>
<p>Khi tiến hành cắt xẻ phôi đá, tất cả các chiều dài, rộng, cao đều được KTS tính toán chuẩn xác lọt vào các cung đỏ cát lợi: <em>Tiến Bảo, Thêm Đinh, Đại Cát, Đăng Khoa</em>. Gia chủ có thể tự tra cứu trực tiếp kích thước hợp mệnh tại cẩm nang <a href="#article-2" onclick="openArticleModal(2); return false;" style="color: var(--gold-primary); text-decoration: underline;">Kích Thước Mộ Chuẩn Thước Lỗ Ban 38.8cm Âm Phần</a>.</p>

<p>Để nhận bản vẽ quy hoạch 3D phối cảnh toàn khu và bảng tính chi tiết từng hạng mục, quý khách vui lòng xem thêm tại <a href="bao-gia.html" style="color: var(--gold-primary); text-decoration: underline;">Bảng Báo Giá Lăng Mộ Đá Hoàn Thiện</a> hoặc tham khảo các mẫu mã mới nhất tại <a href="san-pham.html" style="color: var(--gold-primary); text-decoration: underline;">Danh Mục Sản Phẩm Kiến Trúc Đá</a>.</p>"""
    },
    {
        "id": 10,
        "title": "Mẫu Mộ Đá Đôi Đẹp Cho Ông Bà, Cha Mẹ – Ý Nghĩa Tâm Linh & Kích Thước Chuẩn 2026",
        "category": "phong-thuy",
        "categoryName": "Phong Thủy Âm Trạch",
        "date": "22/09/2026",
        "author": "KTS Nguyễn Văn Hướng",
        "readTime": "7 phút",
        "views": "2,420",
        "image": "https://res.cloudinary.com/g3beqqle/image/upload/v1789377585/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/2.%20M%E1%BB%99/m%E1%BB%99%202%20m%C3%A1i%20%C4%91%C3%A1%20xanh%20r%C3%AAu%20kt%20167x275/IMG_20230315_221542.jpg",
        "excerpt": "Mộ đá đôi thể hiện trọn vẹn tình nghĩa vợ chồng sắt son trọn đời bên nhau. Tìm hiểu nguyên tắc phong thủy Nam tả - Nữ hữu, các kích thước thước Lỗ Ban 38.8cm chuẩn đỏ và kinh nghiệm chọn mẫu mộ đôi bền đẹp.",
        "content": """<p><em>'Trăm năm tóc bạc nghĩa tao khang – Nghìn thu yên nghỉ chốn vĩnh hằng'</em>. Đối với các bậc tiền bối, việc được an nghỉ bên cạnh người bạn đời tri kỷ khi về với tiên tổ là một niềm hạnh phúc viên mãn. <strong>Mộ đá đôi</strong> (mộ đôi cho ông bà, cha mẹ) không chỉ mang giá trị thẩm mỹ gắn kết bền chặt mà còn là biểu tượng cao quý của đạo nghĩa phu thê son sắt, thủy chung trọn vẹn.</p>

<p>Để giúp con cháu hiểu rõ cách quy hoạch và xây dựng phần mộ đôi chuẩn tâm linh âm trạch, <strong>KTS Nguyễn Văn Hướng</strong> xin chia sẻ những quy tắc phong thủy vàng không thể bỏ qua dưới đây.</p>

<figure style="margin: 30px auto; text-align: center; width: 100%; display: flex; flex-direction: column; align-items: center;">
    <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377585/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/2.%20M%E1%BB%99/m%E1%BB%99%202%20m%C3%A1i%20%C4%91%C3%A1%20xanh%20r%C3%AAu%20kt%20167x275/IMG_20230315_221542.jpg" alt="Mẫu mộ đá đôi 2 mái đá xanh rêu cao cấp cho ông bà cha mẹ" style="max-width: 100%; max-height: 480px; width: auto; height: auto; object-fit: contain; border-radius: 8px; border: 1.5px solid var(--gold-primary, #c5a059); box-shadow: 0 4px 20px rgba(0,0,0,0.5);" loading="lazy">
    <figcaption style="font-size: 0.9rem; color: #a0aec0; margin-top: 10px; font-style: italic; text-align: center;">Hình 1: Mẫu mộ đá đôi hai mái xanh rêu vững chãi, gắn kết sắt son ngàn thu</figcaption>
</figure>

<h2>1. Nguyên Tắc Phong Thủy 'Nam Tả – Nữ Hữu' Khi Đặt Mộ Đôi</h2>
<p>Khi quy hoạch huyệt vị và đặt bài vị cho mộ đôi, nguyên tắc bất di bất dịch trong văn hóa phương Đông là <strong>Nam Tả - Nữ Hữu</strong>:</p>
<ul>
    <li><strong>Người Nam (Ông/Cha):</strong> Nằm ở bên <em>Tả</em> (bên trái theo hướng nhìn từ tim mộ nhìn ra phía trước, tương đương bên phải khi người sống đứng đối diện vái lạy). Bên Tả ứng với Thanh Long, mang năng lượng Dương thanh tịnh.</li>
    <li><strong>Người Nữ (Bà/Mẹ):</strong> Nằm ở bên <em>Hữu</em> (bên phải theo hướng nhìn từ tim mộ nhìn ra). Bên Hữu ứng với Bạch Hổ, tượng trưng cho tính Nữ dịu hiền và sự bảo bọc con cháu.</li>
</ul>
<p>Nếu đảo ngược vị trí này sẽ gây nghịch âm dương, ảnh hưởng không tốt tới sự hòa hợp gia đạo. Ngoài ra, quý vị nên tìm hiểu kỹ bài viết <a href="#article-5" onclick="openArticleModal(5); return false;" style="color: var(--gold-primary); text-decoration: underline;">10 điều kiêng kỵ tuyệt đối khi xây dựng mộ phần tổ tiên</a> để tránh các lỗi đại kỵ.</p>

<h2>2. Các Mẫu Mộ Đá Đôi Thịnh Hành Nhất Hiện Nay</h2>
<p>Tùy theo diện tích đất nghĩa trang gia tộc và ngân sách dòng họ, gia chủ có thể chọn các phong cách kiến trúc sau:</p>
<ul>
    <li><strong>Mộ đôi Tam Sơn (Không mái):</strong> Thiết kế nhỏ gọn, tinh tế, thích hợp cho khuôn viên lăng mộ có nhiều phần mộ hoặc khu mộ gia đình diện tích vừa phải.</li>
    <li><strong>Mộ đôi Hai Mái / Ba Mái:</strong> Thiết kế mái che đao rồng uy nghi, bảo vệ bát hương và bia mộ khỏi mưa nắng, thể hiện sự bề thế, trang trọng vượt bậc.</li>
    <li><strong>Mộ đôi Đá Granite Hiện Đại:</strong> Mặt phẳng tối giản, bóng kính sang trọng, chống bám bẩn tuyệt đối (xem thêm các mẫu đá tại <a href="#article-3" onclick="openArticleModal(3); return false;" style="color: var(--gold-primary); text-decoration: underline;">Kinh nghiệm chọn đá tự nhiên làm lăng mộ</a>).</li>
</ul>

<figure style="margin: 30px auto; text-align: center; width: 100%; display: flex; flex-direction: column; align-items: center;">
    <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377585/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/2.%20M%E1%BB%99/m%E1%BB%99%202%20m%C3%A1i%20%C4%91%C3%A1%20xanh%20r%C3%AAu%20kt%20107x167/IMG_20230315_221439.jpg" alt="Mộ đôi đá khối tự nhiên điêu khắc hoa văn kênh bong" style="max-width: 100%; max-height: 480px; width: auto; height: auto; object-fit: contain; border-radius: 8px; border: 1.5px solid var(--gold-primary, #c5a059); box-shadow: 0 4px 20px rgba(0,0,0,0.5);" loading="lazy">
    <figcaption style="font-size: 0.9rem; color: #a0aec0; margin-top: 10px; font-style: italic; text-align: center;">Hình 2: Đường nét chạm trổ hoa văn Tứ Quý và Hoa Sen nổi 3D tinh xảo trên phiến đá nguyên khối</figcaption>
</figure>

<h2>3. Kích Thước Mộ Đá Đôi Chuẩn Thước Lỗ Ban 38.8cm (Âm Phần)</h2>
<p>Kích thước mộ đôi thường có tỷ lệ vuông vắn hoặc hình chữ nhật mở rộng chiều ngang:</p>
<table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.93rem; color: #e2e8f0; border: 1px solid var(--gold-primary, #c5a059);">
    <thead>
        <tr style="background: rgba(197, 160, 89, 0.2); color: var(--gold-light, #f5d77f);">
            <th style="padding: 10px; border: 1px solid var(--gold-primary, #c5a059);">Kích Thước (Rộng x Dài)</th>
            <th style="padding: 10px; border: 1px solid var(--gold-primary, #c5a059);">Cung Thước Lỗ Ban 38.8cm</th>
            <th style="padding: 10px; border: 1px solid var(--gold-primary, #c5a059);">Phù Hợp Cho Hình Thức</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 10px; border: 1px solid rgba(197,160,89,0.3); font-weight: bold;">147 x 167 cm</td>
            <td style="padding: 10px; border: 1px solid rgba(197,160,89,0.3); color: #68d391;">Hỷ Sự - Tiến Bảo</td>
            <td style="padding: 10px; border: 1px solid rgba(197,160,89,0.3);">Mộ đôi hỏa táng, cải táng nhỏ gọn</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid rgba(197,160,89,0.3); font-weight: bold;">167 x 197 cm</td>
            <td style="padding: 10px; border: 1px solid rgba(197,160,89,0.3); color: #68d391;">Tiến Bảo - Đăng Khoa</td>
            <td style="padding: 10px; border: 1px solid rgba(197,160,89,0.3);">Kích thước tiêu chuẩn phổ biến nhất</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid rgba(197,160,89,0.3); font-weight: bold;">197 x 237 cm</td>
            <td style="padding: 10px; border: 1px solid rgba(197,160,89,0.3); color: #68d391;">Đăng Khoa - Thuận Khoa</td>
            <td style="padding: 10px; border: 1px solid rgba(197,160,89,0.3);">Mộ đôi hai mái, ba mái bề thế</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid rgba(197,160,89,0.3); font-weight: bold;">217 x 275 cm</td>
            <td style="padding: 10px; border: 1px solid rgba(197,160,89,0.3); color: #68d391;">Thuận Khoa - Đại Cát</td>
            <td style="padding: 10px; border: 1px solid rgba(197,160,89,0.3);">Mộ chôn một lần không bốc (mộ nhất táng)</td>
        </tr>
    </tbody>
</table>

<p>Quý khách có thể xem thêm chi tiết toàn bộ các mẫu mộ đẹp tại mục <a href="san-pham.html" style="color: var(--gold-primary); text-decoration: underline;">Sản Phẩm Mộ Đá Tâm Linh</a> hoặc tham quan các công trình đã hoàn thiện tại trang <a href="du-an.html" style="color: var(--gold-primary); text-decoration: underline;">Dự Án Thực Tế</a>.</p>"""
    },
    {
        "id": 11,
        "title": "Cuốn Thư Đá (Bình Phong Đá) Là Gì? Vị Trí Đặt & Kích Thước Chuẩn Phong Thủy 2026",
        "category": "phong-thuy",
        "categoryName": "Phong Thủy Âm Trạch",
        "date": "20/09/2026",
        "author": "KTS Nguyễn Văn Hướng",
        "readTime": "6 phút",
        "views": "2,180",
        "image": "https://res.cloudinary.com/g3beqqle/image/upload/v1789377600/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/3.%20Cu%E1%BB%91n%20th%C6%B0%20%C4%91%C3%A1/cu%E1%BB%91n%20th%C6%B0%20r%E1%BB%93ng%20th%E1%BB%9Di%20l%C3%AD%20%C4%91%C3%A1%20xanh%20r%C3%AAu/IMG_20231227_073743.jpg",
        "excerpt": "Cuốn thư đá (bình phong đá) là pháp bảo trấn trạch không thể thiếu tại khu lăng mộ và nhà thờ họ. Khám phá ý nghĩa tâm linh rồng phượng, chữ Thọ, kiếm bút và khoảng cách đặt chuẩn phong thủy.",
        "content": """<p>Trong quần thể kiến trúc tâm linh như khu lăng mộ gia đình, từ đường hay nhà thờ họ, <strong>cuốn thư đá</strong> (còn được gọi dân gian là <em>bình phong đá</em> hay <em>tắc môn đá</em>) đóng vai trò như một bức bình phong uy nghi, có nhiệm vụ phong thủy trấn giữ môn hộ, ngăn chặn các luồng tà khí, ám khí hung hiểm xâm nhập vào chốn tôn nghiêm.</p>

<p>Không chỉ mang năng lượng bảo vệ âm phần, cuốn thư đá điêu khắc tinh xảo còn tôn vinh nét đẹp tri thức, học thức và gia đạo hiển vinh của dòng tộc muôn đời.</p>

<figure style="margin: 30px auto; text-align: center; width: 100%; display: flex; flex-direction: column; align-items: center;">
    <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377600/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/3.%20Cu%E1%BB%91n%20th%C6%B0%20%C4%91%C3%A1/cu%E1%BB%91n%20th%C6%B0%20r%E1%BB%93ng%20th%E1%BB%9Di%20l%C3%AD%20%C4%91%C3%A1%20xanh%20r%C3%AAu/IMG_20231227_073743.jpg" alt="Cuốn thư rồng thời Lý đá xanh rêu điêu khắc tinh xảo" style="max-width: 100%; max-height: 480px; width: auto; height: auto; object-fit: contain; border-radius: 8px; border: 1.5px solid var(--gold-primary, #c5a059); box-shadow: 0 4px 20px rgba(0,0,0,0.5);" loading="lazy">
    <figcaption style="font-size: 0.9rem; color: #a0aec0; margin-top: 10px; font-style: italic; text-align: center;">Hình 1: Cuốn thư đá xanh rêu chạm Rồng thời Lý – pháp khí trấn trạch linh thiêng nơi cửa ngõ âm gia</figcaption>
</figure>

<h2>1. Cấu Tạo & Ý Nghĩa Tâm Linh Của Cuốn Thư Đá</h2>
<p>Hình tượng cuốn thư đá được lấy cảm hứng từ thẻ tre và chiếu chỉ thư họa của các bậc vua chúa thời xưa. Một tác phẩm bình phong đá hoàn chỉnh thường gồm các biểu tượng kinh điển:</p>
<ul>
    <li><strong>Một bên Bút – Một bên Kiếm:</strong> Cây bút lông tượng trưng cho Trí Tuệ, học vấn uyên bác và con cháu đỗ đạt công danh; Cây thanh gươm tượng trưng cho Sức Mạnh, quyền uy và khả năng xua đuổi tà ma, bảo vệ sự bình an của dòng họ.</li>
    <li><strong>Đồ hình Trung Tâm:</strong> Thường chạm <em>Lưỡng Long Chầu Nguyệt</em> (âm dương hòa hợp), chữ <em>Thọ</em> tròn kết hợp mây ngũ phúc (trường thọ phú quý) hoặc bức họa <em>Tứ Quý Tùng Cúc Trúc Mai</em> (bốn mùa hưng vượng). Bạn có thể tìm hiểu thêm chiều sâu triết lý tại <a href="#article-4" onclick="openArticleModal(4); return false;" style="color: var(--gold-primary); text-decoration: underline;">Ý nghĩa hoa văn điêu khắc đá rồng phượng, hoa sen, tứ quý</a>.</li>
    <li><strong>Chân Đế Cuốn Thư:</strong> Thường làm chân quỳ chạm hổ phù uy nghi, nâng đỡ toàn bộ phiến đá nặng hàng tấn một cách kiên cố, vững chãi.</li>
</ul>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 30px 0;">
    <figure style="margin: 0; background: rgba(10, 20, 42, 0.6); border: 1px solid rgba(197, 160, 89, 0.4); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
        <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377602/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/3.%20Cu%E1%BB%91n%20th%C6%B0%20%C4%91%C3%A1/cu%E1%BB%91n%20th%C6%B0%20%C4%91%C3%A1%20xanh%20r%C3%AAu/FB_IMG_1721413213970.jpg" alt="Cuốn thư đá xanh rêu chân quỳ hổ phù" style="width: 100%; height: 220px; object-fit: cover; border-radius: 6px;" loading="lazy">
        <figcaption style="font-size: 0.85rem; color: #cbd5e1; margin-top: 10px; text-align: center;">Cuốn thư đá xanh rêu chân quỳ hổ phù kiên cố</figcaption>
    </figure>
    <figure style="margin: 0; background: rgba(10, 20, 42, 0.6); border: 1px solid rgba(197, 160, 89, 0.4); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
        <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377600/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/3.%20Cu%E1%BB%91n%20th%C6%B0%20%C4%91%C3%A1/cu%E1%BB%91n%20th%C6%B0%20%C4%91%C3%A1%20c%C3%B3%20c%E1%BB%99t%20%C4%91%C3%A1%20xanh%20%C4%91en/20230121_110526.jpg" alt="Cuốn thư đá có hai cột đèn phụ trợ" style="width: 100%; height: 220px; object-fit: cover; border-radius: 6px;" loading="lazy">
        <figcaption style="font-size: 0.85rem; color: #cbd5e1; margin-top: 10px; text-align: center;">Cuốn thư đá kết hợp hai cột đèn thắp sáng tâm linh</figcaption>
    </figure>
</div>

<h2>2. Vị Trí Vàng Đặt Cuốn Thư Đá Chuẩn Phong Thủy</h2>
<p>Để phát huy tối đa công năng chắn hung khí, cuốn thư đá phải được đặt đúng chuẩn mực hình thế:</p>
<ul>
    <li><strong>Đặt chính diện cổng vào:</strong> Khoảng cách lý tưởng từ ngưỡng cổng đá tới mặt trước cuốn thư là từ <strong>1.2m đến 2.2m</strong>. Khoảng cách này vừa đủ rộng để người đi bộ lách qua hai bên vào thắp hương, vừa đảm bảo luồng khí từ ngoài vào bị bẻ cong, ngăn chặn khí xung thẳng vào trung tâm lăng mộ.</li>
    <li><strong>Kích thước bề ngang cuốn thư:</strong> Bắt buộc phải <em>rộng hơn chiều rộng thông thủy của cổng vào</em>. Ví dụ cổng rộng 107cm thì cuốn thư nên rộng tối thiểu 133cm hoặc 147cm để che khuất hoàn toàn tầm nhìn xuyên thấu từ ngoài vào.</li>
</ul>

<h2>3. Kích Thước Cuốn Thư Đá Lỗ Ban 38.8cm Thông Dụng</h2>
<ul>
    <li><strong>127 cm x 81 cm:</strong> Cung Tiến Bảo – Đăng Khoa (Dành cho khuôn viên khu mộ nhỏ).</li>
    <li><strong>147 cm x 107 cm:</strong> Cung Hỷ Sự – Đại Cát (Kích thước chuẩn mực, rất được ưa chuộng).</li>
    <li><strong>167 cm x 127 cm:</strong> Cung Tiến Bảo – Tiến Bảo (Bề thế cho khu lăng mộ gia tộc quy mô vừa).</li>
    <li><strong>217 cm x 147 cm hoặc 255 cm x 167 cm:</strong> Kích thước uy nghiêm cho nhà thờ họ, từ đường lớn (xem thêm tại bài viết <a href="#article-7" onclick="openArticleModal(7); return false;" style="color: var(--gold-primary); text-decoration: underline;">Kiến trúc nhà thờ họ bằng đá truyền thống</a>).</li>
</ul>

<p>Tham khảo thêm các mẫu cuốn thư đẹp tại <a href="san-pham.html" style="color: var(--gold-primary); text-decoration: underline;">Danh Mục Cuốn Thư Đá Ninh Bình</a> hoặc liên hệ <strong>KTS Nguyễn Văn Hướng</strong> để được tư vấn kích thước phong thủy miễn phí.</p>"""
    },
    {
        "id": 12,
        "title": "Mẫu Cổng Đá Khu Lăng Mộ & Nhà Thờ Họ: Cổng Tam Quan, Cổng Tứ Trụ Bề Thế 2026",
        "category": "nha-tho",
        "categoryName": "Nhà Thờ Họ",
        "date": "16/09/2026",
        "author": "KTS Nguyễn Văn Hướng",
        "readTime": "8 phút",
        "views": "2,310",
        "image": "https://res.cloudinary.com/g3beqqle/image/upload/v1789377605/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/4.%20C%E1%BB%95ng/c%E1%BB%95ng%20t%E1%BB%A9%20tr%E1%BB%A5%20%C4%91%C3%A1%20xanh%20r%C3%AAu/20241110_134523.jpg",
        "excerpt": "Cổng đá là mặt tiền uy nghiêm thể hiện vị thế và gia phong dòng họ. Phân tích chi tiết kiến trúc cổng tứ trụ, cổng tam quan có mái, kỹ thuật làm móng chịu tải và kích thước thông thủy thước Lỗ Ban.",
        "content": """<p>Trong mọi công trình tâm linh từ ngàn đời nay, <strong>cổng đá</strong> luôn là dấu ấn đầu tiên khẳng định vị thế, danh vọng và gia phong của một dòng họ. Cổng không chỉ làm ranh giới che chắn, bảo vệ sự thanh tịnh cho khuôn viên <a href="san-pham.html" style="color: var(--gold-primary); text-decoration: underline;">khu lăng mộ đá</a> hay từ đường nhà thờ họ, mà còn là cánh cửa đón nhận sinh khí, cát khí đất trời ban phước lành cho muôn đời con cháu.</p>

<p>Tại làng nghề đá Ninh Vân, xưởng <strong>Kiến Trúc Đá Tâm Linh</strong> tự hào đã thi công hàng trăm công trình cổng đá tứ trụ và cổng tam quan kỳ vĩ trên khắp 63 tỉnh thành, kết hợp hài hòa giữa kỹ thuật ghép mộng truyền thống và máy móc cẩu lắp tân tiến.</p>

<figure style="margin: 30px auto; text-align: center; width: 100%; display: flex; flex-direction: column; align-items: center;">
    <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377605/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/4.%20C%E1%BB%95ng/c%E1%BB%95ng%20t%E1%BB%A9%20tr%E1%BB%A5%20%C4%91%C3%A1%20xanh%20r%C3%AAu/20241110_134523.jpg" alt="Mẫu cổng tứ trụ đá xanh rêu bề thế cho khu lăng mộ gia tộc" style="max-width: 100%; max-height: 480px; width: auto; height: auto; object-fit: contain; border-radius: 8px; border: 1.5px solid var(--gold-primary, #c5a059); box-shadow: 0 4px 20px rgba(0,0,0,0.5);" loading="lazy">
    <figcaption style="font-size: 0.9rem; color: #a0aec0; margin-top: 10px; font-style: italic; text-align: center;">Hình 1: Cổng đá tứ trụ đá xanh rêu sừng sững uy nghiêm, bảo vệ linh khí gia tộc</figcaption>
</figure>

<h2>1. So Sánh 2 Dòng Cổng Đá Phổ Biến Nhất</h2>
<p>Dựa vào quy mô khuôn viên và nhu cầu thực tế, gia chủ thường lựa chọn 1 trong 2 lối kiến trúc chính sau:</p>

<h3>A. Cổng Đá Tứ Trụ (Cổng 4 Cột Đồng Trụ)</h3>
<ul>
    <li><strong>Đặc điểm:</strong> Gồm 2 cột cái lớn ở giữa tạo lối đi chính và 2 cột quân nhỏ hơn ở hai bên. Trên đỉnh hai cột chính thường tạc đôi Nghê đá hướng ra ngoài để trấn trạch xua tà, hoặc đỉnh Bát Phong Lục Phượng hướng thiên.</li>
    <li><strong>Ưu điểm:</strong> Kết cấu thanh thoát, thông thoáng, không bị giới hạn chiều cao nên rất thuận tiện khi rước xe cộ, kiệu lễ hoặc xe chở vật liệu vào bên trong. Thích hợp cho cả lăng mộ gia đình và cổng nhà thờ tổ.</li>
</ul>

<h3>B. Cổng Đá Tam Quan Có Mái (Hai Mái / Ba Mái)</h3>
<ul>
    <li><strong>Đặc điểm:</strong> Thiết kế 3 cổng vòm (cổng chính lớn ở giữa, 2 cổng ngách hai bên), phía trên lợp các tầng mái ngói đao rồng uốn lượn cổ kính như đình chùa cung đình xưa.</li>
    <li><strong>Ưu điểm:</strong> Mang vẻ đẹp cổ kính, thâm trầm, trang trọng tột bậc. Thích hợp cho các khu nhà thờ họ lớn hoặc nghĩa trang gia tộc diện tích trên 200m².</li>
</ul>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 30px 0;">
    <figure style="margin: 0; background: rgba(10, 20, 42, 0.6); border: 1px solid rgba(197, 160, 89, 0.4); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
        <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377603/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/4.%20C%E1%BB%95ng/c%E1%BB%95ng%20m%C3%A1i%20xanh%20r%C3%AAu/A.jpg" alt="Cổng đá có mái xanh rêu cổ truyền" style="width: 100%; height: 220px; object-fit: cover; border-radius: 6px;" loading="lazy">
        <figcaption style="font-size: 0.85rem; color: #cbd5e1; margin-top: 10px; text-align: center;">Cổng đá có mái che đao rồng xanh rêu uy nghi</figcaption>
    </figure>
    <figure style="margin: 0; background: rgba(10, 20, 42, 0.6); border: 1px solid rgba(197, 160, 89, 0.4); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
        <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377604/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/4.%20C%E1%BB%95ng/c%E1%BB%95ng%20tam%20quan%20xanh%20%C4%91en/FB_IMG_1712731170212.jpg" alt="Cổng tam quan đá xanh đen truyền thống Ninh Bình" style="width: 100%; height: 220px; object-fit: cover; border-radius: 6px;" loading="lazy">
        <figcaption style="font-size: 0.85rem; color: #cbd5e1; margin-top: 10px; text-align: center;">Cổng tam quan đá xanh đen trầm mặc, cổ kính</figcaption>
    </figure>
</div>

<h2>2. Yêu Cầu Kỹ Thuật Nền Móng Chịu Tải Trọng Cho Cổng Đá</h2>
<p>Một bộ cổng đá tự nhiên nguyên khối có tổng khối lượng từ <strong>15 đến 30 tấn</strong>. Do đó, kỹ thuật gia cố nền móng là khâu sống còn:</p>
<ul>
    <li>Móng phải đổ bê tông cốt thép dầm giằng liên kết dày từ 25cm - 40cm trên nền đất thịt vững chắc hoặc cọc ép bê tông.</li>
    <li>Các khớp mộng giữa chân tảng, thân cột và xà ngang được tiện mộng âm dương chính xác, liên kết bằng keo epoxy chuyên dụng chống thấm nứt vĩnh cửu. Quý khách có thể xem thêm quy chuẩn kỹ thuật tại bài viết <a href="#article-6" onclick="openArticleModal(6); return false;" style="color: var(--gold-primary); text-decoration: underline;">Quy trình thi công lắp đặt lăng mộ đá an toàn</a>.</li>
</ul>

<h2>3. Kích Thước Lọt Sáng (Thông Thủy) Cổng Chuẩn Thước Lỗ Ban 52.2cm</h2>
<p>Lưu ý quan trọng: Khi đo khoảng thông thủy lọt sáng cửa cổng đi lại, cần tra cứu theo thước Lỗ Ban 52.2cm (thước thông thủy dương khí):</p>
<ul>
    <li><strong>Rộng 107 cm x Cao 212 cm:</strong> Cung Quý Tử – Tiến Bảo.</li>
    <li><strong>Rộng 133 cm x Cao 235 cm:</strong> Cung Nghinh Phúc – Đại Cát.</li>
    <li><strong>Rộng 167 cm x Cao 262 cm:</strong> Cung Thêm Đinh – Phú Quý (Dành cho cổng lớn từ đường).</li>
</ul>

<p>Khám phá thêm các công trình thực tế tại trang <a href="du-an.html" style="color: var(--gold-primary); text-decoration: underline;">Dự Án Kiến Trúc Đá</a> hoặc liên hệ <strong>KTS Nguyễn Văn Hướng</strong> để nhận tư vấn phong thủy và thiết kế 3D miễn phí.</p>"""
    },
    {
        "id": 13,
        "title": "Kinh Nghiệm Cải Táng, Sang Cát & Quy Tập Mộ Phần Gia Tộc Chuẩn Phong Thủy Từ A-Z",
        "category": "phong-thuy",
        "categoryName": "Phong Thủy Âm Trạch",
        "date": "14/09/2026",
        "author": "KTS Nguyễn Văn Hướng",
        "readTime": "9 phút",
        "views": "3,120",
        "image": "https://res.cloudinary.com/g3beqqle/image/upload/v1789377519/%E1%BA%A3nh%20d%E1%BB%B1%20%C3%A1n/3.%20khu%C3%B4n%20vi%C3%AAn%203d/khu%20s%E1%BB%91%20%205/Enscape_2026-09-04-10-46-34.png",
        "excerpt": "Cải táng, sang cát và quy tập mộ phần là đạo hiếu thiêng liêng nhất của người Việt. Hướng dẫn toàn bộ quy trình: chọn thời điểm vàng trong năm, thủ tục tâm linh, quy hoạch mộ đá gia tộc và dự toán chi phí.",
        "content": """<p><em>'Sống vì mồ vì mả, không ai sống vì cả bát cơm'</em>. Trong tâm thức đạo hiếu của người Việt, việc <strong>cải táng, sang cát</strong> và <strong>quy tập mộ phần tổ tiên</strong> về một khu nghĩa trang gia đình khang trang, bề thế là một trong những việc đại sự linh thiêng nhất của mỗi dòng họ. Làm tốt công việc này không chỉ giúp người đã khuất được 'mồ yên mả đẹp' mà còn đem lại phúc trạch, bình an và hưng thịnh cho con cháu đời sau.</p>

<p>Dưới góc nhìn phong thủy âm trạch và kinh nghiệm thi công hàng trăm công trình quy tập nghĩa trang gia tộc, <strong>KTS Nguyễn Văn Hướng</strong> xin đúc kết cẩm nang chi tiết từ A-Z dưới đây.</p>

<figure style="margin: 30px auto; text-align: center; width: 100%; display: flex; flex-direction: column; align-items: center;">
    <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377519/%E1%BA%A3nh%20d%E1%BB%B1%20%C3%A1n/3.%20khu%C3%B4n%20vi%C3%AAn%203d/khu%20s%E1%BB%91%20%205/Enscape_2026-09-04-10-46-34.png" alt="Phối cảnh 3D quy hoạch khu lăng mộ gia tộc quy tập nhiều thế hệ" style="max-width: 100%; max-height: 480px; width: auto; height: auto; object-fit: contain; border-radius: 8px; border: 1.5px solid var(--gold-primary, #c5a059); box-shadow: 0 4px 20px rgba(0,0,0,0.5);" loading="lazy">
    <figcaption style="font-size: 0.9rem; color: #a0aec0; margin-top: 10px; font-style: italic; text-align: center;">Hình 1: Phối cảnh 3D quy hoạch nghĩa trang gia tộc – con cháu quy tụ tổ tiên về một mối trang nghiêm</figcaption>
</figure>

<h2>1. Thời Điểm Vàng Để Thực Hiện Cải Táng Trong Năm</h2>
<p>Theo phong tục cổ truyền, thời gian bốc mộ sang cát thích hợp nhất là vào <strong>cuối Thu đến trước tiết Đông Chí</strong> (khoảng từ tháng 8 đến tháng 11 âm lịch hàng năm):</p>
<ul>
    <li>Thời tiết lúc này hanh hao, se lạnh, ít mưa bão, nước ngầm hạ thấp giúp việc đào bới và tẩy rửa xương cốt sạch sẽ, vệ sinh.</li>
    <li>Về mặt phong thủy, đây là thời điểm khí âm dương giao hòa, cực kỳ thuận lợi cho việc sang tiểu quách và nhập trạch âm phần mới.</li>
    <li>Tuyệt đối tránh bốc mộ vào mùa hè oi nóng ẩm ướt hoặc các ngày giờ xung sát tuổi trưởng nam và người đã khuất (xem chi tiết tại <a href="#article-5" onclick="openArticleModal(5); return false;" style="color: var(--gold-primary); text-decoration: underline;">10 điều kiêng kỵ tuyệt đối khi xây sửa mộ phần</a>).</li>
</ul>

<h2>2. Quy Trình 5 Bước Sang Cát Nhập Trạch Mộ Đá</h2>
<ol>
    <li><strong>Khảo sát & Chọn ngày hoàng đạo:</strong> Nhờ thầy phong thủy hoặc KTS có chuyên môn âm trạch chọn ngày lành, giờ hoàng đạo ban đêm (thường tiến hành từ 11h đêm đến 5h sáng để tránh ánh nắng mặt trời làm đen xương).</li>
    <li><strong>Cúng lễ xin phép:</strong> Lễ tạ mộ cũ xin Thổ Thần, Long Mạch cho phép động thổ di dời linh cốt.</li>
    <li><strong>Tắm rửa linh cốt (Tẩy uế):</strong> Xương cốt sau khi vớt lên được rửa kỹ bằng nước ngũ vị hương (nước vang quế hồi hoa bưởi) và rượu gừng nguyên chất, sau đó xếp vào quách tiểu theo đúng thứ tự giải phẫu đầu chân.</li>
    <li><strong>Hạ huyệt tại khu lăng mộ mới:</strong> Đặt tiểu sành hoặc quách đá vào huyệt mộ mới đã được rải cát vàng, đá thạch anh vụn ngũ sắc để tụ khí long mạch.</li>
    <li><strong>Lắp đặt mộ đá nguyên khối:</strong> Đặt mộ đá kiên cố bên trên để vĩnh viễn bảo bọc linh cốt (tham khảo mẫu tại bài viết <a href="#article-1" onclick="openArticleModal(1); return false;" style="color: var(--gold-primary); text-decoration: underline;">Mẫu Lăng Mộ Đá 3 Mái Ninh Bình</a> và <a href="#article-10" onclick="openArticleModal(10); return false;" style="color: var(--gold-primary); text-decoration: underline;">Mẫu Mộ Đá Đôi Cho Ông Bà Cha Mẹ</a>).</li>
</ol>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 30px 0;">
    <figure style="margin: 0; background: rgba(10, 20, 42, 0.6); border: 1px solid rgba(197, 160, 89, 0.4); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
        <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377518/%E1%BA%A3nh%20d%E1%BB%B1%20%C3%A1n/3.%20khu%C3%B4n%20vi%C3%AAn%203d/khu%20s%E1%BB%91%20%205/Enscape_2026-09-04-10-48-03.png" alt="Quy hoạch lối đi và cảnh quan khuôn viên nghĩa trang gia tộc" style="width: 100%; height: 220px; object-fit: cover; border-radius: 6px;" loading="lazy">
        <figcaption style="font-size: 0.85rem; color: #cbd5e1; margin-top: 10px; text-align: center;">Quy hoạch lối đi thông thoáng, phân cấp thứ bậc các đời</figcaption>
    </figure>
    <figure style="margin: 0; background: rgba(10, 20, 42, 0.6); border: 1px solid rgba(197, 160, 89, 0.4); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
        <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377587/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/2.%20M%E1%BB%99/m%E1%BB%99%203%20%C4%91%C3%A1%20xanh%20r%C3%AAu/FB_IMG_1732020757427.jpg" alt="Mộ đá xanh rêu sang trọng trường tồn muôn đời" style="width: 100%; height: 220px; object-fit: cover; border-radius: 6px;" loading="lazy">
        <figcaption style="font-size: 0.85rem; color: #cbd5e1; margin-top: 10px; text-align: center;">Mộ đá xanh rêu khối bền vững vĩnh cửu qua hàng trăm năm</figcaption>
    </figure>
</div>

<h2>3. Quy Hoạch Thứ Bậc Khi Quy Tập Mộ Phần Gia Tộc</h2>
<p>Một lỗi thường gặp khi gom mộ rải rác về một khu lăng là sắp đặt lộn xộn các ngôi mộ. Cần tuân thủ chặt chẽ:</p>
<ul>
    <li><strong>Phân chia theo đời (Thứ bậc):</strong> Cụ tổ đời thứ nhất đặt ở vị trí cao nhất và gần lăng thờ chung nhất; các đời con cháu tiếp theo xếp lùi dần về phía trước.</li>
    <li><strong>Kích thước chuẩn thước Lỗ Ban 38.8cm:</strong> Xem bảng số đo chi tiết tại cẩm nang <a href="#article-2" onclick="openArticleModal(2); return false;" style="color: var(--gold-primary); text-decoration: underline;">Kích Thước Mộ Chuẩn Thước Lỗ Ban 38.8cm Âm Phần</a>.</li>
    <li><strong>Tính toán ngân sách:</strong> Để gia đình chủ động tài chính, hãy tham khảo bài viết <a href="#article-8" onclick="openArticleModal(8); return false;" style="color: var(--gold-primary); text-decoration: underline;">Cách tính dự toán chi phí xây lăng mộ đá tiết kiệm nhất</a> hoặc xem chi tiết tại <a href="bao-gia.html" style="color: var(--gold-primary); text-decoration: underline;">Bảng Báo Giá Đá Mỹ Nghệ 2026</a>.</li>
</ul>

<p>Mọi thắc mắc về thủ tục bốc mộ, bản vẽ quy hoạch khuôn viên 3D và báo giá thi công trọn gói, quý khách vui lòng liên hệ trực tiếp <strong>KTS Nguyễn Văn Hướng</strong> để được hỗ trợ tận tâm nhất.</p>"""
    }
]

def update_all():
    # 1. Update live_overrides.json
    path_live = 'live_overrides.json'
    with open(path_live, 'r', encoding='utf-8') as f:
        data = json.load(f)

    existing = {a['id']: a for a in data.get('articles', [])}
    for na in new_articles:
        existing[na['id']] = na

    sorted_articles = sorted(existing.values(), key=lambda x: x['id'])
    data['articles'] = sorted_articles
    data['timestamp'] = 1890000003000

    with open(path_live, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Updated live_overrides.json with 13 articles.")

    # 2. Update default_data.js
    path_def = 'default_data.js'
    with open(path_def, 'r', encoding='utf-8') as f:
        content_def = f.read()

    # Find DEFAULT_ARTICLES array in default_data.js
    pattern = re.compile(r'const DEFAULT_ARTICLES = \[.*?\];', re.DOTALL)
    new_articles_js = "const DEFAULT_ARTICLES = " + json.dumps(sorted_articles, ensure_ascii=False, indent=4) + ";"
    if pattern.search(content_def):
        content_def = pattern.sub(new_articles_js, content_def, count=1)
        with open(path_def, 'w', encoding='utf-8') as f:
            f.write(content_def)
        print("Updated default_data.js with 13 articles.")
    else:
        print("WARNING: Pattern DEFAULT_ARTICLES not matched in default_data.js")

    # 3. Update tin-tuc.html inline DEFAULT_ARTICLES if present
    path_tt = 'tin-tuc.html'
    with open(path_tt, 'r', encoding='utf-8') as f:
        content_tt = f.read()

    pattern_tt = re.compile(r'const DEFAULT_ARTICLES = \[.*?\];', re.DOTALL)
    if pattern_tt.search(content_tt):
        content_tt = pattern_tt.sub(new_articles_js, content_tt, count=1)
        with open(path_tt, 'w', encoding='utf-8') as f:
            f.write(content_tt)
        print("Updated tin-tuc.html inline DEFAULT_ARTICLES with 13 articles.")
    else:
        print("tin-tuc.html has no separate inline DEFAULT_ARTICLES const.")

if __name__ == '__main__':
    update_all()
