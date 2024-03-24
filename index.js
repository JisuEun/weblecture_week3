const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// 메인 페이지(root) 라우트
app.get('/', (req, res) => {
    const currentTime = new Date().toLocaleTimeString();
    // HTML 응답을 보냅니다.
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>떡볶이 소개</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
            }
            .header {
                display: flex;
                justify-content: flex-end;
                padding: 20px;
                background-color: #f0f0f0;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <p>접속 시각: ${currentTime}</p>
        </div>
        <h1>떡볶이를 소개합니다</h1>
        <p>떡볶이는 한국의 가장 유명한 길거리 음식 중 하나입니다.</p>
        <ul>
            <li><a href="/origin.html">떡볶이의 기원</a></li>
            <li><a href="/recipe.html">떡볶이 만드는 법</a></li>
            <li><a href="/nickname">떡볶이 애칭 짓기</a></li>
        </ul>
    </body>
    </html>
    `);
});

// public 폴더에 있는 정적 컨텐츠 페이지 제공
app.use(express.static('public'));

// React 앱의 빌드 컨텐츠 제공
app.use(express.static(path.join(__dirname, '/build')));

// React 앱 라우트
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});