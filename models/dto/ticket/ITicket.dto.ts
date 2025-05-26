import type { IEventDto } from "../event/IEvent.dto"
import type { IUserDto } from "../user/IUser.dto"

export interface ITicketDto {
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