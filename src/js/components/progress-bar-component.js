import React, { PropTypes } from 'react';
import * as styles from '../styles/element-styles';

class ProgressBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoSegments: [],
            segmentKeyPrefix: 1
        };
        this.calculateWidth = this._getWidthCalculator(0);
        this.calculatePosition = this._getPositionCalculator(0, 0);
        this.getSegmentClickedHandler = (segment) => {
            return (e) => {
                const percentPosition = (e.clientX/e.target.parentElement.offsetWidth);
                const position = this.calculatePosition(percentPosition);
                this.props.onBarClicked({
                    position,
                    segment
                });
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

    _getPositionCalculator(windowStart, totalWidth) {
        console.log('Generating position calculator', windowStart, totalWidth);
        return (percentPosition) => {
            const offset = totalWidth * percentPosition;
            const position = windowStart + offset;
            console.log(`Position: ${percentPosition} * ${totalWidth} = ${offset}; ${windowStart}; ${position}`);
            return position;
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
                    width: this.calculateWidth(event.startTime, segmentStart),
                    hasAlert: false
                });
            } 
            segmentStart = Math.max(segmentStart, event.startTime);
            const segmentEnd = Math.min(windowEnd, event.endTime);
            videoSegments.push({
                startTime: segmentStart,
                endTime: segmentEnd,
                width: this.calculateWidth(segmentEnd, segmentStart),
                hasAlert: true,
                text: event.text
            });
            segmentStart = segmentEnd;
        });
        if (segmentStart < windowEnd) {
            videoSegments.push({
                startTime: segmentStart,
                endTime: windowEnd,
                width: this.calculateWidth(windowEnd, segmentStart),
                hasAlert: false
            });
        }
        return videoSegments;
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.windowStart !== nextProps.windowStart ||
           this.props.windowEnd !== nextProps.windowEnd) {
            const delta = nextProps.windowEnd - nextProps.windowStart;
            this.calculateWidth = this._getWidthCalculator(delta);
            this.calculatePosition = this._getPositionCalculator(nextProps.windowStart, delta);
            const videoSegments = this._buildVideoSegments(nextProps.events,
                                                          nextProps.windowStart,
                                                          nextProps.windowEnd);
            const segmentKeyPrefix = this.state.segmentKeyPrefix + 1;
            this.setState({ videoSegments, segmentKeyPrefix });
        }
        if(this.props.currentPos >= nextProps.windowEnd) {
            this.props.onWindowEnd();
        }
    }

    render() {
        const positionMarkerStyle = {
            position: 'absolute',
            left: this.calculateWidth(this.props.currentPos, this.props.windowStart),
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
                            animation: 'expando 0.3s ease-in'
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
    windowStart: function(props, propName, componentName) {
        const windowStart = props[propName];
        if(typeof windowStart !== 'number' || windowStart < 0) {
            return new Error(`Invalid windowStart supplied to ${componentName}. Must be a non negative number.`);
        }
    },
    windowEnd: function(props, propName, componentName) {
        const windowStart = props.windowStart;
        const windowEnd = props[propName];
        if(typeof windowEnd !== 'number' || windowEnd < windowStart) {
            return new Error(`Invalid windowEnd supplied to ${componentName}. Must be greater than or equal to windowStart (${windowStart}).`);
        }
    },
    onBarClicked: PropTypes.func.isRequired,
    onWindowEnd: PropTypes.func.isRequired,
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
