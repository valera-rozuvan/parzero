const http = require('http');
const Chess = require('chess.js').Chess;
const Engine = require('node-uci').Engine;
require('dotenv').config();

const enginePath = process.env.ENGINE_PATH;
const httpPort = process.env.HTTP_PORT;
const socketPort = process.env.SOCKET_PORT;

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World! 42 :)\n');
});
server.listen(httpPort);
console.log(`HTTP server running at http://127.0.0.1:${httpPort}/`);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: socketPort });
console.log(`WebSocket server running at http://127.0.0.1:${socketPort}/`);

wss.on('connection', function connection(ws) {
  ws.on('message', async function incoming(message) {
    if (message === 'ping') {
      ws.send('pong');
    } else if (message.includes('_MOVES_')) {
      const movesObjStr = message.replace('_MOVES_', '');
      const movesObj = JSON.parse(movesObjStr);

      const moves = movesObj.map((move) => {
        // if (move[2].length === 0) {
        //   sideToMove = 'black';
        // }

        return `${move[0]}.${move[1]} ${move[2]}`
      });
      const moveHistory = moves.join(' ');

      const position = getFenPosition(moveHistory);

      const fenStr = position.fenStr;
      const sideToMove = position.sideToMove;

      console.log(moveHistory);
      console.log('\n');
      console.log(fenStr);
      console.log('\n');
      if (sideToMove === 'w') {
        console.log('WHITE to move');
      } else if (sideToMove === 'b') {
        console.log('BLACK to move');
      }
      console.log('\n');

      // const nMovesToPonder = 15;

      // const engine = new Engine(enginePath)
      // await engine.init()
      // await engine.isready()
      // await engine.setoption('MultiPV', '3')
      // const emitter = engine.goInfinite()
      // emitter.on('data', a => {
      //   console.log('data', a)
      // })


      const engine = new Engine(enginePath);

      await engine.init()
      await engine.isready()

      await engine.setoption('Threads', 5)
      await engine.setoption('MultiPV', 5)
      await engine.position(fenStr);

      const emitter = engine.goInfinite();

      emitter.on('data', (result) => {
        // console.log('---------------------------------------');
        // console.log('result');
        // console.log(result);
        // console.log('\n\n\n');
      });

      setTimeout(async () => {
        const result = await engine.stop();
        outputResult(result);
        await engine.quit();
      }, 500);

        // .go({ depth: nMovesToPonder })
        // .then((result) => {
        //   // console.log('Engine result: ', JSON.stringify(result));
        //   console.log(`---> best move: ${result.bestmove}`);

        //   let actualDepth = -1;
        //   result.info.forEach((infoItem) => {
        //     const currentDepth = parseInt(infoItem.depth);

        //     if (currentDepth > actualDepth) {
        //       actualDepth = currentDepth;
        //     }
        //   });

        //   console.log(`---> depth: ${actualDepth}`);
        //   console.log(`---> side to move: ${sideToMove}`);
        //   console.log('\n');

        //   result.info.forEach((infoItem) => {
        //     if (parseInt(infoItem.depth) !== actualDepth) {
        //       return;
        //     }

        //     if (!infoItem.score) {
        //       return;
        //     }

        //     let score = parseInt(infoItem.score.value);
        //     let unit = infoItem.score.unit;

        //     if (isNaN(score)) {
        //       console.log('!!!!!!!!!!!!!! score === NaN');
        //       score = 0;
        //     }

        //     score *= 0.01;

        //     // if (sideToMove === 'white') {
        //     //   score *= -1;
        //     // }

        //     console.log(`---> pv: ${infoItem.pv}`);
        //     console.log(`---> unit: ${unit}`);
        //     console.log(`---> score: ${score}`);
        //     console.log('\n');
        //   });

        //   console.log('\n\n\n');

        //   engine.quit();
        // })
        // .catch((e) => {
        //   console.log(e);
        //   engine.quit();
        // });
    }
  });

  ws.send('something');
});

function outputResult(result) {
  // let sideToMove = 'white';

  console.log(`---> best move: ${result.bestmove}`);

  let actualDepth = -1;
  result.info.forEach((infoItem) => {
    const currentDepth = parseInt(infoItem.depth);

    if (currentDepth > actualDepth) {
      actualDepth = currentDepth;
    }
  });

  console.log(`---> depth: ${actualDepth}`);
  // console.log(`---> side to move: ${sideToMove}`);
  console.log('\n');

  result.info.forEach((infoItem) => {
    if (parseInt(infoItem.depth) !== actualDepth) {
      return;
    }

    if (!infoItem.score) {
      return;
    }

    let score = parseInt(infoItem.score.value);
    let unit = infoItem.score.unit;

    if (isNaN(score)) {
      console.log('!!!!!!!!!!!!!! score === NaN');
      score = 0;
    }

    score *= 0.01;

    // if (sideToMove === 'white') {
    //   score *= -1;
    // }

    console.log(`---> pv: ${infoItem.pv}`);
    console.log(`---> unit: ${unit}`);
    console.log(`---> score: ${score}`);
    console.log('\n');
  });

  console.log('\n\n\n');
}

function getFenPosition(moveHistory) {
  const chessInstance = new Chess();

  chessInstance.load_pgn(moveHistory);

  const sideToMove = chessInstance.turn();

  return {
    fenStr: chessInstance.fen(),
    sideToMove
  };
}
