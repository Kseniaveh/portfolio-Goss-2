import React from 'react';
import Counter from './Counter';

const Review = (props) => (
	<div>
		<br/>
		<b>{props.str}</b>
		<Counter stars={props.stars} />
		<br/>
	</div>
);

const Reviews = () => (
	<div>
		<Review str="Мне очень понравилось" stars="10" />
		<Review str="Вообще чушь полная" stars="1" />
		<Review str="Да ну нафиг, сойдет впринципе" stars="4" />
		<Review str="Крутяк" stars="7" />
		<Review str="Нормал" stars="6" />
	</div>
);

export default Reviews;