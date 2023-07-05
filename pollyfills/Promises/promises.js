const STATE = {
    pending: "PENDING",
    fulfilled: "FULFILLED",
    rejected: "REJECTED",
  };
  
  class MyPromise {
    #thenCbs = [];
    #catchCbs = [];
    #state = STATE.pending;
    #value;
    #resolveBind = this.#resolve.bind(this);
    #rejectBind = this.#reject.bind(this);
  
    constructor(cb) {
      try {
        cb(this.#resolveBind, this.#rejectBind);
      } catch (error) {
        this.#reject(error);
      }
    }
  
    #executeHandlers() {
      if (this.#state === STATE.fulfilled) {
        this.#thenCbs.forEach((handler) => {
          this.#value = handler(this.#value);
        });
        this.#thenCbs = [];
      }
      if (this.#state === STATE.rejected) {
        this.#catchCbs.forEach((handler) => {
          this.#value = handler(this.#value);
        });
        this.#catchCbs = [];
      }
    }
  
    #resolve(value) {
      // queueMicrotask(function() {
      if (this.#state !== STATE.pending) return;
      if (value instanceof MyPromise) {
        value.then(this.#resolveBind, this.#rejectBind);
        return;
      }
      this.#state = STATE.fulfilled;
      this.#value = value;
      this.#executeHandlers();
      // })
    }
  
    #reject(error) {
      // queueMicrotask(function() {
      if (this.#state !== STATE.pending) return;
      if (error instanceof MyPromise) {
        error.then(this.#resolveBind, this.#rejectBind);
        return;
      }
      // if(this.#catchCbs.length===0) {
      //     throw new UncaughtError(error)
      // }
      this.#state = STATE.rejected;
      this.#value = error;
      this.#executeHandlers();
      // })
    }
  
    then(successCb, errorCB) {
      return new MyPromise((res, rej) => {
        this.#thenCbs.push((result) => {
          if (!successCb) return res(result);
          try {
            res(successCb(result));
          } catch (err) {
            rej(err);
          }
        });
        this.#catchCbs.push((result) => {
          if (!errorCB) return rej(result);
          try {
            res(errorCB(result));
          } catch (err) {
            rej(err);
          }
        });
        this.#executeHandlers();
      });
    }
  
    catch(cb) {
      return this.then(null, cb);
    }
  
    finally(cb) {
      return this.then(
        (result) => {
          cb();
          return result;
        },
        (result) => {
          cb();
          throw result;
        }
      );
    }
  
    static resolve(value) {
      return new MyPromise((res) => {
        return res(value);
      });
    }
  
    static all(promises) {
      return new MyPromise((res, rej) => {
        let completed = 0;
        let result = [];
        promises.forEach((promise, i) => {
          promise
            .then((val) => {
              result[i] = val;
              completed += 1;
              if (completed === promises.length) {
                res(result);
              }
            })
            .catch((err) => rej(err));
        });
      });
    }
  
    static allSettled(promises) {
      return new MyPromise((res, rej) => {
        let completed = 0;
        let result = [];
        promises.forEach((promise, i) => {
          promise
            .then((val) => {
              result[i] = { status: "fulfilled", value: val };
              completed += 1;
            })
            .catch((err) => {
              completed += 1;
              result[i] = { status: "rejected", value: err };
            })
            .finally(() => {
              if (completed === promises.length) {
                res(result);
              }
            });
        });
      });
    }
  
    static race(promises) {
      return new MyPromise((res, rej) => {
        promises.forEach((promise, i) => {
          promise.then(res).catch(rej);
        });
      });
    }
  
    static any(promises) {
      return new MyPromise((res, rej) => {
        let allRejected = 0;
        let errors = [];
        promises.forEach((promise, i) => {
          promise.then(res).catch((err) => {
            allRejected += 1;
            errors[i] = err;
            if (errors.length === promises.length) {
              console.log("inside");
              rej("All Promises were rejected");
            }
          });
        });
      });
    }
  }
  
  class UncaughtError extends Error {
    constructor(error) {
      super(error);
      this.stack = `in promise ${error.stack}`;
    }
  }
  
  let p = new MyPromise((res, rej) => {
    rej(23);
  });
  let q = new MyPromise((res, rej) => {
    rej(20);
  });
  let r = MyPromise.any([p, q])
    .then((v) => console.log("v", v))
    .catch((error) => console.log(error));
  
  // const p = new MyPromise((res, rej) => {
  //   rej(new Error("got an error"));
  // });
  // p.then((val) => 2 * val)
  //   .then((val) => {
  //     console.log("yooooo", val);
  //     return val;
  //   })
  //   .catch((err) => {
  //     console.log("err", err.message);
  //     return new MyPromise((res, rej) => {
  //       res(20);
  //     });
  //   })
  //   .then((val) => {
  //     console.log("val", val);
  //     return new MyPromise((res, rej) => {
  //       rej("yolo");
  //     });
  //   })
  //   .finally(
  //     () => {
  //       console.log("finally");
  //     },
  //     () => {
  //       console.log("finally");
  //     }
  //   )
  //   .catch((error) => console.log(error));
  //   .then(val => console.log("last val", val))
  
  // let q = MyPromise.resolve(100).then((val) => console.log(val));
  // let n = new Promise((res, rej) => {
  //     res(19)
  // })
  // n.then(val => {
  //     console.log(val)
  //     return new Promise((res, rej)=> rej(new Error("yolo")))
  // })
  // .finally(() => {
  //     console.log("finally")
  //   },() => {
  //     console.log("finally")
  //   }
  //   )
  //   .then(val => console.log("last val", val))
  // .catch((error) => console.log(error));
  