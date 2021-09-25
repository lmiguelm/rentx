import { appSchema } from '@nozbe/watermelondb';

import { userSchema } from './UserSchema';
import { carSchema } from './CarSchema';

export const schemas = appSchema({
  version: 2,
  tables: [userSchema, carSchema],
});
