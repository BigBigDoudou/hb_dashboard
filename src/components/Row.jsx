import React from 'react';
import Card from 'components/Card';
import { color } from 'helpers/functions';

const Row = ({
  acceptsNewCards,
  cards,
  createCard,
  destroy,
  id,
  moveToNext,
  moveToPrev,
  nextRow,
  prevRow,
  order,
}) => {
  const style = {
    root: {
      border: 'dashed 1px red',
      display: 'flex',
      margin: '8px',
      minWidth: '184px',
    },
    order: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      padding: '0 16px',
      backgroundColor: color(id),
    },
    cards: {
      flex: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    actions: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  };

  const renderCards = () => cards.map(card => <Card key={card.id} {...card} />);

  const moveToPrevButton = () => {
    if (!prevRow) {
      return null;
    }

    return (
      <button
        className="btn btn-sm btn-warning m-2"
        onClick={() => moveToPrev()}
      >
        up
      </button>
    );
  };

  const moveToNextButton = () => {
    if (!nextRow) {
      return null;
    }

    return (
      <button
        className="btn btn-sm btn-warning m-2"
        onClick={() => moveToNext()}
      >
        down
      </button>
    );
  };

  const newCardButton = () => {
    if (!acceptsNewCards) {
      return null;
    }

    return (
      <button
        className="btn btn-sm btn-success m-2"
        onClick={() => createCard()}
      >
        add card
      </button>
    );
  };

  const destroyButton = () => (
    <button className="btn btn-sm btn-danger m-2" onClick={() => destroy()}>
      delete
    </button>
  );

  return (
    <div style={style.root}>
      <div className="text-white mr-2" style={style.order}>
        <small className="fw-bold">{`ID ${id}`}</small>
        <small className="mx-2">-</small>
        <small>{`P ${order}`}</small>
      </div>
      <div style={style.cards}>{renderCards()}</div>
      <div className="ml-2" style={style.actions}>
        {moveToPrevButton()}
        {moveToNextButton()}
        {newCardButton()}
        {destroyButton()}
      </div>
    </div>
  );
};

export default Row;
