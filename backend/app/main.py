from fastapi import FastAPI

app = FastAPI()

@app.get("/generate-questions")
async def generate_questions():
    questions = [
        {"question": "現在、犬を飼っていますか？また、どのくらいの頻度で車に乗せていますか？"},
        {"question": "犬を連れて車で移動する際、どのような課題や不便さを感じますか？"},
        {"question": "犬を車に乗せる際、安全性や快適さについて心配することはありますか？"},
        {"question": "犬とのドライブや旅行をする際、どのような準備や配慮を行っていますか？"},
        {"question": "犬を連れて行きやすい施設やドライブコースについて、どうやって情報を集めていますか？"},
        {"question": "犬用のドライブ用品やペット用カーシートなどの製品を利用していますか？"},
        {"question": "自動車メーカーやディーラーが提供するペット向けのサービスや特典があれば、どのようなものに魅力を感じますか？"},
        {"question": "もし車が犬との生活をサポートするような専用機能やサービスを提供するとしたら、どのようなものを期待しますか？"}
    ]
    return questions