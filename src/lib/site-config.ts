export const SITE_DATABASE_URL = 'site-admin-db.json'

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
      siteTitle: 'Landing Page Personalizada Pra Converter | Hunt Digital',
      brandName: 'Hunt Digital',
      brandSubtitle: 'Páginas que vendem',
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
        'Olá! Vim pela landing da Hunt Digital e quero saber mais sobre a página de R$ 249,99.',
    },
    offer: {
      badge: 'Valor único, sem recorrência.',
      priceLabel: 'Página profissional',
      priceDisplay: 'R$ 249,99',
      priceCaption: 'Layout sob medida, mobile-first e pronto para conversão.',
      note: 'Ideal para campanhas, negócios locais e ofertas que precisam entrar no ar rápido.',
      ctaLabel: 'Falar com a Hunt agora',
    },
    colors: { ...DEFAULT_THEME_COLORS },
    seo: {
      title: 'Landing Page Personalizada Pra Converter | Hunt Digital',
      description:
        'Landing page personalizada por R$ 249,99 para apresentar sua oferta, valorizar sua marca e abrir conversa no WhatsApp com mais percepção de valor.',
      keywords:
        'landing page, página única, página de vendas, site profissional, hunt digital, landing page para tráfego, landing page responsiva',
      canonicalUrl: 'https://landingpage.huntdigital.com.br/',
      robots: 'index,follow',
      ogTitle: 'Landing Page Personalizada Pra Converter | Hunt Digital',
      ogDescription:
        'Landing page personalizada por R$ 249,99 para apresentar sua oferta, valorizar sua marca e abrir conversa no WhatsApp com mais percepção de valor.',
      ogImage: './brand/hunt-og.jpeg',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      themeColor: '#050505',
    },
    tracking: {
      facebookPixelId: '1563231485070792',
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
      eyebrow: 'Página forte e feita para puxar clique',
      titleLineOne: 'LANDING PAGE',
      titleLineTwo: 'PERSONALIZADA PRA',
      titleHighlight: 'CONVERTER.',
      description:
        'Site profissional de página única por apenas R$ 249,99 para apresentar sua oferta, valorizar sua marca e abrir conversa com uma percepção de valor muito maior.',
      proofItems: [
        'Design mobile-first',
        'Copy direta para venda',
        'Estrutura pronta para tráfego',
      ],
      primaryCtaLabel: 'Quero minha página',
      secondaryCtaLabel: 'Ver o que está incluso',
    },
    benefitsSection: {
      eyebrow: 'Por que funciona',
      title: 'Menos enrolação. Mais clique qualificado.',
      description:
        'A página entra no ponto certo: explica a oferta e empurra a pessoa para o WhatsApp só fechar.',
    },
    benefits: [
      {
        icon: 'layout',
        title: 'Layout 100% personalizado',
        description:
          'Página única com copy adaptada ao negócio, CTA forte e sua identidade visual.',
      },
      {
        icon: 'bolt',
        title: 'Prazo',
        description: 'Em até 48h após o envio do briefing.',
      },
    ],
    includedSection: {
      eyebrow: 'O que está incluso',
      title: 'Tudo o que precisa para sair do zero.',
      description:
        'Sem empilhar seções desnecessárias. A página é criada e guiada por nossos especialistas em marketing para ser intuitiva ao cliente e converter rápido.',
    },
    included: [
      {
        icon: 'mobile',
        title: 'Responsiva de verdade',
        description:
          'Layout ajustado para celular, tablet e desktop sem quebrar a leitura.',
      },
      {
        icon: 'refresh',
        title: 'Revisões inclusas',
        description:
          'Ajustes conforme regulamento para refinar a página antes da publicação.',
      },
    ],
    processSection: {
      eyebrow: 'Como funciona',
      title:
        'Menos tempo qualificando e mais fechamento: quem chega até você já conhece os seus serviços.',
      description:
        'O formulário pega só o essencial para você não receber lead em branco e responder mais rápido.',
    },
    process: [
      {
        number: '01',
        title: 'Você responde a um questionário:',
        description:
          'Entendemos sua empresa, suas características e o que você quer na página, para personalizar tudo.',
      },
      {
        number: '02',
        title: 'Estruturação interna:',
        description:
          'Nosso time de especialistas em marketing junto com os desenvolvedores criam toda a estrutura da sua página.',
      },
      {
        number: '03',
        title: 'Aprovação e entrega:',
        description:
          'Você aprova ou nos passa as revisões, e te enviamos o link da página 100% personalizada assim como suas preferências.',
      },
    ],
    formSection: {
      eyebrow: 'Comece agora',
      title: 'Preencha aqui e vamos alinhar tudo no WhatsApp.',
      description:
        'Leva menos de um minuto para abrir a conversa com a Hunt Digital do jeito certo.',
      helperText:
        'Ao enviar, o WhatsApp abre com sua mensagem pronta para a Hunt Digital.',
      submitLabel: 'Enviar para o WhatsApp',
    },
    form: {
      nameLabel: 'Nome',
      namePlaceholder: 'Como você se chama?',
      phoneLabel: 'WhatsApp',
      phonePlaceholder: '(00) 00000-0000',
      businessLabel: 'Qual é o seu negócio?',
      businessPlaceholder: 'Ex: clínica, barbearia, imobiliária',
      goalLabel: 'O que sua página precisa gerar?',
      goalPlaceholder: 'Selecione um objetivo',
      goalOptions: [
        'Vender serviço',
        'Captar leads',
        'Receber orçamentos',
        'Apresentar empresa',
        'Outro',
      ],
      validationNameRequired: 'Preencha seu nome.',
      validationPhoneRequired: 'Informe um WhatsApp para contato.',
      validationBusinessRequired: 'Conte qual é o seu negócio.',
      validationGoalRequired: 'Escolha o objetivo principal da página.',
    },
    closing: {
      eyebrow: 'Pronto para anunciar?',
      title: 'Coloque sua oferta no ar com uma página que puxa resposta.',
      description:
        'Se a campanha vai rodar, a página precisa acompanhar. Fale com a Hunt e tire essa entrega do papel.',
      ctaLabel: 'Abrir WhatsApp agora',
    },
    footer: {
      legalText:
        'Hunt Digital Consultoria · Páginas que vendem com foco em conversão · © 2026',
      supportText:
        'Landing page personalizada para você, oferta direta e atendimento rápido pelo WhatsApp.',
      whatsappLabelPrefix: 'WhatsApp',
      emailLabel: 'E-mail',
      instagramLabel: 'Instagram',
    },
  }
}

export function createFallbackSiteDatabase(): SiteDatabase {
  return {
    version: 1,
    updatedAt: '2026-07-26T00:00:00.000Z',
    currentConfig: createFallbackSiteConfig(),
  }
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
