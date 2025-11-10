const fileInput = document.getElementById("fileInput");
const gallery = document.getElementById("gallery");
const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewerImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const closeBtn = document.getElementById("closeBtn");

let images = [];
let currentIndex = 0;

// 파일 업로드 이벤트
fileInput.addEventListener("change", (event) => {
  const files = Array.from(event.target.files);

  if (files.length < 10) {
    alert("최소 10장의 이미지를 업로드해야 합니다!");
    return;
  }

  images = files.map((file) => URL.createObjectURL(file));
  gallery.innerHTML = "";

  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.addEventListener("click", () => openViewer(index));
    gallery.appendChild(img);
  });
});

function openViewer(index) {
  currentIndex = index;
  viewerImage.src = images[currentIndex];
  viewer.classList.remove("hidden");
}

function closeViewer() {
  viewer.classList.add("hidden");
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  viewerImage.src = images[currentIndex];
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  viewerImage.src = images[currentIndex];
}

nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);
closeBtn.addEventListener("click", closeViewer);

// 키보드 화살표 제어
document.addEventListener("keydown", (e) => {
  if (viewer.classList.contains("hidden")) return;

  if (e.key === "ArrowRight") showNext();
  else if (e.key === "ArrowLeft") showPrev();
  else if (e.key === "Escape") closeViewer();
});
