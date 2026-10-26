
import styles from "./PanchangProgress.module.css";

export const calculateProgress = (startTime, endTime, now) => {
  if (!startTime || !endTime) return null;

  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const current = now ?? Date.now();

  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    !Number.isFinite(current) ||
    end <= start
  ) {
    return null;
  }

  return Math.min(
    100,
    Math.max(0, ((current - start) / (end - start)) * 100)
  );
};

export default function PanchangProgress({
  progress,
}) {
  if (progress === null || progress === undefined) {
    return null;
  }

  return (
    <div
      className={styles.progressTrack}
      role="progressbar"
      aria-label="Panchang period completed"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <div
        className={styles.progressFill}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
