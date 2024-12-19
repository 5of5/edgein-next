export {}; // import {
//   News_Bool_Exp,
//   News_Order_By,
//   Order_By,
//   useGetNewsQuery,
// } from '@/graphql/types';
// import usePagination from '@/hooks/use-pagination';
// import { DeepPartial } from '@/types/common';
// import { times } from 'lodash';
// import { FC } from 'react';
// import { Pagination } from '../pagination';
// import { PlaceholderNewsCard } from '../placeholders';
// import { ElemNewsCard } from './elem-news-card';

// type Props = {
//   headingText: string;
//   filters: DeepPartial<News_Bool_Exp>;
//   orderBy?: DeepPartial<News_Order_By>;
//   itemsPerPage: number;
// };

// export const NewsByFilter: FC<Props> = ({
//   headingText,
//   filters,
//   orderBy,
//   itemsPerPage,
// }) => {
//   const { page, setPage, nextPage, previousPage } = usePagination();

//   const { data, isLoading, error } = useGetNewsQuery(
//     {
//       offset: page * itemsPerPage,
//       limit: itemsPerPage,
//       // @ts-expect-error this should work
//       orderBy: [orderBy ?? { updated_at: Order_By.Desc }],
//       where: filters as News_Bool_Exp,
//     },
//     { refetchOnWindowFocus: false },
//   );

//   if (isLoading) {
//     return (
//       <div className="grid gap-8 gap-x-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
//         {times(itemsPerPage, index => (
//           <PlaceholderNewsCard key={index} />
//         ))}
//       </div>
//     );
//   }

//   if (error || !data?.news || !data?.news_aggregate || data.news.length === 0) {
//     return <></>;
//   }

//   const { news, news_aggregate } = data;

//   return (
//     <div>
//       <div className="flex justify-between py-8">
//         <div className="text-4xl font-medium">{headingText}</div>
//       </div>
//       <div>
//         <div
//           data-testid="personalizedCompanies"
//           className="grid gap-8 gap-x-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
//           {news.map(post => (
//             <ElemNewsCard key={post.id} newsPost={post} />
//           ))}
//         </div>
//         <Pagination
//           shownItems={news.length}
//           totalItems={news_aggregate?.aggregate?.count || 0}
//           page={page}
//           itemsPerPage={itemsPerPage}
//           onClickPrev={previousPage}
//           onClickNext={nextPage}
//           onClickToPage={selectedPage => setPage(selectedPage)}
//         />
//       </div>
//     </div>
//   );
// };
