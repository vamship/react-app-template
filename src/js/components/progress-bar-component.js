import React, { PropTypes } from 'react';
import * as styles from '../styles/element-styles';

class ProgressBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoSegments: []
        };
        this.widthCalculator = this._getWidthCalculator(0);
        this.getSegmentClickedHandler = (segment) => {
            return () => {
                console.log(`Segment clicked: ${segment}`);
                this.props.onBarClicked(segment);
            };
        };
    }

    _getWidthCalculator(totalWidth) {
        if(totalWidth <= 0) {
            return () => {
                console.warn('Cannot calculate segment width. Total video length is <= 0');
                return '0%';
            };
        }
        return (endTime, startTime) => {
            if(typeof startTime === 'undefined') {
                startTime = 0;
            }
            const width = endTime - startTime;
            if(isNaN(width) || width < 0) {
                console.warn(`Segment width is not a number or is negative: ${width} (${endTime}, ${startTime})`);
                return '0%';
            }
            return `${width * 100/totalWidth}%`;
        };
    }

    _buildVideoSegments(events, startTime, endTime) {
        let segmentBoundary = startTime;
        const videoSegments = [];
        events.filter((event) => {
            return (event !== undefined &&
                    ((event.startTime >= startTime && event.startTime < endTime) ||
                     (event.endTime >= startTime && event.endTime < endTime)));
        }).forEach((event) => {
            if(event.startTime > segmentBoundary) {
                videoSegments.push({
                    startTime: segmentBoundary,
                    endTime: event.startTime,
                    width: this.widthCalculator(event.startTime, segmentBoundary),
                    type: 'filler',
                    hasAlert: false
                });
                segmentBoundary = event.startTime;
            } 
            segmentBoundary = Math.min(segmentBoundary, event.startTime);
            videoSegments.push({
                startTime: segmentBoundary,
                endTime: event.endTime,
                width: this.widthCalculator(event.endTime, segmentBoundary),
                type: 'alert',
                hasAlert: true,
                text: event.text
            });
            segmentBoundary = event.endTime;
        });
        if (segmentBoundary < endTime) {
            videoSegments.push({
                startTime: segmentBoundary,
                endTime,
                width: this.widthCalculator(endTime, segmentBoundary),
                type: 'end_filler',
                hasAlert: false
            });
        }
        return videoSegments;
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.startTime !== nextProps.startTime ||
           this.props.endTime !== nextProps.endTime) {
            const delta = nextProps.endTime - nextProps.startTime;
            this.widthCalculator = this._getWidthCalculator(delta);
            const videoSegments = this._buildVideoSegments(nextProps.events,
                                                          nextProps.startTime,
                                                          nextProps.endTime);
            this.setState({ videoSegments });
        }
    }

    render() {
        const positionMarkerStyle = {
            position: 'absolute',
            left: this.widthCalculator(this.props.currentPos),
            display: 'inline-block'
        };

        return (
            <div style={ {
                position: 'relative',
                height: 50,
                border: 'solid 1px pink'
            } }>
              <div style={ positionMarkerStyle }>
                *
              </div>
              { this.state.videoSegments.map((segment, index) => {
                    const style = styles.ClickableElement
                        .merge({
                            width: segment.width,
                            backgroundColor: segment.hasAlert ? 'red' : '#434343',
                            display: 'inline-block',
                            clear: 'both',
                            height: 20
                        }).style;
                    return (
                        <div key={ index } style={ style } onClick={ this.getSegmentClickedHandler(segment) }>
                        </div>
                        );
                }) }
            </div>
        );
    }
}

ProgressBarComponent.propTypes = {
    startTime: function(props, propName, componentName) {
        const startTime = props[propName];
        if(typeof startTime !== 'number' || startTime < 0) {
            return new Error(`Invalid startTime supplied to ${componentName}. Must be a non negative number.`);
        }
    },
    endTime: function(props, propName, componentName) {
        const startTime = props.startTime;
        const endTime = props[propName];
        if(typeof endTime !== 'number' || endTime < startTime) {
            return new Error(`Invalid endTime supplied to ${componentName}. Must be greater than or equal to startTime (${startTime}).`);
        }
    },
    onBarClicked: PropTypes.func.isRequired,
    currentPos: PropTypes.number,
    events: PropTypes.arrayOf(PropTypes.shape({
        startTime: PropTypes.number.isRequired,
        endTime: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default ProgressBarComponent;
