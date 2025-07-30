# SkyDash – API Backend

Backend da aplicação Projeto Teste, desenvolvida como teste técnico Fullstack. O sistema oferece autenticação, gestão de usuários e integração com a API de clima, com foco em arquitetura segura, escalável e pronta para produção.

## 🔧 Tecnologias

- Node.js + Express
- MySQL + Prisma ORM
- JWT (autenticação)
- Bcrypt (hash de senhas)
- Zod (validação de dados)
- CSV + GZIP (importação de usuários)
- Cache em memória (clima)
- Arquitetura modular e profissional
- Testado com frontend React/Vite (projeto separado)

## 📦 Instalação

1. Clone o projeto:
   ```bash
``bash
git clone https://github.com/FelipeLopes069/Projeto-teste-Back-end.git
cd Projeto-teste-Back-end



   	Instale as dependências:
    - npm install

   Certifique-se de que o banco skydash já existe no MySQL. Depois rode:

    - npx prisma migrate dev


    Inicie o servidor:

    yarn dev 

    npm run dev


Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

# Porta do servidor
PORT=3333

# Configuração do banco MySQL
DATABASE_URL="mysql://root:123456@localhost:3306/skydash"

# Chave JWT (use uma chave segura)
JWT_SECRET=sua-chave-secreta-aqui

# Chave da WeatherAPI (registre-se em https://www.weatherapi.com/)
WEATHER_API_KEY=sua-chave-da-weatherapi

Certifique-se de que o banco skydash já existe no MySQL. Depois rode:

npx prisma migrate dev