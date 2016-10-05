import React, { PropTypes } from 'react';
import * as styles from '../styles/element-styles';

class ProgressBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoSegments: [],
            segmentKeyPrefix: 1
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

    _buildVideoSegments(events, windowStart, windowEnd) {
        let segmentStart = windowStart;
        const videoSegments = [];
        events.filter((event) => {
            return (event !== undefined &&
                    ((event.startTime >= windowStart && event.startTime < windowEnd) ||
                     (event.endTime >= windowStart && event.endTime < windowEnd)));
        }).forEach((event) => {
            if(event.startTime > segmentStart) {
                videoSegments.push({
                    startTime: segmentStart,
                    endTime: event.startTime,
                    width: this.widthCalculator(event.startTime, segmentStart),
                    hasAlert: false
                });
            } 
            segmentStart = Math.max(segmentStart, event.startTime);
            const segmentEnd = Math.min(windowEnd, event.endTime);
            videoSegments.push({
                startTime: segmentStart,
                endTime: segmentEnd,
                width: this.widthCalculator(segmentEnd, segmentStart),
                hasAlert: true,
                text: event.text
            });
            segmentStart = segmentEnd;
        });
        if (segmentStart < windowEnd) {
            videoSegments.push({
                startTime: segmentStart,
                endTime: windowEnd,
                width: this.widthCalculator(windowEnd, segmentStart),
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
            const segmentKeyPrefix = this.state.segmentKeyPrefix + 1;
            this.setState({ videoSegments, segmentKeyPrefix });
        }
    }

    render() {
        const positionMarkerStyle = {
            position: 'absolute',
            left: this.widthCalculator(this.props.currentPos),
            display: 'inline-block'
        };

        return (
            <div style={ { position: 'relative' } }>
              <div style={ positionMarkerStyle }>
                *
              </div>
              { this.state.videoSegments.map((segment, index) => {
                    const style = styles.ClickableElement
                        .merge({
                            width: segment.width,
                            backgroundColor: segment.hasAlert ?
                                this.context.muiTheme.palette.accent1Color :
                                this.context.muiTheme.palette.shadowColor,
                            display: 'inline-block',
                            clear: 'both',
                            height: 20,
                            animation: 'expando 0.5s ease-in-out'
                        }).style;
                    return (
                        <div key={ `${this.state.segmentKeyPrefix}_${index}` } style={ style } onClick={ this.getSegmentClickedHandler(segment) }>
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

ProgressBarComponent.contextTypes = {
    muiTheme: PropTypes.object.isRequired
};

export default ProgressBarComponent;
