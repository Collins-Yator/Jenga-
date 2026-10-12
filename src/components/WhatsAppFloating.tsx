import React from 'react';
import { MessageSquare } from 'lucide-react';

interface WhatsAppFloatingProps {
  whatsappNumber: string;
  contextText?: string;
}

export const WhatsAppFloating: React.FC<WhatsAppFloatingProps> = ({
  whatsappNumber,
  contextText = 'Hello Jenga Construction Limited, I would like to enquire about your construction services.',
}) => {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(contextText)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 group font-heading font-bold text-sm"
      aria-label="Direct WhatsApp Contact with Jenga Construction Limited"
    >
      <MessageSquare className="w-5 h-5 group-hover:rotate-6 transition-transform" />
      <span className="hidden sm:inline">WhatsApp Us</span>
    </a>
  );
};
