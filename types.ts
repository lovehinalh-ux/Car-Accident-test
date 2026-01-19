
import React from 'react';

export enum Phase {
  INITIAL = 'INITIAL',
  IMMEDIATE = 'IMMEDIATE',
  INSURANCE = 'INSURANCE',
  PREPARATION = 'PREPARATION',
  COMPENSATION = 'COMPENSATION'
}

export interface Step {
  id: string;
  phase: Phase;
  title: string;
  question?: string;
  content?: React.ReactNode[];
  options?: Option[];
  checklist?: React.ReactNode[];
  checklistTitle?: string;
  alert?: React.ReactNode;
  note?: React.ReactNode;
  confirmationItems?: string[];
  primaryAction?: {
    label: string;
    phone: string;
  };
}

export interface Option {
  label: string;
  nextStepId: string;
  action?: () => void;
  isExternal?: boolean;
  externalUrl?: string;
}
