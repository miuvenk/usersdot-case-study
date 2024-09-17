import { Client } from 'pg';
import { ConfigService } from '@nestjs/config';

export async function createDatabaseIfNotExists(configService: ConfigService) {
  const client = new Client({
    user: configService.get<string>('DB_USERNAME'),
    host: configService.get<string>('DB_HOST'),
    password: configService.get<string>('DB_PASSWORD'),
    port: parseInt(configService.get<string>('DB_PORT'), 10),
  });

  try {
    await client.connect();
    const dbName = configService.get<string>('DB_NAME');

    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname='${dbName}'`,
    );

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully!`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}
