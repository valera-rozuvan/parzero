import { getMoveList } from './dom-reader';
import { log } from './log';
import { IMove } from './interfaces';

function openWebSocket(): void {
  log('Creating WebSocket instance.');

  let oldMovesStr: string = '';
  let movesStr: string = '';

  let wsInstance: WebSocket = null;
  try {
    wsInstance = new WebSocket('ws://127.0.0.1:8001/');
  } catch (e) {
    log(e);
    return;
  }

  let lifeCheckInterval: number = null;

  function startLifeCheck(): void {
    lifeCheckInterval = window.setInterval(() => {
      try {
        log('Sending ping message.');
        wsInstance.send('ping');
      } catch (e) {
        log(e);

        killSocket();
      }
    }, 1000);
  }

  function stopLifeCheck(): void {
    if (lifeCheckInterval !== null) {
      window.clearInterval(lifeCheckInterval);

      lifeCheckInterval = null;
    }
  }

  let moveUpdateInterval: number = null;

  function startMoveUpdate(): void {
    moveUpdateInterval = window.setInterval(() => {
      const moves: IMove[] = getMoveList();

      try {
        movesStr = JSON.stringify(moves);
      } catch (e) {
        log(e);
        return;
      }

      if (oldMovesStr === movesStr) {
        return;
      }

      oldMovesStr = movesStr;

      try {
        log('Sending moves message.');
        wsInstance.send(`_MOVES_${movesStr}`);
      } catch (e) {
        log(e);

        killSocket();
      }
    }, 150);
  }

  function stopMoveUpdate(): void {
    if (moveUpdateInterval !== null) {
      window.clearInterval(moveUpdateInterval);

      moveUpdateInterval = null;
    }
  }

  function killSocket(): void {
    log('Killing socket.');

    stopLifeCheck();
    stopMoveUpdate();

    if (wsInstance !== null) {
      wsInstance.close();
      wsInstance = null;
    }

    const customEvent: Event = new Event('custom-event-wait-for-server');
    document.dispatchEvent(customEvent);
  }

  log('Subscribing to error event.');
  wsInstance.onerror = (e: Event): void => {
    log('WebSocket error.');
    log(e);

    killSocket();
  };

  log('Subscribing to close event.');
  wsInstance.onclose = (e: Event): void => {
    log('WebSocket close.');
    log(e);

    killSocket();
  };

  log('Subscribing to open event.');
  wsInstance.onopen = (): void => {
    log('Sending hello ws message.');
    wsInstance.send('Hello from client!');

    log('Starting main operations.');
    startLifeCheck();
    startMoveUpdate();
  };

  log('Subscribing to message event.');
  wsInstance.onmessage = (data: any): void => {
    log('Receiving ws message.');
    log(data);
  };
}

export {
  openWebSocket
};
