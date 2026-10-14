import { useEffect, useState } from "react";
import { FiActivity, FiAward, FiClock, FiExternalLink, FiSun, FiCode } from "react-icons/fi";
import WAKATIME_CONFIG from "../../config/wakatimeConfig";
import { useLanguage } from "../../i18n/LanguageContext";
import { fetchWakaTimeStats } from "../../services/wakatimeService";
import CodingNow from "./CodingNow";
import { formatDate, formatDuration, formatNumber, formatPercent } from "./format";
import { languageColor } from "./languageColors";
import "./WakaTimeStats.css";

/**
 * Painel com as estatísticas do WakaTime (tempo programando, linguagens,
 * editores, sistemas e projetos) e o cartão "Codando agora" (em que projeto
 * você está mexendo no editor neste momento).
 *
 * Os textos vêm de src/i18n/translations.js (t.wakatime), no idioma escolhido
 * no site. Ferramentas de IA (WAKATIME_CONFIG.HIDDEN_EDITORS) e as categorias
 * já chegam filtradas do servidor (api/_wakatime.js).
 *
 * Para usar no seu projeto, copie:
 *   • a pasta components/WakaTimeStats
 *   • services/wakatimeService.js e config/wakatimeConfig.js
 *   • a pasta i18n/ (ou troque useLanguage por textos fixos)
 *   • api/_wakatime.js, api/wakatime.js, api/_codando.js, api/codando.js
 *     e o plugin do vite.config.js
 *
 * <WakaTimeStats />
 * <WakaTimeStats initialRange="all_time" showProjects={false} />
 * <WakaTimeStats showCodingNow={false} />
 */

const OS_NAMES = { Mac: "macOS" };

const { RANGES, DEFAULT_RANGE, PROFILE_URL, MAX_LANGUAGES, HIDDEN_LANGUAGES } =
  WAKATIME_CONFIG;

function useWakaTime(range) {
  const [state, setState] = useState({ status: "loading", data: null, error: null });

  useEffect(() => {
    let active = true;
    // Mantém os dados antigos na tela enquanto o novo período carrega
    setState((old) => ({ ...old, status: "loading", error: null }));

    fetchWakaTimeStats(range)
      .then((data) => active && setState({ status: "ready", data, error: null }))
      .catch(
        (error) => active && setState((old) => ({ status: "error", data: old.data, error }))
      );

    return () => {
      active = false;
    };
  }, [range]);

  return state;
}

/* =====================================================================
   Pedaços da tela
   ===================================================================== */

function Kpi({ icon: Icon, label, value, note }) {
  return (
    <li className="waka-kpi">
      <span className="waka-kpi-label">
        <Icon aria-hidden="true" />
        {label}
      </span>
      <span className="waka-kpi-value">{value}</span>
      {note && <span className="waka-kpi-note">{note}</span>}
    </li>
  );
}

// Barra única dividida por linguagem (parte do todo)
function LanguageStack({ languages, locale }) {
  return (
    <div className="waka-stack" aria-hidden="true">
      {languages.map((lang) => (
        <span
          key={lang.name}
          className="waka-stack-seg"
          style={{ flexGrow: lang.seconds, background: lang.color }}
          title={`${lang.name} · ${formatDuration(lang.seconds)} · ${formatPercent(lang.percent, locale)}`}
        />
      ))}
    </div>
  );
}

function LanguageList({ languages, rest, t, locale }) {
  const max = languages[0]?.seconds || 1;
  return (
    <ul className="waka-list">
      {languages.map((lang) => (
        <li key={lang.name} className="waka-row" style={{ "--lang": lang.color }}>
          <div className="waka-row-head">
            <span className="waka-dot" aria-hidden="true" />
            <span className="waka-name">{lang.name}</span>
            <span className="waka-time">{formatDuration(lang.seconds)}</span>
            <span className="waka-pct">{formatPercent(lang.percent, locale)}</span>
          </div>
          <div className="waka-bar" aria-hidden="true">
            <span style={{ width: `${(lang.seconds / max) * 100}%` }} />
          </div>
        </li>
      ))}
      {rest && (
        <li className="waka-row waka-row-rest">
          + {rest.count} {t.others(rest.count)} ·{" "}
          {formatDuration(rest.seconds)} · {formatPercent(rest.percent, locale)}
        </li>
      )}
    </ul>
  );
}

function MiniList({ title, items, rename = {}, locale }) {
  if (!items?.length) return null;
  return (
    <section className="waka-mini">
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <span className="waka-mini-name">{rename[item.name] ?? item.name}</span>
            <span className="waka-mini-bar" aria-hidden="true">
              <span style={{ width: `${Math.max(item.percent, 2)}%` }} />
            </span>
            <span className="waka-mini-pct">{formatPercent(item.percent, locale)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ErrorBox({ error, t }) {
  const message = t.errors[error?.code] ?? error?.message ?? t.loadError;
  const hint = t.hints[error?.code];

  return (
    <div className={`waka-message ${error?.code === "pending" ? "warning" : "error"}`} role="alert">
      <strong>{message}</strong>
      {hint && <span>{hint}</span>}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="waka-skeleton" aria-hidden="true">
      <div className="waka-skeleton-kpis">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} />
        ))}
      </div>
      <span className="waka-skeleton-bar" />
      <span className="waka-skeleton-block" />
    </div>
  );
}

