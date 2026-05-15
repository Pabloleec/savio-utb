/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import NotificationsView from './views/NotificationsView';
import CalendarView from './views/CalendarView';
import NotProgrammedView from './views/NotProgrammedView';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<HomeView />} />
        <Route path="/notifications" element={<NotificationsView />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/not-programmed" element={<NotProgrammedView />} />
        <Route path="*" element={<HomeView />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="flex-1 min-h-0 flex flex-col">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}
