import { customType } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
export const nanoId = customType<{
  data: string;
  driverData: string;
  notNull: true;
  default: true;
  config: { length: number };
}>({
  dataType(config) {
    return `CHAR(${config?.length || 21})`;
  },
  fromDriver(value): string {
    return value;
  },
  toDriver(value: string | undefined): string {
    return value ?? nanoid();
  },
});
