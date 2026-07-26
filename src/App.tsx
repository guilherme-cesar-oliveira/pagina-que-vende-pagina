import { SiteConfigProvider } from '@/lib/site-config-context'
import { useSiteConfig } from '@/lib/use-site-config'
import Index from '@/pages/Index'

function AppContent() {
  const { isReady } = useSiteConfig()

  if (!isReady) {
    return (
      <div className="site-shell flex min-h-screen items-center justify-center bg-background px-6 text-center text-foreground">
        <div className="offer-card max-w-md space-y-4 px-6 py-6">
          <p className="section-eyebrow">Carregando</p>
          <h1 className="display-title text-[clamp(2.8rem,10vw,4.6rem)] text-foreground">
            Preparando a landing
          </h1>
          <p className="section-copy">
            Buscando a configuracao publica e preparando a experiencia da pagina.
          </p>
        </div>
      </div>
    )
  }

  return <Index />
}

function App() {
  return (
    <SiteConfigProvider>
      <AppContent />
    </SiteConfigProvider>
  )
}

export default App
