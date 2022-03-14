class MemoryPoolObject {

}

// TODO: make this stack based, using MemoryPoolObject
class MemoryPool {
    constructor(objectConstructor, objectReseter, initialSize = 5000) {
        this.objectConstructor = objectConstructor;
        this.objectReseter = objectReseter;
        this._pool = [];
        for (let i = 0; i < initialSize; i++) {
            this._addObjectPool();
        }
    }

    _addObjectToPool() {
        const newObj = {
            alive: false,
            data: this.objectConstructor()
        };
        this._pool.push(newObj);
    }

    _allocate(object) {
        object.alive = true;
        return object;
    }

    getNew() {
        for (let i = 0; i < this._pool.length; i++) {
            if (this._pool[i].alive === false) {
                return this._allocate(this._pool[i]);
            }
        }
        return this._addObjectToPool();
    }

    release(object) {
        object.alive = false;
    }
}

