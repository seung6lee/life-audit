import { json } from '@sveltejs/kit';
import { readJsonFile, writeJsonFile } from '$lib/server/db';

// POST 요청: 새로운 Todo 항목 추가
export async function POST({ request }) {
	const { date, index, bool } = await request.json();

	// 현재 Todo 리스트 가져오기
	const json_data = readJsonFile();

	json_data.history[date][index] = bool;

	// 업데이트된 리스트를 JSON 파일에 쓰기
	writeJsonFile(json_data);

	return new Response('Todo added', { status: 201 });
}