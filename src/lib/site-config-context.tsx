import {
  createContext,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  SITE_DATABASE_URL,
  buildGenericWhatsAppUrl,
  buildStructuredData,
  createFallbackSiteDatabase,
  resolvePublicAssetUrl,
  type SiteConfig,
  type SiteDatabase,
} from '@/lib/site-config'

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      queue?: unknown[][]
      loaded?: boolean
      version?: string
    }
    _fbq?: Window['fbq']
  }
}

type SiteConfigContextValue = {
  currentConfig: SiteConfig
  isReady: boolean
  genericWhatsAppUrl: string
  trackPixelEvent: (eventName: string, payload?: Record<string, unknown>) => void
}

const SiteConfigContext = createContext<SiteConfigContextValue | null>(null)
const BUILD_ID = '2026-07-27-refresh-1'

async function loadSourceDatabase() {
  try {
    const url = new URL(SITE_DATABASE_URL, window.location.href).toString()
    const response = await fetch(url, { cache: 'no-store' })

    if (!response.ok) {
      throw new Error(`Failed to load site database: ${response.status}`)
    }

    return (await response.json()) as SiteDatabase
  } catch {
    return createFallbackSiteDatabase()
  }
}

function ensureMeta(name: string, content: string, attr: 'name' | 'property') {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${name}"]`,
  )

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

function ensureLink(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }

  tag.setAttribute('href', href)
}

function ensureJsonScript(scriptId: string, contents: unknown) {
  let script = document.head.querySelector<HTMLScriptElement>(
    `script[data-site-json="${scriptId}"]`,
  )

  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.siteJson = scriptId
    document.head.appendChild(script)
  }

  script.textContent = JSON.stringify(contents)
}

function applyThemeColors(config: SiteConfig) {
  const root = document.documentElement
  root.style.setProperty('--background', config.colors.background)
  root.style.setProperty('--surface', config.colors.surface)
  root.style.setProperty('--surface-strong', config.colors.surfaceStrong)
  root.style.setProperty('--foreground', config.colors.foreground)
  root.style.setProperty('--foreground-muted', config.colors.foregroundMuted)
  root.style.setProperty('--brand', config.colors.brand)
  root.style.setProperty('--brand-strong', config.colors.brandStrong)
  root.style.setProperty('--brand-foreground', config.colors.brandForeground)
  root.style.setProperty('--border', config.colors.border)
  root.style.setProperty('--ring', config.colors.ring)
  root.style.setProperty('--whatsapp', config.colors.whatsapp)
  root.style.setProperty(
    '--whatsapp-foreground',
    config.colors.whatsappForeground,
  )
}

function applySeo(config: SiteConfig) {
  document.title = config.seo.title || config.branding.siteTitle
  document.documentElement.lang = config.branding.locale

  ensureMeta('description', config.seo.description, 'name')
  ensureMeta('keywords', config.seo.keywords, 'name')
  ensureMeta('robots', config.seo.robots, 'name')
  ensureMeta('theme-color', config.seo.themeColor, 'name')
  ensureMeta('og:title', config.seo.ogTitle, 'property')
  ensureMeta('og:description', config.seo.ogDescription, 'property')
  ensureMeta('og:type', config.seo.ogType, 'property')
  ensureMeta(
    'og:url',
    config.seo.canonicalUrl || window.location.href.split('#')[0],
    'property',
  )
  ensureMeta('og:image', resolvePublicAssetUrl(config.seo.ogImage), 'property')
  ensureMeta('twitter:card', config.seo.twitterCard, 'name')
  ensureMeta('twitter:title', config.seo.ogTitle, 'name')
  ensureMeta('twitter:description', config.seo.ogDescription, 'name')
  ensureMeta(
    'twitter:image',
    resolvePublicAssetUrl(config.seo.ogImage),
    'name',
  )

  ensureLink('canonical', config.seo.canonicalUrl || window.location.href)
  ensureLink('icon', resolvePublicAssetUrl(config.branding.faviconUrl))
}

function recreateNode(node: ChildNode, scope: string): ChildNode {
  if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.COMMENT_NODE) {
    return node.cloneNode(true) as ChildNode
  }

  const element = node as HTMLElement

  if (element.tagName === 'SCRIPT') {
    const script = document.createElement('script')

    Array.from(element.attributes).forEach((attribute) => {
      script.setAttribute(attribute.name, attribute.value)
    })

    script.text = element.textContent ?? ''
    script.setAttribute('data-site-snippet', scope)
    return script
  }

  const clone = element.cloneNode(false) as HTMLElement
  clone.setAttribute('data-site-snippet', scope)

  Array.from(element.childNodes).forEach((child) => {
    clone.appendChild(recreateNode(child, scope))
  })

  return clone
}

function mountSnippet(target: HTMLElement, html: string, scope: string) {
  if (!html.trim()) {
    return () => undefined
  }

  const template = document.createElement('template')
  template.innerHTML = html

  const nodes = Array.from(template.content.childNodes).map((node) =>
    recreateNode(node, scope),
  )

  nodes.forEach((node) => {
    target.appendChild(node)
  })

  return () => {
    nodes.forEach((node) => {
      node.parentNode?.removeChild(node)
    })
  }
}

function ensureFacebookPixelBase() {
  if (window.fbq) {
    return window.fbq
  }

  const fbq = ((...args: unknown[]) => {
    if (!fbq.queue) {
      fbq.queue = []
    }

    fbq.queue.push(args)
  }) as NonNullable<Window['fbq']>

  fbq.queue = []
  fbq.loaded = true
  fbq.version = '2.0'
  window.fbq = fbq
  window._fbq = fbq

  return fbq
}

function mountFacebookPixel(pixelId: string) {
  if (!pixelId.trim()) {
    return () => undefined
  }

  const fbq = ensureFacebookPixelBase()
  const loaderId = 'facebook-pixel-loader'

  if (!document.getElementById(loaderId)) {
    const script = document.createElement('script')
    script.id = loaderId
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)
  }

  fbq('init', pixelId)
  fbq('track', 'ViewContent')

  return () => undefined
}

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [database, setDatabase] = useState<SiteDatabase>(
    createFallbackSiteDatabase(),
  )
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let active = true

    async function bootstrap() {
      const source = await loadSourceDatabase()

      if (!active) {
        return
      }

      setDatabase(source)
      setIsReady(true)
    }

    bootstrap()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.buildId = BUILD_ID
    applyThemeColors(database.currentConfig)
    applySeo(database.currentConfig)
    ensureJsonScript('structured-data', buildStructuredData(database.currentConfig))

    const cleanupHead = mountSnippet(
      document.head,
      database.currentConfig.snippets.head,
      'head',
    )
    const cleanupBody = mountSnippet(
      document.body,
      database.currentConfig.snippets.body,
      'body',
    )

    return () => {
      cleanupHead()
      cleanupBody()
    }
  }, [database])

  useEffect(() => {
    return mountFacebookPixel(database.currentConfig.tracking.facebookPixelId)
  }, [database.currentConfig.tracking.facebookPixelId])

  const contextValue = useMemo<SiteConfigContextValue>(() => {
    return {
      currentConfig: database.currentConfig,
      isReady,
      genericWhatsAppUrl: buildGenericWhatsAppUrl(
        database.currentConfig,
        window.location.search,
      ),
      trackPixelEvent(eventName, payload) {
        if (!window.fbq) {
          return
        }

        window.fbq('track', eventName, payload ?? {})
      },
    }
  }, [database, isReady])

  return (
    <SiteConfigContext.Provider value={contextValue}>
      {children}
    </SiteConfigContext.Provider>
  )
}

export { SiteConfigContext }
