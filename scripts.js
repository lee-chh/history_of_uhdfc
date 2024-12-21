
let links = gsap.utils.toArray("#parallax__nav ul li a");

links.forEach(link => {
    let element = document.querySelector(link.getAttribute("href"));
    let linkST = ScrollTrigger.create({
        trigger: element,
        start: "top top"
    });

    ScrollTrigger.create({
        trigger: element,
        start: "top center",
        end: "bottom center",
        onToggle: self => setActive(link)
    });

    link.addEventListener("click", e => {
        e.preventDefault();
        gsap.to(window, {duration: 1, scrollTo: linkST.start, overwrite: "auto"});
    })

    const targets = gsap.utils.toArray(".split");

    targets.forEach(target => {
        let SplitClient = new SplitType(target, {type: "lines, words, chars"});
        let lines = SplitClient.lines;
        let words = SplitClient.words;
        let chars = SplitClient.chars;

        gsap.from(chars, {
            yPercent: 100,
            autoAlpha: 0,
            duration: 1,
            ease: "circ.out",
            stagger: {
                amount: 1,
                from : "random"
            },
            scrollTrigger: {
                trigger: target,
                start: "top bottom",
                end: "+=400",
                markers: false
            }
        });
    });
});

function setActive(link){
    links.forEach(el => el.classList.remove("active"));
    link.classList.add("active");
}

// 02. data 값으로 변경하기
gsap.utils.toArray(".parallax__item").forEach((item) => {
    let color = item.getAttribute("data-bgcolor");

    ScrollTrigger.create({
        trigger: item,
        start: "top 50%",
        end: "bottom 50%",
        markers: false,

        onEnter: () => gsap.to("body", {
            backgroundColor: color,
            duration: 1.4,
        }),
        onEnterBack: () => gsap.to("body", {
            backgroundColor: color,
            duration: 1.4,
        }),
    });
});

gsap.registerPlugin(ScrollTrigger);

const titleElement = document.querySelector("#parallax__title h1");
const subtitleElement = document.querySelector("#parallax__title h2"); // h2 요소 선택
const dateElement = document.querySelector("#parallax__title #date"); // 기간 정보를 출력할 요소 선택


// 구단명 변경
const sections = [
    { element: "#section1", title: "현대 호랑이 축구단", subtitle: "Hyundai Horangi FC", date: "1983 - 1995" },
    { element: "#section2", title: "울산 현대 호랑이", subtitle: "Ulsan Hyundai Horangi", date: "1996 - 2007" },
    { element: "#section4", title: "울산 현대 축구단", subtitle: "Ulsan Hyundai FC", date: "2008 - 2023" },
    { element: "#section9", title: "울산 HD FC", subtitle: "Ulsan HD FC", date: "2024 - Present" }
];

// 각 섹션 정보 올라올 때
sections.forEach((section) => {
    ScrollTrigger.create({
        trigger: section.element,
        start: "top center", // 섹션이 화면 중앙에 올 때 작동
        end: "bottom center", // 섹션 끝날 때까지 유지
        onEnter: () => {
            // h1, h2, date 텍스트를 동시에 변경
            titleElement.textContent = section.title;
            subtitleElement.textContent = section.subtitle;
            dateElement.textContent = section.date; // 기간 정보 추가
        },
        onEnterBack: () => {
            // h1, h2, date 텍스트를 다시 원래대로 변경
            titleElement.textContent = section.title;
            subtitleElement.textContent = section.subtitle;
            dateElement.textContent = section.date; // 기간 정보 추가
        }
    });
});

const sectionsImage = [
    { element: "#section1", image: "assets/svg/1983.svg" }, // 1983 이미지
    { element: "#section2", image: "assets/svg/1999.svg" }, // 1996 이미지
    { element: "#section4", image: "assets/svg/2011.svg" }, // 2012 이미지
    { element: "#section5", image: "assets/svg/2016.svg" }, // 2017 이미지
    { element: "#section9", image: "assets/svg/2024.svg" }  // 2024 이미지
];

// ScrollTrigger를 각 섹션에 적용하여 배경 이미지 변경
sectionsImage.forEach((section) => {
    ScrollTrigger.create({
        trigger: section.element,
        start: "top center",  // 섹션이 화면 중앙에 올 때
        end: "bottom center", // 섹션이 화면 중앙을 지나칠 때까지
        onEnter: () => {
            // 템플릿 리터럴 사용하여 이미지 URL 설정
            document.querySelector("#p").style.backgroundImage = `url(${section.image})`;
        },
        onEnterBack: () => {
            // 템플릿 리터럴 사용하여 이미지 URL 설정
            document.querySelector("#p").style.backgroundImage = `url(${section.image})`;
        }
    });
});

