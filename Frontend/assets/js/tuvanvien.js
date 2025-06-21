let advisorData = [];

// Load JSON
fetch('/Frontend/data/tuvanvien.json')
  .then(response => response.json())
  .then(data => {
    advisorData = data;
    renderAdvisors(advisorData);
  })
  .catch(err => console.error('Lỗi tải dữ liệu:', err));

// Hiển thị danh sách
function renderAdvisors(list) {
  const container = document.getElementById('advisorGrid');
  container.innerHTML = '';
  list.forEach(advisor => {
    const card = document.createElement('div');
    card.className = 'advisor-card';
    card.innerHTML = `
      <img src="${advisor.image}" alt="${advisor.name}" />
      <h3>${advisor.name}</h3>
      <p>${advisor.specialty}</p>
      <p><strong>Kinh nghiệm:</strong> ${advisor.experience}</p>
      <p>${advisor.education}</p>
    `;
    container.appendChild(card);
  });
}

// Tìm kiếm
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form');
  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const keyword = this.querySelector('input[name="q"]').value.trim().toLowerCase();
    const filtered = advisorData.filter(advisor =>
      advisor.name.toLowerCase().includes(keyword)
    );
    renderAdvisors(filtered);
  });

  // Load footer
  fetch('/Frontend/components/footer.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('footer-placeholder').innerHTML = html;
    });
});
