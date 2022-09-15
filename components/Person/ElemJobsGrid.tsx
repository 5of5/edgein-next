import { IconEditPencil } from "../Icons";
type Props = {
   className?: string;
   heading?: string;
};

export const ElemJobsGrid: React.FC<Props> = ({ className, heading }) => {
   return (
      <div className="bg-white w-full rounded-md p-4 border">
         {/* title todo */}
         <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Jobs</h2>
            <button className="border border-black/10 h-8 w-8 p-1.5 rounded-full transition-all hover:bg-slate-200">
               <IconEditPencil title="Edit" />
            </button>
         </div>

         {/* list jobs todo */}
         <div className="rounded-lg border-gray border mt-4 flex flex-col gap-3">
            {/* item 1 */}
            <div className="flex gap-5 p-2">
               {/* image */}
               <div className="flex sm:grid max-h-14 rounded-md max-w-[50px] bg-white p-2 border-red border">
                  <img
                     className="object-cover w-full h-full"
                     src="https://dl.airtable.com/.attachments/e61f25ad16a05dfeb5b3634d7b021dfd/63b7d0d6/rocky-rimando.webp"
                     alt="Logo"
                  />
               </div>

               {/* info */}
               <div className="flex flex-col">
                  <span className="text-slate-600 font-bold">Founder and CEO</span>
                  <span className="text-slate-600">Chia Project</span>
                  <div className="flex gap-2 text-slate-600">
                     <span>Aug 2017 - Present</span>
                     <span className="relative top-[-5px]">.</span>
                     <span>5 yrs 1 mo</span>
                  </div>
                  <span className="text-slate-600">San Fransisco Bay Area</span>
               </div>
            </div>

            <hr />

            {/* item 2 */}
            <div className="flex gap-5 p-2">
               {/* image */}
               <div className="flex sm:grid max-h-14 rounded-md max-w-[50px] bg-white p-2 border-red border">
                  <img
                     className="object-cover w-full h-full"
                     src="https://dl.airtable.com/.attachments/e61f25ad16a05dfeb5b3634d7b021dfd/63b7d0d6/rocky-rimando.webp"
                     alt="Logo"
                  />
               </div>

               {/* info */}
               <div className="flex flex-col">
                  <span className="text-slate-600 font-bold">Advisor</span>
                  <span className="text-slate-600">Flibe Energy</span>
                  <div className="flex gap-2 text-slate-600">
                     <span>Jan 2012 - Present</span>
                     <span className="relative top-[-5px]">.</span>
                     <span>10 yrs 8 mos</span>
                  </div>
               </div>
            </div>

            <hr />

            {/* item 3 */}
            <div className="flex gap-5 p-2">
               {/* image */}
               <div className="flex sm:grid max-h-14 rounded-md max-w-[50px] bg-white p-2 border-red border">
                  <img
                     className="object-cover w-full h-full"
                     src="https://dl.airtable.com/.attachments/e61f25ad16a05dfeb5b3634d7b021dfd/63b7d0d6/rocky-rimando.webp"
                     alt="Logo"
                  />
               </div>

               {/* info */}
               <div className="flex flex-col">
                  <span className="text-slate-600 font-bold">Founder</span>
                  <span className="text-slate-600">BitTorrent</span>
                  <div className="flex gap-2 text-slate-600">
                     <span>Feb 2001 - Jun 2017</span>
                     <span className="relative top-[-5px]">.</span>
                     <span>16 yrs 5 mos</span>
                  </div>
                  <span className="text-slate-600">San Fransisco Bay Area</span>
               </div>
            </div>

            <hr />

            {/* item 4 */}
            <div className="flex gap-5 p-2">
               {/* image */}
               <div className="flex sm:grid max-h-14 rounded-md max-w-[50px] bg-white p-2 border-red border">
                  <img
                     className="object-cover w-full h-full"
                     src="https://dl.airtable.com/.attachments/e61f25ad16a05dfeb5b3634d7b021dfd/63b7d0d6/rocky-rimando.webp"
                     alt="Logo"
                  />
               </div>

               {/* info */}
               <div className="flex flex-col">
                  <span className="text-slate-600 font-bold">Programmer</span>
                  <span className="text-slate-600">
                     Evil Geniuses for a Better Tomorrow
                  </span>
                  <div className="flex gap-2 text-slate-600">
                     <span>2000</span>
                     <span className="relative top-[-5px]">.</span>
                     <span>Less than a year</span>
                  </div>
               </div>
            </div>

            <hr />

            {/* item 5 */}
            <div className="flex gap-5 p-2">
               {/* image */}
               <div className="flex sm:grid max-h-14 rounded-md max-w-[50px] bg-white p-2 border-red border">
                  <img
                     className="object-cover w-full h-full"
                     src="https://dl.airtable.com/.attachments/e61f25ad16a05dfeb5b3634d7b021dfd/63b7d0d6/rocky-rimando.webp"
                     alt="Logo"
                  />
               </div>

               {/* info */}
               <div className="flex flex-col">
                  <span className="text-slate-600 font-bold">Programmer</span>
                  <span className="text-slate-600">Signet Assurance</span>
                  <div className="flex gap-2 text-slate-600">
                     <span>1998 - 1999</span>
                     <span className="relative top-[-5px]">.</span>
                     <span>Less than a year</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
