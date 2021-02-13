function solve() {
    String.prototype.ensureStart = function (str) {
        let result = '';
        if(!this.includes(str)) {
            result = str + this;
        }
        return result;
    }

    String.prototype.ensureEnd = function (str) {
        let result = '';
        let length = str.length;
        if(this !== this.slice(length, this.length)) {
            result =this + str;
        }
        return result;
    }

    String.prototype.isEmpty = function () {
        if(this.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    
    String.prototype.truncate = function(n) {
        if(n > this.length) {
            return this;
        } else if(n < this.length) {
            
        }
    }
}