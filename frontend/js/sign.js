async function register() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const nickname = document.getElementById("nickname").value.trim();
    const university = document.getElementById("univ").value;

    // 이메일 형식 체크 (정규식)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("올바른 이메일 형식이 아닙니다. 예: example@naver.com");
        return;
    }

    console.log("회원가입 버튼 클릭됨");
    console.log({ email, password, nickname, university });

    try {
        // 1) 회원가입 요청
        const res = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
                nickname,
                university
            })
        });

        const data = await res.json();
        console.log("서버 응답:", data);

        if (!data.success) {
            alert("오류: " + data.message);
            return;
        }

        alert("회원가입 완료!");

        // 자동로그인 시도
        console.log("📌 자동 로그인 시도 시작");
        console.log("📌 자동 로그인 전달값:", { email, password });

        // 2) 회원가입 성공 → 자동 로그인 요청
        const loginRes = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password
            })
        });

        const loginData = await loginRes.json();
        console.log("로그인 응답:", loginData);

        if (!loginData.success) {
            alert("자동 로그인 실패. 로그인 화면으로 이동합니다.");
            window.location.href = "login.html";
            return;
        }

        // 3) 로그인 성공 → 토큰 저장
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData.user));

        alert("자동 로그인 완료!");
        window.location.href = "index.html"; // 메인 페이지로 이동

    } catch (err) {
        console.error("에러 발생:", err);
        alert("서버 연결 실패 (ECONNREFUSED)");
    }
}
