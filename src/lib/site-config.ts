export const ADMIN_HASH_ROUTE = '#/admin'
export const SITE_HASH_ROUTE = '#/'
export const SITE_DATABASE_URL = 'site-admin-db.json'
export const SITE_DATABASE_STORAGE_KEY = 'hunt-digital.site-database.v1'
export const ADMIN_SESSION_STORAGE_KEY = 'hunt-digital.admin-session.v1'

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'hunt2026!',
} as const

export type QuoteFormValues = {
  name: string
  goal: string
}

export type ThemeColors = {
  background: string
  surface: string
  surfaceStrong: string
  foreground: string
  foregroundMuted: string
  brand: string
  brandStrong: string
  brandForeground: string
  border: string
  ring: string
  whatsapp: string
  whatsappForeground: string
}

export type FeatureItem = {
  icon: string
  title: string
  description: string
}

export type ProcessStep = {
  number: string
  title: string
  description: string
}

export type SiteConfig = {
  branding: {
    locale: string
    siteTitle: string
    brandName: string
    brandSubtitle: string
    logoUrl: string
    faviconUrl: string
  }
  contact: {
    whatsappNumber: string
    whatsappDisplay: string
    email: string
    instagramUrl: string
    instagramDisplay: string
    defaultMessage: string
  }
  offer: {
    badge: string
    priceLabel: string
    priceDisplay: string
    priceCaption: string
    note: string
    ctaLabel: string
  }
  colors: ThemeColors
  seo: {
    title: string
    description: string
    keywords: string
    canonicalUrl: string
    robots: string
    ogTitle: string
    ogDescription: string
    ogImage: string
    ogType: string
    twitterCard: string
    themeColor: string
  }
  tracking: {
    facebookPixelId: string
  }
  snippets: {
    head: string
    body: string
  }
  header: {
    badgeText: string
    ctaLabel: string
  }
  hero: {
    eyebrow: string
    titleLineOne: string
    titleLineTwo: string
    titleHighlight: string
    description: string
    proofItems: string[]
    primaryCtaLabel: string
    secondaryCtaLabel: string
  }
  benefitsSection: {
    eyebrow: string
    title: string
    description: string
  }
  benefits: FeatureItem[]
  includedSection: {
    eyebrow: string
    title: string
    description: string
  }
  included: FeatureItem[]
  processSection: {
    eyebrow: string
    title: string
    description: string
  }
  process: ProcessStep[]
  formSection: {
    eyebrow: string
    title: string
    description: string
    helperText: string
    submitLabel: string
  }
  form: {
    nameLabel: string
    namePlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    businessLabel: string
    businessPlaceholder: string
    goalLabel: string
    goalPlaceholder: string
    goalOptions: string[]
    validationNameRequired: string
    validationPhoneRequired: string
    validationBusinessRequired: string
    validationGoalRequired: string
  }
  closing: {
    eyebrow: string
    title: string
    description: string
    ctaLabel: string
  }
  footer: {
    legalText: string
    supportText: string
    whatsappLabelPrefix: string
    emailLabel: string
    instagramLabel: string
  }
}

export type SiteDatabase = {
  version: 1
  updatedAt: string
  currentConfig: SiteConfig
}

export const DEFAULT_THEME_COLORS: ThemeColors = {
  background: '#050505',
  surface: '#101010',
  surfaceStrong: '#171717',
  foreground: '#fbfbfb',
  foregroundMuted: '#c7c7c7',
  brand: '#ec3938',
  brandStrong: '#ff5b59',
  brandForeground: '#fff7f7',
  border: 'rgba(236, 57, 56, 0.28)',
  ring: 'rgba(236, 57, 56, 0.52)',
  whatsapp: '#25d366',
  whatsappForeground: '#f7fff9',
}

