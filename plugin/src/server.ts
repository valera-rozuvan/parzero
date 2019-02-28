import { log } from './log';
import { openWebSocket } from './socket';

function loadServer(onSuccess: () => void): void {
  const xmlhttp: XMLHttpRequest = new XMLHttpRequest();
  const method: string = 'GET';
  const url: string = 'http://127.0.0.1:8000/';

  xmlhttp.open(method, url, true);
  xmlhttp.addEventListener('load', function onLoadHandler(): void {
    log('load event');
    log(this.responseText);

    onSuccess();
  });
  xmlhttp.onerror = function onErrorHandler(e: ProgressEvent): void {
    log('*** An error occurred during XHR request! ***');
    log(e);
  };

  log('Before xmlhttp send.');
  xmlhttp.send();
  log('After xmlhttp send.');
}

function waitForServer(): void {
  let intervalInstance: number = window.setInterval(() => {
    log('Trying to reach server');
    loadServer((): void => {
      window.clearInterval(intervalInstance);
      intervalInstance = null;

      openWebSocket();
    });
  }, 1000);
}

export {
  waitForServer
};
