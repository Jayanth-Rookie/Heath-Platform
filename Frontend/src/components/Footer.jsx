import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-12 pb-6 border-t">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-medguard-500 flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="text-xl font-bold">Vertex.ai</span>
            </div>
            <p className="text-gray-600 mb-4">
              Your trusted healthcare companion. We provide personalized care to empower your healthcare journey.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-medguard-500">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-medguard-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-medguard-500">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/book-doctor" className="text-gray-600 hover:text-medguard-500">Book a Doctor</Link>
              </li>
              <li>
                <Link to="/mental-health" className="text-gray-600 hover:text-medguard-500">Mental Health Support</Link>
              </li>
              <li>
                <Link to="/reports" className="text-gray-600 hover:text-medguard-500">Health Records</Link>
              </li>
              <li>
                <Link to="/find-doctor" className="text-gray-600 hover:text-medguard-500">Find a Doctor</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-medguard-500">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-medguard-500">Our Doctors</a></li>
              <li><a href="#" className="text-gray-600 hover:text-medguard-500">Testimonials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-medguard-500">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-medguard-500 mt-1" />
                <span className="text-gray-600">123 Healthcare Ave, Medical District, 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-medguard-500" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-medguard-500" />
                <span className="text-gray-600">contact@vertex.ai.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-10 pt-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Vertex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
