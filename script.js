/* 다크모드 */
const profilePhoto = document.querySelector(".profile-photo");

profilePhoto.addEventListener("click", () => {
    // if (document.body.className == 'dark-mode') {
    //     document.body.className = '';
    // } else {
    //     document.body.className = 'dark-mode';
    // }
    document.body.classList.toggle('dark-mode'); 
});
const sections = document.querySelectorAll(".right_container section");
let currentIndex = 0;

sections.forEach((section, index) => {
    section.style.display = index === 0 ? "flex" : "none";
});

const showAfterSection = () => {
    sections.forEach((section) => { section.style.display = 'none'; })  // 현재 section 숨기기
    if (currentIndex == sections.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    sections[currentIndex].style.display = 'flex';  // 다음 section 보여주기
}
const showBeforeSection = () => {
    sections.forEach((section) => { section.style.display = 'none'; })
    if (currentIndex == 0) {
        currentIndex = sections.length - 1;
    } else {
        currentIndex--;
    }
    sections[currentIndex].style.display = 'flex';
};

let intervalId = setInterval(showAfterSection, 3000);

const resetInterval = () => {
    clearInterval(intervalId);
    intervalId = setInterval(showAfterSection, 3000);
}

sections.forEach((section, index) => {
    section.addEventListener("click", (event) => {
        const sectionWidth = section.offsetWidth;
        const clickX = event.clientX - section.getBoundingClientRect().left;

        if (clickX < sectionWidth / 3) {  // 왼쪽 1/3 클릭 시 이전 section으로 이동
            showBeforeSection();
            resetInterval();
        } else if (clickX > sectionWidth * 2 / 3) {  // 오른쪽 1/3 클릭 시 다음 section으로 이동
            showAfterSection();
            resetInterval();
        } else {  // 중간 1/3 클릭 시 자동 넘김 토글
            if (intervalId) {
                clearInterval(intervalId);  // 자동 넘김 중지
                intervalId = null;
            } else {
                intervalId = setInterval(showAfterSection, 3000);  // 자동 넘김 재개
            }
        }
    });
});