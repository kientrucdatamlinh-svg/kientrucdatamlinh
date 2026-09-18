import json
import re

# Updated Article 1 definition based on Kinh_Nghiem_Xay_Dung_Khu_Lang_Mo_Da_Gia_Toc.docx
updated_article_1 = {
    "id": 1,
    "title": "Kinh Nghiệm Xây Dựng Khu Lăng Mộ Đá Gia Tộc Chuẩn Phong Thủy 2026",
    "category": "cam-nang",
    "categoryName": "Cẩm Nang Lăng Mộ",
    "date": "14/09/2026",
    "author": "KTS Nguyễn Văn Hướng",
    "readTime": "8 phút",
    "views": "3,820",
    "image": "https://res.cloudinary.com/g3beqqle/image/upload/v1789377577/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/1.%20L%C4%83ng%20th%E1%BB%9D/l%C4%83ng%20c%C3%A1nh%202%20m%C3%A1i%20%C4%91%C3%A1%20xanh%20r%C3%AAu/a.jpg",
    "excerpt": "Tổng hợp toàn bộ kinh nghiệm thực chiến khi quy hoạch và xây dựng khu lăng mộ đá gia tộc năm 2026: quy hoạch tổng thể không gian, so sánh 3 dòng đá tự nhiên (xanh rêu, xanh đen, granite), phong thủy hướng mộ chuẩn Lỗ Ban 38.8cm và các hạng mục kiến trúc tâm linh bắt buộc.",
    "content": """<p>Việc xây dựng hoặc tôn tạo khu lăng mộ đá gia tộc là một trong những việc trọng đại của con cháu để bày tỏ lòng thành kính với ông bà, tổ tiên. Một khu lăng mộ đẹp không chỉ mang lại tính thẩm mỹ, độ bền vững cùng thời gian mà còn ảnh hưởng trực tiếp đến phong thủy, tài vận của cả dòng họ. Đặc biệt, đây là công trình tâm linh mang tính trường tồn, kết nối các thế hệ, đòi hỏi sự đầu tư kỹ lưỡng về cả thiết kế, quy hoạch, chất liệu đá và các yếu tố phong thủy hướng mộ.</p>

<h2>1. Tầm Quan Trọng Của Việc Quy Hoạch Tổng Thể Khu Lăng Mộ Gia Tộc</h2>
<p>Trước khi tiến hành thi công, việc lên bản vẽ thiết kế tổng thể và quy hoạch không gian là bước không thể bỏ qua. Một khu lăng mộ đá hoặc khu nhà thờ kết hợp khuôn viên lăng tẩm gia tộc quy chuẩn sẽ mang lại những giá trị cốt lõi:</p>
<ul>
    <li><strong>Đảm bảo tính thống nhất và trang nghiêm:</strong> Sắp xếp vị trí các ngôi mộ đá theo đúng vai vế, thứ bậc trong dòng họ (ông bà, cha mẹ, các đời tiếp theo) theo nguyên tắc "Nam tả - Nữ hữu" hoặc tiền hậu rõ ràng.</li>
    <li><strong>Tối ưu hóa không gian:</strong> Giúp lối đi, khu vực hành lễ, cổng đá, hàng rào bao quanh thông thoáng, trang nghiêm và thuận tiện cho con cháu thăm viếng mỗi dịp lễ Tết, giỗ chạp.</li>
    <li><strong>Độ bền vững vượt thời gian:</strong> Sử dụng các vật liệu tự nhiên cao cấp giúp công trình chống chọi tốt với thời tiết khắc nghiệt, hạn chế tối đa việc tu sửa về sau.</li>
</ul>

<figure style="margin: 25px 0; text-align: center;">
    <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377577/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/1.%20L%C4%83ng%20th%E1%BB%9D/l%C4%83ng%20c%C3%A1nh%202%20m%C3%A1i%20%C4%91%C3%A1%20xanh%20r%C3%AAu/a.jpg" alt="Quy hoạch khuôn viên khu lăng mộ đá gia tộc chuẩn phong thủy" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--gold-primary, #c5a059);" loading="lazy">
    <figcaption style="font-size: 0.9rem; color: #a0aec0; margin-top: 8px; font-style: italic;">Hình 1: Quy hoạch tổng thể không gian khu lăng mộ đá gia tộc trang nghiêm và chuẩn phong thủy</figcaption>
</figure>

<h2>2. Lựa Chọn Chất Liệu Đá: So Sánh Ưu Nhược Điểm Đá Xanh Rêu, Đá Xanh Đen Và Đá Granite</h2>
<p>Chất liệu đá là yếu tố quyết định tuổi thọ và tính thẩm mỹ của công trình. Năm 2026, xu hướng chế tác lăng mộ đá tập trung vào 3 dòng chất liệu chính với những đặc tính riêng biệt:</p>
<ul>
    <li><strong>Đá xanh đen Thanh Hóa:</strong> Dòng đá truyền thống quen thuộc, có độ cứng cao, thớ đá mịn, dễ chạm trổ các hoa văn tinh xảo như tứ quý, rồng chầu, hoa sen. Ưu điểm lớn nhất là giá thành hợp lý, mang vẻ đẹp cổ kính, trầm mặc.</li>
    <li><strong>Đá xanh rêu cao cấp:</strong> Nổi bật với màu sắc sang trọng, độ dai đá cực tốt, thớ đá mịn và ít bị rạn nứt trước tác động sốc nhiệt của thời tiết. Loại đá này rất thích hợp cho các khu lăng mộ bề thế, yêu cầu chạm khắc nổi bật.</li>
    <li><strong>Đá Granite (Đá hoa cương):</strong> Thích hợp cho các mẫu mộ hiện đại, đường nét tối giản. Bề mặt bóng kính giúp chống bám rêu mốc cực tốt, dễ dàng vệ sinh, mang lại vẻ đẹp hiện đại và sang trọng.</li>
</ul>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 15px; margin: 25px 0;">
    <figure style="margin: 0; text-align: center;">
        <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377587/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/2.%20M%E1%BB%99/m%E1%BB%99%203%20%C4%91%C3%A1%20xanh%20r%C3%AAu/FB_IMG_1732020757427.jpg" alt="Mộ đá xanh rêu cao cấp" style="width: 100%; height: 200px; object-fit: cover; border-radius: 6px; border: 1px solid var(--gold-primary, #c5a059);" loading="lazy">
        <figcaption style="font-size: 0.85rem; color: #a0aec0; margin-top: 6px;">Đá xanh rêu sang trọng</figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
        <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377586/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/2.%20M%E1%BB%99/m%E1%BB%99%203%20m%C3%A1i%20xanh%20%C4%91en/FB_IMG_1763802202067.jpg" alt="Mộ đá xanh đen truyền thống" style="width: 100%; height: 200px; object-fit: cover; border-radius: 6px; border: 1px solid var(--gold-primary, #c5a059);" loading="lazy">
        <figcaption style="font-size: 0.85rem; color: #a0aec0; margin-top: 6px;">Đá xanh đen cổ kính</figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
        <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377589/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/2.%20M%E1%BB%99/m%E1%BB%99%20granit%20%C4%91en%20%E1%BA%A5n%20%C4%91%E1%BB%99%20kt%2081x127/20250515_081145.jpg" alt="Mộ đá Granite bóng kính" style="width: 100%; height: 200px; object-fit: cover; border-radius: 6px; border: 1px solid var(--gold-primary, #c5a059);" loading="lazy">
        <figcaption style="font-size: 0.85rem; color: #a0aec0; margin-top: 6px;">Đá Granite hiện đại</figcaption>
    </figure>
</div>

<h2>3. Phong Thủy Hướng Mộ Và Kích Thước Chuẩn Thước Lỗ Ban 2026</h2>
<p>Phong thủy lăng mộ là yếu tố tâm linh quan trọng hàng đầu, quyết định sự hưng thịnh, bình an của con cháu đời sau. Khi xây dựng, gia chủ cần lưu ý kỹ lưỡng:</p>

<h3>A. Chọn hướng mộ và thế đất</h3>
<ul>
    <li><strong>Thế đất:</strong> Nên chọn nơi đất cao ráo, tụ khí, có Long mạch chạy qua (tránh nơi ngập úng, trũng thấp hoặc có mạch nước ngầm chảy xiết).</li>
    <li><strong>Hướng lăng mộ:</strong> Cần tính toán dựa trên tuổi của người đã khuất hoặc hướng của toàn bộ khu lăng mộ gia tộc sao cho hợp với trạch vận năm 2026, tránh các phương vị xấu theo la bàn phong thủy.</li>
</ul>

<h3>B. Kích thước chuẩn thước Lỗ Ban 38.8cm (Âm trạch)</h3>
<p>Tất cả các hạng mục từ mộ đá, cuốn thư đá, lăng thờ chung cho đến cổng đá đều phải rơi vào các cung đỏ (Cung tốt) trên thước Lỗ Ban âm phần như: Tài Trí, Nghĩa Tỷ, Quan, Bản Lộc, Tiến Bảo, Đại Cát... mang lại bình an, tài lộc và vượng khí cho dòng họ.</p>

<figure style="margin: 25px 0; text-align: center;">
    <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377585/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/2.%20M%E1%BB%99/m%E1%BB%99%202%20m%C3%A1i%20%C4%91%C3%A1%20xanh%20r%C3%AAu%20kt%20167x275/IMG_20230315_221542.jpg" alt="Mộ đá 2 mái chế tác chuẩn thước Lỗ Ban 38.8cm" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--gold-primary, #c5a059);" loading="lazy">
    <figcaption style="font-size: 0.9rem; color: #a0aec0; margin-top: 8px; font-style: italic;">Hình 2: Mộ đá 2 mái đá xanh rêu chế tác chuẩn kích thước Lỗ Ban âm trạch mang lại may mắn, vượng khí</figcaption>
</figure>

<h2>4. Các Hạng Mục Không Thể Thiếu Trong Một Khu Lăng Mộ Đá Gia Tộc</h2>
<p>Một khu lăng mộ gia tộc hoàn chỉnh và chuẩn phong thủy thường bao gồm các thành phần chính sau:</p>
<ol>
    <li><strong>Lăng thờ chung (Long đình đá):</strong> Nơi thờ thổ thần, thổ địa hoặc đặt bài vị chung của cả dòng họ, là tâm điểm tâm linh của toàn khu.</li>
    <li><strong>Hệ thống mộ đá đơn / mộ đôi:</strong> Được thiết kế đồng bộ theo mẫu mộ tam sơn, mộ khổng tước hoặc mộ hai mái, ba mái tùy theo quy hoạch.</li>
    <li><strong>Cuốn thư đá (Bình phong):</strong> Đặt ngay lối vào chính để che chắn các luồng khí xấu, tà khí xâm nhập vào khuôn viên.</li>
    <li><strong>Cổng đá và hàng rào đá:</strong> Tạo sự khép kín, uy nghiêm, định ranh giới rõ ràng cho khu vực linh thiêng.</li>
</ol>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; margin: 25px 0;">
    <figure style="margin: 0; text-align: center;">
        <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377602/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/3.%20Cu%E1%BB%91n%20th%C6%B0%20%C4%91%C3%A1/cu%E1%BB%91n%20th%C6%B0%20%C4%91%C3%A1%20xanh%20r%C3%AAu/FB_IMG_1721413213970.jpg" alt="Cuốn thư đá xanh rêu chắn tà khí" style="width: 100%; height: 220px; object-fit: cover; border-radius: 6px; border: 1px solid var(--gold-primary, #c5a059);" loading="lazy">
        <figcaption style="font-size: 0.85rem; color: #a0aec0; margin-top: 6px;">Cuốn thư đá xanh rêu chắn hung khí</figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
        <img src="https://res.cloudinary.com/g3beqqle/image/upload/v1789377605/%E1%BA%A3nh%20s%E1%BA%A3n%20ph%E1%BA%A9m/4.%20C%E1%BB%95ng/c%E1%BB%95ng%20t%E1%BB%A3%20tr%E1%BB%A5%20%C4%91%C3%A1%20xanh%20r%C3%AAu/20241110_134523.jpg" alt="Cổng đá tứ trụ khu lăng mộ gia tộc" style="width: 100%; height: 220px; object-fit: cover; border-radius: 6px; border: 1px solid var(--gold-primary, #c5a059);" loading="lazy">
        <figcaption style="font-size: 0.85rem; color: #a0aec0; margin-top: 6px;">Cổng đá tứ trụ bề thế, trang nghiêm</figcaption>
    </figure>
</div>

<h2>5. Lời Kết</h2>
<p>Xây dựng khu lăng mộ đá gia tộc là công trình tâm linh mang ý nghĩa uống nước nhớ nguồn, kết nối quá khứ và tương lai. Việc đầu tư bài bản từ khâu quy hoạch, chọn chất liệu đến phong thủy sẽ giúp gia tộc luôn hưng thịnh, con cháu đời đời bình an. Hãy liên hệ với các đơn vị chế tác đá mỹ nghệ uy tín để được tư vấn thiết kế trọn gói và chi tiết nhất cho năm 2026.</p>"""
}

