import { FC, lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import { ErrorFallback } from '../components/ui/error/ErrorFallback';


const Layout = lazy(() => import('../components/layout/Layout'));
const Home = lazy(() => import('../components/pages/home/Home'));
const Channel = lazy(() => import('../components/pages/channel/Channel'));
const NotFoundPage = lazy(() => import('../components/pages/not-found/NotFound'));
const ProfileEditPage = lazy(() => import('../components/pages/profile/ProfileEdit'));
const RegisterPage = lazy(() => import('../components/pages/register/Register'));
const Video = lazy(() => import('../components/pages/video/Video'));
const SearchResult = lazy(() => import('../components/pages/search-results/SearchResults'));
const Studio = lazy(() => import('../components/pages/studio/Studio'));
const VideoEdit = lazy(() => import('../components/pages/studio/video-edit/VideoEdit'));
const SubscriptionsPage = lazy(() => import('../components/pages/subscriptions/SubscriptionsPage'));
const Trending = lazy(() => import('../components/pages/trending/Trending'));




const App: FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path='/' element={
          <Suspense fallback={null}>
            <Layout />
          </Suspense>
        }>
          <Route path='/' element={<Home />} />
          <Route path='/studio' element={<Studio />} />
          <Route path='/studio/edit/video/:id' element={<VideoEdit />} />
          <Route path='/channel/:id' element={<Channel />} />
          <Route path='/popular' element={<Trending />} />
          <Route path='/subscriptions' element={<SubscriptionsPage />} />
          <Route path='/videos/:name/:id' element={<Video />} />
          <Route path='/registration' element={<RegisterPage />} />
          <Route path='/user/profile-edit/:id' element={<ProfileEditPage />} />
          <Route path='/search' element={<SearchResult />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
