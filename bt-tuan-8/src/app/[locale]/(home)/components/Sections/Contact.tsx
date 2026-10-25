import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'khaphong217@gmail.com',
      color: 'text-blue-400',
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Ha Noi, Viet Nam',
      color: 'text-green-400',
    },
    {
      icon: '💼',
      label: 'Availability',
      value: 'Open for freelance projects and consulting',
      color: 'text-purple-400',
    },
  ];

  const socialLinks = [
    {
      icon: '💼',
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/khaphong229/',
      color: 'text-blue-500 hover:text-blue-400',
    },
    {
      icon: '🐙',
      platform: 'GitHub',
      url: 'https://github.com/khaphong229',
      color: 'text-gray-400 hover:text-white',
    },
    {
      icon: '🐦',
      platform: 'Twitter',
      url: 'https://www.facebook.com/khaphong.nguyen.229',
      color: 'text-blue-400 hover:text-blue-300',
    },
    {
      icon: '🌐',
      platform: 'Website',
      url: 'https://khaphong.io.vn/',
      color: 'text-green-400 hover:text-green-300',
    },
  ];

  return (
    <section className="py-16 mx-auto max-w-7xl px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white">
          Get In
          {' '}
          <span className="color-primary-text">Touch</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-bold text-white mb-8">Contact Information</h3>

          <div className="space-y-6 mb-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="text-2xl">{info.icon}</div>
                <div>
                  <h4 className="text-white font-medium mb-1">{info.label}</h4>
                  <p className={`text-sm ${info.color}`}>{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Profiles */}
          <div>
            <h4 className="text-white font-medium mb-4">Social Profiles</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`w-10 h-10 rounded-lg border border-neutral-400/40 hover:border-neutral-300/60 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 ${social.color}`}
                  title={social.platform}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-xl font-bold text-white mb-8">Send Me a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-400/40 rounded-lg text-white placeholder-neutral-400 focus:border-blue-400 focus:outline-none transition-colors duration-300"
                placeholder="Your full name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-400/40 rounded-lg text-white placeholder-neutral-400 focus:border-blue-400 focus:outline-none transition-colors duration-300"
                placeholder="your.email@example.com"
                required
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-400/40 rounded-lg text-white placeholder-neutral-400 focus:border-blue-400 focus:outline-none transition-colors duration-300"
                placeholder="What's this about?"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-400/40 rounded-lg text-white placeholder-neutral-400 focus:border-blue-400 focus:outline-none transition-colors duration-300 resize-none"
                placeholder="Tell me about your project or just say hello!"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
