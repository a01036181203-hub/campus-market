// =====================================
// 기본 세팅
// =====================================
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const pool = require("./db");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================
// 회원가입 API

// =====================================
app.post("/auth/register", async (req, res) => {
    console.log("회원가입 요청 도착 :", req.body);

    const { email, password, nickname, university } = req.body;

    // ✔ 이메일 형식 백엔드 검증 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(email)) {
        return res.json({
            success: false,
            message: "이메일 형식이 올바르지 않습니다."
        });
    }

    try {
        // 1. 이메일 중복 확인
        const [exists] = await pool.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (exists.length > 0) {
            return res.json({
                success: false,
                message: "이미 사용 중인 이메일입니다."
            });
        }

        // 2. 비밀번호 암호화
        const hashed = await bcrypt.hash(password, 10);

        // 3. DB 저장
        await pool.query(
            "INSERT INTO users (email, password, nickname, university) VALUES (?, ?, ?, ?)",
            [email, hashed, nickname, university]
        );

        return res.json({ success: true });
    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: "서버 오류"
        });
    }
});

// =====================================
// 로그인 API
// =====================================
app.post("/auth/login", async (req, res) => {
    console.log("로그인 요청 도착 :", req.body);

    const { email, password } = req.body;

    try {
        // 1. 이메일이 존재하는지 확인
        const [result] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (result.length === 0) {
            return res.json({
                success: false,
                message: "존재하지 않는 이메일입니다."
            });
        }

        const user = result[0];

        // 2. 비밀번호 확인
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "비밀번호가 틀렸습니다."
            });
        }

        // 3. 토큰 발급
        const token = jwt.sign(
            { id: user.id, email: user.email },
            "MY_SECRET_KEY",
            { expiresIn: "2h" }
        );

        return res.json({
            success: true,
            message: "로그인 성공",
            token,
            user: {
                id: user.id,
                email: user.email,
                nickname: user.nickname,
                university: user.university
            }
        });

    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: "서버 오류"
        });
    }
});

// =====================================
// 서버 실행
// =====================================
app.listen(3000, () => console.log("서버 실행 중"));
