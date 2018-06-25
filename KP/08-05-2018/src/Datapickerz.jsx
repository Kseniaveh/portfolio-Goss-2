import React, { Component as C } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import Counter from './Counter';
import moment from 'moment';

class Datapickerz extends C {
	constructor() {
		super();
		this.state = { Day: 1 };
	};

	render() {
		return (
			<div>
				<Counter stars={this.state.Day} />
				<DatePicker
					onChange={(n = null, date) => {
						const Day = Number( moment(date).format('DD') );
						this.setState({ Day });
					}
				}
				floatingLabelText="Выберите дату"
				/>
			</div>);
	};
};

export default Datapickerz;