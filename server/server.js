const express = require('express');
const XLSX = require('xlsx');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());

app.get('/get-excel-data', (req, res) => {
  const filePath = '/home/harsha/tflite1/data_with_datetime.xlsx';
  // const filePath = './data.xlsx';

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  res.json(jsonData);
});

app.listen(PORT, () => {
  console.log(`Server rn on http://localhost:${PORT}`);
});
