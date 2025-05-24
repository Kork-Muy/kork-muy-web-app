import type { IEventDto } from './IEvent.dto';

export class EventDto implements IEventDto {
    id: string;
    title: string;
    coverImageUrl: string;
    bannerImageUrl: string;
    description: string;
    date: Date;
    location: string;
    coordinates: {};
    isPrivate: boolean;
    minLevel: number;
    maxAttendees: number;
    ticketTypes: string[];
    imageUrls: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: IEventDto) {
        this.id = data.id;
        this.title = data.title;
        this.coverImageUrl = data.coverImageUrl;
        this.bannerImageUrl = data.bannerImageUrl;
        this.description = data.description;
        this.date = new Date(data.date);
        this.location = data.location;
        this.coordinates = data.coordinates;
        this.isPrivate = data.isPrivate;
        this.minLevel = data.minLevel;
        this.maxAttendees = data.maxAttendees;
        this.ticketTypes = data.ticketTypes;
        this.imageUrls = data.imageUrls;
        this.isActive = data.isActive;
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);
    }

    get formattedDate(): string {
        console.log("this.date", this.date)
        return new Intl.DateTimeFormat('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }).format(this.date)
    }
}