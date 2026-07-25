import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Download,
  FileJson,
  Globe,
  ImagePlus,
  LockKeyhole,
  LogOut,
  Palette,
  Save,
  Settings2,
  ShieldAlert,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  SITE_HASH_ROUTE,
  cloneSiteConfig,
  cloneSiteDatabase,
  type FeatureItem,
  type ProcessStep,
} from '@/lib/site-config'
import { useSiteConfig } from '@/lib/use-site-config'

function AdminSection({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="admin-card space-y-6">
      <div className="flex items-start gap-4">
        <div className="admin-icon">{icon}</div>
        <div className="space-y-2">
          <h2 className="admin-section-title">{title}</h2>
          <p className="admin-section-copy">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

function FieldStack({
  label,
  children,
  hint,
}: {
  label: string
  children: ReactNode
  hint?: string
}) {
  return (
    <div className="space-y-3">
      <Label className="text-foreground">{label}</Label>
      {children}
      {hint ? <p className="admin-field-hint">{hint}</p> : null}
    </div>
  )
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-3">
      <Label className="text-foreground">{label}</Label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value.startsWith('#') ? value : '#000000'}
          onChange={(event) => onChange(event.target.value)}
          className="h-14 w-14 shrink-0 cursor-pointer rounded-[8px] border border-brand/30 bg-black p-1.5"
        />
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="#000000 ou rgba(...)"
        />
      </div>
    </div>
  )
}

function StringListEditor({
  title,
  items,
  labelPrefix,
  onChange,
}: {
  title: string
  items: string[]
  labelPrefix: string
  onChange: (index: number, value: string) => void
}) {
  return (
    <div className="space-y-4">
      <h3 className="admin-subtitle">{title}</h3>
      <div className="admin-form-grid">
        {items.map((item, index) => (
          <FieldStack key={`${labelPrefix}-${index}`} label={`${labelPrefix} ${index + 1}`}>
            <Input
              value={item}
              onChange={(event) => onChange(index, event.target.value)}
            />
          </FieldStack>
        ))}
      </div>
    </div>
  )
}

