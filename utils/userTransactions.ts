import { mutate } from '@/graphql/hasuraAdmin';

export const TRANSACTION_SYSTEM_NOTE = 'transaction-system';
export const CREDITS_PER_MONTH = 1500;
export const REFERRAL_CREDITS_AMOUNT = 1500;
export const REGISTRATION_CREDITS_AMOUNT = 4500;

import {
  InsertUserTransactionDocument,
  InsertUserTransactionMutation,
  UpdateUserExpirationOfLastValidTransactionDocument,
  UpdateUserExpirationOfLastValidTransactionMutation,
} from '@/graphql/types';
import moment from 'moment';

const onInsertTransaction = async (
  user_id: number,
  amount: number,
  note = TRANSACTION_SYSTEM_NOTE,
) => {
  const {
    data: { insert_user_transactions_one },
  } = await mutate<InsertUserTransactionMutation>({
    mutation: InsertUserTransactionDocument,
    variables: {
      object: {
        user_id,
        amount,
        note,
      },
    },
  });

  await mutate<UpdateUserExpirationOfLastValidTransactionMutation>({
    mutation: UpdateUserExpirationOfLastValidTransactionDocument,
    variables: {
      user_id,
      last_transaction_expiration: moment().add(30, 'days').toDate()
    },
  });
  
  return insert_user_transactions_one;
};

const UserTransactionsService = {
  onInsertTransaction,
};

export default UserTransactionsService;
