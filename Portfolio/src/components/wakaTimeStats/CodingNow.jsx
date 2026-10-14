import { useEffect, useState } from "react";
import { FiClock, FiFolder, FiGitBranch, FiLock, FiMonitor, FiSun } from "react-icons/fi";
import WAKATIME_CONFIG from "../../config/wakatimeConfig";
import { useLanguage } from "../../i18n/LanguageContext";
import { fetchCodingNow } from "../../services/wakatimeService";
import { formatAgo, formatDuration, formatTime } from "./format";
import { languageColor } from "./languageColors";

/**
 * Cartão "Codando agora": em que projeto você está mexendo no editor neste
 * momento, com branch, linguagem, editor e duração da sessão.
 *
 * Os dados vêm dos heartbeats do WakaTime, lidos no servidor com o token
 * OAuth WAKATIME_ACCESS_TOKEN (api/_codando.js). Atualiza a cada
 * CODING_NOW.REFRESH_SECONDS enquanto a aba está visível. Sem o token (modo
 * perfil público) o cartão não aparece.
 *
 * <CodingNow />
 * <CodingNow showProject={false} />   → nunca mostra o nome do projeto
 */

const REFRESH_MS = WAKATIME_CONFIG.CODING_NOW.REFRESH_SECONDS * 1000;

// Busca agora e repete a cada minuto; para de perguntar se não há token
function useCodingNow() {
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    let alive = true;
    let timer = null;

    const refresh = () => {
      if (document.visibilityState === "hidden") return;
      fetchCodingNow().then((result) => {
        if (!alive) return;
        setState(result);
        if (result.status === "unavailable" && timer) {
          clearInterval(timer);
          timer = null;
        }
      });
    };

    refresh();
    timer = setInterval(refresh, REFRESH_MS);
    // Voltou para a aba: atualiza na hora
    document.addEventListener("visibilitychange", refresh);

    return () => {
      alive = false;
      if (timer) clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return state;
}

// Relógio de 30 em 30 s, para "há 2 min" não ficar parado entre as buscas
function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(timer);
  }, []);
  return now;
}

export default function CodingNow({ showProject = true }) {
  const state = useCodingNow();
  const now = useNow();
  const { t: texts } = useLanguage();
  const t = texts.wakatime;
  const locale = texts.locale;

  // Carregando, sem token ou erro: o cartão simplesmente não aparece
  if (state.status !== "ok") return null;

  const { active, last, todaySeconds } = state.data;
  const named = showProject && last?.isPublic;
  const projectName = named ? last.project : t.privateProject;

  /* ---------- Parado: uma linha discreta ---------- */
  if (!active) {
    return (
      <section className="waka-now idle" aria-label={t.codingNow}>
        <span className="waka-now-status">
          <span className="waka-now-dot" aria-hidden="true" />
          {t.idleNow}
        </span>
        <span className="waka-now-idle-text">
          {last ? (
            <>
              {t.lastActivity} {formatAgo(last.at, now, t.ago)} {t.in} <strong>{projectName}</strong>
              {last.language && ` · ${last.language}`}
            </>
          ) : (
            t.noActivityToday
          )}
          {todaySeconds >= 60 && ` · ${t.todaySuffix(formatDuration(todaySeconds))}`}
        </span>
      </section>
    );
  }

  /* ---------- Codando: cartão completo ---------- */
  const sessionSeconds = (last.at - last.sessionStart) / 1000;

  return (
    <section className="waka-now active" aria-label={t.codingNow} aria-live="polite">
      <div className="waka-now-head">
        <span className="waka-now-status">
          <span className="waka-now-dot" aria-hidden="true" />
          {t.codingNow}
        </span>
        <span className="waka-now-ago">{t.lastSignal(formatAgo(last.at, now, t.ago))}</span>
      </div>

      <p className="waka-now-project">
        <span className="waka-now-name">
          {named ? <FiFolder aria-hidden="true" /> : <FiLock aria-hidden="true" />}
          <strong title={projectName}>{projectName}</strong>
        </span>
        {named && last.branch && (
          <span className="waka-now-branch">
            <FiGitBranch aria-hidden="true" />
            {last.branch}
          </span>
        )}
      </p>

      <ul className="waka-now-meta">
        {last.language && (
          <li>
            <span
              className="waka-dot"
              style={{ "--lang": languageColor(last.language) }}
              aria-hidden="true"
            />
            {last.language}
          </li>
        )}
        {last.editor && (
          <li>
            <FiMonitor aria-hidden="true" />
            {last.editor}
          </li>
        )}
        {sessionSeconds >= 60 && (
          <li>
            <FiClock aria-hidden="true" />
            {t.session(formatDuration(sessionSeconds), formatTime(last.sessionStart, locale))}
          </li>
        )}
        {last.projectTodaySeconds >= 60 && (
          <li>
            <FiSun aria-hidden="true" />
            {t.todayInProject(formatDuration(last.projectTodaySeconds))}
          </li>
        )}
      </ul>
    </section>
  );
}
