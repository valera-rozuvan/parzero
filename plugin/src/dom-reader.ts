import { IMove } from './interfaces';
import { log } from './log';

function getNumberStr(element: Element): string {
  const moveNumberEl: HTMLElement = element
    .querySelector('.vertical-move-list-column:nth-child(1)');
  if (moveNumberEl === null) {
    return '';
  }

  const moveNumberSpanEl: HTMLElement = moveNumberEl.querySelector('span');
  if (moveNumberSpanEl === null) {
    return '';
  }

  let numberStr: string = '';
  numberStr = moveNumberSpanEl.innerHTML;
  if (typeof numberStr !== 'string' || numberStr.length === 0) {
    return '';
  }

  numberStr = numberStr.replace(/\./g, '');
  numberStr = numberStr.replace(/\s/g, '');

  return numberStr;
}

function getMoveStr(element: Element, moveSelector: string): string {
  const moveEl: HTMLElement = element
    .querySelector(moveSelector);
  if (moveEl === null) {
    return '';
  }

  let moveStr: string = '';

  if (!moveEl.classList.contains('vertical-move-list-timestamps')) {
    const moveSpanEl: HTMLElement = moveEl.querySelector('span');
    if (moveSpanEl === null) {
      return '';
    }

    moveStr = moveSpanEl.innerHTML;
    if (typeof moveStr !== 'string' || moveStr.length === 0) {
      return '';
    }

    const findStr: string = '<!---->';
    const regEx: RegExp = new RegExp(findStr, 'g');

    moveStr = moveStr.replace(regEx, '');
    moveStr = moveStr.replace(/\s/g, '');
  } else {
    return '';
  }

  return moveStr;
}

function parseDomForMoves(): IMove[] {
  const verticalMoveListItems: HTMLCollectionOf<Element> =
    document.getElementsByClassName('vertical-move-list-notation-vertical');

  try {
    Array.from(verticalMoveListItems).forEach((element: Element) => {
      if (
        typeof element.querySelector === 'undefined' ||
        !element.querySelector
      ) {
        throw new Error('querySelector not defined');
      }
    });
  } catch (e) {
    log(e);

    return [];
  }

  const moves: IMove[] = [];

  Array.from(verticalMoveListItems).forEach((element: Element): void => {
    const moveNumberStr: string = getNumberStr(element);
    if (moveNumberStr === '') {
      return;
    }

    const whiteMoveStr: string = getMoveStr(element, '.vertical-move-list-column:nth-child(2)');
    if (whiteMoveStr === '') {
      return;
    }

    const blackMoveStr: string = getMoveStr(element, '.vertical-move-list-column:nth-child(3)');

    moves.push([ moveNumberStr, whiteMoveStr, blackMoveStr ]);
  });

  return moves;
}

function getMoveList(): IMove[] {
  return parseDomForMoves();
}

export {
  getMoveList
};
