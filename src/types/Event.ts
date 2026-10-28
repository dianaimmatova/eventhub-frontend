export type Category = {
    id: string;
    name: string;
}

export type EventData = {
 id: string;
 title: string;
 date: string;
 address: string;
 price: number;
 capacity: number;
 image: string;
 category: Category;
 freeSeats: number;
 description?: string;
 user?: { id: string, name: string }
}