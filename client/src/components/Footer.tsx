/**
 * Footer component
 * Team Wintermute
 */

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-white/5 bg-slate-950/50 py-8 px-4 sm:px-6 lg:px-8 text-slate-400 dark:border-white/5 dark:bg-slate-950/50">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-8">
          {/* Brand */}
          <div>
            <p className="font-semibold text-white mb-2 dark:text-white">Wintermute</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Digital Image Lab untuk klasifikasi kematangan rambutan</p>
          </div>

          {/* Technology */}
          <div>
            <p className="font-semibold text-white mb-3 dark:text-white">Technology Stack</p>
            <ul className="text-sm space-y-1 dark:text-slate-400">
              <li>Frontend: React + TypeScript + Tailwind CSS</li>
              <li>Image Processing: Python + OpenCV</li>
              <li>Classification: K-NN Algorithm</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="font-semibold text-white mb-3 dark:text-white">Tentang Proyek</p>
            <ul className="text-sm space-y-1 dark:text-slate-400">
              <li>Team: Wintermute</li>
              <li>Purpose: University Final Project</li>
              <li>Focus: Digital Image Processing & ML</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-sm dark:border-white/5">
          <p className="text-slate-500 dark:text-slate-400">© 2024-2026 Team Wintermute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
