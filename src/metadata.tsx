import type { FC } from 'react';

import MetadataPoint from './metadata-point';
import './track.css';

type MetadataProps = {
    track: TextTrack | null;
    url?: string;
    seek: (time: number) => void;
};

const Metadata: FC<MetadataProps> = ({ track, seek }) => (
    <div className="track">
        {Array.from(track?.cues || []).map((cue, i) => (
            <MetadataPoint key={`point-${i}`} cue={cue} seek={seek} />
        ))}
    </div>
);

export default Metadata;
export type { MetadataProps };
