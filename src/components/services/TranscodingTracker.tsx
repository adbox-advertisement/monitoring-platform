import type {
  TranscodingState,
  TranscodingStep,
} from "#/features/dashboard/dashboard.types";

const RESOLUTIONS = ["240p", "360p", "480p", "720p", "1080p"] as const;

const stepLabel: Record<TranscodingStep, string> = {
  pending: "-",
  active: "…",
  done: "✓",
};

export function TranscodingTracker({ state }: { state: TranscodingState }) {
  return (
    <div className="transcoding-tracker">
      <p className="tc-label">transcoding</p>
      <div className="tc-bars">
        {RESOLUTIONS.map((res) => (
          <div key={res} className="tc-item">
            <div className="tc-track">
              <div className={`tc-fill ${state[res]}`} />
            </div>
            <span className="tc-res">
              {res} {stepLabel[state[res]]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
