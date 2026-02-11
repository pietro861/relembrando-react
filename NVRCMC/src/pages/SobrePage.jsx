import { Link } from "react-router-dom";
import "./SobrePage.css";

export default function SobrePage() {
  return (
    <div className="about-page">
      <header className="about-header">
        <Link to="/" className="about-back-link">
          Voltar
        </Link>
        <h1 className="about-title">Sobre</h1>
      </header>

      <main className="about-main">
        <section className="about-card">
          <p className="about-lead">
            Esta pagina foi criada para cumprir o requisito da atividade com 3
            rotas no React Router.
          </p>
          <p className="about-text">
            Rotas atuais: <strong>/</strong>, <strong>/todos</strong> e{" "}
            <strong>/sobre</strong>.
          </p>

          <h2 className="about-subtitle">Objetivo</h2>
          <p className="about-text">
            O objetivo principal deste projeto e revisar fundamentos de React,
            praticando componentizacao, consumo de API e navegacao entre paginas.
            A aplicacao foi desenvolvida com foco em estrutura simples, codigo
            legivel e facilidade de manutencao.
          </p>

          <h2 className="about-subtitle">Tecnologias Utilizadas</h2>
          <ul className="about-list">
            <li>React com Vite para desenvolvimento rapido.</li>
            <li>React Router DOM para gerenciamento de rotas.</li>
            <li>Fetch API para requisicoes HTTP.</li>
            <li>API publica de exemplo para testes.</li>
          </ul>

          <h2 className="about-subtitle">Funcionalidades</h2>
          <ul className="about-list">
            <li>Navegacao entre paginas sem recarregar o navegador.</li>
            <li>Listagem de usuarios e posts na pagina inicial.</li>
            <li>Filtro e busca de informacoes para facilitar visualizacao.</li>
            <li>Listagem de tarefas com controle de status concluida/pendente.</li>
          </ul>

          <h2 className="about-subtitle">Estrutura de Rotas</h2>
          <p className="about-text">
            A rota <strong>/</strong> representa a pagina principal, a rota{" "}
            <strong>/todos</strong> exibe o gerenciamento de tarefas e a rota{" "}
            <strong>/sobre</strong> centraliza as informacoes institucionais do
            projeto.
          </p>

          <h2 className="about-subtitle">Resumo</h2>
          <p className="about-text">
            Este projeto demonstra os requisitos da atividade de forma direta e
            funcional, servindo como base para evolucoes futuras, como
            autenticacao, persistencia de dados e testes automatizados.
          </p>
        </section>
      </main>
    </div>
  );
}
