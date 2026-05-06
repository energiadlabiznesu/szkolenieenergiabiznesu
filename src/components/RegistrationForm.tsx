import { useState, useEffect } from "react";
import { ScrollFadeIn } from "./ScrollFadeIn";

const voivodeships = [
  "dolnośląskie", "kujawsko-pomorskie", "lubelskie", "lubuskie", "łódzkie", "małopolskie",
  "mazowieckie", "opolskie", "podkarpackie", "podlaskie", "pomorskie", "śląskie",
  "świętokrzyskie", "warmińsko-mazurskie", "wielkopolskie", "zachodniopomorskie",
];

const formy = ["Sp. z o.o.", "JDG", "Fundacja", "Stowarzyszenie", "Inne"];

interface Props {
  prefill: { imie: string; email: string; telefon: string } | null;
  isOpen?: boolean;
  onClose?: () => void;
}

export const RegistrationForm = ({ prefill, isOpen, onClose }: Props) => {
  const [imie, setImie] = useState(prefill?.imie || "");
  const [email, setEmail] = useState(prefill?.email || "");
  const [telefon, setTelefon] = useState(prefill?.telefon || "");
  const [miasto, setMiasto] = useState("");
  const [typ, setTyp] = useState<"firma" | "indywidualnie">("firma");
  const [forma, setForma] = useState("");
  const [liczbaOsob, setLiczbaOsob] = useState("");
  const [nazwaFirmy, setNazwaFirmy] = useState("");
  const [wojewodztwo, setWojewodztwo] = useState("");
  const [powiat, setPowiat] = useState("");
  const [kiedy, setKiedy] = useState<"szybko" | "3miesiace" | "zastanowie" | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefill) {
      setImie(prefill.imie);
      setEmail(prefill.email);
      setTelefon(prefill.telefon);
    }
  }, [prefill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      fetch("https://hook.eu1.make.com/22bvxx1rpidpb7vcymz5ruxlmoo083jk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zrodlo: "zapis / kurs marketing AI",
          imie,
          email,
          telefon: telefon.startsWith("+48") ? telefon : `+48${telefon}`,
          miasto,
          czy_firma: typ === "firma" ? "TAK" : "NIE",
          forma,
          liczba_osob: liczbaOsob,
          nazwa_firmy: nazwaFirmy,
          wojewodztwo,
          powiat,
          kiedy: kiedy === "szybko" ? "Jak najszybciej" : kiedy === "3miesiace" ? "Za 3 miesiące" : "Zastanowię się",
        }),
      });
    } catch {}
    (window as any).fbq && (window as any).fbq("track", "Lead");
    (window as any).fbq && (window as any).fbq("track", "CompleteRegistration");
    setSubmitted(true);
    setSubmitting(false);
  };

  const inputClass = "w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm";

  const formContent = (
    <>
      {submitted ? (
        <div className="text-center py-16">
          <h3 className="text-2xl font-bold mb-3 tracking-tight">Dziękujemy za zgłoszenie!</h3>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Nasz specjalista skontaktuje się z Tobą w ciągu 24 godzin, aby omówić możliwości dofinansowania i pomóc z formalnościami.
          </p>
          {onClose && (
            <button onClick={onClose} className="mt-6 text-primary underline text-sm">Zamknij</button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" required placeholder="Imię i nazwisko *" value={imie} onChange={(e) => setImie(e.target.value)} className={inputClass} />
            <input type="email" required placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex rounded-lg border border-border bg-background focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all">
              <span className="px-3 py-3 text-sm text-foreground border-r border-border">+48</span>
              <input type="tel" required placeholder="123 456 789" value={telefon} onChange={(e) => setTelefon(e.target.value.replace(/\D/g, "").slice(0, 9))} className="flex-1 px-3 py-3 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm" />
            </div>
            <input type="text" required placeholder="Miasto *" value={miasto} onChange={(e) => setMiasto(e.target.value)} className={inputClass} />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Czy masz firmę?</p>
            <div className="flex gap-4">
              <label className={`flex-1 text-center py-3 rounded-lg cursor-pointer border transition-all font-bold text-sm ${typ === "firma" ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-muted-foreground/50"}`}>
                <input type="radio" name="typ" className="sr-only" checked={typ === "firma"} onChange={() => setTyp("firma")} />
                TAK
              </label>
              <label className={`flex-1 text-center py-3 rounded-lg cursor-pointer border transition-all font-bold text-sm ${typ === "indywidualnie" ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-muted-foreground/50"}`}>
                <input type="radio" name="typ" className="sr-only" checked={typ === "indywidualnie"} onChange={() => setTyp("indywidualnie")} />
                NIE
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Kiedy chcesz pójść na szkolenie?</p>
            <div className="flex gap-3">
              {(["szybko", "3miesiace", "zastanowie"] as const).map((val, i) => {
                const labels = ["Jak najszybciej", "Za 3 miesiące", "Zastanowię się"];
                return (
                  <label key={val} className={`flex-1 text-center py-3 rounded-lg cursor-pointer border transition-all font-bold text-sm ${kiedy === val ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-muted-foreground/50"}`}>
                    <input type="radio" name="kiedy" className="sr-only" checked={kiedy === val} onChange={() => setKiedy(val)} />
                    {labels[i]}
                  </label>
                );
              })}
            </div>
          </div>

          {typ === "firma" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select required value={forma} onChange={(e) => setForma(e.target.value)} className={inputClass + " appearance-none"}>
                  <option value="">Forma działalności *</option>
                  {formy.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
                <input type="number" required min="1" placeholder="Liczba osób *" value={liczbaOsob} onChange={(e) => setLiczbaOsob(e.target.value)} className={inputClass} />
              </div>
              <input type="text" required placeholder="Nazwa firmy / organizacji *" value={nazwaFirmy} onChange={(e) => setNazwaFirmy(e.target.value)} className={inputClass} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select required value={wojewodztwo} onChange={(e) => setWojewodztwo(e.target.value)} className={inputClass + " appearance-none"}>
              <option value="">Województwo *</option>
              {voivodeships.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <input type="text" required placeholder="Powiat *" value={powiat} onChange={(e) => setPowiat(e.target.value)} className={inputClass} />
          </div>

          <div className="flex justify-center pt-2">
            <span className="inline-block border border-primary/30 text-primary text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
              Dofinansowanie nawet do 100% — sprawdzimy opcje za Ciebie
            </span>
          </div>

          <button
            type="submit" disabled={submitting}
            className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Wysyłanie..." : "WYŚLIJ ZGŁOSZENIE"}
          </button>

          <p className="text-xs text-center text-muted-foreground leading-relaxed">
            Wyrażam zgodę na przetwarzanie danych osobowych w celu obsługi zgłoszenia szkoleniowego i kontaktu w sprawie dofinansowania, zgodnie z{" "}
            <a href="https://energiabiznesu.pl/polityka-prywatnosci/" target="_blank" rel="noopener" className="underline">
              polityką prywatności
            </a>
            . Administratorem danych jest Energia dla Biznesu.
          </p>
        </form>
      )}
    </>
  );

  // Modal mode
  if (isOpen !== undefined) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div
          className="relative bg-card border border-border rounded-lg p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">Zapisz się na kurs</h3>
            <p className="text-muted-foreground text-sm">Wypełnij formularz — sprawdzimy dostępne dofinansowanie i pomożemy z dokumentami.</p>
          </div>
          {formContent}
        </div>
      </div>
    );
  }

  // Inline mode (on page)
  return (
    <section id="zapisz-sie" className="py-20 md:py-28 px-4 border-t border-border">
      <ScrollFadeIn>
        <div className="max-w-content mx-auto">
          <div className="mb-10">
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">Zapisz się</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
              Chcę wziąć udział w <span className="text-primary">kursie</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              Wypełnij formularz — sprawdzimy dostępne dofinansowanie, pomożemy z dokumentami i przeprowadzimy całe Twoje zgłoszenie. Bezpłatnie.
            </p>
          </div>

          <div className="mb-8 rounded-lg border border-primary/40 bg-primary/5 p-5">
            <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Dlaczego pytamy o firmę?</p>
            <p className="text-foreground text-sm leading-relaxed">
              Sprawdzamy czy możesz dostać <strong>dofinansowanie z KFS lub BUR</strong> — zamiast <span className="line-through text-muted-foreground">5 000 zł</span> możesz zapłacić nawet <strong className="text-primary text-base">0 zł</strong> — dofinansowanie pokrywa nawet do 100% kosztów. Całą dokumentację robimy za Ciebie, bezpłatnie.
            </p>
          </div>

          {formContent}
        </div>
      </ScrollFadeIn>
    </section>
  );
};