export function createFallbackSiteConfig(): SiteConfig {
  return {
    branding: {
      locale: 'pt-BR',
      siteTitle: 'Landing page para vender mais | Hunt Digital',
      brandName: 'Hunt Digital',
      brandSubtitle: 'Paginas que vendem',
      logoUrl: './brand/hunt-icon.svg',
      faviconUrl: './brand/hunt-icon.svg',
    },
    contact: {
      whatsappNumber: '5531999617435',
      whatsappDisplay: '+55 31 9961-7435',
      email: 'contato@huntdigital.com.br',
      instagramUrl: 'https://www.instagram.com/huntdigitalconsultoria/',
      instagramDisplay: '@huntdigitalconsultoria',
      defaultMessage:
        'Ola! Vim pela landing da Hunt Digital e quero saber mais sobre a pagina de R$ 249,99.',
    },
    offer: {
      badge: 'Oferta de entrada',
      priceLabel: 'Pagina unica profissional',
      priceDisplay: 'R$ 249,99',
      priceCaption: 'Layout sob medida, mobile-first e pronto para conversao.',
      note: 'Ideal para campanhas, negocios locais e ofertas que precisam entrar no ar rapido.',
      ctaLabel: 'Falar com a Hunt agora',
    },
    colors: { ...DEFAULT_THEME_COLORS },
    seo: {
      title: 'Landing page para vender mais | Hunt Digital',
      description:
        'Landing page personalizada por R$ 249,99 com visual profissional, CTA para WhatsApp, SEO base e estrutura pronta para trafego.',
      keywords:
        'landing page, pagina unica, pagina de vendas, site profissional, hunt digital, landing page para trafego, landing page responsiva',
      canonicalUrl:
        'https://guilherme-cesar-oliveira.github.io/pagina-que-vende-pagina/',
      robots: 'index,follow',
      ogTitle: 'Landing page que vende | Hunt Digital',
      ogDescription:
        'Pagina unica profissional por R$ 249,99 com foco em conversao, WhatsApp e estrutura pronta para campanhas.',
      ogImage: './brand/hunt-og.jpeg',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      themeColor: '#050505',
    },
    tracking: {
      facebookPixelId: '',
    },
    snippets: {
      head: '',
      body: '',
    },
    header: {
      badgeText: 'Hunt Digital apresenta',
      ctaLabel: 'Chamar no WhatsApp',
    },
    hero: {
      eyebrow: 'Pagina curta, forte e feita para puxar clique',
      titleLineOne: 'LANDING PAGE',
      titleLineTwo: 'PRONTA PRA',
      titleHighlight: 'CONVERTER.',
      description:
        'Site profissional de pagina unica por apenas R$ 249,99 para apresentar sua oferta, valorizar sua marca e abrir conversa com quem chegou da campanha.',
      proofItems: [
        'Design mobile-first',
        'Copy direta para venda',
        'Estrutura pronta para trafego',
      ],
      primaryCtaLabel: 'Quero vender mais',
      secondaryCtaLabel: 'Ver o que esta incluso',
    },
    benefitsSection: {
      eyebrow: 'Por que funciona',
      title: 'Menos enrolacao. Mais clique qualificado.',
      description:
        'A pagina entra no ponto rapido: explica a oferta, reduz friccao e empurra a pessoa para o WhatsApp.',
    },
    benefits: [
      {
        icon: 'rocket',
        title: 'Visual que chama',
        description:
          'Layout de impacto com leitura limpa e identidade alinhada para campanha.',
      },
      {
        icon: 'target',
        title: 'CTA no lugar certo',
        description:
          'Botoes e blocos organizados para facilitar o proximo passo do visitante.',
      },
      {
        icon: 'bolt',
        title: 'Leve para anunciar',
        description:
          'Estrutura enxuta, responsiva e pensada para carregar rapido no mobile.',
      },
      {
        icon: 'mobile',
        title: 'Feita para celular',
        description:
          'A maior parte do trafego cai no smartphone, entao o foco comeca nele.',
      },
    ],
    includedSection: {
      eyebrow: 'O que esta incluso',
      title: 'Tudo o que precisa para sair do zero.',
      description:
        'Sem empilhar secoes desnecessarias. O pacote foi montado para publicar rapido e converter melhor.',
    },
    included: [
      {
        icon: 'layout',
        title: 'Landing personalizada',
        description:
          'Pagina unica com copy adaptada ao negocio, CTA forte e identidade visual coerente.',
      },
      {
        icon: 'spark',
        title: 'Responsiva de verdade',
        description:
          'Layout ajustado para celular, tablet e desktop sem quebrar a leitura.',
      },
      {
        icon: 'search',
        title: 'SEO base + Pixel',
        description:
          'Meta tags, Open Graph, dados estruturados e suporte nativo a Facebook Pixel.',
      },
      {
        icon: 'refresh',
        title: 'Ate 2 revisoes',
        description:
          'Ajustes dentro do combinado para refinar a pagina antes da publicacao.',
      },
    ],
    processSection: {
      eyebrow: 'Como funciona',
      title: 'Pouca digitacao. Mais contexto para o atendimento.',
      description:
        'O formulario pega so o essencial para a Hunt nao receber lead em branco e responder mais rapido.',
    },
    process: [
      {
        number: '01',
        title: 'Voce responde o basico',
        description:
          'Nome e o objetivo principal da pagina. O minimo para a Hunt responder com contexto.',
      },
      {
        number: '02',
        title: 'A conversa abre pronta',
        description:
          'O WhatsApp ja sai com mensagem organizada e, quando existir, leva as UTMs da campanha.',
      },
      {
        number: '03',
        title: 'A Hunt conduz o proximo passo',
        description:
          'Briefing, alinhamento e execucao andam sem ida e volta desnecessaria.',
      },
    ],
    formSection: {
      eyebrow: 'Comece agora',
      title: 'Me passa o essencial e vamos falar.',
      description:
        'Leva menos de um minuto para abrir a conversa com a Hunt Digital do jeito certo.',
      helperText:
        'Ao enviar, o WhatsApp abre com sua mensagem pronta para a Hunt Digital.',
      submitLabel: 'Enviar para o WhatsApp',
    },
    form: {
      nameLabel: 'Nome',
      namePlaceholder: 'Como voce se chama?',
      phoneLabel: 'WhatsApp',
      phonePlaceholder: '(00) 00000-0000',
      businessLabel: 'Qual e o seu negocio?',
      businessPlaceholder: 'Ex: clinica, barbearia, imobiliaria',
      goalLabel: 'O que sua pagina precisa gerar?',
      goalPlaceholder: 'Selecione um objetivo',
      goalOptions: [
        'Vender servico',
        'Captar leads',
        'Receber orcamentos',
        'Apresentar empresa',
        'Outro',
      ],
      validationNameRequired: 'Preencha seu nome.',
      validationPhoneRequired: 'Informe um WhatsApp para contato.',
      validationBusinessRequired: 'Conte qual e o seu negocio.',
      validationGoalRequired: 'Escolha o objetivo principal da pagina.',
    },
    closing: {
      eyebrow: 'Pronto para anunciar?',
      title: 'Coloque sua oferta no ar com uma pagina que puxa resposta.',
      description:
        'Se a campanha vai rodar, a pagina precisa acompanhar. Fale com a Hunt e tire essa entrega do papel.',
      ctaLabel: 'Abrir WhatsApp agora',
    },
    footer: {
      legalText:
        'Hunt Digital Consultoria · Paginas que vendem com foco em conversao · © 2026',
      supportText:
        'Landing page enxuta para campanha, oferta direta e atendimento rapido pelo WhatsApp.',
      whatsappLabelPrefix: 'WhatsApp',
      emailLabel: 'E-mail',
      instagramLabel: 'Instagram',
    },
  }
}

