import type { FC } from 'react';
import './metadata-point.css';
import { formatTime } from './utils/format-time';

interface MetadataPointProps {
    cue: VTTCue | TextTrackCue;
    seek: (time: number) => void;
}

const MetadataPoint: FC<MetadataPointProps> = ({ cue, seek }) => {
    const onClick = () => seek(cue.startTime);

    const data = 'text' in cue ? JSON.parse(cue.text) : {};
    const titleAlt = data.title_alt ? (
        <h3 className="titleAlt">{data.title_alt}</h3>
    ) : (
        ''
    );
    const synopsis = data.synopsis ? (
        <div className="field">
            <span>Synopsis</span>
            {data.synopsis}
        </div>
    ) : (
        ''
    );
    const synopsisAlt = data.synopsis_alt ? <div>{data.synopsis_alt}</div> : '';
    const keywords = data.keywords ? (
        <div className="field">
            <span>Keywords: </span>
            {data.keywords}
        </div>
    ) : (
        ''
    );
    const keywordsAlt = data.keywords_alt ? (
        <div className="field">
            <span>Alternative Keywords: </span>
            {data.keywords_alt}
        </div>
    ) : (
        ''
    );
    const subjects = data.subjects ? (
        <div className="field">
            <span>Subjects: </span>
            {data.subjects}
        </div>
    ) : (
        ''
    );
    const subjectsAlt = data.subjects_alt ? (
        <div className="field">
            <span>Alternative Subjects: </span>
            {data.subjects_alt}
        </div>
    ) : (
        ''
    );
    const gpsLink = data.gpspoints.gps ? (
        <div className="field">
            <span>Geo: </span>
            <a
                href={`https://www.google.com/maps/@?api=1&map_action=map&center=${data.gpspoints.gps}&zoom=${data.gpspoints.gps_zoom}`}
            >
                {data.gpspoints.gps_text}
            </a>
        </div>
    ) : (
        ''
    );
    const hyperlinks = data.hyperlinks.hyperlink_text ? (
        <div className="field">
            <span>Links: </span>
            <a href={data.hyperlinks.hyperlink}>
                {data.hyperlinks.hyperlink_text}
            </a>
        </div>
    ) : (
        ''
    );
    return (
        <div className="point">
            <div className="time" onClick={onClick}>
                [{formatTime(cue.startTime)}]
            </div>
            <div className="text">
                <h2 className="title" onClick={onClick}>
                    {data.title}
                </h2>
                {titleAlt}
                {synopsis}
                {synopsisAlt}
                {keywords}
                {keywordsAlt}
                {subjects}
                {subjectsAlt}
                {gpsLink}
                {hyperlinks}
            </div>
        </div>
    );
};

export default MetadataPoint;
