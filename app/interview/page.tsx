"use client";  // この行を追加

import { useState } from 'react';

export default function InterviewPage() {
  const [questions, setQuestions] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [csvUploadSuccess, setCsvUploadSuccess] = useState<boolean | null>(null); // 型修正

  // アンケート項目生成
  const generateQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/interview', { method: 'GET' });
      const data = await response.json();
      setQuestions(data.questions);
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
        {loading ? 'Generating...' : 'Generate Interview Questions'}
      </button>

      {/* アンケート項目の表示 */}
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>

      {/* CSVファイルアップロードフィールド */}
      <div>
        <h2>Upload CSV for Insight Analysis</h2>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <button onClick={uploadCsv}>Upload CSV</button>
        {csvUploadSuccess && <p>CSV uploaded successfully!</p>}
        {csvUploadSuccess === false && <p>Error uploading CSV.</p>}
      </div>
    </div>
  );
}