import { useState } from "react";
import { faq, tournamentAssets } from "./tournamentData";

// FAQ block from Figma node 8475:90958. The file ships items 1-2 expanded and
// 3-5 collapsed, and the collapsed rows have no answer text in the design, so
// those bodies come from the data module.
export default function TournamentFaq() {
  const [open, setOpen] = useState(() => new Set([0, 1]));

  const toggle = (index) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <section className="tmt-section tmt-faq">
      <div className="tmt-glow tmt-glow--teal" style={{ top: -66, left: 0, width: 535, height: 535, opacity: 0.2 }} />
      <div className="tmt-glow tmt-glow--magenta" style={{ top: 29, right: 149, width: 641, height: 641, opacity: 0.15 }} />

      <header className="tmt-faq__head">
        <h2 className="tmt-faq__title">{faq.heading}</h2>
        <p className="tmt-faq__subtitle">{faq.subheading}</p>
        <a className="tmt-faq__action" href={faq.action.href}>
          {faq.action.label}
        </a>
      </header>

      <div className="tmt-faq__list">
        {faq.items.map((item, index) => {
          const isOpen = open.has(index);
          return (
            <div key={item.question} className={`tmt-faq__item${isOpen ? " is-open" : ""}`}>
              <button
                type="button"
                className="tmt-faq__question"
                aria-expanded={isOpen}
                onClick={() => toggle(index)}
              >
                <span>{item.question}</span>
                <span className="tmt-faq__toggle">
                  <img src={tournamentAssets.iconFaqToggle} alt="" aria-hidden="true" />
                </span>
              </button>
              {isOpen && <p className="tmt-faq__answer">{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
