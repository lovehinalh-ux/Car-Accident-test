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
      case Phase.INSURANCE: return 'bg-[#92400e]'; // Amber
      case Phase.PREPARATION: return 'bg-[#92400e]'; // Amber
      case Phase.COMPENSATION: return 'bg-[#10B981]'; // Emerald Green
      default: return 'bg-slate-500';
    }
  };

  const getPhaseIcon = (phase: Phase) => {
    switch (phase) {
      case Phase.IMMEDIATE: return <ShieldAlert className="w-5 h-5 md:w-6 md:h-6" />;
      case Phase.INSURANCE: return <ClipboardCheck className="w-5 h-5 md:w-6 md:h-6" />;
      case Phase.PREPARATION: return <Clock className="w-5 h-5 md:w-6 md:h-6" />;
      case Phase.COMPENSATION: return <Coins className="w-5 h-5 md:w-6 md:h-6" />;
      default: return <AlertCircle className="w-5 h-5 md:w-6 md:h-6" />;
    }
  };

  const progressPercentage = (completedSteps.length / Object.keys(STEPS).length) * 100;

  // Check if it's the first step to apply special centering layout
  const isFirstStep = currentStepId === 'p1-s1';

  // Landing Page View
  if (showLanding) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 md:p-8" style={{ background: 'linear-gradient(135deg, #e6ddb5 0%, #ffffff 50%, #e6ddb5 100%)' }}>
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-2000"></div>

          <div className="z-10 flex flex-col items-center text-center space-y-6 md:space-y-8 animate-in fade-in zoom-in duration-700 relative">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-2xl md:rounded-3xl shadow-xl flex items-center justify-center mb-4 ring-4 ring-amber-50">
              <ShieldAlert className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#92400e]" />
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#78350f] leading-tight tracking-tight">
                車禍事故<br /><span className="text-[#92400e]">現場應變指南</span>
              </h1>
              <div className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-[#92400e] text-sm md:text-base font-bold tracking-wide">
                2026 最新法規對應版
              </div>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-[280px] md:max-w-md mx-auto">
                不慌張、不吃虧<br />一步步引導您完成事故處理
              </p>
              {/* Desktop only extended description */}
              <p className="text-sm md:text-base lg:block hidden text-slate-400 max-w-lg mx-auto mt-2">
                本指南涵蓋現場安全確認、報警流程、拍照存證、保險通報與後續理賠申請等完整步驟。
              </p>
            </div>

            <button
              onClick={() => setShowLanding(false)}
              className="w-full max-w-[280px] md:max-w-xs py-4 md:py-5 rounded-xl md:rounded-2xl bg-[#92400e] text-white font-black text-lg md:text-xl lg:text-2xl shadow-[0_4px_20px_rgba(146,64,14,0.4)] hover:bg-[#b45309] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              開始使用
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 text-slate-400 text-xs md:text-sm text-center font-medium">
            Professional Traffic Accident Support
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 md:p-8" style={{ background: 'linear-gradient(to bottom, #f5f0d8, #fff8e7)' }}>
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl md:rounded-3xl relative overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm transition-all duration-300 rounded-t-2xl md:rounded-t-3xl">
          <div className="px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`p-2 md:p-3 rounded-lg text-white shadow-md transition-colors duration-500 ${getPhaseColor(currentStep.phase)}`}>
                {getPhaseIcon(currentStep.phase)}
              </div>
              <div>
                <h1 className="text-base md:text-lg font-bold text-[#78350f] leading-tight tracking-tight">車禍事故應變指引</h1>
                <p className="text-xs md:text-sm font-semibold text-[#92400e] tracking-wide">
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
              className="p-2 md:p-2.5 bg-amber-50 rounded-full text-amber-600 hover:text-[#92400e] hover:bg-amber-100 active:scale-95 transition-all"
              aria-label="回首頁"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>
          <div className="h-1 bg-amber-100 w-full overflow-hidden">
            <div
              className="h-full bg-[#92400e] transition-all duration-700 ease-out shadow-[0_0_10px_rgba(146,64,14,0.5)]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </header>

        {/* Main Content */}
        <main className={`flex-1 flex flex-col pb-36 md:pb-40 animate-in fade-in duration-500 ${isFirstStep ? 'justify-center' : ''}`}>

          {/* Title Section */}
          <section className={`px-4 md:px-6 lg:px-8 py-6 md:py-8 bg-white border-b border-amber-50 ${isFirstStep ? 'border-none bg-transparent' : ''}`}>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-[#92400e] leading-snug tracking-tight text-center drop-shadow-sm">
              {currentStep.title}
            </h2>
            {currentStep.question && (
              <p className="text-lg md:text-xl text-[#78350f] font-bold mt-4 md:mt-6 leading-relaxed text-center">
                {currentStep.question}
              </p>
            )}
          </section>

          {/* Dynamic Content Area */}
          <section className="px-4 md:px-6 lg:px-8 py-4 md:py-6 space-y-4 md:space-y-6">

            {/* Confirmation Items (Moved to Top) */}
            {currentStep.confirmationItems && (
              <div className="space-y-4 pb-2">
                <div className="flex items-center gap-2 border-b-2 border-amber-100 pb-2 mb-2">
                  <ClipboardCheck className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                  <h3 className="text-base md:text-lg font-black text-amber-600 tracking-wide">
                    重要申請文件
                  </h3>
                </div>
                <div className="space-y-3">
                  {currentStep.confirmationItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3 md:gap-4 bg-amber-50 p-4 md:p-5 rounded-xl md:rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-all">
                      <div className="mt-0.5 min-w-[24px]">
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-xs font-black">
                          {idx + 1}
                        </div>
                      </div>
                      <span className="text-base md:text-lg font-bold text-[#78350f] leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Cards (Checklist) */}
            {currentStep.checklist && (
              <div className="space-y-3">
                {currentStep.checklistTitle && (
                  <h3 className="text-lg md:text-xl font-bold text-[#92400e] border-l-4 border-[#92400e] pl-3 mb-2">
                    {currentStep.checklistTitle}
                  </h3>
                )}
                {currentStep.checklist.map((item, idx) => (
                  <div key={idx} className="flex gap-3 md:gap-4 bg-white p-4 md:p-5 rounded-xl md:rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="mt-0.5 min-w-[24px]">
                      <CheckSquare className="w-5 h-5 md:w-6 md:h-6 text-[#92400e]" />
                    </div>
                    <span className="text-base md:text-lg font-medium text-[#78350f] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Alert Box */}
            {currentStep.alert && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 md:p-5 rounded-r-xl shadow-sm flex gap-3 md:gap-4 animate-pulse-slow">
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600 flex-shrink-0 mt-1" />
                <div className="text-base md:text-lg font-bold text-red-800 leading-relaxed">{currentStep.alert}</div>
              </div>
            )}

            {/* Primary Action Button (Call) */}
            {currentStep.primaryAction && (
              <a
                href={`tel:${currentStep.primaryAction.phone}`}
                className="group flex items-center justify-center gap-3 w-full py-5 md:py-6 rounded-xl md:rounded-2xl bg-red-600 text-white font-black text-xl md:text-2xl shadow-[0_8px_20px_rgba(220,38,38,0.3)] hover:bg-red-700 active:scale-95 transition-all"
              >
                <Phone className="w-7 h-7 md:w-8 md:h-8 animate-bounce" />
                {currentStep.primaryAction.label}
              </a>
            )}

            {/* Information Content */}
            {currentStep.content && (
              <div className="space-y-3 md:space-y-4">
                {currentStep.content.map((line, idx) => (
                  <div key={idx} className="text-base md:text-lg text-slate-600 font-medium leading-loose bg-white/60 p-2 md:p-3 rounded-lg">
                    {line}
                  </div>
                ))}
              </div>
            )}

            {/* Note Box */}
            {currentStep.note && (
              <div className="bg-amber-50 p-4 md:p-5 rounded-xl text-sm md:text-base text-slate-500 border border-amber-100 font-medium leading-relaxed">
                {currentStep.note}
              </div>
            )}
          </section>
        </main>

        {/* Footer Navigation */}
        <footer className="fixed bottom-0 left-0 right-0 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto bg-white/95 backdrop-blur-md border-t border-amber-100 p-4 md:p-5 z-40 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-b-2xl md:rounded-b-3xl">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            {currentStep.options?.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleNext(option.nextStepId, option.isExternal, option.externalUrl)}
                className={`w-full py-4 md:py-5 px-6 md:px-8 rounded-xl md:rounded-2xl flex items-center justify-between font-bold text-base md:text-lg transition-all active:scale-[0.98] shadow-md ${option.isExternal
                  ? 'bg-[#00C300] text-white hover:bg-[#00B300] shadow-[#00C300]/20' // LINE Green
                  : idx === 0
                    ? 'bg-[#92400e] text-white hover:bg-[#b45309] shadow-[#92400e]/30'
                    : 'bg-amber-50 text-[#78350f] hover:bg-amber-100'
                  }`}
              >
                <span className="flex items-center gap-2">
                  {option.isExternal && <MessageCircle className="w-5 h-5 fill-current" />}
                  {option.label}
                </span>
                {!option.isExternal && <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />}
              </button>
            ))}
          </div>
        </footer>

        {/* Quick Action Dial Buttons (Visible only on Step 1 & Step 2) */}
        {['p1-s1', 'p1-s1-injured', 'p1-s2'].includes(currentStep.id) && (
          <div className="fixed bottom-36 md:bottom-40 right-4 md:right-8 z-50 flex flex-col gap-3 group translate-x-2">
            {/* Ambulance 119 */}
            <a
              href="tel:119"
              className="w-12 h-12 md:w-14 md:h-14 bg-red-600/90 backdrop-blur-sm text-white rounded-full flex flex-col items-center justify-center shadow-lg border border-white/40 active:scale-90 transition-transform hover:scale-110"
              title="撥打 119"
            >
              <span className="font-bold text-[9px] md:text-[10px] leading-none mb-0.5 opacity-90">救護</span>
              <span className="font-black text-sm md:text-base leading-none">119</span>
            </a>

            {/* Police 110 */}
            <a
              href="tel:110"
              className="w-12 h-12 md:w-14 md:h-14 bg-slate-800/90 backdrop-blur-sm text-white rounded-full flex flex-col items-center justify-center shadow-lg border border-white/40 active:scale-90 transition-transform hover:scale-110"
              title="撥打 110"
            >
              <span className="font-bold text-[9px] md:text-[10px] leading-none mb-0.5 opacity-90">警察</span>
              <span className="font-black text-sm md:text-base leading-none">110</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
