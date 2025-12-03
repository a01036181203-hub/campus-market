function requireLogin() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
    }
}
