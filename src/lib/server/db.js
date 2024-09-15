import fs from 'fs';
import path from 'path';

const jsonFilePath = path.resolve(process.cwd(), 'data/data.json');

// JSON 파일 읽기 함수
export function readJsonFile() {
	try {
		const data = fs.readFileSync(jsonFilePath, 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		console.error('Error reading JSON file:', error);
		return []; // 파일이 없거나 오류가 발생한 경우 빈 배열 반환
	}
}

// JSON 파일 쓰기 함수
export function writeJsonFile(data) {
	try {
		fs.writeFileSync(jsonFilePath, JSON.stringify(data), 'utf-8');
		console.log('JSON file written successfully');
	} catch (error) {
		console.error('Error writing JSON file:', error);
	}
}
