import { ElemButton } from '@/components/elem-button';
import { ElemLink } from '@/components/elem-link';
import { ROUTES } from '@/routes';
import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';

const ProfileVerification: NextPage = () => {
  const [otp, setOtp] = useState<string[]>(new Array(5).fill('')); // Initializing otp as an array of empty strings
  const [attempts, setAttempts] = useState<number>(0);
  const [timer, setTimer] = useState<number>(120);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

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

  const handleVerify = (): void => {
    if (otp.join('') === '12345') {
      window.location.href = '/success';
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 5) {
        window.location.href = '/failure';
      }
      setOtp(new Array(5).fill(''));
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
      <div className="min-h-screen flex items-center justify-center px-10 flex-col">
        <div className="w-96 bg-[rgba(15,15,15,0.5)] rounded-xl p-7 border border-[#171717]">
          {/* Status Heading */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-300">OTP sent. Check Email!</h3>
              <span className="text-sm text-gray-300">
                {timer > 0 ? (
                  `Resend in ${formatTime(timer)}`
                ) : (
                  <button
                    onClick={() => setTimer(120)}
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
                onClick={handleVerify}
                btn="ol-tertiary"
                arrow
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
