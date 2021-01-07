import React from 'react';
import { color } from 'helpers/functions';

const Card = ({
  created,
  destroyCard,
  growableHeight,
  growableWidth,
  growHeight,
  growWidth,
  height,
  id,
  moveToNext,
  moveToPrev,
  nextCard,
  order,
  prevCard,
  shrinkableHeight,
  shrinkableWidth,
  shrinkHeight,
  shrinkWidth,
  title,
  width,
}) => {
  const style = {
    root: {
      display: 'flex',
      flex: width,
      height: `${height * 240}px`,
      minWidth: '160px',
      padding: '16px',
    },
    card: {
      alignItems: 'center',
      backgroundColor: color,
      borderRadius: '8px',
      boxShadow: '8px 8px 8px rgba(0,0,0,.3)',
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      minHeight: '40px',
      padding: '1px',
      borderLeft: `solid 32px ${color(id)}`,
    },
    actions: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
  };

  const growHeightButton = () => {
    if (!growableHeight) {
      return null;
    }

    return (
      <button
        className="btn btn-sm btn-warning m-2"
        onClick={() => growHeight()}
      >
        H +
      </button>
    );
  };

  const shrinkHeightButton = () => {
    if (!shrinkableHeight) {
      return null;
    }

    return (
      <button
        className="btn btn-sm btn-warning m-2"
        onClick={() => shrinkHeight()}
      >
        H -
      </button>
    );
  };

  const growWidthButton = () => {
    if (!growableWidth) {
      return null;
    }

    return (
      <button
        className="btn btn-sm btn-warning m-2"
        onClick={() => growWidth()}
      >
        W +
      </button>
    );
  };

  const shrinkWidthButton = () => {
    if (!shrinkableWidth) {
      return null;
    }

    return (
      <button
        className="btn btn-sm btn-warning m-2"
        onClick={() => shrinkWidth()}
      >
        W -
      </button>
    );
  };

  const moveToPrevButton = () => {
    if (!prevCard) {
      return null;
    }

    return (
      <button
        className="btn btn-sm btn-primary m-2"
        onClick={() => moveToPrev()}
      >
        {'<'}
      </button>
    );
  };

  const moveToNextButton = () => {
    if (!nextCard) {
      return null;
    }

    return (
      <button
        className="btn btn-sm btn-primary m-2"
        onClick={() => moveToNext()}
      >
        {'>'}
      </button>
    );
  };

  const destroyButton = () => {
    return (
      <button
        className="btn btn-sm btn-danger m-2"
        onClick={() => destroyCard()}
      >
        delete
      </button>
    );
  };

  return (
    <div style={style.root}>
      <div style={style.card}>
        <div>
          <div className="text-secondary text-center my-2">
            <small className="fw-bold">{`ID ${id}`}</small>
            <small className="mx-2">-</small>
            <small>{`P${order}`}</small>
            <small className="mx-2">-</small>
            <small>{`W${width}`}</small>
            <small className="mx-2">-</small>
            <small>{`H${height}`}</small>
          </div>
          <div style={style.actions}>
            {growHeightButton()}
            {shrinkHeightButton()}
            {growWidthButton()}
            {shrinkWidthButton()}
          </div>
          <div style={style.actions}>
            {moveToPrevButton()}
            {moveToNextButton()}
          </div>
          <div style={style.actions}>{destroyButton()}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
