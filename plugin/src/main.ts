import { waitForServer } from './server';
import { log } from './log';

function parzeroInit(): void {
  log('parzero init');

  document.addEventListener('custom-event-wait-for-server', function eventCallback(): void {
    waitForServer();
  }, false);

  const customEvent: Event = new Event('custom-event-wait-for-server');
  document.dispatchEvent(customEvent);
}

parzeroInit();