function FeatureEditor({
  title,
  items,
  onChange,
}: {
  title: string
  items: FeatureItem[]
  onChange: (index: number, field: keyof FeatureItem, value: string) => void
}) {
  return (
    <div className="space-y-4">
      <h3 className="admin-subtitle">{title}</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="rounded-[10px] border border-brand/14 bg-black/25 p-4 space-y-4"
          >
            <div className="admin-form-grid">
              <FieldStack label="Icone">
                <Input
                  value={item.icon}
                  onChange={(event) =>
                    onChange(index, 'icon', event.target.value)
                  }
                />
              </FieldStack>
              <FieldStack label="Titulo">
                <Input
                  value={item.title}
                  onChange={(event) =>
                    onChange(index, 'title', event.target.value)
                  }
                />
              </FieldStack>
            </div>
            <FieldStack label="Descricao">
              <Textarea
                className="min-h-28"
                value={item.description}
                onChange={(event) =>
                  onChange(index, 'description', event.target.value)
                }
              />
            </FieldStack>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProcessEditor({
  items,
  onChange,
}: {
  items: ProcessStep[]
  onChange: (index: number, field: keyof ProcessStep, value: string) => void
}) {
  return (
    <div className="space-y-4">
      <h3 className="admin-subtitle">Passo a passo</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={`${item.number}-${index}`}
            className="rounded-[10px] border border-brand/14 bg-black/25 p-4 space-y-4"
          >
            <div className="admin-form-grid">
              <FieldStack label="Numero">
                <Input
                  value={item.number}
                  onChange={(event) =>
                    onChange(index, 'number', event.target.value)
                  }
                />
              </FieldStack>
              <FieldStack label="Titulo">
                <Input
                  value={item.title}
                  onChange={(event) =>
                    onChange(index, 'title', event.target.value)
                  }
                />
              </FieldStack>
            </div>
            <FieldStack label="Descricao">
              <Textarea
                className="min-h-28"
                value={item.description}
                onChange={(event) =>
                  onChange(index, 'description', event.target.value)
                }
              />
            </FieldStack>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminPage() {
  const {
    database,
    currentConfig,
    isAdminAuthenticated,
    saveCurrentConfig,
    exportDatabase,
    importDatabase,
    resetDatabase,
    signIn,
    signOut,
    publishedUrl,
  } = useSiteConfig()
  const [draftConfig, setDraftConfig] = useState(() => cloneSiteConfig(currentConfig))
  const [isDirty, setIsDirty] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginValues, setLoginValues] = useState({
    username: '',
    password: '',
  })
  const importInputRef = useRef<HTMLInputElement | null>(null)
  const faviconInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setDraftConfig(cloneSiteConfig(currentConfig))
    setIsDirty(false)
  }, [currentConfig])

  function updateDraft(mutator: (nextConfig: typeof draftConfig) => void) {
    setDraftConfig((current) => {
      const next = cloneSiteConfig(current)
      mutator(next)
      return next
    })
    setIsDirty(true)
    setFeedback('')
  }

  function updateFeatureItem(
    section: 'benefits' | 'included',
    index: number,
    field: keyof FeatureItem,
    value: string,
  ) {
    updateDraft((next) => {
      next[section][index][field] = value
    })
  }

  function updateProcessItem(
    index: number,
    field: keyof ProcessStep,
    value: string,
  ) {
    updateDraft((next) => {
      next.process[index][field] = value
    })
  }

  function handleSave() {
    saveCurrentConfig(draftConfig)
    setIsDirty(false)
    setFeedback('Alteracoes salvas neste navegador e aplicadas ao site.')
  }

  function handleDiscard() {
    setDraftConfig(cloneSiteConfig(currentConfig))
    setIsDirty(false)
    setFeedback('Rascunho descartado. O site voltou ao estado salvo.')
  }

  function handleExport() {
    const nextDatabase = cloneSiteDatabase(database)
    nextDatabase.currentConfig = cloneSiteConfig(draftConfig)
    nextDatabase.updatedAt = new Date().toISOString()

    const fileContents = JSON.stringify(nextDatabase, null, 2)
    const blob = new Blob([fileContents], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')

    anchor.href = url
    anchor.download = 'site-admin-db.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  async function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const raw = await file.text()
    const result = importDatabase(raw)
    setFeedback(
      result.ok
        ? 'JSON importado com sucesso. A nova configuracao ja esta ativa.'
        : result.error ?? 'Nao foi possivel importar o JSON.',
    )
    event.target.value = ''
  }

  async function handleFaviconUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(file)
    })

    updateDraft((next) => {
      next.branding.faviconUrl = dataUrl
    })
    event.target.value = ''
  }

  function handleResetDatabase() {
    resetDatabase()
    setFeedback('Banco local restaurado para a base publica do projeto.')
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const success = signIn(loginValues.username.trim(), loginValues.password)

    if (!success) {
      setLoginError('Login invalido. Confira o usuario e a senha.')
      return
    }

    setLoginError('')
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="site-shell min-h-screen bg-background text-foreground">
        <main className="layout-shell flex min-h-screen items-center py-10">
          <section className="admin-card mx-auto w-full max-w-[480px] space-y-8">
            <div className="space-y-4">
              <p className="section-eyebrow">Painel</p>
              <h1 className="display-title text-[clamp(2.8rem,11vw,4.6rem)] text-foreground">
                Administracao basica
              </h1>
              <p className="admin-section-copy">
                Edite textos, cores, SEO, Pixel, contatos e snippets da landing
                da Hunt sem depender de backend.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <FieldStack label="Usuario">
                <Input
                  value={loginValues.username}
                  onChange={(event) =>
                    setLoginValues((current) => ({
                      ...current,
                      username: event.target.value,
                    }))
                  }
                  placeholder="admin"
                />
              </FieldStack>

              <FieldStack label="Senha">
                <Input
                  type="password"
                  value={loginValues.password}
                  onChange={(event) =>
                    setLoginValues((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                  placeholder="••••••••"
                />
              </FieldStack>

              {loginError ? (
                <p className="rounded-[8px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
                  {loginError}
                </p>
              ) : null}

              <div className="flex flex-col gap-3">
                <Button type="submit" size="lg" className="w-full">
                  <LockKeyhole className="size-5" />
                  Entrar no painel
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a href={SITE_HASH_ROUTE}>Voltar ao site</a>
                </Button>
              </div>
            </form>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="site-shell min-h-screen bg-background text-foreground">
      <input
        ref={importInputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={handleImport}
      />
      <input
        ref={faviconInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFaviconUpload}
      />

      <main className="layout-shell py-6 sm:py-8">
        <section className="admin-card space-y-6">
          <div className="space-y-4">
            <p className="section-eyebrow">Painel mobile-first</p>
            <h1 className="display-title text-[clamp(3rem,11vw,5rem)] text-foreground">
              Configuracao da landing
            </h1>
            <p className="admin-section-copy">
              O site roda em GitHub Pages, entao as alteracoes ficam salvas neste
              navegador e podem ser exportadas ou importadas em JSON.
            </p>
          </div>

          <div className="admin-inline-grid">
            <Button asChild variant="outline" size="lg" className="w-full">
              <a href={SITE_HASH_ROUTE}>Ver site publicado</a>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full"
              onClick={signOut}
            >
              <LogOut className="size-5" />
              Sair
            </Button>
          </div>

          <div className="rounded-[10px] border border-brand/22 bg-black/30 px-4 py-4 text-sm leading-relaxed text-foreground-muted">
            URL atual: <span className="text-foreground">{publishedUrl}</span>
          </div>
        </section>

        <div className="mt-6 space-y-6">
          <AdminSection
            icon={<Settings2 className="size-5" />}
            title="Persistencia local"
            description="Leve a configuracao para outro navegador ou restaure a base do projeto quando precisar."
          >
            <div className="admin-button-grid">
              <Button type="button" variant="outline" onClick={handleExport}>
                <Download className="size-5" />
                Exportar JSON
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => importInputRef.current?.click()}
              >
                <FileJson className="size-5" />
                Importar JSON
              </Button>
              <Button type="button" variant="outline" onClick={handleResetDatabase}>
                Restaurar base
              </Button>
              <Button type="button" variant="outline" onClick={() => setFeedback(exportDatabase())}>
                Ver JSON atual
              </Button>
            </div>
          </AdminSection>

          <AdminSection
            icon={<ShieldAlert className="size-5" />}
            title="Dominio e suporte"
            description="O dominio real continua sendo configurado fora deste painel."
          >
            <div className="rounded-[10px] border border-brand/25 bg-brand/10 px-4 py-4 text-sm leading-relaxed text-foreground">
              O campo de canonical abaixo muda o SEO do site, mas nao troca o dominio real do GitHub Pages.
            </div>
            <FieldStack
              label="Canonical / URL principal"
              hint="Use aqui a URL do Pages ou do dominio proprio quando ele existir."
            >
              <Input
                value={draftConfig.seo.canonicalUrl}
                onChange={(event) =>
                  updateDraft((next) => {
                    next.seo.canonicalUrl = event.target.value
                  })
                }
              />
            </FieldStack>
          </AdminSection>

          <AdminSection
            icon={<Globe className="size-5" />}
            title="Branding e SEO"
            description="Edite marca, favicon, metadados e Open Graph."
          >
            <div className="admin-form-grid">
              <FieldStack label="Titulo do site">
                <Input
                  value={draftConfig.branding.siteTitle}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.branding.siteTitle = event.target.value
                      next.seo.title = event.target.value
                    })
                  }
                />
              </FieldStack>

              <FieldStack label="Locale">
                <Input
                  value={draftConfig.branding.locale}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.branding.locale = event.target.value
                    })
                  }
                />
              </FieldStack>

              <FieldStack label="Nome da marca">
                <Input
                  value={draftConfig.branding.brandName}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.branding.brandName = event.target.value
                    })
                  }
                />
              </FieldStack>

              <FieldStack label="Subtitulo da marca">
                <Input
                  value={draftConfig.branding.brandSubtitle}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.branding.brandSubtitle = event.target.value
                    })
                  }
                />
              </FieldStack>
            </div>

            <div className="admin-form-grid">
              <FieldStack label="Logo (URL ou data URL)">
                <Input
                  value={draftConfig.branding.logoUrl}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.branding.logoUrl = event.target.value
                    })
                  }
                />
              </FieldStack>

              <FieldStack
                label="Favicon (URL ou data URL)"
                hint="Tambem e possivel subir um arquivo abaixo."
              >
                <Input
                  value={draftConfig.branding.faviconUrl}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.branding.faviconUrl = event.target.value
                    })
                  }
                />
              </FieldStack>
            </div>

            <div className="admin-inline-grid">
              <Button
                type="button"
                variant="outline"
                onClick={() => faviconInputRef.current?.click()}
              >
                <ImagePlus className="size-5" />
                Subir favicon
              </Button>
            </div>

            <div className="space-y-6">
              <FieldStack label="Meta title">
                <Input
                  value={draftConfig.seo.title}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.seo.title = event.target.value
                    })
                  }
                />
              </FieldStack>

              <FieldStack label="Meta description">
                <Textarea
                  className="min-h-32"
                  value={draftConfig.seo.description}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.seo.description = event.target.value
                    })
                  }
                />
              </FieldStack>

              <FieldStack label="Keywords">
                <Textarea
                  className="min-h-28"
                  value={draftConfig.seo.keywords}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.seo.keywords = event.target.value
                    })
                  }
                />
              </FieldStack>
            </div>

            <div className="admin-form-grid">
              <FieldStack label="Robots">
                <Input
                  value={draftConfig.seo.robots}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.seo.robots = event.target.value
                    })
                  }
                />
              </FieldStack>

              <FieldStack label="Twitter card">
                <Input
                  value={draftConfig.seo.twitterCard}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.seo.twitterCard = event.target.value
                    })
                  }
                />
              </FieldStack>
            </div>

            <FieldStack label="Open Graph title">
              <Input
                value={draftConfig.seo.ogTitle}
                onChange={(event) =>
                  updateDraft((next) => {
                    next.seo.ogTitle = event.target.value
                  })
                }
              />
            </FieldStack>

            <FieldStack label="Open Graph description">
              <Textarea
                className="min-h-28"
                value={draftConfig.seo.ogDescription}
                onChange={(event) =>
                  updateDraft((next) => {
                    next.seo.ogDescription = event.target.value
                  })
                }
              />
            </FieldStack>

            <FieldStack label="Open Graph image">
              <Input
                value={draftConfig.seo.ogImage}
                onChange={(event) =>
                  updateDraft((next) => {
                    next.seo.ogImage = event.target.value
                  })
                }
              />
            </FieldStack>
          </AdminSection>

          <AdminSection
            icon={<Settings2 className="size-5" />}
            title="Oferta, header e hero"
            description="Ajuste o discurso principal de conversao da landing."
          >
            <div className="admin-form-grid">
              <FieldStack label="Badge do header">
                <Input
                  value={draftConfig.header.badgeText}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.header.badgeText = event.target.value
                    })
                  }
                />
              </FieldStack>

              <FieldStack label="CTA do header">
                <Input
                  value={draftConfig.header.ctaLabel}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.header.ctaLabel = event.target.value
                    })
                  }
                />
              </FieldStack>
            </div>

            <div className="admin-form-grid">
              <FieldStack label="Eyebrow do hero">
                <Input
                  value={draftConfig.hero.eyebrow}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.hero.eyebrow = event.target.value
                    })
                  }
                />
              </FieldStack>

              <FieldStack label="Linha 1 do hero">
                <Input
                  value={draftConfig.hero.titleLineOne}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.hero.titleLineOne = event.target.value
                    })
                  }
                />
              </FieldStack>

              <FieldStack label="Linha 2 do hero">
                <Input
                  value={draftConfig.hero.titleLineTwo}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.hero.titleLineTwo = event.target.value
                    })
                  }
                />
              </FieldStack>

              <FieldStack label="Destaque do hero">
                <Input
                  value={draftConfig.hero.titleHighlight}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.hero.titleHighlight = event.target.value
                    })
                  }
                />
              </FieldStack>
            </div>

            <FieldStack label="Descricao do hero">
              <Textarea
                className="min-h-32"
                value={draftConfig.hero.description}
                onChange={(event) =>
                  updateDraft((next) => {
                    next.hero.description = event.target.value
                  })
                }
              />
            </FieldStack>

            <div className="admin-form-grid">
              <FieldStack label="CTA principal do hero">
                <Input
                  value={draftConfig.hero.primaryCtaLabel}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.hero.primaryCtaLabel = event.target.value
                    })
                  }
                />
              </FieldStack>
              <FieldStack label="CTA secundario do hero">
                <Input
                  value={draftConfig.hero.secondaryCtaLabel}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.hero.secondaryCtaLabel = event.target.value
                    })
                  }
                />
              </FieldStack>
            </div>

            <StringListEditor
              title="Provas rapidas do hero"
              items={draftConfig.hero.proofItems}
              labelPrefix="Item"
              onChange={(index, value) =>
                updateDraft((next) => {
                  next.hero.proofItems[index] = value
                })
              }
            />

            <div className="space-y-6">
              <h3 className="admin-subtitle">Oferta</h3>
              <div className="admin-form-grid">
                <FieldStack label="Badge da oferta">
                  <Input
                    value={draftConfig.offer.badge}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.offer.badge = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Rotulo do preco">
                  <Input
                    value={draftConfig.offer.priceLabel}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.offer.priceLabel = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Preco exibido">
                  <Input
                    value={draftConfig.offer.priceDisplay}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.offer.priceDisplay = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="CTA da oferta">
                  <Input
                    value={draftConfig.offer.ctaLabel}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.offer.ctaLabel = event.target.value
                      })
                    }
                  />
                </FieldStack>
              </div>
              <FieldStack label="Legenda do preco">
                <Textarea
                  className="min-h-24"
                  value={draftConfig.offer.priceCaption}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.offer.priceCaption = event.target.value
                    })
                  }
                />
              </FieldStack>
              <FieldStack label="Nota de apoio da oferta">
                <Textarea
                  className="min-h-24"
                  value={draftConfig.offer.note}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.offer.note = event.target.value
                    })
                  }
                />
              </FieldStack>
            </div>
          </AdminSection>

          <AdminSection
            icon={<Settings2 className="size-5" />}
            title="Beneficios, inclusos e fechamento"
            description="Controle as secoes de argumento comercial e o CTA final."
          >
            <div className="space-y-6">
              <h3 className="admin-subtitle">Secao de beneficios</h3>
              <div className="admin-form-grid">
                <FieldStack label="Eyebrow">
                  <Input
                    value={draftConfig.benefitsSection.eyebrow}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.benefitsSection.eyebrow = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Titulo">
                  <Input
                    value={draftConfig.benefitsSection.title}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.benefitsSection.title = event.target.value
                      })
                    }
                  />
                </FieldStack>
              </div>
              <FieldStack label="Descricao">
                <Textarea
                  className="min-h-28"
                  value={draftConfig.benefitsSection.description}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.benefitsSection.description = event.target.value
                    })
                  }
                />
              </FieldStack>
            </div>

            <FeatureEditor
              title="Cards de beneficios"
              items={draftConfig.benefits}
              onChange={(index, field, value) =>
                updateFeatureItem('benefits', index, field, value)
              }
            />

            <div className="space-y-6">
              <h3 className="admin-subtitle">Secao do que esta incluso</h3>
              <div className="admin-form-grid">
                <FieldStack label="Eyebrow">
                  <Input
                    value={draftConfig.includedSection.eyebrow}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.includedSection.eyebrow = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Titulo">
                  <Input
                    value={draftConfig.includedSection.title}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.includedSection.title = event.target.value
                      })
                    }
                  />
                </FieldStack>
              </div>
              <FieldStack label="Descricao">
                <Textarea
                  className="min-h-28"
                  value={draftConfig.includedSection.description}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.includedSection.description = event.target.value
                    })
                  }
                />
              </FieldStack>
            </div>

            <FeatureEditor
              title="Cards de inclusos"
              items={draftConfig.included}
              onChange={(index, field, value) =>
                updateFeatureItem('included', index, field, value)
              }
            />

            <div className="space-y-6">
              <h3 className="admin-subtitle">Fechamento</h3>
              <div className="admin-form-grid">
                <FieldStack label="Eyebrow final">
                  <Input
                    value={draftConfig.closing.eyebrow}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.closing.eyebrow = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="CTA final">
                  <Input
                    value={draftConfig.closing.ctaLabel}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.closing.ctaLabel = event.target.value
                      })
                    }
                  />
                </FieldStack>
              </div>
              <FieldStack label="Titulo final">
                <Textarea
                  className="min-h-24"
                  value={draftConfig.closing.title}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.closing.title = event.target.value
                    })
                  }
                />
              </FieldStack>
              <FieldStack label="Descricao final">
                <Textarea
                  className="min-h-24"
                  value={draftConfig.closing.description}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.closing.description = event.target.value
                    })
                  }
                />
              </FieldStack>
            </div>
          </AdminSection>

          <AdminSection
            icon={<Settings2 className="size-5" />}
            title="Processo, formulario e contato"
            description="Edite o passo a passo, as 4 perguntas, os contatos e o rastreamento."
          >
            <div className="space-y-6">
              <h3 className="admin-subtitle">Secao de processo</h3>
              <div className="admin-form-grid">
                <FieldStack label="Eyebrow">
                  <Input
                    value={draftConfig.processSection.eyebrow}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.processSection.eyebrow = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Titulo">
                  <Input
                    value={draftConfig.processSection.title}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.processSection.title = event.target.value
                      })
                    }
                  />
                </FieldStack>
              </div>
              <FieldStack label="Descricao">
                <Textarea
                  className="min-h-28"
                  value={draftConfig.processSection.description}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.processSection.description = event.target.value
                    })
                  }
                />
              </FieldStack>
            </div>

            <ProcessEditor
              items={draftConfig.process}
              onChange={updateProcessItem}
            />

            <div className="space-y-6">
              <h3 className="admin-subtitle">Secao do formulario</h3>
              <div className="admin-form-grid">
                <FieldStack label="Eyebrow">
                  <Input
                    value={draftConfig.formSection.eyebrow}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.formSection.eyebrow = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Texto do botao">
                  <Input
                    value={draftConfig.formSection.submitLabel}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.formSection.submitLabel = event.target.value
                      })
                    }
                  />
                </FieldStack>
              </div>
              <FieldStack label="Titulo">
                <Textarea
                  className="min-h-24"
                  value={draftConfig.formSection.title}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.formSection.title = event.target.value
                    })
                  }
                />
              </FieldStack>
              <FieldStack label="Descricao">
                <Textarea
                  className="min-h-24"
                  value={draftConfig.formSection.description}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.formSection.description = event.target.value
                    })
                  }
                />
              </FieldStack>
              <FieldStack label="Texto auxiliar">
                <Textarea
                  className="min-h-24"
                  value={draftConfig.formSection.helperText}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.formSection.helperText = event.target.value
                    })
                  }
                />
              </FieldStack>
            </div>

            <div className="space-y-6">
              <h3 className="admin-subtitle">Campos do formulario</h3>
              <div className="admin-form-grid">
                <FieldStack label="Label nome">
                  <Input
                    value={draftConfig.form.nameLabel}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.form.nameLabel = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Placeholder nome">
                  <Input
                    value={draftConfig.form.namePlaceholder}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.form.namePlaceholder = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Label WhatsApp">
                  <Input
                    value={draftConfig.form.phoneLabel}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.form.phoneLabel = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Placeholder WhatsApp">
                  <Input
                    value={draftConfig.form.phonePlaceholder}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.form.phonePlaceholder = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Label negocio">
                  <Input
                    value={draftConfig.form.businessLabel}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.form.businessLabel = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Placeholder negocio">
                  <Input
                    value={draftConfig.form.businessPlaceholder}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.form.businessPlaceholder = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Label objetivo">
                  <Input
                    value={draftConfig.form.goalLabel}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.form.goalLabel = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Placeholder objetivo">
                  <Input
                    value={draftConfig.form.goalPlaceholder}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.form.goalPlaceholder = event.target.value
                      })
                    }
                  />
                </FieldStack>
              </div>

              <StringListEditor
                title="Opcoes do select de objetivo"
                items={draftConfig.form.goalOptions}
                labelPrefix="Opcao"
                onChange={(index, value) =>
                  updateDraft((next) => {
                    next.form.goalOptions[index] = value
                  })
                }
              />

              <div className="admin-form-grid">
                <FieldStack label="Validacao nome">
                  <Input
                    value={draftConfig.form.validationNameRequired}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.form.validationNameRequired = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Validacao WhatsApp">
                  <Input
                    value={draftConfig.form.validationPhoneRequired}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.form.validationPhoneRequired = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Validacao negocio">
                  <Input
                    value={draftConfig.form.validationBusinessRequired}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.form.validationBusinessRequired = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Validacao objetivo">
                  <Input
                    value={draftConfig.form.validationGoalRequired}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.form.validationGoalRequired = event.target.value
                      })
                    }
                  />
                </FieldStack>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="admin-subtitle">Contato e rastreamento</h3>
              <div className="admin-form-grid">
                <FieldStack label="Numero do WhatsApp">
                  <Input
                    value={draftConfig.contact.whatsappNumber}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.contact.whatsappNumber = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Numero exibido">
                  <Input
                    value={draftConfig.contact.whatsappDisplay}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.contact.whatsappDisplay = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="E-mail">
                  <Input
                    value={draftConfig.contact.email}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.contact.email = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Instagram exibido">
                  <Input
                    value={draftConfig.contact.instagramDisplay}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.contact.instagramDisplay = event.target.value
                      })
                    }
                  />
                </FieldStack>
              </div>

              <FieldStack label="URL do Instagram">
                <Input
                  value={draftConfig.contact.instagramUrl}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.contact.instagramUrl = event.target.value
                    })
                  }
                />
              </FieldStack>

              <FieldStack label="Mensagem padrao do WhatsApp">
                <Textarea
                  className="min-h-24"
                  value={draftConfig.contact.defaultMessage}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.contact.defaultMessage = event.target.value
                    })
                  }
                />
              </FieldStack>

              <FieldStack
                label="Facebook Pixel ID"
                hint="Quando preenchido, o site injeta o Pixel e dispara PageView, Contact e Lead."
              >
                <Input
                  value={draftConfig.tracking.facebookPixelId}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.tracking.facebookPixelId = event.target.value
                    })
                  }
                  placeholder="123456789012345"
                />
              </FieldStack>

              <div className="admin-form-grid">
                <FieldStack label="Prefixo do WhatsApp">
                  <Input
                    value={draftConfig.footer.whatsappLabelPrefix}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.footer.whatsappLabelPrefix = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Label do e-mail">
                  <Input
                    value={draftConfig.footer.emailLabel}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.footer.emailLabel = event.target.value
                      })
                    }
                  />
                </FieldStack>
                <FieldStack label="Label do Instagram">
                  <Input
                    value={draftConfig.footer.instagramLabel}
                    onChange={(event) =>
                      updateDraft((next) => {
                        next.footer.instagramLabel = event.target.value
                      })
                    }
                  />
                </FieldStack>
              </div>

              <FieldStack label="Texto de apoio do footer">
                <Textarea
                  className="min-h-24"
                  value={draftConfig.footer.supportText}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.footer.supportText = event.target.value
                    })
                  }
                />
              </FieldStack>

              <FieldStack label="Texto legal do footer">
                <Textarea
                  className="min-h-24"
                  value={draftConfig.footer.legalText}
                  onChange={(event) =>
                    updateDraft((next) => {
                      next.footer.legalText = event.target.value
                    })
                  }
                />
              </FieldStack>
            </div>
          </AdminSection>

          <AdminSection
            icon={<Palette className="size-5" />}
            title="Cores do site"
            description="Essas variaveis controlam a identidade visual da landing e do botao de WhatsApp."
          >
            <div className="admin-form-grid">
              <ColorField
                label="Background"
                value={draftConfig.colors.background}
                onChange={(value) =>
                  updateDraft((next) => {
                    next.colors.background = value
                    next.seo.themeColor = value
                  })
                }
              />
              <ColorField
                label="Surface"
                value={draftConfig.colors.surface}
                onChange={(value) =>
                  updateDraft((next) => {
                    next.colors.surface = value
                  })
                }
              />
              <ColorField
                label="Surface strong"
                value={draftConfig.colors.surfaceStrong}
                onChange={(value) =>
                  updateDraft((next) => {
                    next.colors.surfaceStrong = value
                  })
                }
              />
              <ColorField
                label="Foreground"
                value={draftConfig.colors.foreground}
                onChange={(value) =>
                  updateDraft((next) => {
                    next.colors.foreground = value
                  })
                }
              />
              <ColorField
                label="Foreground muted"
                value={draftConfig.colors.foregroundMuted}
                onChange={(value) =>
                  updateDraft((next) => {
                    next.colors.foregroundMuted = value
                  })
                }
              />
              <ColorField
                label="Brand"
                value={draftConfig.colors.brand}
                onChange={(value) =>
                  updateDraft((next) => {
                    next.colors.brand = value
                  })
                }
              />
              <ColorField
                label="Brand strong"
                value={draftConfig.colors.brandStrong}
                onChange={(value) =>
                  updateDraft((next) => {
                    next.colors.brandStrong = value
                  })
                }
              />
              <ColorField
                label="Brand foreground"
                value={draftConfig.colors.brandForeground}
                onChange={(value) =>
                  updateDraft((next) => {
                    next.colors.brandForeground = value
                  })
                }
              />
              <ColorField
                label="Border"
                value={draftConfig.colors.border}
                onChange={(value) =>
                  updateDraft((next) => {
                    next.colors.border = value
                  })
                }
              />
              <ColorField
                label="Ring"
                value={draftConfig.colors.ring}
                onChange={(value) =>
                  updateDraft((next) => {
                    next.colors.ring = value
                  })
                }
              />
              <ColorField
                label="WhatsApp"
                value={draftConfig.colors.whatsapp}
                onChange={(value) =>
                  updateDraft((next) => {
                    next.colors.whatsapp = value
                  })
                }
              />
              <ColorField
                label="WhatsApp foreground"
                value={draftConfig.colors.whatsappForeground}
                onChange={(value) =>
                  updateDraft((next) => {
                    next.colors.whatsappForeground = value
                  })
                }
              />
            </div>
          </AdminSection>

          <AdminSection
            icon={<FileJson className="size-5" />}
            title="Snippets extras"
            description="Use para GTM, pixels adicionais, analytics ou widgets."
          >
            <FieldStack
              label="Head snippet"
              hint="Scripts e metas extras que precisam entrar no head."
            >
              <Textarea
                className="min-h-40 font-mono text-sm tracking-normal"
                value={draftConfig.snippets.head}
                onChange={(event) =>
                  updateDraft((next) => {
                    next.snippets.head = event.target.value
                  })
                }
                placeholder="<script>...</script>"
              />
            </FieldStack>
            <FieldStack
              label="Body snippet"
              hint="Noscript, widgets ou integracoes que precisam entrar no body."
            >
              <Textarea
                className="min-h-40 font-mono text-sm tracking-normal"
                value={draftConfig.snippets.body}
                onChange={(event) =>
                  updateDraft((next) => {
                    next.snippets.body = event.target.value
                  })
                }
                placeholder="<noscript>...</noscript>"
              />
            </FieldStack>
          </AdminSection>

          <div className="sticky bottom-4 z-20">
            <div className="admin-card border-brand/35 bg-background/92 backdrop-blur-md">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">
                  {isDirty
                    ? 'Mudancas nao salvas'
                    : 'Tudo salvo no navegador atual'}
                </p>
                <p className="admin-field-hint">
                  {feedback ||
                    'Salve para aplicar ao site. Exporte o JSON para levar a configuracao para outro ambiente.'}
                </p>
              </div>

              <div className="mt-5 admin-button-grid">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDiscard}
                  disabled={!isDirty}
                >
                  Descartar rascunho
                </Button>
                <Button type="button" onClick={handleSave}>
                  <Save className="size-5" />
                  Salvar alteracoes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminPage
