import type { IBuyTicketDataDto } from "~/models/dto/ticket/IBuyTicketData.dto"


export interface IBuyTicketRequest {
    eventId: string
    ticketData: IBuyTicketDataDto[]
}

export class BuyTicketRequest implements IBuyTicketRequest {
    eventId: string;
    ticketData: IBuyTicketDataDto[];

    constructor(dto: IBuyTicketRequest) {
        this.eventId = dto.eventId;
        this.ticketData = dto.ticketData;
    }

    toString(): string {
        return JSON.stringify(this);
    }
}