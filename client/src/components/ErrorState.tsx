/**
 * Error state component
 * Team Wintermute
 */

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="my-8 animate-fade-in rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 to-red-900/20 p-4 sm:p-6 backdrop-blur dark:from-red-950/40 dark:to-red-900/20 dark:border-red-500/30">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-4">
        <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20 text-2xl ring-1 ring-red-400/30 dark:bg-red-500/20 dark:ring-red-400/30">
          ⚠️
        </div>
        <div className="flex-grow">
          <h3 className="text-base sm:text-lg font-semibold text-red-200 dark:text-red-200">Terjadi Kesalahan</h3>
          <p className="mt-1 text-sm sm:text-base text-red-100/80 dark:text-red-100/80">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 px-4 py-2 text-sm font-semibold rounded-lg bg-red-500/20 text-red-200 border border-red-400/30 hover:bg-red-500/30 transition-all duration-200 dark:bg-red-500/20 dark:text-red-200 dark:border-red-400/30 dark:hover:bg-red-500/30"
            >
              Coba Lagi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
