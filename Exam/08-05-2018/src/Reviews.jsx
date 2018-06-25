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
		<Review str="Идеально!" stars="10" />
		<Review str="Отстой полный!" stars="1" />
		<Review str="Ну так, сойдет." stars="4" />
		<Review str="Классно:)" stars="8" />
		<Review str="Нормально." stars="6" />
	</div>
);

export default Reviews;