def update_live_overrides():
    path = r'c:\Users\Mon\Desktop\kientrucdatamlinh\live_overrides.json'
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    updated = False
    for idx, art in enumerate(data.get('articles', [])):
        if art.get('id') == 1:
            data['articles'][idx] = updated_article_1
            updated = True
            break
    
    if updated:
        data['timestamp'] = int(data.get('timestamp', 0)) + 1
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print('Updated live_overrides.json successfully.')

def update_default_data():
    path = r'c:\Users\Mon\Desktop\kientrucdatamlinh\default_data.js'
    with open(path, 'r', encoding='utf-8') as f:
        code = f.read()

    pattern = re.compile(r'(\s*\{\s*id:\s*1,\s*title:.*?\n\s*\},?)', re.DOTALL)
    m = pattern.search(code)
    if m:
        art1_js = f"""
            {{
                id: 1,
                title: {json.dumps(updated_article_1['title'], ensure_ascii=False)},
                category: {json.dumps(updated_article_1['category'], ensure_ascii=False)},
                categoryName: {json.dumps(updated_article_1['categoryName'], ensure_ascii=False)},
                date: {json.dumps(updated_article_1['date'], ensure_ascii=False)},
                author: {json.dumps(updated_article_1['author'], ensure_ascii=False)},
                readTime: {json.dumps(updated_article_1['readTime'], ensure_ascii=False)},
                views: {json.dumps(updated_article_1['views'], ensure_ascii=False)},
                image: {json.dumps(updated_article_1['image'], ensure_ascii=False)},
                excerpt: {json.dumps(updated_article_1['excerpt'], ensure_ascii=False)},
                content: `{updated_article_1['content']}`
            }},"""
        code = code[:m.start()] + art1_js + code[m.end():]
        with open(path, 'w', encoding='utf-8') as f:
            f.write(code)
        print('Updated default_data.js successfully.')

