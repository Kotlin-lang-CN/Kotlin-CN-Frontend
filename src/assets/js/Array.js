/***
 * init array meta prototype with function
 *
 * indexOf(val)
 * remove(val)
 */
const ArrayMeta = {
  init() {
    Array.prototype.indexOf = function (val) {
      for (let i = 0; i < this.length; i++) {
        if (this[i] === val) return i;
      }
      return -1;
    };
    Array.prototype.remove = function (val) {
      const index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
  }
};

export default ArrayMeta;