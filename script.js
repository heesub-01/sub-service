gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".kf-card");
const dots = gsap.utils.toArray(".kf-pagination .dot");

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sec-1",
    start: "top top",
    end: "+=300%",
    scrub: true,
    pin: true,
    onUpdate: (self) => {
      updatePagination(self.progress);
    }
  }
});

// 카드 애니메이션 정의
cards.forEach((card, i) => {
  // 카드 등장
  tl.fromTo(card,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1 }
  );

  // 다음 카드 전환
  if (i < cards.length - 1) {
    tl.to(card, { opacity: 0, y: -40, duration: 1 }, "+=0.5");
  }
});

// 📌 핵심: progress 기반 페이지네이션 업데이트
function updatePagination(progress) {
  const index = Math.floor(progress * cards.length);

  dots.forEach(dot => dot.classList.remove("active"));

  // index가 카드 수를 넘어가지 않도록 clamp
  const safeIndex = Math.min(index, cards.length - 1);
  dots[safeIndex].classList.add("active");
}
