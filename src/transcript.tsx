import type { FC } from 'react';

import TranscriptLine from './transcript-line';
import './track.css';

type TranscriptProps = {
    track: TextTrack | null;
    url?: string;
    seek: (time: number) => void;
    query?: string;
};

const Transcript: FC<TranscriptProps> = ({ track, seek, query }) => (
    <div className="track">
        {Array.from(track?.cues || []).map((cue, i) => (
            <TranscriptLine
                key={`line-${i}`}
                cue={cue}
                active={false}
                seek={seek}
                query={query}
            />
        ))}
    </div>
);

export default Transcript;
export type { TranscriptProps };
