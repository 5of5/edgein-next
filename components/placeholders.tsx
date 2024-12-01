import { FC } from 'react';

export const PlaceholderCompanyCard: FC = () => {
  return (
    <div className="flex flex-col animate-pulse-fast p-5 bg-dark-100 border border-dark-200 rounded-lg md:h-full">
      <div className="flex items-center shrink-0 mb-4 w-full">
        <div className="aspect-square rounded-lg bg-dark-200 w-16 h-16"></div>
        <div className="flex-1 ml-2 h-6 max-w-full bg-dark-200 rounded"></div>
      </div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-2 bg-slate-200 rounded"></div>
        <div className="h-2 bg-slate-200 rounded"></div>
        <div className="h-2 bg-slate-200 rounded w-2/3"></div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <div className="aspect-square rounded-lg h-7 bg-slate-200"></div>
          <div className="aspect-square rounded-lg h-7 bg-slate-200"></div>
          <div className="aspect-square rounded-lg h-7 bg-slate-200"></div>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <div className="rounded-full h-7 w-20 bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

export const PlaceholderNote: FC = () => {
  return (
    <div className="flex flex-col animate-pulse-fast px-5 py-4 bg-dark-100 rounded-lg md:h-full">
      <div className="flex items-center shrink-0 mb-4 w-full">
        <div className="relative aspect-square rounded-lg bg-slate-200 w-12 h-12 mb-2">
          <div className="absolute -right-1 -bottom-1 bg-slate-300 h-7 w-7 rounded-full"></div>
        </div>
        <div className="w-full ml-2">
          <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
          <div className="flex space-x-2">
            <div className="mt-2 h-2 w-2/12 bg-slate-200 rounded"></div>
            <div className="mt-2 h-2 w-6 bg-slate-200 rounded"></div>
            <div className="mt-2 h-2 w-6 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-2 bg-slate-200 rounded"></div>
        <div className="h-2 bg-slate-200 rounded"></div>
        <div className="h-2 bg-slate-200 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export const PlaceholderPerson: FC = () => {
  return (
    <div className="flex flex-col animate-pulse-fast bg-dark-100 rounded-lg md:h-full">
      <div className="flex items-center shrink-0 w-full py-2">
        <div className="aspect-square rounded-full bg-slate-200 w-10 h-10 shrink-0"></div>
        <div className="ml-2 h-3 bg-slate-200 rounded-full w-2/3"></div>
      </div>
    </div>
  );
};

export const PlaceholderActivity: FC = () => {
  return (
    <div className="flex flex-col animate-pulse-fast p-1 mb-6 bg-dark-100 rounded-lg md:h-full">
      <div className="flex items-center shrink-0 w-full mb-3 space-x-2">
        <div className="aspect-square rounded-full bg-slate-200 w-2 h-2"></div>
        <div className="flex-1 h-2 max-w-full bg-slate-200 rounded"></div>
      </div>
      <div className="flex-1 space-y-4 ml-4 py-1">
        <div className="h-2 bg-slate-200 rounded w-1/12"></div>
      </div>
    </div>
  );
};

export const PlaceholderNotification: FC = () => {
  return (
    <div className="flex flex-col animate-pulse-fast p-2 bg-dark-100 rounded-lg md:h-full">
      <div className="flex items-center shrink-0 w-full">
        <div className="aspect-square rounded-lg bg-slate-200 w-12 h-12"></div>
        <div className="ml-2 w-full">
          <div className="h-4 w-2/5 bg-slate-200 rounded"></div>
          <div className="mt-2 h-2 w-1/5 bg-slate-200 rounded"></div>
        </div>
        <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
      </div>
    </div>
  );
};

export const PlaceholderTable: FC = () => {
  return (
    <>
      <table className="animate-pulse-fast table-auto min-w-full divide-y divide-black/10 overscroll-x-none">
        <thead>
          <tr className="grid grid-cols-5 gap-16 w-full p-4">
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="h-2 bg-slate-200 rounded"></th>
          </tr>
        </thead>
        <tbody className="spacing-y-6 bg-dark-100 divide-y divide-black/10">
          <tr className="grid grid-cols-5 gap-16 items-center p-4">
            <th className="">
              <div className="flex items-center shrink-0 w-full">
                <div className="aspect-square rounded-lg bg-slate-200 w-8 h-8"></div>
                <div className="flex-1 ml-2 h-2 max-w-full bg-slate-200 rounded"></div>
              </div>
            </th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="">
              <div className="flex items-center shrink-0 w-full space-x-6">
                <div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
                <div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
                <div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
              </div>
            </th>
          </tr>
          <tr className="grid grid-cols-5 gap-16 items-center p-4">
            <th className="">
              <div className="flex items-center shrink-0 w-full">
                <div className="aspect-square rounded-lg bg-slate-200 w-8 h-8"></div>
                <div className="flex-1 ml-2 h-2 max-w-full bg-slate-200 rounded"></div>
              </div>
            </th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="">
              <div className="flex items-center shrink-0 w-full space-x-6">
                <div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
                <div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
                <div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
              </div>
            </th>
          </tr>
          <tr className="grid grid-cols-5 gap-16 items-center p-4">
            <th className="">
              <div className="flex items-center shrink-0 w-full">
                <div className="aspect-square rounded-lg bg-slate-200 w-8 h-8"></div>
                <div className="flex-1 ml-2 h-2 max-w-full bg-slate-200 rounded"></div>
              </div>
            </th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="">
              <div className="flex items-center shrink-0 w-full space-x-6">
                <div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
                <div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
                <div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
              </div>
            </th>
          </tr>
          <tr className="grid grid-cols-5 gap-16 items-center p-4">
            <th className="">
              <div className="flex items-center shrink-0 w-full">
                <div className="aspect-square rounded-lg bg-slate-200 w-8 h-8"></div>
                <div className="flex-1 ml-2 h-2 max-w-full bg-slate-200 rounded"></div>
              </div>
            </th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="">
              <div className="flex items-center shrink-0 w-full space-x-6">
                <div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
                <div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
                <div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
              </div>
            </th>
          </tr>
          <tr className="grid grid-cols-5 gap-16 items-center p-4">
            <th className="">
              <div className="flex items-center shrink-0 w-full">
                <div className="aspect-square rounded-lg bg-slate-200 w-8 h-8"></div>
                <div className="flex-1 ml-2 h-2 max-w-full bg-slate-200 rounded"></div>
              </div>
            </th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="h-2 bg-slate-200 rounded"></th>
            <th className="">
              <div className="flex items-center shrink-0 w-full space-x-6">
                <div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
                <div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
                <div className="aspect-square rounded-full bg-slate-200 w-8 h-8"></div>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

 export const PlaceholderInvestorCard: FC = () => {
  return (
    <div className="flex flex-col animate-pulse-fast p-5 bg-dark-100 border border-dark-500/10 rounded-lg md:h-full">
      <div className="flex items-center shrink-0 mb-4 w-full">
        <div className="aspect-square rounded-lg bg-slate-200 w-16 h-16"></div>
        <div className="flex-1 ml-2 h-6 max-w-full bg-slate-200 rounded"></div>
      </div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-2 bg-slate-200 rounded"></div>
        <div className="h-2 bg-slate-200 rounded w-2/3"></div>
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <div className="aspect-square rounded-lg h-2 w-2/5 bg-slate-200"></div>
          <div className="aspect-square rounded-lg h-2 w-2/5 bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

export const PlaceholderEventCard: FC = () => {
  return (
    <div className="flex flex-col animate-pulse-fast p-5 bg-dark-100 border border-dark-500/10 rounded-lg md:h-full">
      <div className="flex items-center shrink-0 mb-4 w-full">
        <div className="rounded-lg bg-slate-200 h-36 w-full"></div>
      </div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
        <div className="h-2 bg-slate-200 rounded w-2/5"></div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <div className="rounded-full h-6 w-10 bg-slate-200"></div>
        <div className="rounded-full h-6 w-10 bg-slate-200"></div>
        <div className="rounded-full h-6 w-10 bg-slate-200"></div>
      </div>
      <div className="mt-8 flex items-center space-x-2">
        <div className="rounded-lg h-2 w-2/5 bg-slate-200"></div>
        <div className="rounded-lg h-2 w-2/5 bg-slate-200"></div>
      </div>
    </div>
  );
};

export const PlaceholderNewsCard: FC = () => {
  return (
    <div className="flex flex-col animate-pulse-fast px-5 py-4 bg-dark-100 rounded-lg md:h-full">
      <div className="flex items-center shrink-0 mb-4 w-full">
        <div className="relative aspect-square rounded-lg bg-slate-200 w-12 h-12 mb-2">
          <div className="absolute -right-1 -bottom-1 bg-slate-300 h-7 w-7 rounded-full"></div>
        </div>
        <div className="w-full ml-2">
          <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
          <div className="flex space-x-2">
            <div className="mt-2 h-2 w-2/12 bg-slate-200 rounded"></div>
            <div className="mt-2 h-2 w-6 bg-slate-200 rounded"></div>
            <div className="mt-2 h-2 w-6 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-2 bg-slate-200 rounded"></div>
        <div className="h-2 bg-slate-200 rounded"></div>
        <div className="h-2 bg-slate-200 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export const PlaceholderPersonCard: FC = () => {
  return (
    <div className="flex flex-col animate-pulse-fast p-5 bg-dark-100 rounded-lg md:h-full">
      <div className="flex items-center shrink-0 mb-4 w-full">
        <div className="aspect-square rounded-full bg-slate-200 w-12 h-12"></div>
        <div className="flex-1 ml-4 h-6 max-w-full bg-slate-200 rounded"></div>
      </div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-2 bg-slate-200 rounded"></div>
        <div className="h-2 bg-slate-200 rounded"></div>
        <div className="h-2 bg-slate-200 rounded w-2/3"></div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <div className="aspect-square rounded-lg h-4 bg-slate-200"></div>
          <div className="aspect-square rounded-lg h-4 bg-slate-200"></div>
          <div className="aspect-square rounded-lg h-4 bg-slate-200"></div>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <div className="rounded-full h-7 w-20 bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};
