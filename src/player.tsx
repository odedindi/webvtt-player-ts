import React, { useCallback, useEffect, useRef, useState } from 'react';
import Transcript from './transcript';
import Metadata from './metadata';
import Search from './search';
import './player.css';

interface PlayerProps {
    src?: string;
    transcript?: string;
    metadata?: string;
    preload?: boolean;
    query?: string;
}

const Player: React.FC<PlayerProps> = ({
    src = '',
    transcript = '',
    metadata = '',
    preload = false,
    query = '',
}) => {
    const [state, setState] = useState(() => ({
        loaded: false,
        currentTime: 0,
        query: '',
    }));

    const trackRef = useRef<HTMLTrackElement>(null);
    const metatrackRef = useRef<HTMLTrackElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const onLoaded = useCallback(() => {
        setState((s) => ({ ...s, loaded: true }));
    }, []);

    const checkIfLoaded = useCallback(
        (tries = 0) => {
            tries += 1;
            const e = trackRef.current;
            if (e && e.track && e.track.cues && e.track.cues.length > 0)
                onLoaded();
            else if (!state.loaded) {
                const wait = 25 * Math.pow(tries, 2);
                setTimeout(() => checkIfLoaded(tries), wait);
            }
        },
        [state.loaded, onLoaded],
    );
    useEffect(() => {
        checkIfLoaded();
    }, []);

    const seek = useCallback((secs: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = secs;
            audioRef.current.play();
        }
    }, []);

    const updateQuery = useCallback((query: string) => {
        setState((s) => ({ ...s, query }));
    }, []);

    const track = trackRef.current?.track || null;
    const metatrack = metatrackRef.current?.track || null;
    return (
        <div className="webvtt-player">
            <div className="media">
                <div className="player">
                    <audio
                        controls
                        crossOrigin="anonymous"
                        onLoadedData={onLoaded}
                        preload={preload ? 'auto' : 'none'}
                        ref={audioRef}
                    >
                        {src && <source src={src} />}
                        {/* Always provide a captions track for accessibility */}
                        <track
                            kind="captions"
                            src={transcript || ''}
                            ref={trackRef}
                            default={!!transcript}
                            label={
                                transcript
                                    ? 'Captions'
                                    : 'No captions available'
                            }
                        />

                        {metadata && (
                            <track
                                default
                                kind="metadata"
                                src={metadata}
                                ref={metatrackRef}
                            />
                        )}
                    </audio>
                </div>
                <div className="tracks">
                    <Transcript
                        url={transcript}
                        seek={seek}
                        track={track}
                        query={query}
                    />
                    {metadata ? (
                        <Metadata
                            url={metadata}
                            seek={seek}
                            track={metatrack}
                        />
                    ) : (
                        ''
                    )}
                </div>
                <Search query={query} updateQuery={updateQuery} />
            </div>
        </div>
    );
};

// class Player extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             loaded: false,
//             currentTime: 0,
//             query: '',
//         };
//         this.track = React.createRef();
//         this.metatrack = React.createRef();
//         this.audio = React.createRef();

//         this.onLoaded = this.onLoaded.bind(this);
//         this.seek = this.seek.bind(this);
//         this.checkIfLoaded = this.checkIfLoaded.bind(this);
//         this.updateQuery = this.updateQuery.bind(this);
//     }

//     componentDidMount() {
//         this.checkIfLoaded();
//     }

//     render() {
//         let track = null;
//         let metatrack = null;
//         if (this.state.loaded) {
//             track = this.track.current.track;
//             metatrack = this.metatrack.current.track;
//         }
//         const preload = this.props.preload ? 'true' : 'false';
//         const metadata = this.props.metadata ? (
//             <Metadata
//                 url={this.props.metadata}
//                 seek={this.seek}
//                 track={metatrack}
//             />
//         ) : (
//             ''
//         );
//         return (
//             <div className="webvtt-player">
//                 <div className="media">
//                     <div className="player">
//                         <audio
//                             controls
//                             crossOrigin="anonymous"
//                             onLoad={this.onLoaded}
//                             preload={preload}
//                             ref={this.audio}
//                         >
//                             <source src={this.props.audio} />
//                             <track
//                                 default
//                                 kind="subtitles"
//                                 src={this.props.transcript}
//                                 ref={this.track}
//                             />
//                             <track
//                                 default
//                                 kind="metadata"
//                                 src={this.props.metadata}
//                                 ref={this.metatrack}
//                             />
//                         </audio>
//                     </div>
//                     <div className="tracks">
//                         <Transcript
//                             url={this.props.transcript}
//                             seek={this.seek}
//                             track={track}
//                             query={this.state.query}
//                         />
//                         {metadata}
//                     </div>
//                     <Search
//                         query={this.state.query}
//                         updateQuery={this.updateQuery}
//                     />
//                 </div>
//             </div>
//         );
//     }

//     onLoaded() {
//         this.setState({ loaded: true });
//     }

//     checkIfLoaded(tries = 0) {
//         tries += 1;
//         const e = this.track.current;
//         if (e && e.track && e.track.cues && e.track.cues.length > 0) {
//             this.onLoaded();
//         } else if (!this.state.loaded) {
//             const wait = 25 * Math.pow(tries, 2);
//             setTimeout(this.checkIfLoaded, wait, tries);
//         }
//     }

//     seek(secs) {
//         this.audio.current.currentTime = secs;
//         this.audio.current.play();
//     }

//     updateQuery(query) {
//         this.setState({ query: query });
//     }
// }

export default Player;
