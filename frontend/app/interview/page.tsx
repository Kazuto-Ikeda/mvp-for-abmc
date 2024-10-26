"use client";  

import { useState } from 'react';
import React from "react";

// 質問の型定義
interface Question {
  question: string;
}

export default function InterviewPage() {
  // 型を指定して、questionsを定義
  const [questions, setQuestions] = useState<Question[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [csvUploadSuccess, setCsvUploadSuccess] = useState<boolean | null>(null); // 型修正

  // Heroku上のFastAPIのURLを指定
  const FASTAPI_URL = "https://mvp-for-abmc-95a9eb1015ef.herokuapp.com/generate-questions";  // ここをHerokuのURLに置き換える

  // アンケート項目生成
  const generateQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${FASTAPI_URL}`, { method: 'GET' }); // HerokuのFastAPIを呼び出す
      const data = await response.json();
      setQuestions(data); // FastAPIからの質問をセット
    } catch (error) {
      console.error('Error fetching interview questions:', error);
    } finally {
      setLoading(false);
    }
  };

  // CSVファイルのアップロード処理
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setCsvFile(file);
  };

  // CSVデータをバックエンドに送信
  const uploadCsv = async () => {
    if (!csvFile) {
      alert('Please select a CSV file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      const response = await fetch('/api/upload-csv', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setCsvUploadSuccess(true); // 成功時はtrue
      console.log('CSV uploaded successfully:', result);
    } catch (error) {
      console.error('Error uploading CSV:', error);
      setCsvUploadSuccess(false); // エラー時はfalse
    }
  };

  return (
    <div>
      <h1>Interview Page</h1>
      
      {/* アンケート項目生成ボタン */}
      <button onClick={generateQuestions} disabled={loading}>
        {loading ? 'Generating...' : 'インタビューの質問を生成'}
      </button>

      {/* アンケート項目の表示 */}
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question.question}</li>  // 箇条書きで質問を表示
        ))}
      </ul>

      {/* CSVファイルアップロードフィールド */}
      <div>
        <h2>アンケートのインサイト分析のためにアンケート結果のCSVデータをアップロードしてください</h2>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <button onClick={uploadCsv}>Upload CSV</button>
        {csvUploadSuccess && <p>CSV uploaded successfully!</p>}
        {csvUploadSuccess === false && <p>Error uploading CSV.</p>}
      </div>
    </div>
  );
}