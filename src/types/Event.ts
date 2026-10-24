

export type EventData = {
 id: string;
 title: string;
 date: string;
 address: string;
 price: number;
 capacity: number;
 image: string;
 category: {id: string, name: string};
 freeSeats: number;
}