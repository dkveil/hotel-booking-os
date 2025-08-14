import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function manageLogs() {
  const logsDir = path.join(__dirname, '..', 'logs');
  const currentLogPath = path.join(__dirname, '..', 'debug-storybook.log');
  
  try {
    await fs.access(logsDir);
  } catch {
    await fs.mkdir(logsDir, { recursive: true });
  }
  
  try {
    await fs.access(currentLogPath);
    
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const archivedLogPath = path.join(logsDir, `debug-storybook-${timestamp}.log`);
    
    await fs.rename(currentLogPath, archivedLogPath);
    console.log(`📁 Log archived: ${archivedLogPath}`);
    
    await cleanOldLogs(logsDir);
    
  } catch {
    console.log('📝 No existing log file to archive');
  }
}

async function cleanOldLogs(logsDir: string) {
  const files = await fs.readdir(logsDir);
  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
  
  const deletePromises = files
    .filter(file => file.startsWith('debug-storybook-'))
    .map(async (file) => {
      const filePath = path.join(logsDir, file);
      const stats = await fs.stat(filePath);
      
      if (stats.mtime.getTime() < thirtyDaysAgo) {
        await fs.unlink(filePath);
        console.log(`🗑️  Removed old log: ${file}`);
        return file;
      }
      return null;
    });
  
  await Promise.all(deletePromises);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  manageLogs().catch(console.error);
}

export { manageLogs }; 