// 스크롤 내릴 때 텍스트 변경
ScrollTrigger.create({
    start: "top -80", // 스크롤이 내릴 때
    end: 99999, // 끝 시점
    toggleClass: {
        className: "is-active", // 'is-active' 클래스를 추가/제거
        targets: "#parallax__nav"
    },
    onEnter: () => {
        // 스크롤을 내릴 때 텍스트를 간단한 버전으로 변경
        const links = document.querySelectorAll("#parallax__nav a");
        links.forEach(link => {
            link.textContent = link.dataset.short; // data-short 속성으로 텍스트 변경
        });
    },
    onLeave: () => {
        // 스크롤을 내릴 때 텍스트 변경 (간단한 텍스트로)
        const links = document.querySelectorAll("#parallax__nav a");
        links.forEach(link => {
            link.textContent = link.dataset.short; // data-short 속성으로 텍스트 변경
        });
    }
});

// 스크롤 올릴 때 텍스트 복원
ScrollTrigger.create({
    start: "top top", // 스크롤을 올릴 때
    end: 99999, // 끝 시점
    onEnterBack: () => {
        // 스크롤을 다시 올리면 원래 텍스트로 복원
        const links = document.querySelectorAll("#parallax__nav a");
        links.forEach(link => {
            link.textContent = link.getAttribute('data-original'); // data-original 속성으로 텍스트 복원
        });
    },
    onLeaveBack: () => {
        // 스크롤을 다시 내릴 때 텍스트를 간단한 버전으로 변경
        const links = document.querySelectorAll("#parallax__nav a");
        links.forEach(link => {
            link.textContent = link.getAttribute('data-original'); // data-original 속성으로 텍스트 복원
        });
    }
});

const header = document.querySelector("#parallax__title");

window.addEventListener("scroll", function() {
    // 현재 스크롤 위치가 80vw 이상일 때
    if (window.scrollY > window.innerWidth * 0.8) {
        header.style.opacity = "1"; // 헤더 보이기
    } else {
        header.style.opacity = "0"; // 헤더 숨기기
    }
});

window.onload = function() {
    // section0으로 스크롤
    const section0 = document.getElementById('section0');
    section0.scrollIntoView({ behavior: 'smooth' });
};

const sectionsImages = [
    { element: "#section2", image: "assets/img/league.png" }, // 1983 이미지
    { element: "#section3", image: "assets/img/league.png" }, // 1996 이미지
    { element: "#section4", image: "assets/img/acl.png" }, // 2012 이미지
    { element: "#section5", image: "assets/img/fa.png" }, // 2012 이미지
    { element: "#section6", image: "assets/img/acl.png" }, // 2012 이미지
    { element: "#section7", image: "assets/img/league.png" }, // 2012 이미지
    { element: "#section8", image: "assets/img/league.png" }, // 2012 이미지
    { element: "#section9", image: "assets/img/league.png" }, // 2012 이미지

];

sectionsImages.forEach((section, index) => {
    ScrollTrigger.create({
        trigger: section.element,
        start: "top center",  // 섹션이 화면 중앙에 올 때
        end: "bottom center", // 섹션이 화면 중앙을 지나칠 때까지
        onEnter: () => {
            // 이미지를 추가할 때 고유한 id를 설정
            const imgElement = document.createElement("img");
            imgElement.src = section.image;  // 해당 이미지 경로 설정
            imgElement.classList.add("section-image"); // 이미지에 클래스 추가
            imgElement.setAttribute('data-section-id', `section-${index}`); // 고유 id 추가
            document.querySelector("#image-container").appendChild(imgElement);  // 이미지 추가
        },
        onLeaveBack: () => {
            // 역스크롤 시에만 해당 섹션의 첫 번째 이미지만 삭제
            const imgElements = document.querySelectorAll(`#image-container img[data-section-id="section-${index}"]`);
            if (imgElements.length > 0) {
                imgElements[0].remove(); // 첫 번째 이미지만 삭제
            }
        }
    });
});

window.addEventListener("scroll", function() {
    var endbox = document.getElementById("endbox");
    var scrollHeight = document.documentElement.scrollHeight; // 전체 문서의 높이
    var scrollPosition = window.innerHeight + window.scrollY; // 스크롤된 위치

    // 사용자가 페이지 끝에 도달하면 Endbox 표시
    if (scrollPosition >= scrollHeight - 10) {
        endbox.style.display = "block";
    } else {
        endbox.style.display = "none";
    }
});