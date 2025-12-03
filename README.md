# Estag.io – Sistema de Gerenciamento de Estágios

## 📌 Sobre o projeto

O **Estag.io** é um sistema web desenvolvido em **NestJS + TypeORM + MySQL**, criado para auxiliar no gerenciamento de oportunidades de estágio e vagas iniciais na área de Tecnologia da Informação.

O sistema permite:

- ✅ Cadastro e gerenciamento de **Estudantes**
- ✅ Cadastro e gerenciamento de **Empresas**
- ✅ Cadastro e gerenciamento de **Vagas**
- ✅ Registro de **Candidaturas**
- ✅ Visualização geral em um **Painel Administrativo (Dashboard)**
- ✅ Interface web com **Handlebars + Bootstrap**

O projeto foi desenvolvido como parte da disciplina de **Programação com Acesso a Banco de Dados (PW2)**.

---

## 🛠 Tecnologias utilizadas

- **Node.js**
- **NestJS**
- **TypeORM**
- **MySQL**
- **Handlebars (HBS)**
- **Bootstrap 4**
- **Typescript**
- **Express**
- **Git / GitHub**

---

## ▶ Como executar o projeto

### ✅ 1. Clone o repositório

```bash
git clone https://github.com/camila-lobato/projeto-pw2-Estag.io.git
```

Entre na pasta do projeto:

```bash
cd projeto-pw2-Estag.io-main
```

---

### ✅ 2. Instale as dependências

```bash
npm install
```

---

### ✅ 3. Configure o banco de dados

Crie um banco no MySQL com o nome:

```sql
CREATE DATABASE estagio;
```

Agora configure a conexão no arquivo `app.module.ts` ou `ormconfig` (dependendo da sua versão), exemplo:

```ts
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'SUA_SENHA',
  database: 'estagio',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
});
```

📌 **Importante:** Troque `SUA_SENHA` pela senha do seu MySQL.

---

### ✅ 4. Execute o projeto

```bash
npm run start:dev
```

Se tudo estiver certo, aparecerá:

```
Nest application successfully started
```

Acesse em:

```
http://localhost:3000
```

---

## 👩‍💻 Desenvolvido por

**Camila Lobato Moreira e Kariny de Almeida Dobis**  
Projeto desenvolvido para a disciplina de Programação Web II – IFRO

