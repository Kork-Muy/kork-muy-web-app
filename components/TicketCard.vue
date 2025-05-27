<template>
  <div>
    <UiDialog>
      <UiDialogTrigger>
        <UiCard>
          <UiCardContent class="p-0">
            <div class="w-full h-56 overflow-hidden">
              <img
                :src="ticketDto.event.bannerImageUrl"
                alt="event cover"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="bg-gray-100 p-4">
              <UiCardTitle>
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-bold text-lg">
                      {{ ticketDto.event.title }}
                    </h3>
                  </div>
                </div>
              </UiCardTitle>
              <UiCardDescription class="flex justify-between items-start">
                <p class="text-sm">
                  {{ ticketDto.event.formattedDateWithTime }}
                </p>
                <div class="flex items-center space-x-2">
                  <Icon name="heroicons:map-pin" class="w-4 h-4" />
                  <p class="text-sm">{{ ticketDto.event.location }}</p>
                </div>
              </UiCardDescription>
            </div>
          </UiCardContent>
        </UiCard>
      </UiDialogTrigger>
      <UiDialogContent class="sm:max-w-[425px]">
        <UiDialogHeader>
          <UiDialogTitle class="text-2xl font-bold text-center">{{ ticketDto.event.title }}</UiDialogTitle>
        </UiDialogHeader>
        <div class="flex flex-col items-center gap-4 p-5">
          <QRCode
            :value="ticketDto.qrcode"
            :size="200"
            level="H"
            render-as="svg"
            class="bg-white p-4 rounded-lg"
          />
          <p class="text-sm text-gray-500">Scan this QR code to verify your ticket</p>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
import type { ITicketDto } from "~/models/dto/ticket/ITicket.dto";
import { TicketDto } from "~/models/dto/ticket/Ticket.dto";
import QRCode from 'qrcode.vue';

const props = defineProps<{
  ticket: ITicketDto;
}>();

const ticketDto = computed(() => new TicketDto(props.ticket));
</script>

<style></style>
