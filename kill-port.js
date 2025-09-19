// kill-port.js
const { execSync } = require('child_process');

try {
  // Попробуем найти процесс, который слушает порт 3000
  const pid = execSync('lsof -t -i:3000 || true').toString().trim();
  if (pid) {
    console.log(`⚠️ Убиваем процесс на порту 3000 (PID=${pid})`);
    execSync(`kill -9 ${pid}`);
  } else {
    console.log('✅ Порт 3000 свободен');
  }
} catch (_err) {
  console.log('ℹ️ Не удалось проверить порт 3000, возможно lsof отсутствует');
}
