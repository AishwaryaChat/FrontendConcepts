function wait(ms) {
  let ret = {};
  let signal = new Promise((resolve, reject) => {
    ret.cancel = () => {
      reject(new Error("Promise was cancelled"));
    };
  });
  ret.promise = new Promise((res, rej) => {
    let timer = setTimeout(() => {
      console.log("Promise resolved successfully");
      res("ok");
    }, wait);
    signal.catch((error) => {
      clearTimeout(timer);
      rej(error);
    });
  });
  return ret;
}

const { promise, cancel } = wait(2000);
promise
  .then((val) => console.log(val))
  .catch((error) => console.log(error.message));
cancel()
