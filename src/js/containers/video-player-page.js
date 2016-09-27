import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import VideoPositionMarker from 'material-ui/svg-icons/hardware/videogame-asset';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import Slider from 'material-ui/Slider';
import * as styles from '../styles/element-styles';

class VideoPlayerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            videoSegments: []
        };

        this.video = null;
        this.loopStart = -1;
        this.loopEnd = -1;

        this.handlePlayPauseClick = (e) => {
            if(!this._isVideoReady()) {
                return;
            }
            if (this.video.paused || this.video.ended) {
                this.video.play();
            } else {
                this.video.pause();
            }
        };
        this.handleStopClick = (e) => {
            console.log('Play/pause clicked');
        };
        this.getSegmentClickedHandler = (marker) => {
            return (e) => {
                if(!this._isVideoReady()) {
                    return;
                }
                this.loopStart = marker.startTime;
                this.loopEnd = marker.endTime;
                this.video.currentTime = marker.startTime;
            };
        };
    }

    _isVideoReady() {
        if(!this.video) {
            console.log('Video not initialized');
            return false;
        }
        return true;
    }

    _getWidthAsPercentage(width) {
        if(!this._isVideoReady()) {
            return;
        }
        if (!this.video.duration) {
            return 0;
        }
        return Math.floor((width / this.video.duration) * 10000)/100;
    }

    _buildSegments(markers) {
        if(!this._isVideoReady()) {
            return [];
        }
        let startTime = 0;
        const videoSegments = [];
        markers.forEach((marker) => {
            if (marker.startTime > startTime) {
                videoSegments.push({
                    startTime,
                    endTime: marker.startTime - 0.1,
                    width: this._getWidthAsPercentage(marker.startTime - startTime),
                    hasAlert: false
                });
                startTime = marker.startTime;
            }
            videoSegments.push({
                startTime,
                endTime: marker.endTime,
                width: this._getWidthAsPercentage(marker.endTime - startTime),
                hasAlert: true,
                text: marker.text
            });
            startTime = marker.endTime + 0.1;
        });
        if (startTime < this.video.duration) {
            videoSegments.push({
                startTime,
                endTime: this.video.duration,
                width: this._getWidthAsPercentage(this.video.duration - startTime),
                hasAlert: false
            });
        }

        console.log(videoSegments.reduce((prev, cur) => {
            return prev + cur.width;
        }, 0));

        return videoSegments;
    }

    componentDidMount() {
        this.video = ReactDOM.findDOMNode(this.refs.video);

        this.video.addEventListener('loadedmetadata', () => {
            const cues = this.video.textTracks[0].cues;
            const markers = Object.keys(cues).map((prop, index) => {
                const marker = cues[prop];
                if (typeof marker === 'object') {
                    return {
                        startTime: marker.startTime,
                        endTime: marker.endTime,
                        text: marker.text
                    };
                }
                return undefined;
            }).filter(item => {
                return item !== undefined;
            }).sort((first, second) => {
                return first.startTime - second.startTime;
            });

            this.setState({
                videoSegments: this._buildSegments(markers)
            });
        });

        this.video.addEventListener('timeupdate', () => {
            const progressWidth = this._getWidthAsPercentage(this.video.currentTime);
            this.setState({
                progress: progressWidth
            });
            if(this.loopStart >= 0 && this.loopEnd >= this.loopStart) {
                if(this.video.currentTime > this.loopEnd) {
                    this.video.currentTime = this.loopStart;
                }
            }
        });
    }

    render() {
        return (
            <div style={ { paddingTop: 30, border: 'solid 1px green' } }>
              <div style={ { width: 720 } }>
                <video ref="video" preload="metadata">
                  <source src="content/video/sintel-short.webm" type="video/webm" />
                  <source src="content/video/sintel-short.mp4" type="video/mp4" />
                  <track
                         label="English"
                         kind="subtitles"
                         srcLang="en"
                         src="content/subtitles/vtt/sintel-en.vtt"
                         default />
                  <track
                         label="Deutsch"
                         kind="subtitles"
                         srcLang="de"
                         src="content/subtitles/vtt/sintel-de.vtt" />
                  <track
                         label="Español"
                         kind="subtitles"
                         srcLang="es"
                         src="content/subtitles/vtt/sintel-es.vtt" />
                </video>
                <div style={ { position: 'relative' } }>
                    <div style={ { position: 'absolute', left: this.state.progress + '%', display: 'inline-block' } }>
                        *
                    </div>
                  { this.state.videoSegments.map((segment, index) => {
                      const style = styles.ClickableElement
                        .merge({
                            width: segment.width + '%',
                            backgroundColor: segment.hasAlert ? 'red' : '#434343',
                            display: 'inline-block'
                        }).style;
                        return (
                            <div key={ index } style={ style } onClick={ this.getSegmentClickedHandler(segment) }>
                                &nbsp;
                            </div>
                            );
                    }) }
                </div>
              </div>
              <div>
                <span><button ref="playpause" type="button" onClick={ this.handlePlayPauseClick }> Play/Pause </button></span>
                <span><button ref="stop" type="button" onClick={ this.handleStopClick }> Stop </button></span>
              </div>
            </div>
            );
    }
}

const VideoPlayerPage = VideoPlayerComponent;
export default VideoPlayerPage;
/*
              <span style={ { width: this.state.progress + '%', display: 'inline-block', background: 'red' } }></span>
              <VideoPositionMarker />
            <!--
            <Slider min={ 0 } max={ 100 } value={ this.state.progress } />
            { this.state.videoSegments.map((marker, index) => {
                  const style = {
                      position: 'absolute',
                      top: 365,
                      left: marker.position + '%',
                      width: marker.width + '%',
                      width: 10,
                      height: 10
                  };
                  return (
                      <div style={ style } key={ index }>
                        <div style={ { paddingBottom: 10, backgroundColor: 'red' } }></div>
                        <WarningIcon onClick={ this.getSegmentClickedHandler(marker) } />
                      </div>
                      );
              }) }
              -->
*/
