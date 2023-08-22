import { useState } from 'react';
import { EditSection } from '../dashboard/edit-section';
import {
  GetUserProfileQuery,
  UpdateUserPreferencesDocument,
  UpdateUserPreferencesMutation,
  useUpdateUserPreferencesMutation,
} from '@/graphql/types';
import InputSwitch from '@/components/input-switch';
import { mutate } from '@/graphql/hasuraAdmin';

type Props = {
  user: GetUserProfileQuery['users_by_pk'];
};

export const ProfileEditDailyEmails: React.FC<Props> = ({ user }) => {
  const preferences = (user?.preferences as { daily_emails: boolean }) ?? {
    daily_emails: false,
  };
  const [dailyEmails, setDailyEmails] = useState<boolean>(
    preferences.daily_emails,
  );

  const handleSwitchDailyEmails = async (value: boolean) => {
    await fetch('/api/toggle-daily-emails', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dailyEmails: value,
      }),
    });
    setDailyEmails(value);
  };

  return (
    <EditSection heading="Daily emails">
      <InputSwitch
        label=""
        checked={dailyEmails}
        onChange={handleSwitchDailyEmails}
      />
    </EditSection>
  );
};
