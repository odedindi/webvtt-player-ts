import { type FC, useCallback, useEffect, useState } from 'react';

import './transcript-line.css';
import { formatTime } from './utils/format-time';

type TranscriptLineProps = {
    cue: VTTCue | TextTrackCue;
    seek: (time: number) => void;
    query?: string;
    active?: boolean;
};

const TranscriptLine: FC<TranscriptLineProps> = ({ cue, seek, query }) => {
    const [isActive, setIsActive] = useState(false);

    const onEnter = useCallback(() => setIsActive(true), []);
    const onExit = useCallback(() => setIsActive(false), []);

    useEffect(() => {
        cue.onenter = onEnter;
        cue.onexit = onExit;
        return () => {
            cue.onenter = null;
            cue.onexit = null;
        };
    }, [cue, onEnter, onExit]);

    const onClick = () => {
        seek(cue.startTime);
    };
    const text = 'text' in cue ? cue.text : '';
    const match = Boolean(
        query && 'text' in cue && new RegExp(query, 'i').test(text),
    );
    let className = '';
    if (match) className = 'match';
    else if (isActive) className = 'active';

    return (
        <div
            className={`${className} line`}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            <div className="time">
                [{formatTime(cue.startTime)} - {formatTime(cue.endTime)}]
            </div>
            <div
                className={`${className} text`}
                // note: dangerouslySetInnerHTML is used because the text may contain HTML
                dangerouslySetInnerHTML={{ __html: text }}
            />
        </div>
    );
};

export default TranscriptLine;
export type { TranscriptLineProps };
