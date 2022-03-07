interface ChoizaRoad {
    ep: number;
    restaurants: string;
    season: number;
    thumbnailURL: string;
    title: string;
    youtubeURL: string;
    _id: string;
}

interface VisitedChoizaRoads {
    restaurantName: string;
    season: number;
    userId: string;
    _id: string;
}

export type { ChoizaRoad, VisitedChoizaRoads }