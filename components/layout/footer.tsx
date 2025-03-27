import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          © {currentYear} Diamond Edge Construction Inc. All Rights Reserved.
        </p>{" "}
        {/* Replace with your business name */}
        <div className="mt-2 space-x-4">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
          {/* Add links to social media if applicable */}
        </div>
      </div>
    </footer>
  );
}
// Note: You'll need to create pages for /privacy-policy and /terms-of-service later.
