export class FirebaseUser {
    constructor (
        public email: string,
        public id: string,
        private _token: string,
        private expiredIn: Date,
    ) {
    }

    get token() {
        if(!this.expiredIn || this.expiredIn < new Date()) {
            return null;
        }

        return this._token; 
    }

}