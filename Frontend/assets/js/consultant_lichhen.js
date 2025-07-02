document.addEventListener("DOMContentLoaded", () => {
  const data = [
    // Lịch dịch vụ
    {
      type: "service",
      date: "2025-07-01",
      time: "08:00",
      name: "Nguyễn Văn A",
      service: "Tư vấn tâm lý",
      status: "confirmed"
    },
    {
      type: "service",
      date: "2025-07-02",
      time: "14:30",
      name: "Trần Thị B",
      service: "Khám tổng quát",
      status: "pending"
    },
    {
      type: "service",
      date: "2025-07-02",
      time: "16:00",
      name: "Lê Minh C",
      service: "Xét nghiệm",
      status: "cancelled"
    },

    // Lịch tư vấn viên
    {
      type: "consultant",
      name: "Jane Cooper",
      service: "Tư Vấn",
      phone: "(225) 555-0118",
      email: "jane@microsoft.com",
      time: "8:26 25/05/2025"
    },
    {
      type: "consultant",
      name: "Floyd Miles",
      service: "ELISA",
      phone: "(205) 555-0100",
      email: "floyd@yahoo.com",
      time: "8:31 25/05/2025"
    },
    {
      type: "consultant",
      name: "Ronald Richards",
      service: "ELISA",
      phone: "(302) 555-0107",
      email: "ronald@adobe.com",
      time: "8:34 25/05/2025"
    },
    {
      type: "consultant",
      name: "Marvin McKinney",
      service: "ELISA",
      phone: "(252) 555-0126",
      email: "marvin@tesla.com",
      time: "8:50 25/05/2025"
    },
    {
      type: "consultant",
      name: "Jerome Bell",
      service: "ELISA",
      phone: "(629) 555-0129",
      email: "jerome@google.com",
      time: "8:55 25/05/2025"
    }
  ];

  const perPage = 5;
  let currentPage = 1;
  const tbody = document.getElementById("appointmentBody");
  const pagination = document.getElementById("pagination");

  const filterDate = document.getElementById("filterDate");
  const filterName = document.getElementById("filterName");
  const filterStatus = document.getElementById("filterStatus");

  // Loại bảng: 'consultant' hoặc 'service'
  const viewType = document.body.dataset.view || "consultant";

  function statusLabel(status) {
    switch (status) {
      case "confirmed": return "✅ Đã xác nhận";
      case "pending": return "⏳ Chờ xử lý";
      case "cancelled": return "❌ Đã hủy";
      default: return "";
    }
  }

  function applyFilters() {
    const nameVal = filterName?.value.toLowerCase() || "";
    const dateVal = filterDate?.value || "";
    const statusVal = filterStatus?.value || "";

    return data.filter(item =>
      item.type === viewType &&
      (!nameVal || item.name?.toLowerCase().includes(nameVal)) &&
      (!dateVal || item.date === dateVal) &&
      (!statusVal || item.status === statusVal)
    );
  }

  function renderTable(filtered, page = 1) {
    tbody.innerHTML = "";
    const start = (page - 1) * perPage;
    const current = filtered.slice(start, start + perPage);

    current.forEach(item => {
      const row = document.createElement("tr");

      if (item.type === "service") {
        row.innerHTML = `
          <td>${item.date}</td>
          <td>${item.time}</td>
          <td>${item.name}</td>
          <td>${item.service}</td>
          <td><span class="status ${item.status}">${statusLabel(item.status)}</span></td>
        `;
      } else {
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.service}</td>
          <td>${item.phone}</td>
          <td>${item.email}</td>
          <td>${item.time}</td>
          <td><a href="#">Link tư vấn</a></td>
        `;
      }

      tbody.appendChild(row);
    });
  }

  function renderPagination(filtered) {
    pagination.innerHTML = "";
    const total = Math.ceil(filtered.length / perPage);
    for (let i = 1; i <= total; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.classList.add("active");
      btn.addEventListener("click", () => {
        currentPage = i;
        renderTable(filtered, currentPage);
        renderPagination(filtered);
      });
      pagination.appendChild(btn);
    }
  }

  function updateView() {
    const filtered = applyFilters();
    currentPage = 1;
    renderTable(filtered, currentPage);
    renderPagination(filtered);
  }

  // Event
  filterName?.addEventListener("input", updateView);
  filterDate?.addEventListener("change", updateView);
  filterStatus?.addEventListener("change", updateView);

  updateView(); // Lần đầu render
});
