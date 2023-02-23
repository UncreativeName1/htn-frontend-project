import classes from './CardItem.module.css';

// Card UI Component
function CardItem(props) {
  return <div className={classes.card} style={{'backgroundColor': props.color}}>{props.children}</div>;
}

export default CardItem;