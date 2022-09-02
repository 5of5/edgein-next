import { ElemPhoto } from "@/components/ElemPhoto";
import { IconCrap } from "@/components/reactions/IconCrap";
import { IconHot } from "@/components/reactions/IconHot";
import { IconLike } from "@/components/reactions/IconLike";
import { useAuth } from "@/hooks/useAuth";
import { runGraphQl } from "@/utils";
import { NextPage } from "next";

type Props = {}

const MyList: NextPage<Props> = (props) => {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8 lg:pt-10 mt-10">
      <div className="grid grid-cols-4 gap-4">
        <div className="...">

          {/* List */}
          <div>
            <h3 className="text-xl font-bold py-1 text-dark-500">My List</h3>
            <ul className="flex flex-col">
              <li className="py-1 text-slate-600 inline-flex"><IconHot className="mr-1" /> Hot (1)</li>
              <li className="py-1 text-slate-600 inline-flex"><IconLike className="mr-1" /> Like (10)</li>
              <li className="py-1 text-slate-600 inline-flex"><IconCrap className="mr-1" /> Crap (4)</li>
              <li className="py-1 text-slate-600 inline-flex"><IconCrap className="mr-1" /> Crap (4)</li>
            </ul>
          </div>

        </div>
        <div className="col-span-3">

          <div className="w-full">
            <h1 className="flex font-bold text-xl"><IconHot className="mr-2 mb-10"/> Hot</h1>
          </div>

          <div className="rounded-lg p-3 bg-white col-span-3">
            <h2 className="font-bold text-dark-500 text-xl">Hot: Companies</h2>

            <div className="w-full mt-1 flex justify-between">
              <div className="inline-flex items-center">
                <span className="font-semibold text-sm mr-2">Tags: </span>
                <span>
                  <span className="px-2 py-1 bg-slate-200 rounded-md text-sm mr-2">Layer-1 (2)</span>
                  <span className="px-2 py-1 bg-slate-200 rounded-md text-sm mr-2">Identity (4)</span>
                  <span className="px-2 py-1 bg-slate-200 rounded-md text-sm mr-2">d-Apps (3)</span>
                </span>
              </div>

              <div className="inline-flex items-center">
                <span className="font-semibold text-sm mr-2">Total Funding: 4.8M</span>
              </div>
            </div>

            <div className="mt-3 w-full">
              <table className="w-full rounded border border-slate-100">
                <thead className="">
                  <tr className="text-left text-sm">
                    <th className="px-1">Name</th>
                    <th className="px-1">Token/Value</th>
                    <th className="px-1">Team Size</th>
                    <th className="px-1">Location</th>
                    <th className="px-1">Reactions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="text-left text-sm">
                    <td className="px-1 inline-flex items-center py-2">
                      <ElemPhoto
                        photo={{ "id": "attAtWZ0GvZoH3Htr", "url": "https://dl.airtable.com/.attachments/7a766e52717adcc89b21cfde621ea132/abdfd0e7/SolriseFinance.jpg?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=af7a92ccf4154c59", "size": 4431, "type": "image/jpeg", "width": 200, "height": 200, "filename": "Solrise Finance.jpg", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/b74127d1260d940a4a8888ff0bc296de/08d24161?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=32e2c28bca27220e", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/94859f1f52eb3dc9bb537d82b3852419/d40a82c0?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=d96a486ded492ce5", "width": 200, "height": 200 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/dfa1bcf9842cefdae3d14bc01c58162e/d2c57666?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=2e1452e05d13f76d", "width": 36, "height": 36 } } }}
                        wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                        imgClass="object-fit max-w-full max-h-full"
                        imgAlt={'chia'}
                      />
                      Chia
                    </td>
                    <td className="px-1 py-2">XCH/$39.19</td>
                    <td className="px-1 py-2">69</td>
                    <td className="px-1 py-2">San Francisco, CA, USA</td>
                    <td className="px-1 py-2">
                      <div>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconHot className="mr-1"/>2</span>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconLike className="mr-1"/>4</span>
                        <span className="text-slate-600 font-bold items-center inline-flex"><IconCrap className="mr-1"/>5</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="text-left text-sm bg-slate-50">
                    <td className="px-1 inline-flex items-center py-2">
                      <ElemPhoto
                        photo={{"id":"attqlQW9sa7EHXA0F","url":"https://dl.airtable.com/.attachments/4c5dbf062c363e1963f91bcf0237f470/5c238f9c/0fe61c9db8d613fdd505f74ef07b76ba.jpeg-resized?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=1ec1ef208dd22ddc","size":2572,"type":"image/jpeg","width":128,"height":128,"filename":"0fe61c9db8d613fdd505f74ef07b76ba.jpeg-resized","thumbnails":{"full":{"url":"https://dl.airtable.com/.attachmentThumbnails/380a0dbb32426fa1c4dfd594e215c73a/dba9fc7a?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=76de77a37734da7c","width":3000,"height":3000},"large":{"url":"https://dl.airtable.com/.attachmentThumbnails/10d7f0be666f8de9bcdddd2b9d05fc66/b0fdd585?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=56a8b542efc86201","width":128,"height":128},"small":{"url":"https://dl.airtable.com/.attachmentThumbnails/8a11fb7e4e2bca2ead2c79b69b02d5fa/9e676d41?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=fcc239f5fe6fb124","width":36,"height":36}}}}
                        wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                        imgClass="object-fit max-w-full max-h-full"
                        imgAlt={'chia'}
                      />
                      MetaSoccer
                    </td>
                    <td className="px-1 py-2">XCH/$39.19</td>
                    <td className="px-1 py-2">69</td>
                    <td className="px-1 py-2">San Francisco, CA, USA</td>
                    <td className="px-1 py-2">
                      <div>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconHot className="mr-1"/>2</span>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconLike className="mr-1"/>4</span>
                        <span className="text-slate-600 font-bold items-center inline-flex"><IconCrap className="mr-1"/>5</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="text-left text-sm">
                    <td className="px-1 inline-flex items-center py-2">
                      <ElemPhoto
                        photo={{ "id": "attAtWZ0GvZoH3Htr", "url": "https://dl.airtable.com/.attachments/7a766e52717adcc89b21cfde621ea132/abdfd0e7/SolriseFinance.jpg?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=af7a92ccf4154c59", "size": 4431, "type": "image/jpeg", "width": 200, "height": 200, "filename": "Solrise Finance.jpg", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/b74127d1260d940a4a8888ff0bc296de/08d24161?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=32e2c28bca27220e", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/94859f1f52eb3dc9bb537d82b3852419/d40a82c0?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=d96a486ded492ce5", "width": 200, "height": 200 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/dfa1bcf9842cefdae3d14bc01c58162e/d2c57666?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=2e1452e05d13f76d", "width": 36, "height": 36 } } }}
                        wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                        imgClass="object-fit max-w-full max-h-full"
                        imgAlt={'chia'}
                      />
                      Chia
                    </td>
                    <td className="px-1 py-2">XCH/$39.19</td>
                    <td className="px-1 py-2">69</td>
                    <td className="px-1 py-2">San Francisco, CA, USA</td>
                    <td className="px-1 py-2">
                      <div>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconHot className="mr-1"/>2</span>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconLike className="mr-1"/>4</span>
                        <span className="text-slate-600 font-bold items-center inline-flex"><IconCrap className="mr-1"/>5</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="text-left text-sm bg-slate-50">
                    <td className="px-1 inline-flex items-center py-2">
                      <ElemPhoto
                        photo={{"id":"attqlQW9sa7EHXA0F","url":"https://dl.airtable.com/.attachments/4c5dbf062c363e1963f91bcf0237f470/5c238f9c/0fe61c9db8d613fdd505f74ef07b76ba.jpeg-resized?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=1ec1ef208dd22ddc","size":2572,"type":"image/jpeg","width":128,"height":128,"filename":"0fe61c9db8d613fdd505f74ef07b76ba.jpeg-resized","thumbnails":{"full":{"url":"https://dl.airtable.com/.attachmentThumbnails/380a0dbb32426fa1c4dfd594e215c73a/dba9fc7a?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=76de77a37734da7c","width":3000,"height":3000},"large":{"url":"https://dl.airtable.com/.attachmentThumbnails/10d7f0be666f8de9bcdddd2b9d05fc66/b0fdd585?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=56a8b542efc86201","width":128,"height":128},"small":{"url":"https://dl.airtable.com/.attachmentThumbnails/8a11fb7e4e2bca2ead2c79b69b02d5fa/9e676d41?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=fcc239f5fe6fb124","width":36,"height":36}}}}
                        wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                        imgClass="object-fit max-w-full max-h-full"
                        imgAlt={'chia'}
                      />
                      MetaSoccer
                    </td>
                    <td className="px-1 py-2">XCH/$39.19</td>
                    <td className="px-1 py-2">69</td>
                    <td className="px-1 py-2">San Francisco, CA, USA</td>
                    <td className="px-1 py-2">
                      <div>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconHot className="mr-1"/>2</span>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconLike className="mr-1"/>4</span>
                        <span className="text-slate-600 font-bold items-center inline-flex"><IconCrap className="mr-1"/>5</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg p-3 bg-white col-span-3 mt-10 mb-10">
            <h2 className="font-bold text-dark-500 text-xl">Hot: Investors</h2>

            <div className="mt-3 w-full">
              <table className="w-full rounded border border-slate-100">
                <thead className="">
                  <tr className="text-left text-sm">
                    <th className="px-1">Name</th>
                    <th className="px-1"># of Investments</th>
                    <th className="px-1">Latest Investment Date</th>
                    <th className="px-1">Reactions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="text-left text-sm">
                    <td className="px-1 inline-flex items-center py-2">
                      <ElemPhoto
                        photo={{ "id": "attAtWZ0GvZoH3Htr", "url": "https://dl.airtable.com/.attachments/7a766e52717adcc89b21cfde621ea132/abdfd0e7/SolriseFinance.jpg?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=af7a92ccf4154c59", "size": 4431, "type": "image/jpeg", "width": 200, "height": 200, "filename": "Solrise Finance.jpg", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/b74127d1260d940a4a8888ff0bc296de/08d24161?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=32e2c28bca27220e", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/94859f1f52eb3dc9bb537d82b3852419/d40a82c0?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=d96a486ded492ce5", "width": 200, "height": 200 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/dfa1bcf9842cefdae3d14bc01c58162e/d2c57666?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=2e1452e05d13f76d", "width": 36, "height": 36 } } }}
                        wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                        imgClass="object-fit max-w-full max-h-full"
                        imgAlt={'chia'}
                      />
                      Chia
                    </td>
                    <td className="px-1 py-2">69</td>
                    <td className="px-1 py-2">May 12, 2022</td>
                    <td className="px-1 py-2">
                      <div>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconHot className="mr-1"/>2</span>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconLike className="mr-1"/>4</span>
                        <span className="text-slate-600 font-bold items-center inline-flex"><IconCrap className="mr-1"/>5</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="text-left text-sm bg-slate-50">
                    <td className="px-1 inline-flex items-center py-2">
                      <ElemPhoto
                        photo={{"id":"attqlQW9sa7EHXA0F","url":"https://dl.airtable.com/.attachments/4c5dbf062c363e1963f91bcf0237f470/5c238f9c/0fe61c9db8d613fdd505f74ef07b76ba.jpeg-resized?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=1ec1ef208dd22ddc","size":2572,"type":"image/jpeg","width":128,"height":128,"filename":"0fe61c9db8d613fdd505f74ef07b76ba.jpeg-resized","thumbnails":{"full":{"url":"https://dl.airtable.com/.attachmentThumbnails/380a0dbb32426fa1c4dfd594e215c73a/dba9fc7a?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=76de77a37734da7c","width":3000,"height":3000},"large":{"url":"https://dl.airtable.com/.attachmentThumbnails/10d7f0be666f8de9bcdddd2b9d05fc66/b0fdd585?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=56a8b542efc86201","width":128,"height":128},"small":{"url":"https://dl.airtable.com/.attachmentThumbnails/8a11fb7e4e2bca2ead2c79b69b02d5fa/9e676d41?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=fcc239f5fe6fb124","width":36,"height":36}}}}
                        wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                        imgClass="object-fit max-w-full max-h-full"
                        imgAlt={'chia'}
                      />
                      MetaSoccer
                    </td>
                    <td className="px-1 py-2">69</td>
                    <td className="px-1 py-2">May 12, 2022</td>
                    <td className="px-1 py-2">
                      <div>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconHot className="mr-1"/>2</span>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconLike className="mr-1"/>4</span>
                        <span className="text-slate-600 font-bold items-center inline-flex"><IconCrap className="mr-1"/>5</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="text-left text-sm">
                    <td className="px-1 inline-flex items-center py-2">
                      <ElemPhoto
                        photo={{ "id": "attAtWZ0GvZoH3Htr", "url": "https://dl.airtable.com/.attachments/7a766e52717adcc89b21cfde621ea132/abdfd0e7/SolriseFinance.jpg?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=af7a92ccf4154c59", "size": 4431, "type": "image/jpeg", "width": 200, "height": 200, "filename": "Solrise Finance.jpg", "thumbnails": { "full": { "url": "https://dl.airtable.com/.attachmentThumbnails/b74127d1260d940a4a8888ff0bc296de/08d24161?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=32e2c28bca27220e", "width": 3000, "height": 3000 }, "large": { "url": "https://dl.airtable.com/.attachmentThumbnails/94859f1f52eb3dc9bb537d82b3852419/d40a82c0?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=d96a486ded492ce5", "width": 200, "height": 200 }, "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/dfa1bcf9842cefdae3d14bc01c58162e/d2c57666?ts=1658363798&userId=usr7CWMWLCRhTmk83&cs=2e1452e05d13f76d", "width": 36, "height": 36 } } }}
                        wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                        imgClass="object-fit max-w-full max-h-full"
                        imgAlt={'chia'}
                      />
                      Chia
                    </td>
                    <td className="px-1 py-2">69</td>
                    <td className="px-1 py-2">May 12, 2022</td>
                    <td className="px-1 py-2">
                      <div>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconHot className="mr-1"/>2</span>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconLike className="mr-1"/>4</span>
                        <span className="text-slate-600 font-bold items-center inline-flex"><IconCrap className="mr-1"/>5</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="text-left text-sm bg-slate-50">
                    <td className="px-1 inline-flex items-center py-2">
                      <ElemPhoto
                        photo={{"id":"attqlQW9sa7EHXA0F","url":"https://dl.airtable.com/.attachments/4c5dbf062c363e1963f91bcf0237f470/5c238f9c/0fe61c9db8d613fdd505f74ef07b76ba.jpeg-resized?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=1ec1ef208dd22ddc","size":2572,"type":"image/jpeg","width":128,"height":128,"filename":"0fe61c9db8d613fdd505f74ef07b76ba.jpeg-resized","thumbnails":{"full":{"url":"https://dl.airtable.com/.attachmentThumbnails/380a0dbb32426fa1c4dfd594e215c73a/dba9fc7a?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=76de77a37734da7c","width":3000,"height":3000},"large":{"url":"https://dl.airtable.com/.attachmentThumbnails/10d7f0be666f8de9bcdddd2b9d05fc66/b0fdd585?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=56a8b542efc86201","width":128,"height":128},"small":{"url":"https://dl.airtable.com/.attachmentThumbnails/8a11fb7e4e2bca2ead2c79b69b02d5fa/9e676d41?ts=1658363793&userId=usr7CWMWLCRhTmk83&cs=fcc239f5fe6fb124","width":36,"height":36}}}}
                        wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 bg-white rounded-lg shadow-md mr-2"
                        imgClass="object-fit max-w-full max-h-full"
                        imgAlt={'chia'}
                      />
                      MetaSoccer
                    </td>
                    <td className="px-1 py-2">69</td>
                    <td className="px-1 py-2">May 12, 2022</td>
                    <td className="px-1 py-2">
                      <div>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconHot className="mr-1"/>2</span>
                        <span className="text-slate-600 font-bold items-center inline-flex mr-2"><IconLike className="mr-1"/>4</span>
                        <span className="text-slate-600 font-bold items-center inline-flex"><IconCrap className="mr-1"/>5</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyList;