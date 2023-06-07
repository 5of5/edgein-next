import { getMessage } from '../notifications';

const mockInvestmentRound = {
  id: 1,
  round: 'Seed',
  company_id: null,
  company: null,
};

const mockTeamMember = {
  id: 1,
  company_id: 1,
  person: {
    id: 1,
    name: 'Mock Person',
    slug: 'mock-person',
  },
};

const mockInvestor = {
  id: 1,
  vc_firm_id: 1,
  person_id: 1,
  person: {
    id: 1,
    name: 'Mock Person',
    slug: 'mock-person',
  },
};

const mockEventOrganization = {
  id: 1,
  company_id: 1,
  vc_firm_id: null,
  type: 'organizer',
  event: {
    id: 1,
    name: 'Mock Event',
    slug: 'mock-event',
  },
};

describe('Get notification message', () => {
  describe('when insert data', () => {
    it('resource type is "investment_rounds"', () => {
      expect(
        getMessage({
          actionType: 'Insert Data',
          resourceType: 'investment_rounds',
          investmentRound: mockInvestmentRound,
        }),
      ).toBe(`added **${mockInvestmentRound?.round}** funding round`);
    });

    it('resource type is "team_members"', () => {
      expect(
        getMessage({
          actionType: 'Insert Data',
          resourceType: 'team_members',
          teamMember: mockTeamMember,
        }),
      ).toBe(
        `added [${mockTeamMember?.person?.name}](/people/${mockTeamMember?.person?.slug}/) to the team`,
      );
    });

    it('resource type is "investors"', () => {
      expect(
        getMessage({
          actionType: 'Insert Data',
          resourceType: 'investors',
          investor: mockInvestor,
        }),
      ).toBe(
        `added [${mockInvestor?.person?.name}](/people/${mockInvestor?.person?.slug}/) to the team`,
      );
    });

    it('resource type is "investments" has "companyId"', () => {
      expect(
        getMessage({
          actionType: 'Insert Data',
          resourceType: 'investments',
          companyId: 1,
        }),
      ).toBe('raised new capital');
    });

    it('resource type is "investments" has "vcFirmId"', () => {
      expect(
        getMessage({
          actionType: 'Insert Data',
          resourceType: 'investments',
          vcFirmId: 1,
        }),
      ).toBe('invested in a new portfolio company');
    });

    it('resource type is "event_organization"', () => {
      const organizationType = mockEventOrganization?.type;
      expect(
        getMessage({
          actionType: 'Insert Data',
          resourceType: 'event_organization',
          eventOrganization: mockEventOrganization,
        }),
      ).toBe(
        `was added as ${
          organizationType === 'organizer' ? 'an' : 'a'
        } **${organizationType}** of [${
          mockEventOrganization?.event?.name
        }](/events/${mockEventOrganization?.event?.slug}/)`,
      );
    });
  });

  describe('when change data', () => {
    it('resource type is "companies"', () => {
      expect(
        getMessage({
          actionType: 'Change Data',
          resourceType: 'companies',
        }),
      ).toBe(`has been updated`);
    });
    it('resource type is "vc_firms"', () => {
      expect(
        getMessage({
          actionType: 'Change Data',
          resourceType: 'vc_firms',
        }),
      ).toBe(`has been updated`);
    });
    it('resource type is "investment_rounds"', () => {
      expect(
        getMessage({
          actionType: 'Change Data',
          resourceType: 'investment_rounds',
          investmentRound: mockInvestmentRound,
        }),
      ).toBe(`updated its **${mockInvestmentRound?.round}** funding round`);
    });

    it('resource type is "team_members"', () => {
      expect(
        getMessage({
          actionType: 'Change Data',
          resourceType: 'team_members',
          teamMember: mockTeamMember,
        }),
      ).toBe(
        `updated [${mockTeamMember?.person?.name}](/people/${mockTeamMember?.person?.slug}/)'s role on the team`,
      );
    });

    it('resource type is "investors"', () => {
      expect(
        getMessage({
          actionType: 'Change Data',
          resourceType: 'investors',
          investor: mockInvestor,
        }),
      ).toBe(
        `updated [${mockInvestor?.person?.name}](/people/${mockInvestor?.person?.slug}/)'s role on the team`,
      );
    });

    it('resource type is "investments" has "companyId"', () => {
      expect(
        getMessage({
          actionType: 'Change Data',
          resourceType: 'investments',
          companyId: 1,
        }),
      ).toBe('updated investment information to its profile');
    });

    it('resource type is "investments" has "vcFirmId"', () => {
      expect(
        getMessage({
          actionType: 'Change Data',
          resourceType: 'investments',
          vcFirmId: 1,
        }),
      ).toBe('updated investment information on their portfolio');
    });

    it('resource type is "event_organization"', () => {
      const organizationType = mockEventOrganization?.type;
      expect(
        getMessage({
          actionType: 'Change Data',
          resourceType: 'event_organization',
          eventOrganization: mockEventOrganization,
        }),
      ).toBe(
        `was updated to **${organizationType}** of [${mockEventOrganization?.event?.name}](/events/${mockEventOrganization?.event?.slug}/)`,
      );
    });
  });
});
