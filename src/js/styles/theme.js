import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { fade } from 'material-ui/utils/colorManipulator';
import * as colors from 'material-ui/styles/colors';

/**
 * Defines the default theme for the application by specifying various color
 * parameters including primary and accent colors.
 */
const theme = getMuiTheme({
    palette: {
        primary1Color: colors.lightBlue500,
        primary2Color: colors.lightBlue700,
        primary3Color: colors.lightBlue100,

        accent1Color: colors.pinkA200,
        accent2Color: colors.pink100,
        accent3Color: colors.pink400,

        textColor: colors.darkBlack,
        secondaryTextColor: (0, fade)(colors.darkBlack, 0.54),
        alternateTextColor: colors.white,
        canvasColor: colors.white,
        borderColor: colors.grey300,
        disabledColor: (0, fade)(colors.darkBlack, 0.3),
        pickerHeaderColor: colors.purple500,
        clockCircleColor: (0, fade)(colors.darkBlack, 0.07),
        shadowColor: colors.fullBlack
    }
});

export default theme;
