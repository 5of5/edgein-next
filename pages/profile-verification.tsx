import { ElemButton } from '@/components/elem-button';
import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useUser } from '@/context/user-context';
import { fetchGraphQL } from '@/components/dashboard/elem-my-lists-menu';

const UPDATE_USER_VERIFICATION_STATUS = `
  mutation UpdateUserVerificationStatus($id: Int!, $verified: Boolean!) {
    update_users(
      where: { id: { _eq: $id } }
      _set: { is_verified: $verified }
    ) {
      affected_rows
      returning {
        id
        is_verified
      }
    }
  }
`;

// Create a single supabase client for interacting with your database
const apiUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || '';
const supabase = createClient(apiUrl, apiKey);

const ProfileVerification: NextPage = () => {
  const { user } = useUser();

  const [otp, setOtp] = useState<string[]>(new Array(6).fill('')); // Initializing otp as an array of empty strings
  const [attempts, setAttempts] = useState<number>(1);
  const [timer, setTimer] = useState<number>(120);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('OTP sent. Check Email!');

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const verifyUser = async () => {
    if (!user?.id) {
      console.error('User ID is not available.');
      return;
    }

    try {
      const result = await fetchGraphQL(UPDATE_USER_VERIFICATION_STATUS, {
        id: user.id,
        verified: true,
      });

      const data = result.update_users;
      if (data?.affected_rows > 0) {
        window.location.href = '/verify-success';
      } else {
        console.error('No rows were updated');
      }
    } catch (err) {
      console.error('Error during mutation:', err);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.verifyOtp({
        email: user?.email || '',
        token: otp.join(''),
        type: 'email',
      });
      if (error) {
        console.error('Error sending OTP:', error.message);
        setMessage(`Invalid otp. Attempts left: ${5 - attempts}`);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 5) {
          window.location.href = '/verify-fail';
        }
        setOtp(new Array(6).fill(''));
      } else {
        e.preventDefault();
        console.log('OTP sent:', session);
        verifyUser();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: user?.email || '',
    });

    if (error) {
      setMessage('Failed to resend OTP');
      console.error('Error resending OTP:', error.message);
    } else {
      setMessage('OTP sent. Check Email');
      setTimer(120);
    }
  };

  const handleChange = (value: string, index: number): void => {
    if (value.length > 1) return; // Prevent multiple characters
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus the next input box if the user enters a value
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleBackspace = (index: number): void => {
    if (index > 0 && !otp[index]) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Add a heading for the status above the OTP input box */}
      <div className="min-h-screen flex items-center justify-center px-10">
        <div className="w-96 bg-[rgba(15,15,15,0.5)] rounded-xl p-7 border border-[#171717] mb-20">
          {/* Status Heading */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-300">{message}</h3>
              <span className="text-sm text-gray-300">
                {timer > 0 ? (
                  `Resend in ${formatTime(timer)}`
                ) : (
                  <button
                    onClick={() => resendOtp()}
                    className="text-purple-400 hover:text-purple-300 transition-colors">
                    Resend OTP
                  </button>
                )}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="flex space-x-2 pb-2"
              style={{ justifyContent: 'center' }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onChange={e => handleChange(e.target.value, index)}
                  onKeyDown={e => {
                    if (e.key === 'Backspace') handleBackspace(index);
                  }}
                  className="w-12 h-12 text-center text-lg bg-[#000000] border border-gray-600 rounded-lg text-white placeholder-[#8ca3af] focus:outline-none focus:ring-0 focus:border-purple-200 transition-all duration-300 ease-in-out"
                />
              ))}
            </div>

            <div className="justify-self-center relative z-10">
              <ElemButton
                onClick={e => verifyOtp(e)}
                btn="ol-tertiary"
                arrow
                disabled={isLoading}
                size="md">
                Verify
              </ElemButton>
            </div>
          </div>
        </div>
      </div>
      {/* Adjust the positioning and size of the background figures */}
      <figure className="absolute rounded-full bottom-10 left-10 w-48 h-48 bg-primary-400 blur-3xl"></figure>
      <figure className="absolute rounded-full bottom-10 right-10 w-48 h-48 bg-amber-300 blur-3xl opacity-60"></figure>
      <figure className="absolute rounded-full inset-x-0 bottom-0 w-64 h-64 mx-auto bg-primary-400 blur-3xl opacity-80"></figure>
    </>
  );
};

export default ProfileVerification;
