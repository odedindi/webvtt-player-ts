import React, { FC } from 'react';

interface PlayerProps {
    src?: string;
    transcript?: string;
    metadata?: string;
    preload?: boolean;
    query?: string;
}
declare const Player: React.FC<PlayerProps>;

type MetadataProps = {
    track: TextTrack | null;
    url?: string;
    seek: (time: number) => void;
};
declare const Metadata: FC<MetadataProps>;

interface MetadataPointProps {
    cue: VTTCue | TextTrackCue;
    seek: (time: number) => void;
}
declare const MetadataPoint: FC<MetadataPointProps>;

interface SearchProps {
    query: string;
    updateQuery: (query: string) => void;
}
declare const Search: FC<SearchProps>;

type TranscriptProps = {
    track: TextTrack | null;
    url?: string;
    seek: (time: number) => void;
    query?: string;
};
declare const Transcript: FC<TranscriptProps>;

type TranscriptLineProps = {
    cue: VTTCue | TextTrackCue;
    seek: (time: number) => void;
    query?: string;
    active?: boolean;
};
declare const TranscriptLine: FC<TranscriptLineProps>;

export { Metadata, MetadataPoint, Player, Search, Transcript, TranscriptLine };
