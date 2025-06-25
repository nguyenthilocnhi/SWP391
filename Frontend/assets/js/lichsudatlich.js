document.addEventListener("DOMContentLoaded", function () {
  const lichTableBody = document.querySelector(".history-table tbody");
  const filterStatus = document.getElementById("filterStatus");
  const viewModal = document.getElementById("viewModal");
  const closeButton = viewModal.querySelector(".close-button");
  const lichList = JSON.parse(localStorage.getItem("lichDat")) || [];

  function renderTable(filter = "") {
    lichTableBody.innerHTML = "";
    lichList.forEach((lich, index) => {
      if (!filter || lich.trangThai === filter) {
        const row = document.createElement("tr");

        let lyDo = lich.lyDo || "";
        if (lich.dichVu === "Tư Vấn" && lich.hinhThuc)
          lyDo += ` (Hình thức: ${lich.hinhThuc})`;
        if (lich.dichVu === "Xét Nghiệm" && lich.loaiXetNghiem)
          lyDo += ` (Loại: ${lich.loaiXetNghiem})`;

        const statusClass = lich.trangThai === "Chờ xử lý" ? "pending"
                          : lich.trangThai === "Đã xác nhận" ? "confirmed"
                          : lich.trangThai === "Đã hủy" ? "cancelled"
                          : "";

        row.innerHTML = `
          <td>${lich.ngay}</td>
          <td>${lich.dichVu}</td>
          <td>${lyDo}</td>
          <td>${lich.hoTen || ''}</td>
          <td>${lich.sdt || ''}</td>
          <td><span class="status ${statusClass}">${lich.trangThai}</span></td>
          <td>
            <button class="btn-view" data-index="${index}">Xem</button>
            <button class="btn-delete" data-index="${index}">Xóa</button>
          </td>
        `;
        lichTableBody.appendChild(row);
      }
    });
    bindButtons();
  }

  function bindButtons() {
    document.querySelectorAll(".btn-view").forEach(btn => {
      btn.addEventListener("click", function () {
        const lich = lichList[this.dataset.index];
        if (!lich) return;

        document.getElementById("modal-ngay").textContent = lich.ngay || "-";
        document.getElementById("modal-dichVu").textContent = lich.dichVu || "-";

        let lyDo = lich.lyDo || "-";
        if (lich.dichVu === "Tư Vấn") lyDo += ` (Hình thức: ${lich.hinhThuc || 'Không rõ'})`;
        else if (lich.dichVu === "Xét Nghiệm") lyDo += ` (Loại: ${lich.loaiXetNghiem || 'Không rõ'})`;
        document.getElementById("modal-lyDo").textContent = lyDo;

        document.getElementById("modal-hoTen").textContent = lich.hoTen || "-";
        document.getElementById("modal-sdt").textContent = lich.sdt || "-";
        document.getElementById("modal-trangThai").textContent = lich.trangThai || "-";

        viewModal.classList.remove("hidden");
      });
    });

    document.querySelectorAll(".btn-delete").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.dataset.index;
        if (confirm("Bạn có chắc muốn xóa lịch này không?")) {
          lichList.splice(index, 1);
          localStorage.setItem("lichDat", JSON.stringify(lichList));
          renderTable(filterStatus.value);
          showAlert("✅ Đã xoá lịch hẹn!");
        }
      });
    });
  }

  closeButton?.addEventListener("click", function () {
    viewModal.classList.add("hidden");
  });

  filterStatus.addEventListener("change", () => {
    renderTable(filterStatus.value);
  });

  renderTable();
});
