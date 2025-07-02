import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserProfile,
} from "@clerk/clerk-react";
import { isClerkConfigured } from "../lib/clerk";

const AccountPage = () => {
  if (!isClerkConfigured()) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Account Management
            </h1>
            <p className="text-gray-600 mb-6">
              This is where Clerk authentication integration would go. Users
              would be able to:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-gray-700">
              <li>• Sign in / Sign up</li>
              <li>• Manage profile information</li>
              <li>• View order history</li>
              <li>• Update preferences</li>
              <li>• Manage addresses</li>
              <li>• Payment methods</li>
            </ul>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Integration Note:</strong> To complete the Clerk
                integration, you'll need to:
                <br />
                1. Set up a Clerk account and get your API keys
                <br />
                2. Add your Clerk publishable key to the .env file
                <br />
                3. The app will automatically use Clerk authentication
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SignedOut>
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Your Account
            </h1>
            <p className="text-gray-600 mb-6">
              Please sign in to access your account dashboard, order history,
              and preferences.
            </p>
            <SignInButton mode="modal">
              <button className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">
                Account Settings
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your profile, security settings, and preferences
              </p>
            </div>

            <div className="p-6">
              <UserProfile
                appearance={{
                  elements: {
                    card: "shadow-none border-0",
                    navbar: "hidden",
                    navbarMobileMenuButton: "hidden",
                    headerTitle: "text-xl font-semibold",
                    headerSubtitle: "text-gray-600",
                    formButtonPrimary: "bg-black hover:bg-gray-800 text-white",
                  },
                }}
              />
            </div>
          </div>

          {/* Additional Account Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Order History</h3>
              <p className="text-gray-600 text-sm mb-4">
                View and track your recent orders
              </p>
              <button className="text-blue-600 hover:underline text-sm">
                View Orders →
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Addresses</h3>
              <p className="text-gray-600 text-sm mb-4">
                Manage your shipping addresses
              </p>
              <button className="text-blue-600 hover:underline text-sm">
                Manage Addresses →
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Payment Methods</h3>
              <p className="text-gray-600 text-sm mb-4">
                Update your payment information
              </p>
              <button className="text-blue-600 hover:underline text-sm">
                Manage Payment →
              </button>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default AccountPage;
