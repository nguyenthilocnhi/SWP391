let allData = [];
let currentPage = 1;
const rowsPerPage = 10;

const tbody = document.querySelector("#serviceTable tbody");
const searchInput = document.getElementById("searchInput");
const filterLoai = document.getElementById("filterLoai");
const pagination = document.getElementById("pagination");

fetch("/Frontend/assets/data/dichvu.json")
    .then(res => res.json())
    .then(data => {
        allData = data;
        renderTable();
    });

function renderTable() {
    const keyword = searchInput.value.trim().toLowerCase();
    const loai = filterLoai.value;

    const filtered = allData.filter(item =>
        (loai === "" || item.loai.toLowerCase() === loai.toLowerCase()) &&
        (
            item.ten.toLowerCase().includes(keyword) ||
            item.mucdich.toLowerCase().includes(keyword) ||
            item.ma.toLowerCase().includes(keyword)
        )
    );

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = filtered.slice(start, end);

    tbody.innerHTML = "";
    pageData.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${start + index + 1}</td>
      <td>${item.ma}</td>
      <td>${item.loai}</td>
      <td>${item.ten}</td>
      <td>${item.mucdich}</td>
      <td>${item.thoigian}</td>
      <td>${item.chiphi}</td>
      <td>${item.tinhtrang}</td>
      <td>
        <a href="chitietdichvu_1.html">Chi tiết</a>

      </td>
    `;
        tbody.appendChild(tr);
    });

    renderPagination(filtered.length);
}

function renderPagination(totalRows) {
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    pagination.innerHTML = "";

    // Nút Previous
    if (totalPages > 1) {
        const prevBtn = document.createElement("button");
        prevBtn.innerHTML = "&laquo;";
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        };
        prevBtn.title = "Trang trước";
        pagination.appendChild(prevBtn);
    }

    // Hiển thị các nút trang
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Nút trang đầu nếu cần
    if (startPage > 1) {
        const firstBtn = document.createElement("button");
        firstBtn.textContent = "1";
        firstBtn.onclick = () => {
            currentPage = 1;
            renderTable();
        };
        pagination.appendChild(firstBtn);
        
        if (startPage > 2) {
            const ellipsis = document.createElement("span");
            ellipsis.textContent = "...";
            ellipsis.style.cssText = "padding: 0 8px; color: #666; font-weight: bold;";
            pagination.appendChild(ellipsis);
        }
    }

    // Các nút trang chính
    for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.disabled = i === currentPage;
        btn.onclick = () => {
            currentPage = i;
            renderTable();
        };
        pagination.appendChild(btn);
    }

    // Nút trang cuối nếu cần
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement("span");
            ellipsis.textContent = "...";
            ellipsis.style.cssText = "padding: 0 8px; color: #666; font-weight: bold;";
            pagination.appendChild(ellipsis);
        }
        
        const lastBtn = document.createElement("button");
        lastBtn.textContent = totalPages;
        lastBtn.onclick = () => {
            currentPage = totalPages;
            renderTable();
        };
        pagination.appendChild(lastBtn);
    }

    // Nút Next
    if (totalPages > 1) {
        const nextBtn = document.createElement("button");
        nextBtn.innerHTML = "&raquo;";
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
            }
        };
        nextBtn.title = "Trang sau";
        pagination.appendChild(nextBtn);
    }

    // Thông tin trang
    if (totalPages > 0) {
        const pageInfo = document.createElement("div");
        pageInfo.style.cssText = "margin-top: 15px; text-align: center; color: #666; font-size: 14px;";
        pageInfo.textContent = `Trang ${currentPage} của ${totalPages} (${totalRows} dịch vụ)`;
        pagination.appendChild(pageInfo);
    }
}

// Tự cập nhật khi tìm kiếm hoặc chọn loại
searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderTable();
});
filterLoai.addEventListener("change", () => {
    currentPage = 1;
    renderTable();
});
