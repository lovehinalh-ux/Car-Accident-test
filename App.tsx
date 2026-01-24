
import React, { useState } from 'react';
import { STEPS } from './constants';
import { Phase } from './types';
import {
  ShieldAlert,
  ClipboardCheck,
  Coins,
  ChevronRight,
  Home,
  AlertCircle,
  Clock,
  CheckSquare,
  Phone,
  MessageCircle,
  Stethoscope,
  Plus,
  ArrowRight
} from 'lucide-react';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [currentStepId, setCurrentStepId] = useState<string>('p1-s1');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const currentStep = STEPS[currentStepId];

  const handleNext = (nextId: string, isExternal?: boolean, externalUrl?: string) => {
    if (isExternal && externalUrl) {
      window.open(externalUrl, '_blank');
      return;
    }

    if (!completedSteps.includes(currentStepId)) {
      setCompletedSteps(prev => [...prev, currentStepId]);
    }
    setCurrentStepId(nextId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const currentStepIndex = Object.keys(STEPS).indexOf(currentStepId);
  const totalSteps = Object.keys(STEPS).length;

  // High Contrast Colors (Swiss Style)
  const getPhaseColor = (phase: Phase) => {
    switch (phase) {
      case Phase.IMMEDIATE: return 'text-red-600 bg-red-50';
      case Phase.INSURANCE: return 'text-stone-800 bg-stone-100';
      case Phase.PREPARATION: return 'text-stone-800 bg-stone-100';
      case Phase.COMPENSATION: return 'text-emerald-700 bg-emerald-50';
      default: return 'text-stone-500 bg-stone-100';
    }
  };

  // Landing Page: Swiss Typography (Big, Bold, legible)
  if (showLanding) {
    return (
      <div className="min-h-screen flex flex-col p-8 md:p-12 relative overflow-hidden bg-stone-50">
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-xl mx-auto w-full">

          <div className="mb-12">
            <div className="w-20 h-20 rounded-full bg-red-600 text-white shadow-xl flex items-center justify-center mb-10">
              <Plus strokeWidth={4} className="w-10 h-10" />
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-stone-900 leading-[0.95] tracking-tighter mb-8">
              Vehicle<br />Accident<br /><span className="text-red-600">Protocol.</span>
            </h1>

            <div className="h-2 w-24 bg-stone-900 mb-8"></div>

            <p className="text-stone-600 text-xl font-bold leading-relaxed max-w-sm">
              現場緊急應變指南 2026<br />
              <span className="text-base font-normal text-stone-500">標準化事故處理程序 SOP</span>
            </p>
          </div>

          <div className="space-y-6">
            <button
              onClick={() => setShowLanding(false)}
              className="w-full py-6 rounded-2xl bg-stone-900 text-white font-bold text-2xl flex items-center justify-between px-8 shadow-soft-xl hover:bg-stone-800 hover:scale-[1.02] transition-all duration-300 group"
            >
              <span>開始應變</span>
              <div className="bg-white/20 p-2 rounded-full">
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <div className="flex items-center gap-3 text-stone-500 text-sm font-bold bg-white/50 p-3 rounded-lg w-fit">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>System Operational / Ready</span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto md:max-w-2xl lg:max-w-4xl bg-stone-50 relative">

      {/* Header: Swiss Grid Layout */}
      <header className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-md pt-6 pb-2 px-6 md:px-8 transition-all border-b border-stone-200">
        <div className="flex justify-between items-start mb-4">
          <button
            onClick={() => {
              setShowLanding(true);
              setCurrentStepId('p1-s1');
              setCompletedSteps([]);
            }}
            className="w-12 h-12 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center text-stone-600 hover:text-stone-900 hover:border-stone-400 transition-all"
          >
            <Home className="w-6 h-6" />
          </button>

          <div className="text-right">
            <div className="text-[10px] font-black tracking-[0.2em] uppercase text-stone-400 mb-1">
              STATUS
            </div>
            <div className={`text-sm font-bold flex items-center justify-end gap-2 px-3 py-1 rounded-full ${getPhaseColor(currentStep.phase)}`}>
              <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
              {currentStep.phase === Phase.IMMEDIATE ? 'EMERGENCY' : 'PROCESSING'}
            </div>
          </div>
        </div>

        {/* Thick Progress Line */}
        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-stone-900 transition-all duration-700 ease-out"
            style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-6 md:px-8 py-8 pb-64 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">

        {/* Title Area */}
        <section>
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 leading-tight mb-4 tracking-tight">
            {currentStep.title}
          </h2>
          {currentStep.question && (
            <p className="text-xl md:text-2xl text-stone-600 font-medium leading-relaxed">
              {currentStep.question}
            </p>
          )}
        </section>

        {/* Content Area */}
        <div className="space-y-8">

          {/* Alert: High Contrast Card */}
          {currentStep.alert && (
            <div className="rounded-2xl bg-white border-l-8 border-red-600 shadow-sm p-6 flex gap-5 items-start">
              <ShieldAlert className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div className="text-stone-900 font-bold text-lg leading-relaxed">{currentStep.alert}</div>
            </div>
          )}

          {/* Documents: Clear Typography */}
          {currentStep.confirmationItems && (
            <div className="space-y-4">
              <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest mb-4 border-b border-stone-200 pb-2">Required Documents</h3>
              {currentStep.confirmationItems.map((item, idx) => (
                <div key={idx} className="flex gap-5 items-center p-5 rounded-2xl bg-white shadow-sm border border-stone-100">
                  <span className="w-8 h-8 flex items-center justify-center bg-stone-900 text-white font-mono font-bold rounded-lg text-sm">{idx + 1}</span>
                  <span className="text-stone-900 font-bold text-lg">{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Checklist: Big Toggles */}
          {currentStep.checklist && (
            <div className="space-y-4">
              {currentStep.checklistTitle && (
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  {currentStep.checklistTitle}
                </h3>
              )}
              {currentStep.checklist.map((item, idx) => (
                <div key={idx} className="group flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm border border-stone-100 transition-all hover:border-stone-300 cursor-pointer">
                  <div className="w-6 h-6 rounded-md border-2 border-stone-300 flex-shrink-0 mt-0.5 group-hover:border-stone-900 transition-colors"></div>
                  <span className="text-stone-800 font-medium text-lg leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Primary Action - SOLID COLOR */}
          {currentStep.primaryAction && (
            <a
              href={`tel:${currentStep.primaryAction.phone}`}
              className="block w-full py-6 rounded-2xl bg-red-600 text-white font-black text-2xl text-center shadow-lg hover:bg-red-700 hover:scale-[1.01] transition-all"
            >
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-8 h-8" />
                {currentStep.primaryAction.label}
              </div>
            </a>
          )}

          {/* Info Text */}
          {currentStep.content && (
            <div className="space-y-6">
              {currentStep.content.map((line, idx) => (
                <p key={idx} className="text-stone-800 text-lg leading-loose font-medium border-l-4 border-stone-300 pl-6">
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* Note */}
          {currentStep.note && (
            <div className="p-6 bg-stone-200 rounded-xl text-stone-700 font-medium leading-relaxed flex gap-3">
              <span className="font-bold">NOTE:</span>
              {currentStep.note}
            </div>
          )}

        </div>
      </main>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-6 bg-stone-50/95 backdrop-blur-lg border-t border-stone-200">
        <div className="max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto space-y-4">

          {/* SOS Buttons - Extremely High Contrast (White on Red/Black) */}
          {['p1-s1', 'p1-s1-injured', 'p1-s2'].includes(currentStep.id) && (
            <div className="flex justify-end gap-3 mb-2 pointer-events-none translate-y-[-10px]">
              <a href="tel:119" className="pointer-events-auto w-16 h-16 rounded-full bg-red-600 text-white shadow-xl flex items-center justify-center font-black text-lg tracking-tighter hover:scale-110 transition-transform border-4 border-stone-50">
                119
              </a>
              <a href="tel:110" className="pointer-events-auto w-16 h-16 rounded-full bg-stone-900 text-white shadow-xl flex items-center justify-center font-black text-lg tracking-tighter hover:scale-110 transition-transform border-4 border-stone-50">
                110
              </a>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {currentStep.options?.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleNext(option.nextStepId, option.isExternal, option.externalUrl)}
                className={`w-full py-5 px-8 rounded-2xl font-bold text-xl flex items-center justify-between transition-all active:scale-[0.98] shadow-sm ${option.isExternal
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : idx === 0
                    ? 'bg-stone-900 text-white hover:bg-stone-800' // Dark Primary Button
                    : 'bg-white text-stone-900 border-2 border-stone-200 hover:border-stone-900' // Secondary Button
                  }`}
              >
                <span className="flex items-center gap-3">
                  {option.isExternal && <MessageCircle className="w-6 h-6 fill-current" />}
                  {option.label}
                </span>
                {!option.isExternal && <ChevronRight className="w-6 h-6" />}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default App;
