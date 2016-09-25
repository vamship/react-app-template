import React, { PropTypes } from 'react';

class VideoPlayerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div style={ { paddingTop: 30 } }>Video player!
                <video id="video" controls preload="metadata">
                    <source src="content/video/sintel-short.webm"
                        type="video/webm" />
                    <source src="content/video/sintel-short.mp4"
                        type="video/mp4" />
                    <track label="English" kind="subtitles" srclang="en" src="content/subtitles/vtt/sintel-en.vtt" default />
                    <track label="Deutsch" kind="subtitles" srclang="de" src="content/subtitles/vtt/sintel-de.vtt" />
                    <track label="Español" kind="subtitles" srclang="es" src="content/subtitles/vtt/sintel-es.vtt" />
                </video>
            </div>
        );
    }
}

const VideoPlayerPage = VideoPlayerComponent;
export default VideoPlayerPage;
