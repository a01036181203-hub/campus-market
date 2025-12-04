// 로그인 처리
async function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (email === "" || password === "") {
        alert("이메일과 비밀번호를 입력하세요.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log("로그인 응답:", data);

        if (!data.success) {
            alert(data.message); 
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("로그인 성공!");
        window.location.href = "index.html";

    } catch (err) {
        alert("서버와 연결할 수 없습니다.");
    }
}
