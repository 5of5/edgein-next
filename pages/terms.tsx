import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";

type Props = {};

const TermsOfService: NextPage<Props> = (props) => {
	const theName = "EdgeIn.io";
	const theNameInc = "EdgeIn, Inc. ";

	return (
		<main className="min-h-[80vh]">
			<div className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
				<div className="mx-auto prose">
					<h1 className="relative mx-auto text-4xl lg:text-5xl font-bold">
						Terms of Service
					</h1>
					<ol className="list-inside pl-0 space-y-8">
						<li>
							<span className="font-bold">License to {theName} Materials.</span>{" "}
							Subject to all terms and conditions in the Agreement, {theNameInc}
							(“{theName}”) grants to Licensee a nonexclusive, nontransferable,
							nonsublicensable, limited license to use {theName}’s application
							programming interface, the {theName} data described in your Order
							Form, and all other documentation and materials provided by{" "}
							{theName} (collectively, the “{theName} Materials”) solely as
							specifically set forth in your Order Form and as further limited
							by these Data Access Terms and Conditions (the “Agreement”).
							Licensee may not download or use the {theName} Materials for any
							other purpose without {theName}’s prior written consent. {theName}{" "}
							shall not be liable for any (i) modifications to {theName}{" "}
							Materials other than by
							{theName}, (ii) combination of {theName} Materials with any other
							data, information, or other materials, or (iii) use of {theName}{" "}
							Materials in any manner not expressly permitted by {theName}{" "}
							hereunder.
						</li>
						<li>
							<span className="font-bold">Restrictions.</span> Except as
							expressly and unambiguously authorized in your Order Form,
							Licensee may not (and will not permit or assist any third party
							to) (i) sell, rent, lease, loan, license, reproduce, modify,
							transfer, assign, sublicense, display, publish, distribute,
							disassemble, reverse engineer or decompile (except to the limited
							extent expressly authorized by applicable statutory law) any part
							of the {theName} Materials, (ii) otherwise use the {theName}{" "}
							Materials on behalf of any third party, (iii) use the {theName}{" "}
							Materials in any infringing, defamatory, harmful, fraudulent,
							illegal, deceptive, threatening, harassing, or obscene way, or
							(iv) disclose the terms and conditions of the Order Form or this
							Agreement (including, without limitation, pricing terms) to any
							third party. This Agreement does not include any right for
							Licensee to use any trademark, service mark, trade name or any
							other mark of {theName} or any other party or licensor. No rights
							or licenses are granted except as expressly and unambiguously set
							forth herein.
						</li>
						<li>
							<span className="font-bold">Data Processing Terms.</span> To the
							extent that the {theName} Materials include any personal data,
							Article III of {theName}’s Data Use Addendum shall apply. For the
							avoidance of doubt, any terms defined in Article I of the Data Use
							Addendum that are used in Article III of the Data Use Addendum
							shall have the meanings given to such terms in Article I of the
							Data Use Addendum, except for references to “Terms” which shall
							refer to this Agreement, not {theName}’s Terms of Service. For the
							further avoidance of doubt, Article II of the Data Use Addendum
							shall not apply to the services governed by this Agreement.
						</li>
						<li>
							<span className="font-bold">Proprietary Rights.</span> As between
							{theName} and Licensee, the {theName} Materials and all
							intellectual property rights in and to the {theName} Materials are
							and shall at all times remain the sole and exclusive property of{" "}
							{theName} and are protected by applicable intellectual property
							laws and treaties. Except for the licenses expressly granted
							hereunder, {theName}
							reserves all right, title and interest that it may have in the
							{theName} Materials.
						</li>
						<li>
							<span className="font-bold">Marketing Rights.</span> Licensee
							grants {theName} the right to use Licensee’s name and logo on{" "}
							{theName} websites and applications and in marketing and
							promotional material.
						</li>
						<li>
							<span className="font-bold">Payment.</span> Licensee agrees to pay
							all applicable Fees set forth in each applicable Order Form in
							accordance with the schedule, and in the manner specified, on such
							Order Form. All fees shall be non-refundable, and payable in US
							dollars on the date they come due. Licensee shall also pay all
							sales, use, value-added and other taxes, tariffs and duties of any
							type assessed against {theName} except for taxes on {theName}’s
							income. {theName} may disable access to {theName}
							Materials in the event of a failure to pay.
						</li>
						<li>
							<span className="font-bold">Support.</span> Licensee agrees to
							report to {theName} any errors or difficulties discovered and the
							conditions and symptoms of such errors and difficulties.
							{theName} is in no way obligated to provide Licensee with any
							error correction or support, but may provide whatever error
							correction and/or support services {theName} may determine in its
							sole discretion (and anything it provides in connection therewith
							will be deemed part of the {theName} Materials).
						</li>
						<li>
							<span className="font-bold">Licensee Responsibility.</span>{" "}
							Licensee agrees that {theName} shall have no liability whatsoever
							for (i) any use Licensee makes of the {theName} Materials or (ii)
							Licensee’s products or services that interact with or otherwise
							use any part of the {theName} Materials. Licensee shall indemnify
							and hold harmless {theName} from any and all claims, damages,
							liabilities, costs and fees (including reasonable attorneys’ fees)
							arising from (i) or (ii) above or for any breach of this Agreement
							and/or unauthorized use or disclosure of {theName} confidential
							information.
						</li>
						<li>
							<span className="font-bold">Warranty Disclaimer.</span> The
							parties acknowledge that the {theName} Materials and any services
							are provided “AS IS.” {theName} AND ITS LICENSORS DISCLAIM ALL
							WARRANTIES RELATING TO THE {theName} MATERIALS OR ANY SERVICES,
							EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY WARRANTIES
							AGAINST INFRINGEMENT OF THIRD-PARTY RIGHTS, MERCHANTABILITY AND
							FITNESS FOR A PARTICULAR PURPOSE.
						</li>
						<li>
							<span className="font-bold">Limitation of Liability.</span>{" "}
							{theName} AND ITS LICENSORS SHALL NOT BE RESPONSIBLE OR LIABLE
							WITH RESPECT TO ANY SUBJECT MATTER OF THIS AGREEMENT OR THE TERMS
							AND CONDITIONS RELATED THERETO UNDER ANY CONTRACT, NEGLIGENCE,
							STRICT LIABILITY OR OTHER THEORY (A) FOR LOSS OR INACCURACY OF
							DATA OR COST OF PROCUREMENT OF SUBSTITUTE GOODS, SERVICES OR
							TECHNOLOGY, OR (B) FOR ANY INDIRECT, INCIDENTAL OR CONSEQUENTIAL
							DAMAGES INCLUDING, BUT NOT LIMITED TO LOSS OF REVENUES AND LOSS OF
							PROFITS OR (C) FOR ANY AMOUNT IN THE AGGREGATE OF THE AMOUNT PAID
							OR PAYABLE BY LICENSEE UNDER SECTION 6 (PROVIDED THAT, IF NO
							AMOUNTS HAVE BEEN PAID, SUCH CAP SHALL BE FIVE HUNDRED DOLLARS
							(US$500.00)).
						</li>
						<li>
							<span className="font-bold">Termination.</span> This Agreement
							shall continue until the expiration of the Term specified in your
							Order Form or earlier terminated as set forth in this section.
							Either party may terminate this Agreement at any time in the event
							(a) of a material breach by the other party which remains uncured
							after ten (10) days written notice thereof, or (b) the other party
							ceases to do business without a successor, is the subject of any
							proceeding related to its liquidation or insolvency (whether
							voluntary or involuntary) that is not dismissed within ninety (90)
							calendar days, or makes an assignment for the benefit of
							creditors. Upon any termination or expiration of the Agreement (or
							the Order Form), all licenses granted to Licensee hereunder shall
							also terminate. Upon expiration or any termination of this
							Agreement for any reason, Licensee shall destroy and remove from
							all computers, hard drives, networks, and other storage media all
							copies of the {theName} Materials, and an officer of Licensee
							shall so certify to {theName} that such actions have occurred
							within ten (10) days following such expiration or termination.{" "}
							{theName} may audit Licensee’s systems to ensure compliance with
							the foregoing requirement for up to one (1) year after such
							expiration or termination. Sections 2, 3, 4, 6, and 8 through 14
							(and any accrued rights to payment) shall survive termination of
							this Agreement.
						</li>
						<li>
							<span className="font-bold">Government Use.</span> If Licensee is
							part of an agency, department, or other entity of the United
							States Government (“Government”), the use, duplication,
							reproduction, release, modification, disclosure or transfer of the
							{theName} Materials are restricted in accordance with the Federal
							Acquisition Regulations as applied to civilian agencies and the
							Defense Federal Acquisition Regulation Supplement as applied to
							military agencies. The {theName} Materials is a “commercial item,”
							“commercial computer software” and “commercial computer software
							documentation.” In accordance with such provisions, any use of the
							{theName} Materials by the Government shall be governed solely by
							the terms of this Agreement.
						</li>
						<li>
							<span className="font-bold">Export Controls.</span> Licensee shall
							comply with all export laws and restrictions and regulations of
							the Department of Commerce, the United States Department of
							Treasury Office of Foreign Assets Control (“OFAC”), or other
							United States or foreign agency or authority, and Licensee shall
							not export, or allow the export or re-export of any part of the
							{theName} Materials in violation of any such restrictions, laws or
							regulations. By downloading or using the {theName} Materials,
							Licensee agrees to the foregoing and represents and warrants that
							Licensee is not located in, under the control of, or a national or
							resident of any restricted country.
						</li>
						<li>
							<span className="font-bold">General.</span> This Agreement shall
							be governed by and construed under the laws of the State of
							California without giving effect to the principles of conflicts of
							law and without application of the UN Convention on Contracts for
							the International Sale of Goods. All disputes arising in
							connection with this Agreement shall be subject to the sole and
							exclusive jurisdiction and venue of the state and federal courts
							located in San Francisco, California. The prevailing party in any
							action arising out of this Agreement shall be entitled to an award
							of its costs and attorneys’ fees. No waiver of rights under this
							Agreement by either party shall constitute a subsequent waiver of
							any right under this Agreement and all waivers must be in writing.
							In the event that any term of this Agreement is held by a court to
							be unenforceable, such provision shall be limited or eliminated to
							the minimum extent necessary so that this Agreement shall
							otherwise remain in full force and effect and enforceable.
							Licensee agrees that {theName} is not responsible for anything
							resulting from events beyond {theName}’s reasonable control,
							including, but not limited to, acts of God, war, insurrection,
							riots, terrorism, crime, labor shortages (including lawful and
							unlawful strikes), embargoes, postal disruption, communication
							disruption, failure or shortage of infrastructure, or shortage of
							materials. Licensee may not assign or transfer this Agreement (or
							any part hereof), including, without limitation, in connection
							with any merger, sale, or other change in control of Licensee or
							Licensee’s assets relating to this Agreement or by operation of
							law, without the prior written consent of {theName}. {theName}{" "}
							shall have the right to freely assign or otherwise transfer this
							Agreement (in whole or part). All notices required or permitted
							under this Agreement will be in writing and will be sent (i) if to{" "}
							{theName}: 564 Market Street, Suite 500, San Francisco, CA 94104,
							and if Licensee: such address as Licensee provides to {theName} on
							registering for access to {theName} Materials (or, in either case,
							such other address as a party may designate in writing). This
							Agreement is the complete agreement between the parties hereto
							concerning the subject matter of this Agreement and replaces any
							prior oral or written communications between the parties with
							respect thereto. This Agreement may only be modified by a written
							document executed by the parties hereto.
						</li>
					</ol>
				</div>
			</div>
		</main>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			metaTitle: "Terms of Service - EdgeIn.io",
		},
	};
};

export default TermsOfService;
