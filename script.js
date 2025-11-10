const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.getElementById('closeBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');

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

// 검색 기능 (alt 속성 기준 필터링)
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim().toLowerCase();
  const images = gallery.querySelectorAll('img');
  images.forEach(img => {
    if(img.alt.toLowerCase().includes(query)) {
      img.style.display = '';
    } else {
      img.style.display = 'none';
    }
  });
});

// 이미지 업로드
uploadBtn.addEventListener('click', () => {
  const files = fileInput.files;
  if(files.length < 10) {
    alert('최소 10개의 이미지를 선택해야 합니다.');
    return;
  }

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.alt = file.name;
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  });

  // 선택 초기화
  fileInput.value = '';
  alert(`${files.length}장의 이미지를 갤러리에 추가했습니다.`);
});

let modalImages = [];
let currentIndex = 0;

gallery.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    // 클릭한 이미지가 갤러리의 몇 번째인지 찾기
    modalImages = Array.from(gallery.querySelectorAll('img'));
    currentIndex = modalImages.indexOf(e.target);
    showModal();
  }
});

function showModal() {
  modal.style.display = 'flex';
  modalImg.src = modalImages[currentIndex].src;
}

// 모달 닫기
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// ESC키로 모달 닫기
document.addEventListener('keydown', e => {
  if (e.key === "Escape") modal.style.display = 'none';
});

// 이전/다음 버튼
document.getElementById('prevBtn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + modalImages.length) % modalImages.length;
  showModal();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % modalImages.length;
  showModal();
});

// 검색 기능 (alt 기준 필터링)
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim().toLowerCase();
  const images = gallery.querySelectorAll('img');
  images.forEach(img => {
    if(img.alt.toLowerCase().includes(query)) img.style.display = '';
    else img.style.display = 'none';
  });
});

// 이미지 업로드 (최소 10장)
uploadBtn.addEventListener('click', () => {
  const files = fileInput.files;
  if(files.length < 10) {
    alert('최소 10개의 이미지를 선택해야 합니다.');
    return;
  }

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.alt = file.name;
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  });

  // 업로드 후 뷰어 자동으로 첫 번째 이미지부터 열기
  setTimeout(() => {
    modalImages = Array.from(gallery.querySelectorAll('img')).slice(-files.length);
    currentIndex = 0;
    showModal();
  }, 100); // 이미지 로딩 잠깐 대기

  fileInput.value = '';
});

