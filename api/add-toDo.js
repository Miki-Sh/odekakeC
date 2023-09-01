import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    const todolist = request.query.todolist;
    if (!todolist) throw new Error('todolistを入力してください');
    await sql`INSERT INTO toDo (todolist) VALUES (${todolist});`;
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  const toDo = await sql`SELECT * FROM toDo;`;
  return response.status(200).json({ toDo });
}