import React, { useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { useAuth } from '@/hooks/use-auth';
import { USER_ROLES } from '@/utils/users';

interface TestPremiumProps {
  noLayout: boolean;
}

const TestPremium: NextPage<TestPremiumProps> = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modifySuccess, setModifySuccess] = useState<string | null>(null);

  // State for plan modification
  const [planStatus, setPlanStatus] = useState<string>('active');
  const [planType, setPlanType] = useState<string>('contributor');
  const [modifyLoading, setModifyLoading] = useState<boolean>(false);

  // Check if current user is admin
  if (user?.role !== USER_ROLES.ADMIN) {
    return (
      <div className="container mx-auto p-6 text-black">
        <h1 className="text-2xl font-bold mb-4 text-black">Access Denied</h1>
        <p className="text-black">You must be an admin to access this page.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setModifySuccess(null);

    try {
      const response = await fetch('/api/test-user-premium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }

      setResult(data);

      // Set the plan modification form values to current values
      if (data.premiumDetails) {
        setPlanStatus(data.premiumDetails.subscriptionStatus || 'inactive');
        setPlanType(data.premiumDetails.planType || 'contributor');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleModifyPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setModifyLoading(true);
    setModifySuccess(null);
    setError(null);

    try {
      if (!result || !result.userId) {
        throw new Error('No user selected. Please search for a user first.');
      }

      console.log('Attempting to update plan for user:', result.userId);
      console.log('Plan settings:', { status: planStatus, plan: planType });

      const response = await fetch('/api/modify-user-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: result.userId,
          status: planStatus,
          plan: planType,
        }),
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`Failed to parse server response: ${responseText}`);
      }

      if (!response.ok) {
        throw new Error(
          data.error || `Error ${response.status}: ${response.statusText}`,
        );
      }

      setModifySuccess(
        `Plan successfully updated to ${planType} (${planStatus})`,
      );

      // Wait a second to ensure the database has updated
      setTimeout(async () => {
        // Refresh user data
        try {
          const refreshResponse = await fetch('/api/test-user-premium', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            setResult(refreshData);
          }
        } catch (refreshError) {
          console.error('Error refreshing user data:', refreshError);
        } finally {
          setModifyLoading(false);
        }
      }, 1000);
    } catch (err: any) {
      console.error('Error updating plan:', err);
      setError(err.message || 'An error occurred while modifying the plan');
      setModifyLoading(false);
    }
  };

  const formatJSON = (obj: any) => {
    return JSON.stringify(obj, null, 2);
  };

  return (
    <div className="container mx-auto p-6 text-black bg-white admin-test-container">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Test User Premium Status
      </h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium text-black">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}>
          {loading ? 'Loading...' : 'Check Premium Status'}
        </button>
      </form>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {modifySuccess && (
        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-md">
          <p>{modifySuccess}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 text-black">
          <div className="mb-4 p-4 bg-white border border-gray-300 rounded-md">
            <h2 className="text-xl font-bold mb-2 text-black">
              Premium Status:
            </h2>
            <p
              className={`text-lg font-bold ${
                result.isPremium ? 'admin-test-success' : 'admin-test-error'
              }`}>
              {result.isPremium ? 'PREMIUM USER' : 'NON-PREMIUM USER'}
            </p>

            {result.premiumDetails && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-black">
                  Premium Details:
                </h3>
                <table className="w-full border-collapse border border-gray-300">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-medium text-black bg-gray-100">
                        User ID:
                      </td>
                      <td className="py-2 px-4 text-black bg-white">
                        {result.userId}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-medium text-black bg-gray-100">
                        Plan Type:
                      </td>
                      <td className="py-2 px-4 text-black bg-white">
                        {result.premiumDetails.planType || 'None'}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-medium text-black bg-gray-100">
                        Subscription Status:
                      </td>
                      <td
                        className={`py-2 px-4 ${
                          result.premiumDetails.hasActiveSubscription
                            ? 'admin-test-success'
                            : 'admin-test-error'
                        } bg-white`}>
                        {result.premiumDetails.subscriptionStatus || 'None'}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-medium text-black bg-gray-100">
                        Billing Org ID:
                      </td>
                      <td className="py-2 px-4 text-black bg-white">
                        {result.premiumDetails.billingOrgId || 'None'}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-medium text-black bg-gray-100">
                        View Emails Access:
                      </td>
                      <td
                        className={`py-2 px-4 ${
                          result.premiumDetails.hasViewEmails
                            ? 'admin-test-success'
                            : 'admin-test-error'
                        } bg-white`}>
                        {result.premiumDetails.hasViewEmails ? 'Yes' : 'No'}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-medium text-black bg-gray-100">
                        Has Credits:
                      </td>
                      <td
                        className={`py-2 px-4 ${
                          result.premiumDetails.hasCredits
                            ? 'admin-test-success'
                            : 'admin-test-error'
                        } bg-white`}>
                        {result.premiumDetails.hasCredits ? 'Yes' : 'No'} (
                        {result.premiumDetails.credits} credits)
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-medium text-black bg-gray-100">
                        Higher Limits:
                      </td>
                      <td
                        className={`py-2 px-4 ${
                          result.premiumDetails.hasHigherLimits
                            ? 'admin-test-success'
                            : 'admin-test-error'
                        } bg-white`}>
                        {result.premiumDetails.hasHigherLimits ? 'Yes' : 'No'}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-medium text-black bg-gray-100">
                        Lists Count:
                      </td>
                      <td className="py-2 px-4 text-black bg-white">
                        {result.premiumDetails.entitlements?.listsCount ||
                          'N/A'}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-medium text-black bg-gray-100">
                        Groups Count:
                      </td>
                      <td className="py-2 px-4 text-black bg-white">
                        {result.premiumDetails.entitlements?.groupsCount ||
                          'N/A'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Plan Modification Form */}
            <div className="mt-6 border-t border-gray-300 pt-4">
              <h3 className="text-lg font-semibold mb-2 text-black">
                Modify Plan:
              </h3>
              <form onSubmit={handleModifyPlan} className="space-y-4">
                <div>
                  <label
                    htmlFor="planType"
                    className="block mb-1 font-medium text-black">
                    Plan Type
                  </label>
                  <select
                    id="planType"
                    value={planType}
                    onChange={e => setPlanType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white">
                    <option value="contributor">Contributor</option>
                    <option value="pro">Pro</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="free">Free</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="planStatus"
                    className="block mb-1 font-medium text-black">
                    Plan Status
                  </label>
                  <select
                    id="planStatus"
                    value={planStatus}
                    onChange={e => setPlanStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="canceled">Canceled</option>
                    <option value="trialing">Trialing</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={modifyLoading}
                  className={`px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    modifyLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}>
                  {modifyLoading ? 'Updating...' : 'Update Plan'}
                </button>
              </form>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2 text-black">User Data:</h2>
            <pre
              className="p-4 bg-white border border-gray-300 rounded-md overflow-auto max-h-96 text-sm text-black font-mono json-display"
              style={{
                color: 'black',
                backgroundColor: 'white',
                fontFamily: 'monospace',
              }}>
              {formatJSON(result.user)}
            </pre>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2 text-black">
              Detailed User Data:
            </h2>
            <pre
              className="p-4 bg-white border border-gray-300 rounded-md overflow-auto max-h-96 text-sm text-black font-mono json-display"
              style={{
                color: 'black',
                backgroundColor: 'white',
                fontFamily: 'monospace',
              }}>
              {formatJSON(result.userDetails)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { noLayout: false },
  };
};

export default TestPremium;
