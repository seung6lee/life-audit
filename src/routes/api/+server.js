import { json } from '@sveltejs/kit';
import { readJsonFile, writeJsonFile } from '$lib/server/db';

// GET 요청: JSON 파일에서 Todo 리스트 가져오기
export async function GET() {
	const todos = readJsonFile();
	return json(todos);
}