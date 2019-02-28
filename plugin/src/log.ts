const DEBUG_MODE: boolean = false;

function log(value: any): void {
  if (DEBUG_MODE === true) {
    console.log(value);
  }
}

export {
  log
};
