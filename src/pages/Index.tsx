import { type FormEvent, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  buildQuoteWhatsAppUrl,
  type QuoteFormValues,
  resolvePublicAssetUrl,
} from '@/lib/site-config'
import { useSiteConfig } from '@/lib/use-site-config'

const initialFormValues: QuoteFormValues = {
  name: '',
  phone: '',
  business: '',
  goal: '',
}

function ScribbleIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const baseClassName = className ?? 'size-7'

  switch (name) {
    case 'rocket':
      return (
        <svg viewBox="0 0 48 48" className={baseClassName} fill="none">
          <path
            d="M15 30c0-10 7-17 18-18-1 11-8 18-18 18Z"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 33 13 38"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M24 24 30 18"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M14 23 9 18"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'target':
      return (
        <svg viewBox="0 0 48 48" className={baseClassName} fill="none">
          <circle
            cx="24"
            cy="24"
            r="14"
            stroke="currentColor"
            strokeWidth="2.8"
          />
          <circle
            cx="24"
            cy="24"
            r="7"
            stroke="currentColor"
            strokeWidth="2.8"
          />
          <path
            d="M24 24 38 10"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="m31 10 7 1-1 7"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'bolt':
      return (
        <svg viewBox="0 0 48 48" className={baseClassName} fill="none">
          <path
            d="M28 6 14 25h10l-4 17 14-19H24l4-17Z"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'mobile':
      return (
        <svg viewBox="0 0 48 48" className={baseClassName} fill="none">
          <rect
            x="14"
            y="6"
            width="20"
            height="36"
            rx="5"
            stroke="currentColor"
            strokeWidth="2.8"
          />
          <path
            d="M22 12h4"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M21 35h6"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'layout':
      return (
        <svg viewBox="0 0 48 48" className={baseClassName} fill="none">
          <rect
            x="6"
            y="8"
            width="36"
            height="30"
            rx="5"
            stroke="currentColor"
            strokeWidth="2.8"
          />
          <path
            d="M6 18h36"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M18 18v20"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'spark':
      return (
        <svg viewBox="0 0 48 48" className={baseClassName} fill="none">
          <path
            d="m24 8 3.5 9.5L37 21l-9.5 3.5L24 34l-3.5-9.5L11 21l9.5-3.5L24 8Z"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="m11 31 1.7 4.6L17.3 37l-4.6 1.4L11 43l-1.7-4.6L4.7 37l4.6-1.4L11 31Z"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'search':
      return (
        <svg viewBox="0 0 48 48" className={baseClassName} fill="none">
          <circle
            cx="20"
            cy="20"
            r="10"
            stroke="currentColor"
            strokeWidth="2.8"
          />
          <path
            d="M28 28 39 39"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M16 20h8"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'refresh':
      return (
        <svg viewBox="0 0 48 48" className={baseClassName} fill="none">
          <path
            d="M39 16v10H29"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 32V22h10"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35 28a13 13 0 0 1-22.2 3"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M13 20a13 13 0 0 1 22.2-3"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'chat':
      return (
        <svg viewBox="0 0 48 48" className={baseClassName} fill="none">
          <path
            d="M12 14h24a6 6 0 0 1 6 6v7a6 6 0 0 1-6 6H23l-8 6v-6h-3a6 6 0 0 1-6-6v-7a6 6 0 0 1 6-6Z"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M16 23h16"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'brief':
      return (
        <svg viewBox="0 0 48 48" className={baseClassName} fill="none">
          <rect
            x="8"
            y="12"
            width="32"
            height="24"
            rx="5"
            stroke="currentColor"
            strokeWidth="2.8"
          />
          <path
            d="M18 12v-2.5A3.5 3.5 0 0 1 21.5 6h5A3.5 3.5 0 0 1 30 9.5V12"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M8 23h32"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 48 48" className={baseClassName} fill="none">
          <circle
            cx="24"
            cy="24"
            r="12"
            stroke="currentColor"
            strokeWidth="2.8"
          />
        </svg>
      )
  }
}

function BrandLockup({
  logoUrl,
  brandName,
  brandSubtitle,
}: {
  logoUrl: string
  brandName: string
  brandSubtitle: string
}) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={resolvePublicAssetUrl(logoUrl)}
        alt={brandName}
        className="h-11 w-auto sm:h-13"
      />
      <div className="hidden min-w-0 sm:block">
        <p className="text-sm font-extrabold uppercase tracking-[0.32em] text-foreground">
          {brandSubtitle}
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.28em] text-foreground-muted">
          Conversao com direcao
        </p>
      </div>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="space-y-4">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title max-w-3xl">{title}</h2>
      <p className="section-copy max-w-2xl">{description}</p>
    </div>
  )
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) {
    return digits ? `(${digits}` : ''
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function openExternalUrl(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

function Index() {
  const { currentConfig, genericWhatsAppUrl, trackPixelEvent } = useSiteConfig()
  const includedRef = useRef<HTMLElement | null>(null)
  const formRef = useRef<HTMLElement | null>(null)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof QuoteFormValues, string>>
  >({})

  function scrollToSection(section: 'included' | 'form') {
    const target = section === 'included' ? includedRef.current : formRef.current
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleContactClick(url: string) {
    trackPixelEvent('Contact', {
      content_name: currentConfig.branding.siteTitle,
    })
    openExternalUrl(url)
  }

  function validate(values: QuoteFormValues) {
    const nextErrors: Partial<Record<keyof QuoteFormValues, string>> = {}

    if (!values.name.trim()) {
      nextErrors.name = currentConfig.form.validationNameRequired
    }

    if (!values.phone.trim()) {
      nextErrors.phone = currentConfig.form.validationPhoneRequired
    }

    if (!values.business.trim()) {
      nextErrors.business = currentConfig.form.validationBusinessRequired
    }

    if (!values.goal.trim()) {
      nextErrors.goal = currentConfig.form.validationGoalRequired
    }

    return nextErrors
  }

  function updateField<K extends keyof QuoteFormValues>(
    field: K,
    value: QuoteFormValues[K],
  ) {
    setFormValues((current) => ({ ...current, [field]: value }))

    setFormErrors((current) => {
      if (!current[field]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[field]
      return nextErrors
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(formValues)
    setFormErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    trackPixelEvent('Lead', {
      content_name: currentConfig.branding.siteTitle,
    })

    openExternalUrl(
      buildQuoteWhatsAppUrl(formValues, currentConfig, window.location.search),
    )
  }

  return (
    <div className="site-shell min-h-screen bg-background text-foreground">
      <header className="site-header">
        <div className="layout-shell flex items-center justify-between gap-4 py-4 sm:py-5">
          <BrandLockup
            logoUrl={currentConfig.branding.logoUrl}
            brandName={currentConfig.branding.brandName}
            brandSubtitle={currentConfig.branding.brandSubtitle}
          />
          <Button
            type="button"
            size="default"
            className="hidden sm:inline-flex"
            onClick={() => handleContactClick(genericWhatsAppUrl)}
          >
            <ScribbleIcon name="chat" className="size-5" />
            {currentConfig.header.ctaLabel}
          </Button>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-orb hero-orb-left" />
          <div className="hero-orb hero-orb-right" />

          <div className="layout-shell hero-grid py-10 sm:py-14 lg:py-18">
            <div className="space-y-7">
              <div className="hero-pill">
                <span className="hero-pill-dot" />
                {currentConfig.header.badgeText}
              </div>

              <div className="space-y-5">
                <p className="section-eyebrow">{currentConfig.hero.eyebrow}</p>
                <h1 className="display-hero max-w-[12ch] text-[clamp(3.9rem,16vw,8.5rem)] text-foreground">
                  <span className="block">{currentConfig.hero.titleLineOne}</span>
                  <span className="block">{currentConfig.hero.titleLineTwo}</span>
                  <span className="block text-brand">
                    {currentConfig.hero.titleHighlight}
                  </span>
                </h1>
              </div>

              <p className="hero-copy max-w-xl">{currentConfig.hero.description}</p>

              <div className="hero-chip-grid">
                {currentConfig.hero.proofItems.map((item) => (
                  <div key={item} className="hero-chip">
                    <ScribbleIcon name="spark" className="size-4" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => scrollToSection('form')}
                >
                  <ScribbleIcon name="chat" className="size-5" />
                  {currentConfig.hero.primaryCtaLabel}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => scrollToSection('included')}
                >
                  <ScribbleIcon name="layout" className="size-5" />
                  {currentConfig.hero.secondaryCtaLabel}
                </Button>
              </div>
            </div>

            <div className="space-y-5">
              <aside className="offer-card">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="offer-badge">{currentConfig.offer.badge}</p>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground-muted">
                      {currentConfig.offer.priceLabel}
                    </p>
                  </div>
                  <div className="icon-disc">
                    <ScribbleIcon name="rocket" className="size-6" />
                  </div>
                </div>

                <div className="mt-7 space-y-3">
                  <p className="price-display">{currentConfig.offer.priceDisplay}</p>
                  <p className="text-lg leading-relaxed text-foreground">
                    {currentConfig.offer.priceCaption}
                  </p>
                  <p className="text-base leading-relaxed text-foreground-muted">
                    {currentConfig.offer.note}
                  </p>
                </div>

                <Button
                  type="button"
                  size="lg"
                  className="mt-7 w-full"
                  onClick={() => handleContactClick(genericWhatsAppUrl)}
                >
                  <ScribbleIcon name="chat" className="size-5" />
                  {currentConfig.offer.ctaLabel}
                </Button>
              </aside>

              <div className="mock-panel">
                <div className="mock-device">
                  <div className="mock-screen">
                    <p className="section-eyebrow text-brand/90">Mobile-first</p>
                    <h2 className="display-title mt-3 max-w-[10ch] text-[2.5rem] text-foreground">
                      Pagina curta. Oferta clara. Clique facil.
                    </h2>
                    <div className="mt-6 grid gap-3">
                      <div className="mock-row">
                        <ScribbleIcon name="target" className="size-5" />
                        CTA bem posicionado
                      </div>
                      <div className="mock-row">
                        <ScribbleIcon name="brief" className="size-5" />
                        Briefing rapido no WhatsApp
                      </div>
                      <div className="mock-row">
                        <ScribbleIcon name="search" className="size-5" />
                        SEO base e Pixel prontos
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="benefit-strip">
          <div className="layout-shell grid gap-3 py-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 lg:py-5">
            {currentConfig.benefits.map((benefit) => (
              <article key={benefit.title} className="benefit-pill-card">
                <div className="icon-disc">
                  <ScribbleIcon name={benefit.icon} className="size-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    {benefit.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell">
          <div className="layout-shell py-12 sm:py-14 lg:py-16">
            <SectionHeading
              eyebrow={currentConfig.benefitsSection.eyebrow}
              title={currentConfig.benefitsSection.title}
              description={currentConfig.benefitsSection.description}
            />

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {currentConfig.benefits.map((benefit) => (
                <article key={`${benefit.icon}-${benefit.title}`} className="feature-card">
                  <div className="icon-disc">
                    <ScribbleIcon name={benefit.icon} className="size-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="display-title text-[2rem] text-foreground sm:text-[2.3rem]">
                      {benefit.title}
                    </h3>
                    <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
                      {benefit.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section ref={includedRef} className="section-shell border-t border-brand/14">
          <div className="layout-shell py-12 sm:py-14 lg:py-16">
            <SectionHeading
              eyebrow={currentConfig.includedSection.eyebrow}
              title={currentConfig.includedSection.title}
              description={currentConfig.includedSection.description}
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {currentConfig.included.map((item) => (
                <article key={`${item.icon}-${item.title}`} className="feature-card feature-card-light">
                  <div className="icon-disc">
                    <ScribbleIcon name={item.icon} className="size-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-extrabold uppercase tracking-[0.12em] text-foreground sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell border-t border-brand/14">
          <div className="layout-shell py-12 sm:py-14 lg:py-16">
            <SectionHeading
              eyebrow={currentConfig.processSection.eyebrow}
              title={currentConfig.processSection.title}
              description={currentConfig.processSection.description}
            />

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {currentConfig.process.map((step) => (
                <article key={step.number} className="process-card">
                  <p className="process-number">{step.number}</p>
                  <h3 className="display-title text-[2rem] text-foreground sm:text-[2.3rem]">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section ref={formRef} className="section-shell border-t border-brand/14">
          <div className="layout-shell py-12 sm:py-14 lg:py-16">
            <div className="quote-panel">
              <div className="space-y-5">
                <p className="section-eyebrow text-black/65">
                  {currentConfig.formSection.eyebrow}
                </p>
                <h2 className="display-title max-w-[11ch] text-[clamp(2.8rem,10vw,5rem)] text-black">
                  {currentConfig.formSection.title}
                </h2>
                <p className="max-w-md text-base leading-relaxed text-black/72 sm:text-lg">
                  {currentConfig.formSection.description}
                </p>

                <div className="quote-side-card">
                  <div className="icon-disc icon-disc-dark">
                    <ScribbleIcon name="brief" className="size-5" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-black">
                      O que a Hunt recebe
                    </p>
                    <p className="text-sm leading-relaxed text-black/70 sm:text-base">
                      Nome, WhatsApp, seu negocio e o objetivo da pagina. O minimo para nao cair lead em branco.
                    </p>
                  </div>
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="name">{currentConfig.form.nameLabel}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formValues.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      placeholder={currentConfig.form.namePlaceholder}
                      aria-invalid={Boolean(formErrors.name)}
                    />
                    {formErrors.name ? (
                      <p className="form-error">{formErrors.name}</p>
                    ) : null}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="phone">{currentConfig.form.phoneLabel}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      inputMode="tel"
                      value={formValues.phone}
                      onChange={(event) =>
                        updateField('phone', formatPhone(event.target.value))
                      }
                      placeholder={currentConfig.form.phonePlaceholder}
                      aria-invalid={Boolean(formErrors.phone)}
                    />
                    {formErrors.phone ? (
                      <p className="form-error">{formErrors.phone}</p>
                    ) : null}
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="business">
                      {currentConfig.form.businessLabel}
                    </Label>
                    <Input
                      id="business"
                      name="business"
                      value={formValues.business}
                      onChange={(event) =>
                        updateField('business', event.target.value)
                      }
                      placeholder={currentConfig.form.businessPlaceholder}
                      aria-invalid={Boolean(formErrors.business)}
                    />
                    {formErrors.business ? (
                      <p className="form-error">{formErrors.business}</p>
                    ) : null}
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="goal">{currentConfig.form.goalLabel}</Label>
                    <Select
                      value={formValues.goal}
                      onValueChange={(value) => updateField('goal', value)}
                    >
                      <SelectTrigger
                        id="goal"
                        aria-invalid={Boolean(formErrors.goal)}
                      >
                        <SelectValue
                          placeholder={currentConfig.form.goalPlaceholder}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {currentConfig.form.goalOptions.map((goal) => (
                          <SelectItem key={goal} value={goal}>
                            {goal}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.goal ? (
                      <p className="form-error">{formErrors.goal}</p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-4 pt-1">
                  <Button
                    type="submit"
                    variant="whatsapp"
                    size="lg"
                    className="w-full"
                  >
                    <ScribbleIcon name="chat" className="size-5" />
                    {currentConfig.formSection.submitLabel}
                  </Button>
                  <p className="text-center text-sm leading-relaxed text-black/62 sm:text-base">
                    {currentConfig.formSection.helperText}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="section-shell border-t border-brand/14">
          <div className="layout-shell py-12 sm:py-14 lg:py-16">
            <div className="closing-card">
              <div className="space-y-4">
                <p className="section-eyebrow">{currentConfig.closing.eyebrow}</p>
                <h2 className="display-title max-w-[13ch] text-[clamp(2.8rem,9vw,5rem)] text-foreground">
                  {currentConfig.closing.title}
                </h2>
                <p className="max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
                  {currentConfig.closing.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => handleContactClick(genericWhatsAppUrl)}
                >
                  <ScribbleIcon name="chat" className="size-5" />
                  {currentConfig.closing.ctaLabel}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => scrollToSection('form')}
                >
                  <ScribbleIcon name="brief" className="size-5" />
                  Preencher formulario
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-brand/18 bg-background">
        <div className="layout-shell flex flex-col gap-7 py-10 pb-24 sm:py-12 sm:pb-14">
          <BrandLockup
            logoUrl={currentConfig.branding.logoUrl}
            brandName={currentConfig.branding.brandName}
            brandSubtitle={currentConfig.branding.brandSubtitle}
          />

          <p className="max-w-2xl text-sm leading-relaxed text-foreground-muted sm:text-base">
            {currentConfig.footer.supportText}
          </p>

          <div className="grid gap-3 text-sm leading-relaxed text-foreground-muted sm:text-base">
            <button
              type="button"
              className="footer-link"
              onClick={() => handleContactClick(genericWhatsAppUrl)}
            >
              <ScribbleIcon name="chat" className="size-5" />
              {currentConfig.footer.whatsappLabelPrefix}{' '}
              {currentConfig.contact.whatsappDisplay}
            </button>
            <a
              href={`mailto:${currentConfig.contact.email}`}
              className="footer-link"
            >
              <ScribbleIcon name="brief" className="size-5" />
              {currentConfig.footer.emailLabel} {currentConfig.contact.email}
            </a>
            <a
              href={currentConfig.contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              <ScribbleIcon name="spark" className="size-5" />
              {currentConfig.footer.instagramLabel}{' '}
              {currentConfig.contact.instagramDisplay}
            </a>
          </div>

          <p className="text-sm leading-relaxed text-foreground-muted">
            {currentConfig.footer.legalText}
          </p>
        </div>
      </footer>

      <Button
        type="button"
        variant="whatsapp"
        size="icon"
        className="fixed bottom-4 right-4 z-40 size-16 border-4 border-background sm:hidden"
        onClick={() => handleContactClick(genericWhatsAppUrl)}
      >
        <ScribbleIcon name="chat" className="size-7" />
      </Button>
    </div>
  )
}

export default Index
