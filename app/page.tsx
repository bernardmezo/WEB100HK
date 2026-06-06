'use client';

import { useState, useCallback } from 'react';
import { useActivities } from '@/hooks/use-activities';
import { ActivityType, ScoreValue } from '@/lib/types';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ActivityForm } from '@/components/activity-form';
import { ActivityList } from '@/components/activity-list';
import { ScoringForm } from '@/components/scoring-form';
import { ResultSummary } from '@/components/result-summary';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, ListChecks, ClipboardEdit } from 'lucide-react';

type View = 'list' | 'create' | 'score' | 'result';

export default function Home() {
  const {
    activities,
    addActivity,
    addActivities,
    deleteActivity,
    setScore,
    getActivity,
  } = useActivities();

  const [view, setView] = useState<View>('list');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('kegiatan');

  const activeActivity = activeId ? getActivity(activeId) : undefined;

  const handleCreateActivity = useCallback(
    (name: string, type: ActivityType, stage: number) => {
      const id = addActivity(name, type, stage);
      setActiveId(id);
      setView('score');
      setActiveTab('penilaian');
    },
    [addActivity]
  );

  const handleCreateActivities = useCallback(
    (names: string[], type: ActivityType, stage: number) => {
      addActivities(
        names.map((name) => ({
          name,
          type,
          stage,
        }))
      );
      setActiveId(null);
      setView('list');
      setActiveTab('kegiatan');
    },
    [addActivities]
  );

  const handleSelectActivity = useCallback(
    (id: string) => {
      setActiveId(id);
      setView('score');
      setActiveTab('penilaian');
    },
    []
  );

  const handleScoreChange = useCallback(
    (paramCode: string, score: ScoreValue) => {
      if (activeId) {
        setScore(activeId, paramCode, score);
      }
    },
    [activeId, setScore]
  );

  const handleDeleteActivity = useCallback(
    (id: string) => {
      deleteActivity(id);
      if (activeId === id) {
        setActiveId(null);
        setView('list');
        setActiveTab('kegiatan');
      }
    },
    [activeId, deleteActivity]
  );

  const handleBackToList = useCallback(() => {
    setView('list');
    setActiveTab('kegiatan');
  }, []);

  const handleViewResults = useCallback(() => {
    setView('result');
    setActiveTab('hasil');
  }, []);

  const handleBackToScoring = useCallback(() => {
    setView('score');
    setActiveTab('penilaian');
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-6">
        <Tabs
          value={activeTab}
          onValueChange={(v) => {
            setActiveTab(v);
            if (v === 'kegiatan') {
              setView('list');
            } else if (v === 'penilaian' && activeActivity) {
              setView('score');
            } else if (v === 'hasil' && activeActivity) {
              setView('result');
            }
          }}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 bg-secondary/30 no-print">
            <TabsTrigger
              value="kegiatan"
              className="gap-1.5 text-xs data-[state=active]:bg-background/80"
            >
              <ListChecks className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Kegiatan</span>
            </TabsTrigger>
            <TabsTrigger
              value="penilaian"
              className="gap-1.5 text-xs data-[state=active]:bg-background/80"
              disabled={!activeActivity}
            >
              <ClipboardEdit className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Penilaian</span>
            </TabsTrigger>
            <TabsTrigger
              value="hasil"
              className="gap-1.5 text-xs data-[state=active]:bg-background/80"
              disabled={!activeActivity}
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20v-6M6 20V10M18 20V4" />
              </svg>
              <span className="hidden sm:inline">Hasil</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kegiatan" className="space-y-6">
            {view === 'create' ? (
              <Card className="border-border/50 bg-card/30">
                <CardContent className="p-6">
                  <ActivityForm
                    onSubmitSingle={handleCreateActivity}
                    onSubmitBatch={handleCreateActivities}
                  />
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold">Daftar Kegiatan</h2>
                  <Button
                    size="sm"
                    onClick={() => setView('create')}
                    className="gap-1.5 text-xs bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white shadow-lg shadow-emerald-700/20"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Tambah Kegiatan
                  </Button>
                </div>
                <ActivityList
                  activities={activities}
                  onSelect={handleSelectActivity}
                  onDelete={handleDeleteActivity}
                />
              </>
            )}
          </TabsContent>

          <TabsContent value="penilaian">
            {activeActivity && view === 'score' && (
              <ScoringForm
                activity={activeActivity}
                onScoreChange={handleScoreChange}
                onBack={handleBackToList}
                onViewResults={handleViewResults}
              />
            )}
          </TabsContent>

          <TabsContent value="hasil">
            {activeActivity && view === 'result' && (
              <ResultSummary
                activity={activeActivity}
                onBack={handleBackToScoring}
              />
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  );
}
