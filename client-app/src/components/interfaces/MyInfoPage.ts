interface MyRestaurant {
    _id: string;
    visitor: string;
    username: string;
    name: string;
    address: string;
    date: string;
    imgURL: string;
    rating: number;
    eatingTime: number;
    menus: string[];
    created: string;
}

interface MyWish {
    _id: string;
    user: string;
    username: string;
    name: string;
    address: string;
    created: string;
}

export type { MyRestaurant, MyWish };