import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../db';
import { randomUUID } from 'crypto';

export async function login(email: string, password: string): Promise<string | null> {
  const rows = await pool.query('SELECT id, password_hash FROM users WHERE email = ?', [email]);
  const results: any[] = Array.isArray(rows) ? rows as any[] : [];
  const user = results[0];
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return null;

  await pool.query('UPDATE users SET last_login = NOW(), login_count = login_count + 1 WHERE id = ?', [user.id]);

  const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
  const token = jwt.sign({ sub: user.id, email }, JWT_SECRET, { expiresIn: '1h' });
  return token;
}

export async function register(name: string, email: string, password: string): Promise<{ id: string; email: string; name: string }> {
  const foundRows = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  const found: any[] = Array.isArray(foundRows) ? foundRows as any[] : [];
  if (found.length) throw new Error('email already in use');

  const id = randomUUID();
  const passwordHash = await bcrypt.hash(password, 8);
  await pool.query(
    'INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)',
    [id, name || '', email, passwordHash]
  );
  return { id, email, name: name || '' };
}

export async function getById(id: string): Promise<{ id: string; email: string; name: string; created_at: string | null; last_login: string | null; login_count: number } | null> {
  const rows = await pool.query('SELECT id, email, name, created_at, last_login, login_count FROM users WHERE id = ?', [id]);
  const results: any[] = Array.isArray(rows) ? rows as any[] : [];
  const u = results[0];
  if (!u) return null;
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    created_at: u.created_at ? new Date(u.created_at).toISOString() : null,
    last_login: u.last_login ? new Date(u.last_login).toISOString() : null,
    login_count: u.login_count || 0
  };
}
