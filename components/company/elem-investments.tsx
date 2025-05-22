import React, { useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import {
  ChevronDown,
  ArrowUpDown,
  Calendar,
  DollarSign,
  Users,
  Tag,
} from 'lucide-react';
import { LucideIconWrapper } from '@/components/icons-wrapper';
import { IconProps } from '@/components/icons';
import { Investment_Rounds } from '@/graphql/types';
import { ElemButton } from '../elem-button';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';
import { LiveChatWidget, EventHandlerPayload } from '@livechat/widget-react';
import { numberWithCommas, formatDate } from '@/utils';

// Wrap Lucide icons to match our IconProps interface
const WrappedArrowUpDown = LucideIconWrapper(ArrowUpDown);
const WrappedCalendar = LucideIconWrapper(Calendar);
const WrappedDollarSign = LucideIconWrapper(DollarSign);
const WrappedUsers = LucideIconWrapper(Users);
const WrappedTag = LucideIconWrapper(Tag);

type Props = {
  className?: string;
  resourceName?: string;
  heading?: string;
  investments: Investment_Rounds[];
};

export const ElemInvestments: React.FC<Props> = ({
  className,
  heading,
  resourceName,
  investments,
}) => {
  function handleLiveChatEvent(event: EventHandlerPayload<'onNewEvent'>) {
    console.log('LiveChatWidget.onNewEvent', event);
  }

  const [show, setShow] = useState<boolean>(false);
  const showNewMessages = (message: String) => {
    console.log(message);
    setShow(true);
  };

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sort investments by date
  const sortedInvestments = [...investments].sort((a, b) => {
    const dateA = a.round_date ? new Date(a.round_date).getTime() : 0;
    const dateB = b.round_date ? new Date(b.round_date).getTime() : 0;
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedInvestments.length / itemsPerPage);
  const paginatedInvestments = sortedInvestments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <section className={`rounded-lg border border-gray-700 ${className}`}>
      {show && (
        <LiveChatWidget
          license={process.env.NEXT_PUBLIC_LIVECHAT_LISCENCE || ''}
          visibility="maximized"
          onNewEvent={handleLiveChatEvent}
        />
      )}
      {heading && (
        <div className="flex items-center justify-between px-4 pt-2">
          <h2 className="text-lg font-medium text-white">{heading}</h2>
          {investments.length > 0 && (
            <button
              onClick={toggleSortOrder}
              className="flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-200">
              <WrappedArrowUpDown className="w-4 h-4" />
              Sort by date {sortOrder === 'desc' ? '(newest)' : '(oldest)'}
            </button>
          )}
        </div>
      )}

      <div className="px-4 py-4">
        {investments.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-neutral-500 italic">
              There is no investment data on this organization.
            </div>
            <ElemButton
              className="mt-2"
              onClick={() =>
                showNewMessages(
                  `Hi Mentibus, I'd like to request investment data on ${resourceName}`,
                )
              }
              btn="default">
              Contribute Data
            </ElemButton>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedInvestments.map((investment, index) => (
                <div
                  key={investment.id || index}
                  className="border border-neutral-800 rounded-lg p-4 space-y-4">
                  <div className="flex flex-wrap gap-3 justify-between">
                    <div className="flex items-center gap-2">
                      <WrappedTag
                        className="w-4 h-4 text-neutral-400"
                        strokeWidth={1.5}
                      />
                      <span className="text-neutral-200 font-medium">
                        {investment.round || 'Undisclosed Round'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <WrappedCalendar
                        className="w-4 h-4 text-neutral-400"
                        strokeWidth={1.5}
                      />
                      <span className="text-neutral-400 text-sm">
                        {investment.round_date
                          ? formatDate(investment.round_date, {
                              month: 'short',
                              day: '2-digit',
                              year: 'numeric',
                            })
                          : 'Undisclosed Date'}
                      </span>
                    </div>
                  </div>

                  {(investment.amount || investment.valuation) && (
                    <div className="flex items-center gap-2">
                      <WrappedDollarSign
                        className="w-4 h-4 text-green-400"
                        strokeWidth={1.5}
                      />
                      <div className="text-neutral-200">
                        {investment.amount && (
                          <span className="text-green-400 font-medium">
                            ${numberWithCommas(investment.amount)}
                          </span>
                        )}
                        {investment.amount && investment.valuation && ' at '}
                        {investment.valuation && (
                          <>
                            <span className="text-neutral-200">
                              ${numberWithCommas(investment.valuation)}{' '}
                              valuation
                            </span>
                          </>
                        )}
                        {!investment.amount &&
                          !investment.valuation &&
                          'Undisclosed amount'}
                      </div>
                    </div>
                  )}

                  {investment.investments &&
                    investment.investments.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <WrappedUsers
                            className="w-4 h-4 text-neutral-400"
                            strokeWidth={1.5}
                          />
                          <span className="text-neutral-300 text-sm">
                            Investors
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {investment.investments.map(inv => (
                            <div
                              key={inv.id}
                              className="flex items-center gap-3 p-2 rounded-lg border border-neutral-800 bg-black/30">
                              {inv.vc_firm && (
                                <ElemLink
                                  href={`${ROUTES.INVESTORS}/${inv.vc_firm.slug}`}
                                  className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                  <ElemPhoto
                                    photo={inv.vc_firm.logo}
                                    wrapClass="flex items-center justify-center shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-neutral-800"
                                    imgClass="object-contain max-w-full max-h-full"
                                    imgAlt={inv.vc_firm.name}
                                    placeholder="company"
                                    placeholderClass="text-neutral-600"
                                  />
                                  <span className="font-medium text-sm text-neutral-200 line-clamp-2">
                                    {inv.vc_firm.name}
                                  </span>
                                </ElemLink>
                              )}

                              {inv.person && !inv.vc_firm && (
                                <ElemLink
                                  href={`${ROUTES.PEOPLE}/${inv.person.slug}`}
                                  className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                  <ElemPhoto
                                    photo={inv.person.picture}
                                    wrapClass="flex items-center justify-center shrink-0 w-10 h-10 rounded-full overflow-hidden border border-neutral-800"
                                    imgClass="object-cover w-10 h-10"
                                    imgAlt={inv.person.name}
                                    placeholder="user"
                                    placeholderClass="text-neutral-600"
                                  />
                                  <span className="font-medium text-sm text-neutral-200 line-clamp-2">
                                    {inv.person.name}
                                  </span>
                                </ElemLink>
                              )}

                              {inv.person && inv.vc_firm && (
                                <span className="text-xs text-neutral-400 ml-auto">
                                  via {inv.vc_firm.name}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? 'text-neutral-600 cursor-not-allowed'
                      : 'text-neutral-300 hover:bg-neutral-800'
                  }`}>
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-md flex items-center justify-center ${
                          currentPage === page
                            ? 'bg-primary-500 text-white'
                            : 'text-neutral-300 hover:bg-neutral-800'
                        }`}>
                        {page}
                      </button>
                    ),
                  )}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage(prev => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                      ? 'text-neutral-600 cursor-not-allowed'
                      : 'text-neutral-300 hover:bg-neutral-800'
                  }`}>
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
