import React, { useState, useEffect } from 'react';
import { Header, TabType } from './components/Header';
import { StudyModulesView } from './components/StudyModulesView';
import { ExpansionMapView } from './components/ExpansionMapView';
import { QuizGameView } from './components/QuizGameView';
import { FlashcardsView } from './components/FlashcardsView';
import { TimelineView } from './components/TimelineView';
import { RomanizationView } from './components/RomanizationView';
import { ExamSimulatorView } from './components/ExamSimulatorView';
import { GlossaryModal } from './components/GlossaryModal';
import { RanksModal } from './components/RanksModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('temari');
  const [selectedTopicForQuiz, setSelectedTopicForQuiz] = useState<number | undefined>(undefined);
  const [selectedTopicForFlashcards, setSelectedTopicForFlashcards] = useState<number | undefined>(undefined);

  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isRanksOpen, setIsRanksOpen] = useState(false);

  // Persistence
  const [xp, setXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('roma_xp_points');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('roma_sound_pref');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const handleEarnXp = (amount: number) => {
    setXp((prev) => {
      const updated = prev + amount;
      try {
        localStorage.setItem('roma_xp_points', updated.toString());
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleSoundToggle = (val: boolean) => {
    setSoundEnabled(val);
    try {
      localStorage.setItem('roma_sound_pref', val ? 'true' : 'false');
    } catch {
      // ignore
    }
  };

  const handleStartQuizTopic = (topicId: number) => {
    setSelectedTopicForQuiz(topicId);
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenFlashcardsTopic = (topicId: number) => {
    setSelectedTopicForFlashcards(topicId);
    setActiveTab('flashcards');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ec] text-[#241c19]">
      {/* Header Banner */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        xp={xp}
        soundEnabled={soundEnabled}
        setSoundEnabled={handleSoundToggle}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenRanksModal={() => setIsRanksOpen(true)}
      />

      {/* Main Content View */}
      <main className="flex-1 pb-16">
        {activeTab === 'temari' && (
          <StudyModulesView
            onStartQuizTopic={handleStartQuizTopic}
            onOpenFlashcardsTopic={handleOpenFlashcardsTopic}
            onOpenMap={() => {
              setActiveTab('mapa');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'mapa' && (
          <ExpansionMapView
            onEarnXp={handleEarnXp}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizGameView
            initialTopicId={selectedTopicForQuiz}
            soundEnabled={soundEnabled}
            onEarnXp={handleEarnXp}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView
            initialTopicId={selectedTopicForFlashcards}
            soundEnabled={soundEnabled}
            onEarnXp={handleEarnXp}
          />
        )}

        {activeTab === 'timeline' && <TimelineView />}

        {activeTab === 'romanitzacio' && <RomanizationView />}

        {activeTab === 'examen' && (
          <ExamSimulatorView
            soundEnabled={soundEnabled}
            onEarnXp={handleEarnXp}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#180809] border-t-2 border-[#9b722b] text-amber-200/70 py-6 px-4 text-center text-xs space-y-2">
        <div className="font-cinzel font-bold text-amber-100 tracking-wider text-sm">
          SENATVS POPVLVSQVE ROMANVS
        </div>
        <p className="max-w-xl mx-auto text-[#bf9b68] text-[11px]">
          Guia interactiva d'estudi de la Història de la Roma Antiga adaptada al currículum de 2n d'ESO (Ciències Socials, Geografia i Història).
        </p>
        <div className="text-[#846b4f] text-[10px]">
          Orígens i Monarquia · La República · Expansió Territorial i Mapa · Guerres Púniques · Crisi del segle I aC · Juli Cèsar · L'Imperi Romà i Romanització
        </div>
      </footer>

      {/* Modals */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      <RanksModal
        isOpen={isRanksOpen}
        onClose={() => setIsRanksOpen(false)}
        xp={xp}
      />
    </div>
  );
}
