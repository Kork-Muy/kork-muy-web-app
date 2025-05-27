import type { ITicketResponse } from "~/models/api/tickets/response"
import type { IEventDto } from "../event/IEvent.dto"
import type { IUserDto } from "../user/IUser.dto"
import type { ITicketDto } from "./ITicket.dto"

export class TicketDto implements ITicketDto {
    id: string;
    qrcode: string;
    ticketData: any;
    isUsed: boolean;
    usedAt: string | null;
    transferredFrom: string | null;
    isTransferable: boolean;
    event: IEventDto;
    user: IUserDto;

    constructor(data: ITicketResponse) {
        this.id = data.id;
        this.qrcode = data.qrcode;
        this.ticketData = data.ticketData;
        this.isUsed = data.isUsed;
        this.usedAt = data.usedAt;
        this.transferredFrom = data.transferredFrom;
        this.isTransferable = data.isTransferable;
        this.event = data.event;
        this.user = data.user;
    }
}