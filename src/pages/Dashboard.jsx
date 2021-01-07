import React, { useEffect, useState } from 'react';
import Row from 'components/Row';
import { maxByProperty, sortByProperty } from 'helpers/functions';
import dataRows from 'data/rows';
import dataCards from 'data/cards';

const Dashboard = () => {
  const [cards, setCards] = useState(sortByProperty(dataCards, 'order'));
  const [rows, setRows] = useState(sortByProperty(dataRows, 'order'));
  const [destroyedCards, setDestroyedCards] = useState([]);
  const [destroyedRows, setDestroyedRows] = useState([]);

  const style = {
    root: {
      margin: '64px',
    },
  };

  // CARD ACTIONS

  const createCard = (row, params = {}) => {
    const siblingToShrink = maxByProperty(row.cards, 'width');
    if (siblingToShrink && siblingToShrink.width > 1) {
      setCards([
        ...cards.slice(0, siblingToShrink.index),
        Object.assign(siblingToShrink, {
          width: siblingToShrink.width - 1,
          updated: true,
        }),
        ...cards.slice(siblingToShrink.index + 1),
        buildCard(row, params, { created: true }),
      ]);
    } else {
      setCards([...cards, buildCard(row, params)]);
    }
  };

  const buildCard = (row, params) => {
    return Object.assign(
      {
        height: 1,
        id: maxByProperty(cards, 'id').id + 1,
        order: maxByProperty(row.cards, 'order').order + 1,
        row: row.id,
        title: '',
        width: 1,
      },
      params,
    );
  };

  const updateCard = (card, params) => {
    setCards([
      ...cards.slice(0, card.index),
      Object.assign(card, params, { updated: true }),
      ...cards.slice(card.index + 1),
    ]);
  };

  const updateCardWidth = (card, direction) => {
    const grow = direction === 'grow';
    const shrink = direction === 'shrink';
    if ((grow && !card.growableWidth) || (shrink && !card.shrinkableWidth)) {
      return null;
    }

    const value = grow ? 1 : -1;
    updateCard(card, { width: card.width + value });
    if (shrink || (grow && card.rowSize < 4)) {
      return null;
    }

    const siblingToShrink = maxByProperty(card.siblings, 'width');
    if (siblingToShrink) {
      updateCard(siblingToShrink, { width: siblingToShrink.width - 1 });
    }
  };

  const updateCardHeight = (card, direction) => {
    const grow = direction === 'grow';
    const shrink = direction === 'shrink';
    if ((grow && !card.growableHeight) || (shrink && !card.shrinkableHeight)) {
      return null;
    }

    const value = grow ? 1 : -1;
    updateCard(card, { height: card.height + value });
  };

  const moveCardToPrev = card => {
    if (!card.prevCard) {
      return null;
    }

    const beforeOrder = card.order;
    updateCard(card, { order: card.prevCard.order });
    updateCard(card.prevCard, { order: beforeOrder });
  };

  const moveCardToNext = card => {
    if (!card.nextCard) {
      return null;
    }

    const beforeOrder = card.order;
    updateCard(card, { order: card.nextCard.order });
    updateCard(card.nextCard, { order: beforeOrder });
  };

  const destroyCard = card => {
    setDestroyedCards([...destroyedCards, card]);
    setCards([...cards.slice(0, card.index), ...cards.slice(card.index + 1)]);
  };

  // ROW ACTIONS

  const updateRow = (row, params) => {
    setRows([
      ...rows.slice(0, row.index),
      Object.assign(row, params, { updated: true }),
      ...rows.slice(row.index + 1),
    ]);
  };

  const moveRowToPrev = row => {
    if (!row.prevRow) {
      return null;
    }

    const beforeOrder = row.order;
    updateRow(row, { order: row.prevRow.order });
    updateRow(row.prevRow, { order: beforeOrder });
  };

  const moveRowToNext = row => {
    if (!row.nextRow) {
      return null;
    }

    const beforeOrder = row.order;
    updateRow(row, { order: row.nextRow.order });
    updateRow(row.nextRow, { order: beforeOrder });
  };

  const destroyRow = row => {
    setDestroyedRows([...destroyedRows, row]);
    setRows([...rows.slice(0, row.index), ...rows.slice(row.index + 1)]);
  };

  // ENHANCED ELEMENTS

  const enhancedCard = (card, rowCards, rowSize) => {
    const index = cards.findIndex(iCard => iCard.id === card.id);
    const siblings = rowCards.filter(rowCard => rowCard.id != card.id);
    const indexInRow = rowCards.findIndex(iCard => iCard.id === card.id);
    const shrinkables = siblings.filter(iCard => iCard.width > 1);
    const growableWidth = card.width < 3 && (rowSize < 4 || shrinkables.length);
    const shrinkableWidth = card.width > 1;
    const growableHeight = card.height < 2;
    const shrinkableHeight = card.height > 1;
    const prevCard = indexInRow > 0 ? rowCards[indexInRow - 1] : null;
    const nextCard =
      indexInRow < rowCards.length ? rowCards[indexInRow + 1] : null;

    return Object.assign(card, {
      growableHeight,
      growableWidth,
      index,
      nextCard,
      prevCard,
      rowSize,
      shrinkableHeight,
      shrinkableWidth,
      siblings,
      destroyCard: () => destroyCard(card),
      growHeight: () => updateCardHeight(card, 'grow'),
      growWidth: () => updateCardWidth(card, 'grow'),
      moveToNext: () => moveCardToNext(card),
      moveToPrev: () => moveCardToPrev(card),
      shrinkHeight: () => updateCardHeight(card, 'shrink'),
      shrinkWidth: () => updateCardWidth(card, 'shrink'),
    });
  };

  const enhancedRow = row => {
    const index = rows.findIndex(iRow => iRow.id === row.id);
    const prevRow = index > 0 ? rows[index - 1] : null;
    const nextRow = index < rows.length ? rows[index + 1] : null;
    const rowCards = cards.filter(card => card.row === row.id);
    const rowCardsCount = rowCards.length;
    if (rowCardsCount === 0) {
      return null;
    }

    const size = rowCards.reduce((a, b) => a + (b.width || 0), 0);
    const acceptsNewCards = rowCardsCount < 4;
    const sortedCards = rowCards.sort((a, b) => (a.order > b.order ? 1 : -1));
    const enhancedCards = sortedCards.map(card =>
      enhancedCard(card, sortedCards, size),
    );
    return Object.assign(row, {
      acceptsNewCards,
      cards: enhancedCards,
      createCard: () => createCard(row),
      destroy: () => destroyRow(row),
      index,
      moveToNext: () => moveRowToNext(row),
      moveToPrev: () => moveRowToPrev(row),
      nextRow,
      prevRow,
      size,
    });
  };

  const enhancedRows = () =>
    sortByProperty(rows, 'order')
      .map(row => enhancedRow(row))
      .filter(row => row);

  const renderRows = () =>
    enhancedRows().map(row => <Row key={row.id} {...row} />);

  // DEV INFOS

  const renderRowsInfos = rows =>
    rows.map(row => (
      <pre key={row.id} className="bg-light border my-1 p-2">
        {renderRowInfos(row)}
      </pre>
    ));

  const renderRowInfos = row =>
    JSON.stringify({
      id: row.id,
      order: row.order,
      created: row.created || false,
      updated: row.updated || false,
    });

  const renderCardsInfos = cards =>
    cards.map(card => (
      <pre key={card.id} className="bg-light border my-1 p-2">
        {renderCardInfos(card)}
      </pre>
    ));

  const renderCardInfos = card =>
    JSON.stringify({
      row: card.row,
      id: card.id,
      order: card.order,
      width: card.width,
      height: card.height,
      created: card.created || false,
      updated: card.updated || false,
    });

  return (
    <div>
      <div style={style.root}>{renderRows()}</div>
      <div className="mx-4 mt-4">
        <h4 className="mt-2">Rows</h4>
        {renderRowsInfos(rows)}
        <h4 className="mt-2">Destroyed Rows</h4>
        {renderRowsInfos(destroyedRows)}
      </div>
      <div className="mx-4 mt-4">
        <h4 className="mt-2">Cards</h4>
        {renderCardsInfos(cards)}
        <h4 className="mt-2">Destroyed Cards</h4>
        {renderCardsInfos(destroyedCards)}
      </div>
    </div>
  );
};

export default Dashboard;
