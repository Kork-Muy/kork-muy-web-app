import type { IBuyTicketDataDto } from "./IBuyTicketData.dto";
import type { IBuyTicketFormDto } from "./IBuyTicketForm.dto";

export class BuyTicketFormDto implements IBuyTicketFormDto {
    email: string;

    constructor(dto: IBuyTicketFormDto) {
        this.email = dto.email;
    }

    toBuyTicketData(): IBuyTicketDataDto[] {
        return [
            {
                key: 'email',
                value: this.email
            }
        ]
    }
}