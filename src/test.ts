// Importa il modulo http
import * as http from 'http';

// Crea un server HTTP che ascolta sulla porta fornita da $PORT
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Ciao dal server personalizzato su Railway.app!\n');
});

// Ascolta sulla porta fornita da $PORT o sulla porta 3000 se $PORT non è definito
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});