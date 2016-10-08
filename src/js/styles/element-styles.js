import Style from './style';

/**
 * Center aligned div tag.
 */
export const CenterAlignedDiv = new Style({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: 'auto'
});

/**
 * Element with center aligned text.
 */
export const CenterAlignedText = new Style({
    textAlign: 'center'
});

/**
 * Element that can be clicked.
 */
export const ClickableElement = new Style({
    cursor: 'pointer'
});

/**
 * Small text element.
 */
export const SmallText = new Style({
    fontSize: 12,
    lineHeight: '12px',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
});

/**
 * Coloring for error text.
 */
export const ErrorColor = new Style({
    color: 'rgb(244, 67, 54)'
});

/**
 * Style for website logo.
 */
export const LogoStyle = new Style({
    height: 24,
    paddingRight: 10,
    display: 'inline-block'
});
