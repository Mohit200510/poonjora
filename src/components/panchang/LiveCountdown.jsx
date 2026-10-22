
import styles from "./LiveCountdown.module.css";

function LiveCountdown({ endTime, now = Date.now() }) {
  if (!endTime) return null;

  const end = new Date(endTime).getTime();

  if (!Number.isFinite(end)) return null;

  // Remaining time in seconds
  const remaining = Math.max(
    0,
    Math.ceil((end - now) / 1000)
  );

  // Convert seconds into HH:MM:SS
  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const countdown = [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ].join(":");

  return (
    <div className={styles.countdown}>
      <span className={styles.time}>{countdown}</span>
      <small className={styles.label}>remaining</small>
    </div>
  );
}

export default LiveCountdown;
