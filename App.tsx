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
  MessageCircle
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPhaseColor = (phase: Phase) => {
    switch (phase) {
      case Phase.IMMEDIATE: return 'bg-[#DC2626]'; // Alert Red
      case Phase.INSURANCE: return 'bg-[#0EA5E9]'; // Sky Blue
      case Phase.PREPARATION: return 'bg-[#0EA5E9]'; // Sky Blue
      case Phase.COMPENSATION: return 'bg-[#10B981]'; // Emerald Green
      default: return 'bg-slate-500';
    }
  };

  const getPhaseIcon = (phase: Phase) => {
    switch (phase) {
      case Phase.IMMEDIATE: return <ShieldAlert className="w-6 h-6" />;
      case Phase.INSURANCE: return <ClipboardCheck className="w-6 h-6" />;
      case Phase.PREPARATION: return <Clock className="w-6 h-6" />;
      case Phase.COMPENSATION: return <Coins className="w-6 h-6" />;
      default: return <AlertCircle className="w-6 h-6" />;
    }
  };

  const progressPercentage = (completedSteps.length / Object.keys(STEPS).length) * 100;

  // Check if it's the first step to apply special centering layout
  const isFirstStep = currentStepId === 'p1-s1';

  // Landing Page View
  if (showLanding) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center w-full max-w-[480px] mx-auto bg-[#F0F9FF] px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-2000"></div>

        <div className="z-10 flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-4 ring-4 ring-blue-50">
            <ShieldAlert className="w-12 h-12 text-[#0EA5E9]" />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-black text-slate-800 leading-tight tracking-tight">
              車禍事故<br /><span className="text-[#0EA5E9]">現場應變指南</span>
            </h1>
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold tracking-wide">
              2026 最新法規對應版
            </div>
            <p className="text-slate-500 text-lg leading-relaxed max-w-[280px] mx-auto">
              不慌張、不吃虧<br />一步步引導您完成事故處理
            </p>
          </div>

          <button
            onClick={() => setShowLanding(false)}
            className="w-full max-w-[280px] py-4 rounded-xl bg-[#0EA5E9] text-white font-black text-xl shadow-[0_4px_20px_rgba(14,165,233,0.4)] hover:bg-[#0284C7] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            開始使用
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>


        <div className="absolute bottom-8 text-slate-400 text-xs text-center font-medium">
          Professional Traffic Accident Support
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full max-w-[480px] mx-auto bg-[#F0F9FF] shadow-2xl relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg text-white shadow-md transition-colors duration-500 ${getPhaseColor(currentStep.phase)}`}>
              {getPhaseIcon(currentStep.phase)}
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 leading-tight tracking-tight">車禍事故應變指引</h1>
              <p className="text-xs font-semibold text-[#0EA5E9] tracking-wide">
                {currentStep.phase === Phase.IMMEDIATE ? '⚡️ 緊急處置階段' : '📋 後續處理 SOP'} 2026 Ver.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setShowLanding(true);
              setCurrentStepId('p1-s1');
              setCompletedSteps([]);
            }}
            className="p-2.5 bg-slate-50 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 active:scale-95 transition-all"
            aria-label="回首頁"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
        <div className="h-1 bg-slate-100 w-full overflow-hidden">
          <div
            className="h-full bg-[#0EA5E9] transition-all duration-700 ease-out shadow-[0_0_10px_rgba(14,165,233,0.5)]"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col pb-36 animate-in fade-in duration-500 ${isFirstStep ? 'justify-center' : ''}`}>

        {/* Title Section */}
        <section className={`px-6 py-8 bg-white border-b border-slate-100 ${isFirstStep ? 'border-none bg-transparent' : ''}`}>
          <h2 className="text-2xl font-black text-[#0EA5E9] leading-snug tracking-tight text-center drop-shadow-sm">
            {currentStep.title}
          </h2>
          {currentStep.question && (
            <p className="text-xl text-slate-700 font-bold mt-4 leading-relaxed text-center">
              {currentStep.question}
            </p>
          )}
        </section>

        {/* Dynamic Content Area */}
        <section className="px-5 py-6 space-y-6">

          {/* Confirmation Items (Moved to Top) */}
          {currentStep.confirmationItems && (
            <div className="space-y-4 pb-2">
              <div className="flex items-center gap-2 border-b-2 border-amber-100 pb-2 mb-2">
                <ClipboardCheck className="w-6 h-6 text-amber-500" />
                <h3 className="text-lg font-black text-amber-600 tracking-wide">
                  重要申請文件
                </h3>
              </div>
              <div className="space-y-3">
                {currentStep.confirmationItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 bg-amber-50 p-5 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-all">
                    <div className="mt-0.5 min-w-[24px]">
                      <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-xs font-black">
                        {idx + 1}
                      </div>
                    </div>
                    <span className="text-lg font-bold text-slate-800 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Cards (Checklist) */}
          {currentStep.checklist && (
            <div className="space-y-3">
              {currentStep.checklistTitle && (
                <h3 className="text-xl font-bold text-[#0EA5E9] border-l-4 border-[#0EA5E9] pl-3 mb-2">
                  {currentStep.checklistTitle}
                </h3>
              )}
              {currentStep.checklist.map((item, idx) => (
                <div key={idx} className="flex gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mt-0.5 min-w-[24px]">
                    <CheckSquare className="w-6 h-6 text-[#0EA5E9]" />
                  </div>
                  <span className="text-lg font-medium text-slate-800 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          )}



          {/* Alert Box */}
          {currentStep.alert && (
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-xl shadow-sm flex gap-4 animate-pulse-slow">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div className="text-lg font-bold text-red-800 leading-relaxed">{currentStep.alert}</div>
            </div>
          )}

          {/* Primary Action Button (Call) */}
          {currentStep.primaryAction && (
            <a
              href={`tel:${currentStep.primaryAction.phone}`}
              className="group flex items-center justify-center gap-3 w-full py-6 rounded-2xl bg-red-600 text-white font-black text-2xl shadow-[0_8px_20px_rgba(220,38,38,0.3)] hover:bg-red-700 active:scale-95 transition-all"
            >
              <Phone className="w-8 h-8 animate-bounce" />
              {currentStep.primaryAction.label}
            </a>
          )}

          {/* Information Content */}
          {currentStep.content && (
            <div className="space-y-4">
              {currentStep.content.map((line, idx) => (
                <div key={idx} className="text-lg text-slate-600 font-medium leading-loose bg-white/60 p-2 rounded-lg">
                  {line}
                </div>
              ))}
            </div>
          )}

          {/* Note Box */}
          {currentStep.note && (
            <div className="bg-slate-100 p-5 rounded-xl text-base text-slate-500 border border-slate-200 font-medium leading-relaxed">
              {currentStep.note}
            </div>
          )}
        </section>
      </main>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/95 backdrop-blur-md border-t border-slate-100 p-5 z-40 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-3">
          {currentStep.options?.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleNext(option.nextStepId, option.isExternal, option.externalUrl)}
              className={`w-full py-4 px-6 rounded-xl flex items-center justify-between font-bold text-lg transition-all active:scale-[0.98] shadow-md ${option.isExternal
                ? 'bg-[#00C300] text-white hover:bg-[#00B300] shadow-[#00C300]/20' // LINE Green
                : idx === 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30' // Original Blue
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              <span className="flex items-center gap-2">
                {option.isExternal && <MessageCircle className="w-5 h-5 fill-current" />}
                {option.label}
              </span>
              {!option.isExternal && <ChevronRight className="w-6 h-6" />}
            </button>
          ))}
        </div>
      </footer>

      {/* Quick Action Dial Buttons (Visible only on Step 1 & Step 2) */}
      {['p1-s1', 'p1-s1-injured', 'p1-s2'].includes(currentStep.id) && (
        <div className="fixed bottom-36 right-4 z-50 flex flex-col gap-3 group translate-x-2">
          {/* Ambulance 119 */}
          <a
            href="tel:119"
            className="w-12 h-12 bg-red-600/90 backdrop-blur-sm text-white rounded-full flex flex-col items-center justify-center shadow-lg border border-white/40 active:scale-90 transition-transform hover:scale-110"
            title="撥打 119"
          >
            <span className="font-bold text-[9px] leading-none mb-0.5 opacity-90">救護</span>
            <span className="font-black text-sm leading-none">119</span>
          </a>

          {/* Police 110 */}
          <a
            href="tel:110"
            className="w-12 h-12 bg-slate-800/90 backdrop-blur-sm text-white rounded-full flex flex-col items-center justify-center shadow-lg border border-white/40 active:scale-90 transition-transform hover:scale-110"
            title="撥打 110"
          >
            <span className="font-bold text-[9px] leading-none mb-0.5 opacity-90">警察</span>
            <span className="font-black text-sm leading-none">110</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
