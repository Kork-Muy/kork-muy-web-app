import type { ITicketResponse } from "~/models/api/tickets/response"
import type { ITicketDto } from "./ITicket.dto"
import { EventDto } from "../event/Event.dto";
import { UserDto } from "../user/User.dto";

export class TicketDto implements ITicketDto {
    id: string;
    qrcode: string;
    ticketData: any;
    isUsed: boolean;
    usedAt: string | null;
    transferredFrom: string | null;
    isTransferable: boolean;
    event: EventDto;
    user: UserDto;

    constructor(data: ITicketResponse) {
        this.id = data.id;
        this.qrcode = data.qrcode;
        this.ticketData = data.ticketData;
        this.isUsed = data.isUsed;
        this.usedAt = data.usedAt;
        this.transferredFrom = data.transferredFrom;
        this.isTransferable = data.isTransferable;
        this.event = new EventDto(data.event);
        this.user = new UserDto(data.user);
    }
}