export function createFallbackSiteDatabase(): SiteDatabase {
  return {
    version: 1,
    updatedAt: '2026-07-25T00:00:00.000Z',
    currentConfig: createFallbackSiteConfig(),
  }
}

export function cloneSiteConfig(config: SiteConfig): SiteConfig {
  return structuredClone(config)
}

export function cloneSiteDatabase(database: SiteDatabase): SiteDatabase {
  return structuredClone(database)
}

export function sanitizeWhatsAppNumber(value: string) {
  return value.replace(/\D/g, '')
}

const UTM_LABELS = {
  utm_source: 'UTM source',
  utm_medium: 'UTM medium',
  utm_campaign: 'UTM campaign',
  utm_content: 'UTM content',
  utm_term: 'UTM term',
} as const

type UtmKey = keyof typeof UTM_LABELS

function collectUtmEntries(search: string) {
  const params = new URLSearchParams(search)
  const keys = Object.keys(UTM_LABELS) as UtmKey[]

  return keys.flatMap((key) => {
    const value = params.get(key)
    return value ? ([[key, value]] as const) : []
  })
}

export function buildQuoteWhatsAppMessage(
  values: QuoteFormValues,
  config: SiteConfig,
  search = '',
) {
  const lines = [
    config.contact.defaultMessage,
    '',
    `${config.form.nameLabel}: ${values.name.trim()}`,
    `${config.form.goalLabel}: ${values.goal.trim()}`,
  ]

  const utmEntries = collectUtmEntries(search)

  if (utmEntries.length > 0) {
    lines.push('', 'Dados da campanha:')
    utmEntries.forEach(([key, value]) => {
      lines.push(`${UTM_LABELS[key]}: ${value}`)
    })
  }

  return lines.join('\n')
}

