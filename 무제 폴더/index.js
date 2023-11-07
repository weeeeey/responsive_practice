const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // 관찰 대상이 viewport 안에 들어온 경우 'active' 클래스 추가
        if (entry.intersectionRatio > 0) {
            entry.target.classList.add('active');

            // 3초 뒤에 'active' 클래스 제거
            setTimeout(() => {
                entry.target.classList.remove('active');
            }, 3000); // 3000 milliseconds = 3 seconds
        } else {
            // 그 외의 경우 'active' 클래스 제거
            entry.target.classList.remove('active');
        }
    });
});

// 관찰할 대상을 선언하고, 해당 속성을 관찰
const boxList = document.querySelectorAll('.box');
boxList.forEach((el) => {
    io.observe(el);
});
