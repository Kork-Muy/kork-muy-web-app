import type { IEventDto } from "~/models/dto/event/IEvent.dto"
import type { IUserDto } from "~/models/dto/user/IUser.dto"

export interface ITicketsResponse {
    tickets: ITicketResponse[]
}

export interface ITicketResponse {
    id: string
    qrcode: string
    ticketData: {}
    isUsed: boolean
    usedAt: string | null
    transferredFrom: string | null,
    isTransferable: boolean,
    event: IEventDto,
    user: IUserDto
}