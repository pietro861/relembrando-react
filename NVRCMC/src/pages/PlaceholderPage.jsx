import { Link } from "react-router-dom";
import "./PlaceholderPage.css";

export default function PlaceholderPage() {
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
        </section>
      </main>
    </div>
  );
}
