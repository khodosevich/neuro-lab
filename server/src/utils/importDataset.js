const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
	connectionString: ``
});

// датасет в таблицу БД

const filePath = path.join(__dirname, 'tickets.csv');

async function importDataset() {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');

		const insertQuery = `
            INSERT INTO dataset_text_class
                (ticket_id, title, description, category, priority, assignee_id)
            VALUES ($1, $2, $3, $4, $5, $6)`;

		const rows = [];

		fs.createReadStream(filePath)
			.pipe(csv())
			.on('data', (data) => {
				const values = [
					parseInt(data.ticket_id),
					data.title,
					data.description,
					data.category,
					data.priority,
					parseInt(data.assignee_id),
				];
				rows.push(values);
			})
			.on('end', async () => {
				try {
					// Параллельная вставка всех данных
					const queries = rows.map(row => client.query(insertQuery, row));
					await Promise.all(queries); // Выполнение всех запросов параллельно
					await client.query('COMMIT');
					console.log('Импорт завершён успешно');
				} catch (err) {
					await client.query('ROLLBACK');
					console.error('Ошибка при вставке в БД:', err);
				} finally {
					client.release();
				}
			})
			.on('error', async (err) => {
				await client.query('ROLLBACK');
				client.release();
				console.error('Ошибка чтения CSV:', err);
			});

	} catch (err) {
		await client.query('ROLLBACK');
		client.release();
		console.error('Ошибка при вставке в БД:', err);
	}
}

importDataset();
