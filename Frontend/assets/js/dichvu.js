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
            item.mucdich.toLowerCase().includes(keyword)
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

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.disabled = i === currentPage;
        btn.onclick = () => {
            currentPage = i;
            renderTable();
        };
        pagination.appendChild(btn);
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
