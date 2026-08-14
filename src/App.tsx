import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { FarmVatesPage } from './pages/FarmVatesPage'
import { SynthPestPage } from './pages/SynthPestPage'
import { MontagePage } from './pages/MontagePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/farmvates" element={<FarmVatesPage />} />
        <Route path="/projects/synthpest" element={<SynthPestPage />} />
        <Route path="/projects/montage" element={<MontagePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
