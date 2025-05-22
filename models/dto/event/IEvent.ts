export interface IEvent {
    id: string,
    title: string,
    coverImageUrl: string,
    bannerImageUrl: string,
    description: string,
    date: Date,
    location: string,
    coordinates: {},
    isPrivate: boolean,
    minLevel: number,
    maxAttendees: number,
    ticketTypes: string[],
    imageUrls: string[],
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
}