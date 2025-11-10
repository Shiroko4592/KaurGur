const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const viewerContainer = document.getElementById('viewerContainer');
const pageImage = document.getElementById('pageImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageCounter = document.getElementById('pageCounter');

let pages = [];
let currentPage = 0;

// 업로드 버튼 클릭
uploadBtn.addEventListener('click', () => {
  const files = fileInput.files;
  if (files.length < 10) {
    alert('최소 10장의 이미지를 선택해야 합니다.');
    return;
  }

  pages = [];
  let loaded = 0;

  Array.from(files).forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = e => {
      pages[index] = e.target.result;
      loaded++;
      if (loaded === files.length) {
        // 모두 로딩되면 첫 페이지 표시
        currentPage = 0;
        showPage();
        viewerContainer.classList.remove('hidden');
        window.scrollTo(0, 0);
      }
    };
    reader.readAsDataURL(file);
  });

  fileInput.value = '';
});

// 페이지 표시
function showPage() {
  pageImage.src = pages[currentPage];
  pageCounter.textContent = `${currentPage + 1} / ${pages.length}`;
}

// 이전/다음 페이지 버튼
prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    showPage();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < pages.length - 1) {
    currentPage++;
    showPage();
  }
});

// 키보드 화살표로도 넘기기
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});
