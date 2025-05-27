import type { IEventDto } from "~/models/dto/event/IEvent.dto";

export interface IEventResponse {
    events: IEventDto[];
}