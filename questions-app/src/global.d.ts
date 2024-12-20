
declare module 'store/store' {
    interface User {
        id: string;
        name: string;
    }

    interface StoreObject {
        user: User;
    }

    const Store: () => StoreObject;
    export default Store;
}