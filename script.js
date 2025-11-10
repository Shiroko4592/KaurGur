const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.getElementById('closeBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// 갤러리 이미지 클릭 → 모달 열기
gallery.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    modal.style.display = 'flex';
    modalImg.src = e.target.src;
  }
});

// 모달 닫기
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// ESC키로 모달 닫기
document.addEventListener('keydown', e => {
  if (e.key === "Escape") modal.style.display = 'none';
});

// 검색 버튼 클릭
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if(query) {
    alert(`"${query}"로 문서를 검색합니다.`); // 실제 검색 기능 미구현
  }
});
