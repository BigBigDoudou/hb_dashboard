import React from 'react';

const Help = () => {
  const style = {
    root: {
      margin: '64px',
    },
  };

  return (
    <div style={style.root}>
      <div className="mx-4 mt-4">
        <hr />
        <p>
          <strong>Rows</strong>
        </p>
        <p className="m-0">
          <small>
            Use
            <button className="btn btn-sm btn-warning m-2">down</button>
            and
            <button className="btn btn-sm btn-warning m-2">up</button>
            to move the row down or up.
          </small>
        </p>
        <p className="m-0">
          <small>
            Use
            <button className="btn btn-sm btn-success m-2">add card</button>
            to add a card in the row.
          </small>
        </p>
        <p className="m-0">
          <small>
            Use
            <button className="btn btn-sm btn-danger m-2">delete</button>
            to delete the entire row.
          </small>
        </p>
        <hr />
        <p>
          <strong>Cards</strong>
        </p>
        <p className="m-0">
          <small>
            Use
            <button className="btn btn-sm btn-warning m-2">H +</button>
            and
            <button className="btn btn-sm btn-warning m-2">H -</button>
            to increase and decrease the height.
          </small>
        </p>
        <p className="m-0">
          <small>
            Use
            <button className="btn btn-sm btn-warning m-2">W +</button>
            and
            <button className="btn btn-sm btn-warning m-2">W -</button>
            to increase and decrease the width.
          </small>
        </p>
        <p className="m-0">
          <small>
            Use
            <button className="btn btn-sm btn-primary m-2">{'<'}</button>
            and
            <button className="btn btn-sm btn-primary m-2">{'>'}</button>
            to move the card to the left or to the right.
          </small>
        </p>
        <p className="m-0">
          <small>
            Use
            <button className="btn btn-sm btn-danger m-2">delete</button>
            to delete the card.
          </small>
        </p>
        <hr />
      </div>
    </div>
  );
};

export default Help;
