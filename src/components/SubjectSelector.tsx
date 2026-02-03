import { motion } from "framer-motion";
import type { Department } from "@/data/courses";
import { memo } from "react";

interface SubjectSelectorProps {
  departments: Department[];
  onSelect: (departmentId: string, subjectId: string) => void;
}

const SubjectSelector = memo(function SubjectSelector({ departments, onSelect }: SubjectSelectorProps) {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-6">
      {departments.map((department) => (
        <motion.div
          key={department.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-3 gradient-text">{department.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {department.subjects.map((subject) => (
              <motion.button
                key={subject.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(department.id, subject.id)}
                className="p-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary transition-all duration-200 text-left"
              >
                <h3 className="font-medium text-foreground">{subject.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {subject.questions.length} questions available
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
});

export default SubjectSelector;
