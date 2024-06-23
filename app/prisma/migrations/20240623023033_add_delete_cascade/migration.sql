-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_event_id_fkey";

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
