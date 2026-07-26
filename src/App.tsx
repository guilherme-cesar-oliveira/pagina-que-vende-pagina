import { SiteConfigProvider } from '@/lib/site-config-context'
import Index from '@/pages/Index'

function App() {
  return (
    <SiteConfigProvider>
      <Index />
    </SiteConfigProvider>
  )
}

export default App
