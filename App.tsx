
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
  Phone
} from 'lucide-react';

const App: React.FC = () => {
  const [currentStepId, setCurrentStepId] = useState<string>('p1-s1');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const currentStep = STEPS[currentStepId];

  const handleNext = (nextId: string) => {
    if (!completedSteps.includes(currentStepId)) {
      setCompletedSteps(prev => [...prev, currentStepId]);
    }
    setCurrentStepId(nextId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPhaseColor = (phase: Phase) => {
    switch (phase) {
      case Phase.IMMEDIATE: return 'bg-red-500';
      case Phase.INSURANCE: return 'bg-blue-500';
      case Phase.PREPARATION: return 'bg-orange-500';
      case Phase.COMPENSATION: return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPhaseIcon = (phase: Phase) => {
    switch (phase) {
      case Phase.IMMEDIATE: return <ShieldAlert className="w-8 h-8" />;
      case Phase.INSURANCE: return <ClipboardCheck className="w-8 h-8" />;
      case Phase.PREPARATION: return <Clock className="w-8 h-8" />;
      case Phase.COMPENSATION: return <Coins className="w-8 h-8" />;
      default: return <AlertCircle className="w-8 h-8" />;
    }
  };

  const progressPercentage = (completedSteps.length / Object.keys(STEPS).length) * 100;

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto bg-slate-50 shadow-2xl relative pb-40">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-md">
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl text-white shadow-sm ${getPhaseColor(currentStep.phase)}`}>
              {getPhaseIcon(currentStep.phase)}
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">車禍事故應變</h1>
              <p className="text-sm font-medium text-slate-500">{currentStep.phase === Phase.IMMEDIATE ? '緊急處置階段' : '後續處理流程'}</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setCurrentStepId('p1-s1');
              setCompletedSteps([]);
            }}
            className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 active:scale-90 transition-all"
          >
            <Home className="w-6 h-6" />
          </button>
        </div>
        <div className="h-1.5 bg-slate-100 w-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-700 ease-in-out" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col">
        
        {/* Title Area - Approximately 1/4 of viewport height */}
        <section className="px-6 py-12 min-h-[25vh] flex flex-col justify-center bg-white border-b border-slate-100">
          <h2 className="text-4xl font-black text-slate-900 leading-tight animate-in fade-in slide-in-from-left-4 duration-500">
            {currentStep.title}
          </h2>
          {currentStep.question && (
            <p className="text-3xl text-slate-700 font-bold mt-6 leading-snug animate-in fade-in slide-in-from-left-6 duration-700">
              {currentStep.question}
            </p>
          )}
        </section>

        {/* Content Area - Approximately 2/3 of viewport height */}
        <section className="px-6 py-10 min-h-[60vh] flex-1 bg-slate-50/50 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Checklist Area */}
          {currentStep.checklist && (
            <div className="space-y-5 mb-10">
              {currentStep.checklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-md transform transition-transform hover:scale-[1.02]">
                  <div className="mt-1">
                    <CheckSquare className="w-8 h-8 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-slate-800 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          )}

          {currentStep.alert && (
            <div className="bg-red-50 border-l-8 border-red-500 p-8 mb-10 rounded-r-2xl shadow-sm flex gap-5">
              <AlertCircle className="w-10 h-10 text-red-500 flex-shrink-0" />
              <div className="text-2xl font-black text-red-900 leading-relaxed">{currentStep.alert}</div>
            </div>
          )}

          {/* Big Direct Action Button (e.g., Call 119/110) */}
          {currentStep.primaryAction && (
            <a 
              href={`tel:${currentStep.primaryAction.phone}`}
              className="flex items-center justify-center gap-4 w-full py-8 mb-10 rounded-3xl bg-red-600 text-white font-black text-3xl shadow-[0_15px_30px_rgba(220,38,38,0.4)] animate-bounce active:scale-95 transition-all"
            >
              <Phone className="w-10 h-10" />
              {currentStep.primaryAction.label}
            </a>
          )}

          {currentStep.content && (
            <div className="space-y-8 mb-10">
              {currentStep.content.map((line, idx) => (
                <div key={idx} className="text-2xl text-slate-600 font-medium leading-relaxed">
                  {line}
                </div>
              ))}
            </div>
          )}

          {currentStep.note && (
            <div className="bg-slate-200/50 p-8 rounded-2xl text-lg text-slate-500 border border-slate-300 font-medium leading-relaxed">
              {currentStep.note}
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation - Remaining space */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t p-6 z-40 shadow-[0_-10px_25px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col gap-4">
          {currentStep.options?.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleNext(option.nextStepId)}
              className={`w-full py-6 px-8 rounded-2xl flex items-center justify-between font-black text-2xl transition-all active:scale-95 shadow-lg ${
                idx === 0 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <span>{option.label}</span>
              <ChevronRight className="w-8 h-8" />
            </button>
          ))}
        </div>
      </footer>

      {/* Quick Action Dial Buttons for Emergency Phase */}
      {currentStep.phase === Phase.IMMEDIATE && (
        <div className="fixed bottom-48 right-6 z-30 flex flex-col gap-5 animate-in fade-in zoom-in">
          <a 
            href="tel:119" 
            className="w-20 h-20 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-red-700 active:scale-90 transition-all border-4 border-white"
            title="撥打 119"
          >
            <span className="font-black text-xl text-center leading-none">救護<br/>119</span>
          </a>
          <a 
            href="tel:110" 
            className="w-20 h-20 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-black active:scale-90 transition-all border-4 border-white"
            title="撥打 110"
          >
            <span className="font-black text-xl text-center leading-none">警察<br/>110</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
