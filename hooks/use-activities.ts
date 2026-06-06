'use client';

import { useReducer, useEffect, useCallback } from 'react';
import { Activity, ActivityType, ScoreValue } from '@/lib/types';

// ===== Actions =====

type Action =
  | { type: 'LOAD'; activities: Activity[] }
  | { type: 'ADD'; activity: Activity }
  | { type: 'ADD_MANY'; activities: Activity[] }
  | { type: 'UPDATE'; activity: Activity }
  | { type: 'DELETE'; id: string }
  | { type: 'SET_SCORE'; id: string; paramCode: string; score: ScoreValue };

// ===== Reducer =====

function activitiesReducer(state: Activity[], action: Action): Activity[] {
  switch (action.type) {
    case 'LOAD':
      return action.activities;
    case 'ADD':
      return [...state, action.activity];
    case 'ADD_MANY':
      return [...state, ...action.activities];
    case 'UPDATE':
      return state.map((a) => (a.id === action.activity.id ? action.activity : a));
    case 'DELETE':
      return state.filter((a) => a.id !== action.id);
    case 'SET_SCORE':
      return state.map((a) =>
        a.id === action.id
          ? { ...a, scores: { ...a.scores, [action.paramCode]: action.score } }
          : a
      );
    default:
      return state;
  }
}

// ===== Storage Key =====

const STORAGE_KEY = 'r100hk-activities';

// ===== Hook =====

export function useActivities() {
  const [activities, dispatch] = useReducer(activitiesReducer, []);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Activity[];
        dispatch({ type: 'LOAD', activities: parsed });
      }
    } catch {
      // silently fail
    }
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    } catch {
      // silently fail
    }
  }, [activities]);

  const addActivity = useCallback(
    (name: string, type: ActivityType, stage: number) => {
      const activity: Activity = {
        id: crypto.randomUUID(),
        name,
        type,
        stage,
        scores: {},
        createdAt: Date.now(),
      };
      dispatch({ type: 'ADD', activity });
      return activity.id;
    },
    []
  );

  const addActivities = useCallback(
    (payload: { name: string; type: ActivityType; stage: number }[]) => {
      const activities = payload.map((item) => ({
        id: crypto.randomUUID(),
        name: item.name,
        type: item.type,
        stage: item.stage,
        scores: {},
        createdAt: Date.now(),
      }));
      dispatch({ type: 'ADD_MANY', activities });
      return activities.map((a) => a.id);
    },
    []
  );

  const updateActivity = useCallback((activity: Activity) => {
    dispatch({ type: 'UPDATE', activity });
  }, []);

  const deleteActivity = useCallback((id: string) => {
    dispatch({ type: 'DELETE', id });
  }, []);

  const setScore = useCallback(
    (id: string, paramCode: string, score: ScoreValue) => {
      dispatch({ type: 'SET_SCORE', id, paramCode, score });
    },
    []
  );

  const getActivity = useCallback(
    (id: string) => activities.find((a) => a.id === id),
    [activities]
  );

  return {
    activities,
    addActivity,
    addActivities,
    updateActivity,
    deleteActivity,
    setScore,
    getActivity,
  };
}
