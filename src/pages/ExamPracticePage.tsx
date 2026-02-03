import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Timer, Save, Download, Flag, Maximize2, Minimize2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import RichTextEditor from "@/components/RichTextEditor";
import SubjectSelector from "@/components/SubjectSelector";
import { departments } from "@/data/courses";
import type { Question } from "@/data/courses";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";

type QuestionStatus = "unattempted" | "answered" | "marked";
const EXAM_DURATION = 90 * 60; // 90 minutes in seconds

interface SavedProgress {
  selectedDepartment: string | null;
  selectedSubject: string | null;
  examQuestions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  questionStatus: Record<string, QuestionStatus>;
  timeElapsed: number;
}

export default function ExamPracticePage() {
  const navigate = useNavigate();

  // Load saved progress from localStorage
  const [savedProgress] = useState<SavedProgress | null>(() => {
    const saved = localStorage.getItem('examProgress');
    return saved ? JSON.parse(saved) : null;
  });

  // Subject selection states
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    savedProgress?.selectedDepartment || null
  );
  const [selectedSubject, setSelectedSubject] = useState<string | null>(
    savedProgress?.selectedSubject || null
  );
  const [showSubjectSelector, setShowSubjectSelector] = useState(true);
  
  // Exam state
  const [examQuestions, setExamQuestions] = useState<Question[]>(() => {
    if (savedProgress?.examQuestions) {
      return savedProgress.examQuestions;
    }
    return [];
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(savedProgress?.currentQuestionIndex || 0);
  const [answers, setAnswers] = useState<Record<string, string>>(savedProgress?.answers || {});
  const [questionStatus, setQuestionStatus] = useState<Record<string, QuestionStatus>>(savedProgress?.questionStatus || {});
  const [hasStarted, setHasStarted] = useState(savedProgress ? true : false);
  const [timeElapsed, setTimeElapsed] = useState(savedProgress?.timeElapsed || 0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showStartDialog, setShowStartDialog] = useState(!savedProgress);
  const [showEndDialog, setShowEndDialog] = useState(false);

  // Handler for subject selection
  const handleSubjectSelect = (departmentId: string, subjectId: string) => {
    setSelectedDepartment(departmentId);
    setSelectedSubject(subjectId);
    const department = departments.find(d => d.id === departmentId);
    const subject = department?.subjects.find(s => s.id === subjectId);
    
    if (subject) {
      // Select 6 random questions from the subject
      const shuffled = [...subject.questions].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 6);
      setExamQuestions(selected);
      setShowSubjectSelector(false);

      // If there's saved progress, don't show the start dialog again
      if (!savedProgress) {
        setShowStartDialog(true);
      } else {
        setHasStarted(true);
      }
    }
  };

  // Function to restart the exam
  const restartExam = () => {
    localStorage.removeItem('examProgress');
    window.location.reload();
  };

  // Function to handle exam end
  const endExam = () => {
    saveNow(); // Save final state
    localStorage.removeItem('examProgress'); // Clear progress
    navigate('/'); // Return to home
  };

  const currentQuestion = examQuestions[currentQuestionIndex];

  // Timer effect with auto-save
  useEffect(() => {
    // Clear any existing progress when component mounts if there's no saved progress
    if (!savedProgress) {
      localStorage.removeItem('examProgress');
      setTimeElapsed(0);
    }
  }, [savedProgress]);

  // Save function
  const saveNow = () => {
    // Save to localStorage
    localStorage.setItem('examProgress', JSON.stringify({
      answers,
      questionStatus,
      timeElapsed,
      examQuestions,
      currentQuestionIndex,
      selectedDepartment,
      selectedSubject
    }));
  };

  useEffect(() => {
    if (!hasStarted || timeElapsed >= EXAM_DURATION) return;

    const interval = setInterval(() => {
      setTimeElapsed((prev) => {
        const newTime = prev + 1;
        // Auto-save every minute
        if (newTime % 60 === 0) {
          saveNow();
        }
        
        // Time's up handling
        if (newTime >= EXAM_DURATION) {
          saveNow(); // Final save
          setShowEndDialog(true); // Show end dialog
          return EXAM_DURATION;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted, timeElapsed]);

  const updateAnswer = (questionId: string, content: string) => {
    // Only update if content has changed
    if (answers[questionId] !== content) {
      setAnswers((prev) => ({ ...prev, [questionId]: content }));
      if (!questionStatus[questionId]) {
        setQuestionStatus((prev) => ({ ...prev, [questionId]: "answered" }));
      }
    }
  };

  const markForReview = () => {
    setQuestionStatus((prev) => ({
      ...prev,
      [currentQuestion.id]: "marked",
    }));
  };

  const downloadAttempt = () => {
    const blob = new Blob([JSON.stringify({ examQuestions, answers, timeElapsed }, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam-attempt-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: QuestionStatus | undefined) => {
    switch (status) {
      case "answered":
        return "bg-green-500/20 border-green-500";
      case "marked":
        return "bg-yellow-500/20 border-yellow-500";
      default:
        return "bg-muted/20 border-muted";
    }
  };

  // Calculate time remaining
  const timeRemaining = EXAM_DURATION - timeElapsed;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Reset progress if accessing directly
  useEffect(() => {
    if (!selectedSubject && !savedProgress) {
      localStorage.removeItem('examProgress');
      setTimeElapsed(0);
    }
  }, [selectedSubject, savedProgress]);

  // Toggle fullscreen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // If subject is not selected and there's no saved progress, show subject selector
  if (showSubjectSelector) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Select a Subject</h1>
            <p className="text-muted-foreground mb-6">Choose a subject to start your exam practice session</p>
          </motion.div>
          <SubjectSelector departments={departments} onSelect={handleSubjectSelect} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {!isFullScreen && <Navbar />}

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {!isFullScreen && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        )}

        {/* Start Dialog */}
        <AlertDialog open={showStartDialog} onOpenChange={setShowStartDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Ready to Start?</AlertDialogTitle>
              <AlertDialogDescription>
                You will have 90 minutes to complete 6 questions. Your progress will be auto-saved every minute.
                <br /><br />
                <strong>Tips:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Read each question carefully</li>
                  <li>Use the rich text editor to format your answers</li>
                  <li>Mark questions for review if you want to come back later</li>
                  <li>Your progress is saved automatically</li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowSubjectSelector(true)}>
                Choose Different Subject
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => {
                setShowStartDialog(false);
                setHasStarted(true);
              }}>
                Start Exam
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* End Dialog */}
        <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Time's Up!</AlertDialogTitle>
              <AlertDialogDescription>
                Your exam time has ended. Your answers have been saved automatically.
                <br /><br />
                You can download your attempt or return to the home page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={downloadAttempt}>
                Download Attempt
              </AlertDialogCancel>
              <AlertDialogAction onClick={endExam}>
                Return Home
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Main Exam Interface */}
        {hasStarted && currentQuestion && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Question Panel */}
            <div className="lg:col-span-3 space-y-6">
              {/* Header with Timer */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg border border-border bg-card"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    timeRemaining < 300 ? 'bg-red-500/20 text-red-500' : 'bg-primary/20 text-primary'
                  }`}>
                    <Timer size={20} />
                    <span className="font-mono text-lg font-bold">
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {examQuestions.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={saveNow}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                    title="Save Progress"
                  >
                    <Save size={18} />
                    <span className="hidden sm:inline">Save</span>
                  </button>
                  <button
                    onClick={downloadAttempt}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                    title="Download Attempt"
                  >
                    <Download size={18} />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                  <button
                    onClick={toggleFullScreen}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                    title="Toggle Fullscreen"
                  >
                    {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  </button>
                </div>
              </motion.div>

              {/* Question */}
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 rounded-lg border border-border bg-card"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="text-lg font-medium text-foreground">
                    {currentQuestion.text}
                  </h2>
                  <span className="shrink-0 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                    {currentQuestion.marks} marks
                  </span>
                </div>
                <RichTextEditor
                  content={answers[currentQuestion.id] || ''}
                  onChange={(content) => updateAnswer(currentQuestion.id, content)}
                />
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={markForReview}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    questionStatus[currentQuestion.id] === 'marked'
                      ? 'border-yellow-500 bg-yellow-500/20 text-yellow-500'
                      : 'border-border hover:bg-accent'
                  }`}
                >
                  <Flag size={18} />
                  <span>{questionStatus[currentQuestion.id] === 'marked' ? 'Marked' : 'Mark for Review'}</span>
                </button>
                <button
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(examQuestions.length - 1, prev + 1))}
                  disabled={currentQuestionIndex === examQuestions.length - 1}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Question Navigator Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-20 p-4 rounded-lg border border-border bg-card"
              >
                <h3 className="font-semibold mb-4 text-foreground">Question Navigator</h3>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {examQuestions.map((q, index) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`aspect-square rounded-lg border-2 flex items-center justify-center font-medium transition-all ${
                        currentQuestionIndex === index
                          ? 'border-primary bg-primary text-primary-foreground'
                          : getStatusColor(questionStatus[q.id])
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {/* Legend */}
                <div className="space-y-2 text-sm border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-muted/20 border-2 border-muted"></div>
                    <span className="text-muted-foreground">Unattempted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-500/20 border-2 border-green-500"></div>
                    <span className="text-muted-foreground">Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-yellow-500/20 border-2 border-yellow-500"></div>
                    <span className="text-muted-foreground">Marked for Review</span>
                  </div>
                </div>

                {/* End Exam Button */}
                <button
                  onClick={() => setShowEndDialog(true)}
                  className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors font-medium"
                >
                  <LogOut size={18} />
                  End Exam
                </button>

                {/* Restart Button */}
                <button
                  onClick={restartExam}
                  className="w-full mt-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors text-sm text-muted-foreground"
                >
                  Restart with New Questions
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