/* =====================================================================
   Componente principal
   ===================================================================== */

export default function WakaTimeStats({
  initialRange = DEFAULT_RANGE,
  showRangePicker = true,
  showProjects = true,
  showCodingNow = true,
}) {
  const [range, setRange] = useState(initialRange);
  const { status, data, error } = useWakaTime(range);
  const { t: texts } = useLanguage();
  const t = texts.wakatime;
  const locale = texts.locale;

  const hidden = new Set(HIDDEN_LANGUAGES);
  const languages = (data?.languages ?? [])
    .filter((lang) => !hidden.has(lang.name))
    .map((lang) => ({ ...lang, color: languageColor(lang.name) }));
  const top = languages.slice(0, MAX_LANGUAGES);
  const others = languages.slice(MAX_LANGUAGES);
  const rest = others.length
    ? {
        count: others.length,
        seconds: others.reduce((sum, l) => sum + l.seconds, 0),
        percent: others.reduce((sum, l) => sum + l.percent, 0),
      }
    : null;

  const topEditor = data?.editors?.[0];

  return (
    <div className="waka" aria-busy={status === "loading"}>
      {/* ---------- Codando agora (não depende do período) ---------- */}
      {showCodingNow && <CodingNow showProject={showProjects} />}

      {/* ---------- Período + link do perfil ---------- */}
      <div className="waka-toolbar">
        {showRangePicker && (
          <div className="waka-ranges" role="group" aria-label={t.period}>
            {RANGES.map((value) => (
              <button
                key={value}
                type="button"
                className={value === range ? "active" : ""}
                aria-pressed={value === range}
                onClick={() => setRange(value)}
              >
                {t.ranges[value]}
              </button>
            ))}
          </div>
        )}

        {PROFILE_URL && (
          <a className="waka-profile" href={PROFILE_URL} target="_blank" rel="noopener noreferrer">
            {t.profile} <FiExternalLink aria-hidden="true" />
          </a>
        )}
      </div>

      {status === "error" && <ErrorBox error={error} t={t} />}
      {status === "loading" && !data && <Skeleton />}

      {data && (
        <div className={status === "loading" ? "waka-body updating" : "waka-body"}>
          {/* ---------- Indicadores ---------- */}
          <ul className="waka-kpis">
            <Kpi
              icon={FiClock}
              label={t.totalTime}
              value={formatDuration(data.totalSeconds)}
              note={
                data.range === "all_time" && data.start
                  ? t.since(formatDate(data.start, locale))
                  : t.languagesCount(languages.length)
              }
            />
            <Kpi
              icon={FiActivity}
              label={t.dailyAverage}
              value={formatDuration(data.dailyAverage)}
              note={data.activeDays != null ? t.activeDays(formatNumber(data.activeDays, locale)) : null}
            />
            {data.today ? (
              <Kpi icon={FiSun} label={t.today} value={formatDuration(data.today.seconds)} note={t.soFar} />
            ) : (
              <Kpi
                icon={FiCode}
                label={t.topEditor}
                value={topEditor?.name ?? "—"}
                note={topEditor ? t.ofTime(formatPercent(topEditor.percent, locale)) : null}
              />
            )}
            <Kpi
              icon={FiAward}
              label={t.bestDay}
              value={data.bestDay ? formatDuration(data.bestDay.seconds) : "—"}
              note={data.bestDay ? formatDate(data.bestDay.date, locale) : t.noData}
            />
          </ul>

          {/* ---------- Linguagens ---------- */}
          {languages.length > 0 ? (
            <>
              <LanguageStack languages={languages} locale={locale} />
              <div className="waka-grid">
                <section className="waka-card">
                  <h3>{t.languages}</h3>
                  <LanguageList languages={top} rest={rest} t={t} locale={locale} />
                </section>

                <aside className="waka-card waka-side">
                  <MiniList title={t.editors} items={data.editors} locale={locale} />
                  <MiniList
                    title={t.operatingSystems}
                    items={data.operatingSystems}
                    rename={OS_NAMES}
                    locale={locale}
                  />
                </aside>
              </div>
            </>
          ) : (
            <p className="waka-empty">{t.empty}</p>
          )}

          {/* ---------- Projetos ---------- */}
          {showProjects && data.projects?.length > 0 && (
            <section className="waka-card waka-projects">
              <h3>{t.projects}</h3>
              <ul>
                {data.projects.map((project) => (
                  <li key={project.name}>
                    <span>{project.name}</span>
                    <strong>{formatDuration(project.seconds)}</strong>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="waka-source">
            {t.source} · {data.mode === "oauth" ? t.sourceOauth : t.sourcePublic}
          </p>
        </div>
      )}
    </div>
  );
}
