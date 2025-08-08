import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router";

const   Footer = ()=>  {
  return (
    <footer className="bg-muted/50 border-t px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-7xl">
        {/* Brand Section */}
        <div className="mb-8 md:mb-12">
          <Link to="/" className="inline-block">
            <h2 className="text-foreground text-2xl font-bold">ShopCraft</h2>
          </Link>
          <p className="text-muted-foreground mt-2 max-w-md text-sm">
            Your trusted partner for quality products and exceptional customer
            service since 2020.
          </p>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-foreground text-sm font-semibold tracking-wider uppercase">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/size-guide"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-foreground text-sm font-semibold tracking-wider uppercase">
              Products
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/new-arrivals"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/best-sellers"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  to="/sale"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Sale Items
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/gift-cards"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link
                  to="/accessories"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-foreground text-sm font-semibold tracking-wider uppercase">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  to="/sustainability"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  to="/investors"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Investors
                </Link>
              </li>
              <li>
                <Link
                  to="/affiliate"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="space-y-4">
            <h3 className="text-foreground text-sm font-semibold tracking-wider uppercase">
              Follow Us
            </h3>
            <div className="space-y-4">
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/newsletter"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <Link
                  to="https://facebook.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  to="https://twitter.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  to="https://instagram.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  to="https://youtube.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Follow us on YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-border mt-8 border-t pt-8">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-6">
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
            <p className="text-muted-foreground text-xs">
              © 2024 ShopCraft. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


export default  Footer;