export function buildGenericWhatsAppMessage(config: SiteConfig, search = '') {
  const lines = [config.contact.defaultMessage]
  const utmEntries = collectUtmEntries(search)

  if (utmEntries.length > 0) {
    lines.push('', 'Dados da campanha:')
    utmEntries.forEach(([key, value]) => {
      lines.push(`${UTM_LABELS[key]}: ${value}`)
    })
  }

  return lines.join('\n')
}

export function buildWhatsAppUrl(number: string, message: string) {
  const cleanNumber = sanitizeWhatsAppNumber(number)
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
}

export function buildQuoteWhatsAppUrl(
  values: QuoteFormValues,
  config: SiteConfig,
  search = '',
) {
  return buildWhatsAppUrl(
    config.contact.whatsappNumber,
    buildQuoteWhatsAppMessage(values, config, search),
  )
}

export function buildGenericWhatsAppUrl(config: SiteConfig, search = '') {
  return buildWhatsAppUrl(
    config.contact.whatsappNumber,
    buildGenericWhatsAppMessage(config, search),
  )
}

export function resolvePublicAssetUrl(value: string) {
  if (!value.trim()) {
    return ''
  }

  try {
    return new URL(value, window.location.href).toString()
  } catch {
    return value
  }
}

function parseOfferPrice(priceDisplay: string) {
  const normalized = priceDisplay
    .replace(/[^\d,.-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.')
  const parsed = Number.parseFloat(normalized)

  if (Number.isNaN(parsed)) {
    return '249.99'
  }

  return parsed.toFixed(2)
}

export function buildStructuredData(config: SiteConfig) {
  const canonicalUrl = config.seo.canonicalUrl || window.location.href.split('#')[0]
  const logoUrl = resolvePublicAssetUrl(config.branding.logoUrl)
  const imageUrl = resolvePublicAssetUrl(config.seo.ogImage)

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: config.branding.brandName,
      url: canonicalUrl,
      logo: logoUrl,
      email: config.contact.email,
      telephone: config.contact.whatsappDisplay,
      sameAs: [config.contact.instagramUrl],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: config.contact.email,
          telephone: config.contact.whatsappDisplay,
          areaServed: 'BR',
          availableLanguage: ['pt-BR'],
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: config.branding.siteTitle,
      serviceType: 'Landing page personalizada',
      description: config.seo.description,
      provider: {
        '@type': 'Organization',
        name: config.branding.brandName,
      },
      areaServed: {
        '@type': 'Country',
        name: 'Brasil',
      },
      image: imageUrl,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'BRL',
        price: parseOfferPrice(config.offer.priceDisplay),
        availability: 'https://schema.org/InStock',
        url: canonicalUrl,
      },
    },
  ]
}
