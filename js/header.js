// 헤더 메뉴 변경
(function() {
    const nav = document.querySelector(".nav");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!nav) return; // nav 없는 페이지 방지
    
    if (user) {
        nav.innerHTML = `
            <a href="mypage.html">마이페이지</a>
            <a href="#" id="logoutBtn">로그아웃</a>
            <a href="chat.html" class="chat-btn">채팅</a>
        `;

        const logoutBtn = document.querySelector("#logoutBtn");
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.href = "index.html";
        });
    } else {
        nav.innerHTML = `
            <a href="login.html">로그인</a>
            <a href="signup.html">회원가입</a>
            <a href="mypage.html">마이페이지</a>
            <a href="chat.html" class="chat-btn">채팅</a>
        `;
    }
})();