def update_tin_tuc():
    path = r'c:\Users\Mon\Desktop\kientrucdatamlinh\tin-tuc.html'
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    pattern = re.compile(r'(\s*\{\s*id:\s*1,\s*title:.*?\n\s*\},?)', re.DOTALL)
    m = pattern.search(html)
    if m:
        art1_js = f"""
            {{
                id: 1,
                title: {json.dumps(updated_article_1['title'], ensure_ascii=False)},
                category: {json.dumps(updated_article_1['category'], ensure_ascii=False)},
                categoryName: {json.dumps(updated_article_1['categoryName'], ensure_ascii=False)},
                date: {json.dumps(updated_article_1['date'], ensure_ascii=False)},
                author: {json.dumps(updated_article_1['author'], ensure_ascii=False)},
                readTime: {json.dumps(updated_article_1['readTime'], ensure_ascii=False)},
                views: {json.dumps(updated_article_1['views'], ensure_ascii=False)},
                image: {json.dumps(updated_article_1['image'], ensure_ascii=False)},
                excerpt: {json.dumps(updated_article_1['excerpt'], ensure_ascii=False)},
                content: `{updated_article_1['content']}`
            }},"""
        html = html[:m.start()] + art1_js + html[m.end():]
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print('Updated tin-tuc.html successfully.')

if __name__ == '__main__':
    update_live_overrides()
    update_default_data()
    update_tin_tuc()
