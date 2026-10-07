#!/usr/bin/env node
/**
 * mcp-usage.mjs — Contador de llamadas al MCP de Figma con barra de progreso frente al límite del plan.
 *
 * El límite es POR PERSONA (asiento de Figma), no por proyecto, y Figma no expone cuánto llevas:
 * esto es una estimación con las llamadas que Claude va anotando en esta máquina/proyecto.
 *
 * Uso:
 *   npm run mcp                          muestra el uso de hoy
 *   npm run mcp -- --add 3 [--what "Button"]   suma llamadas (Claude lo hace tras cada tanda)
 *
 * Límites (plan y asiento de hanzo.config.json → figma.plan / figma.seat):
 *   pro / org  · Dev o Full : 200 al día   (además 10/min en Pro, 15/min en Org)
 *   enterprise · Dev o Full : 600 al día   (20/min)
 *   cualquier plan · View/Collab : 6 al MES
 * whoami, add_code_connect_map y create_new_file no cuentan.
 */

import { execSync } from 'node:child_process';
import { parseArgs, readJson, writeJson, loadConfig } from './lib.mjs';

const args = parseArgs();
const cfg = await loadConfig();
const FILE = '.ai/mcp-usage.json';
const plan = (cfg.figma?.plan || 'pro').toLowerCase();
const seat = (cfg.figma?.seat || 'full').toLowerCase();
const monthly = /view|collab/.test(seat);
const limit = monthly ? 6 : plan === 'enterprise' ? 600 : 200;
const perMin = monthly ? null : plan === 'enterprise' ? 20 : plan === 'org' ? 15 : 10;

let user = process.env.HANZO_USER;
if (!user) try { user = execSync('git config user.email', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch {}
user ||= 'local';

const now = new Date();
const day = now.toISOString().slice(0, 10);          // los contadores de Figma se reinician por día (UTC)
const period = monthly ? day.slice(0, 7) : day;

const data = await readJson(FILE, {});
const mine = (data[user] ||= {});
const entry = (mine[period] ||= { calls: 0, log: [] });
if (args.add) {
  const n = Number(args.add) || 0;
  entry.calls += n;
  entry.log.push({ at: now.toISOString(), n, what: args.what || undefined });
  await writeJson(FILE, data);
}

const used = entry.calls;
const pct = Math.min(100, (used / limit) * 100);
const W = 20;
const filled = used > 0 ? Math.max(1, Math.round((pct / 100) * W)) : 0;
const bar = '▓'.repeat(filled) + '░'.repeat(W - filled);
const unit = monthly ? 'este mes' : 'hoy';
const reset = monthly ? 'se reinicia cada mes' : 'se reinicia cada día';
const fmt = (x) => x.toLocaleString('es-ES', { maximumFractionDigits: 1 });

console.log(`Figma MCP ${unit}: ${bar} ${used}/${limit} llamadas (${fmt(pct)} %)`);
console.log(`Plan ${plan.toUpperCase()} · asiento ${seat} · límite ${monthly ? 'MENSUAL' : 'DIARIO'} por persona${perMin ? ` (y ${perMin}/min)` : ''} · ${reset}`);
console.log(`Quedan ~${Math.max(0, limit - used)} llamadas ${unit}. Estimación: solo cuenta lo anotado desde este proyecto.`);
if (pct >= 80) console.log('⚠ Cerca del límite: prioriza (digest y design_context de lo imprescindible) y avisa al usuario.');
