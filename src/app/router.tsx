import { createBrowserRouter } from 'react-router-dom'
import { PageIntro } from '../components/placeholders/PageIntro'
import { HomePage } from '../features/home/pages/HomePage'
import { MatchesPage } from '../features/matches/pages/MatchesPage'
import { NewsDetailPage } from '../features/news/pages/NewsDetailPage'
import { NewsListPage } from '../features/news/pages/NewsListPage'
import { StatisticsPage } from '../features/statistics/pages/StatisticsPage'
import { PublicLayout } from '../layouts/PublicLayout'

function NotFoundPage() {
  return (
    <section className="public-page-shell flex flex-col gap-8 max-[640px]:gap-5">
      <PageIntro
        eyebrow="Pagina no encontrada"
        title="Esta ruta todavia no forma parte del recorrido publico."
        description="La estructura principal ya esta lista para seguir creciendo sin mezclar responsabilidades con el panel administrativo."
      />
    </section>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'noticias',
        element: <NewsListPage />,
      },
      {
        path: 'noticias/:slug',
        element: <NewsDetailPage />,
      },
      {
        path: 'partidos',
        element: <MatchesPage />,
      },
      {
        path: 'estadisticas',
        element: <StatisticsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
