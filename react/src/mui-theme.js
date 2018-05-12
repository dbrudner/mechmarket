import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {lightBlue900, lightBlue50, grey700, white, cyan500, grey500, fullBlack, grey400} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const muiCustomTheme = getMuiTheme({
	palette: {
		primary1Color: lightBlue900,
		primary2Color: lightBlue50,
		primary3Color: grey400,
		accent1Color: lightBlue900,
		accent2Color: lightBlue50,
		accent3Color: grey500,
		textColor: grey700,
		alternateTextColor: white,
		canvasColor: white,
		borderColor: lightBlue50,
		pickerHeaderColor: cyan500,
		shadowColor: fullBlack,
	},
	appBar: {
		height: 50,
	},
});