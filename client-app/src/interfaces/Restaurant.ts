interface Restaurant {
    _id: string;
    visitor: string;
    name: string;
    address: string;
    rating: number;
}

interface RestaurantDetail extends Restaurant {
    username: string;
    date: string;
    imgURL: string;
    eatingTime: number;
    menus: string;
    created: string;
    representIx: number;
}

export type { Restaurant, RestaurantDetail };