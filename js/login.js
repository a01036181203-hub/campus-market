// 로그인 처리
function login() {
    const email = document.querySelector("input[type='email']").value;
    const password = document.querySelector("input[type='password']").value;

    if (email.trim() === "" || password.trim() === "") {
        alert("이메일과 비밀번호를 입력하세요.");
        return;
    }

    const user = {
        email: email,
        name: "김대학생"
    };

    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = "index.html";
}
