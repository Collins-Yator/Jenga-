import React, { useState } from 'react';
import {
  QuoteRequestItem,
  ContactMessageItem,
  TestimonialItem,
  SiteSettingsData,
  QuoteStatus,
} from '../types';
import {
  ShieldAlert,
  FileText,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  Save,
  MessageSquare,
  Search,
  Filter,
  Eye,
  Sliders,
  AlertTriangle,
} from 'lucide-react';

interface AdminPortalViewProps {
  quoteRequests: QuoteRequestItem[];
  onUpdateQuoteStatus: (id: string, status: QuoteStatus, internalNotes: string) => void;
  contactMessages: ContactMessageItem[];
  onToggleMessageRead: (id: string) => void;
  testimonials: TestimonialItem[];
  onApproveTestimonial: (id: number, approved: boolean, published: boolean) => void;
  siteSettings: SiteSettingsData;
  onUpdateSiteSettings: (settings: SiteSettingsData) => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  quoteRequests,
  onUpdateQuoteStatus,
  contactMessages,
  onToggleMessageRead,
  testimonials,
  onApproveTestimonial,
  siteSettings,
  onUpdateSiteSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'quotes' | 'messages' | 'testimonials' | 'settings'>('quotes');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequestItem | null>(
    quoteRequests.length > 0 ? quoteRequests[0] : null
  );
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state for selected quote
  const [editStatus, setEditStatus] = useState<QuoteStatus>(
    selectedQuote ? selectedQuote.status : 'NEW'
  );
  const [editNotes, setEditNotes] = useState<string>(
    selectedQuote ? selectedQuote.internalNotes : ''
  );

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<SiteSettingsData>({ ...siteSettings });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleSelectQuote = (quote: QuoteRequestItem) => {
    setSelectedQuote(quote);
    setEditStatus(quote.status);
    setEditNotes(quote.internalNotes);
  };

  const handleSaveQuoteChanges = () => {
    if (selectedQuote) {
      onUpdateQuoteStatus(selectedQuote.id, editStatus, editNotes);
      setSelectedQuote({ ...selectedQuote, status: editStatus, internalNotes: editNotes });
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const filteredQuotes = quoteRequests.filter((q) => {
    if (statusFilter !== 'ALL' && q.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        q.referenceNumber.toLowerCase().includes(query) ||
        q.fullName.toLowerCase().includes(query) ||
        q.phoneNumber.toLowerCase().includes(query) ||
        q.projectLocation.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'NEW':
        return <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">NEW ENQUIRY</span>;
      case 'CONTACTED':
        return <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">CLIENT CONTACTED</span>;
      case 'IN_PROGRESS':
        return <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">SITE SCOPING</span>;
      case 'QUOTATION_SENT':
        return <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">QUOTATION SENT</span>;
      case 'ACCEPTED':
        return <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">ACCEPTED</span>;
      case 'DECLINED':
        return <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">DECLINED</span>;
      case 'CLOSED':
        return <span className="text-xs font-bold text-neutral-700 bg-neutral-200 px-2 py-0.5 rounded">CLOSED</span>;
    }
  };

  return (
    <div className="bg-[#1e2327] min-h-screen text-neutral-200">
      {/* Django Admin Banner */}
      <header className="bg-[#111111] border-b border-neutral-700 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#FFC107] text-[#111111] p-1.5 rounded font-black text-sm">
            DJANGO
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">
              Jenga Construction Limited Administration
            </h1>
            <p className="text-xs text-neutral-400">
              Django built-in administrative pipeline &bull; Operational Portal
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'quotes' ? 'bg-[#FFC107] text-[#111111]' : 'bg-[#2b3035] text-neutral-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Quote Requests ({quoteRequests.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'messages' ? 'bg-[#FFC107] text-[#111111]' : 'bg-[#2b3035] text-neutral-300 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Messages ({contactMessages.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'testimonials' ? 'bg-[#FFC107] text-[#111111]' : 'bg-[#2b3035] text-neutral-300 hover:text-white'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Testimonials ({testimonials.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'settings' ? 'bg-[#FFC107] text-[#111111]' : 'bg-[#2b3035] text-neutral-300 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Site Profile</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Tab 1: Quotation Triage */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="bg-[#2b3035] p-4 rounded-lg flex flex-wrap items-center justify-between gap-4 border border-neutral-700">
              <div className="flex items-center gap-2 flex-grow max-w-md">
                <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by Ref #, client name, phone, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1e2327] border border-neutral-600 rounded px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 font-bold uppercase">Filter Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#1e2327] border border-neutral-600 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="NEW">New Enquiry</option>
                  <option value="CONTACTED">Client Contacted</option>
                  <option value="IN_PROGRESS">Site Assessment</option>
                  <option value="QUOTATION_SENT">Quotation Delivered</option>
                  <option value="ACCEPTED">Contract Accepted</option>
                  <option value="DECLINED">Declined</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
            </div>

            {/* Quote Requests Table & Detail Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* List table */}
              <div className="lg:col-span-7 bg-[#2b3035] rounded-lg border border-neutral-700 overflow-hidden">
                <div className="p-4 border-b border-neutral-700 font-bold text-sm text-white flex items-center justify-between">
                  <span>Logged Quotation Requests ({filteredQuotes.length})</span>
                  <span className="text-xs text-neutral-400">Click a row to triage</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#1e2327] text-neutral-400 uppercase font-semibold border-b border-neutral-700">
                      <tr>
                        <th className="p-3">Reference #</th>
                        <th className="p-3">Client</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Discipline</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-700">
                      {filteredQuotes.map((q) => (
                        <tr
                          key={q.id}
                          onClick={() => handleSelectQuote(q)}
                          className={`cursor-pointer transition-colors ${
                            selectedQuote?.id === q.id
                              ? 'bg-neutral-700 text-white font-semibold'
                              : 'hover:bg-neutral-700/50 text-neutral-300'
                          }`}
                        >
                          <td className="p-3 font-mono text-[#FFC107]">{q.referenceNumber}</td>
                          <td className="p-3">{q.fullName}</td>
                          <td className="p-3">{q.phoneNumber}</td>
                          <td className="p-3 text-neutral-400">{q.serviceCategory}</td>
                          <td className="p-3">{getStatusBadge(q.status)}</td>
                        </tr>
                      ))}

                      {filteredQuotes.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-neutral-400">
                            No quotation requests recorded matching your filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Detail & Action Inspector */}
              <div className="lg:col-span-5 bg-[#2b3035] rounded-lg border border-neutral-700 p-6 space-y-5">
                {selectedQuote ? (
                  <>
                    <div className="flex items-start justify-between border-b border-neutral-700 pb-3">
                      <div>
                        <span className="text-xs font-mono text-[#FFC107] block font-bold">
                          {selectedQuote.referenceNumber}
                        </span>
                        <h3 className="text-lg font-bold text-white">{selectedQuote.fullName}</h3>
                        <span className="text-xs text-neutral-400">
                          Submitted on {new Date(selectedQuote.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div>{getStatusBadge(selectedQuote.status)}</div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <strong className="text-neutral-400 block uppercase">Phone Number:</strong>
                        <span className="text-white text-sm font-semibold">{selectedQuote.phoneNumber}</span>
                      </div>

                      {selectedQuote.email && (
                        <div>
                          <strong className="text-neutral-400 block uppercase">Email Address:</strong>
                          <span className="text-neutral-200">{selectedQuote.email}</span>
                        </div>
                      )}

                      <div>
                        <strong className="text-neutral-400 block uppercase">Discipline &amp; Location:</strong>
                        <span className="text-neutral-200">
                          {selectedQuote.serviceCategory} &bull; {selectedQuote.projectLocation}
                        </span>
                      </div>

                      {selectedQuote.estimatedBudget && (
                        <div>
                          <strong className="text-neutral-400 block uppercase">Target Budget:</strong>
                          <span className="text-[#FFC107] font-semibold">{selectedQuote.estimatedBudget}</span>
                        </div>
                      )}

                      <div>
                        <strong className="text-neutral-400 block uppercase">Project Scope:</strong>
                        <div className="bg-[#1e2327] p-3 rounded text-neutral-300 leading-relaxed mt-1">
                          {selectedQuote.projectDescription}
                        </div>
                      </div>
                    </div>

                    {/* Staff Workflow Actions */}
                    <div className="pt-4 border-t border-neutral-700 space-y-4">
                      <div>
                        <label className="block text-xs uppercase font-bold text-neutral-300 mb-1.5">
                          Update Pipeline Status:
                        </label>
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value as QuoteStatus)}
                          className="w-full bg-[#1e2327] border border-neutral-600 rounded p-2 text-xs text-white focus:outline-none focus:border-[#FFC107]"
                        >
                          <option value="NEW">NEW - Newly Received</option>
                          <option value="CONTACTED">CONTACTED - Reached Out via Phone/WhatsApp</option>
                          <option value="IN_PROGRESS">IN_PROGRESS - Conducting Site Assessment</option>
                          <option value="QUOTATION_SENT">QUOTATION_SENT - Bill of Quantities Delivered</option>
                          <option value="ACCEPTED">ACCEPTED - Contract Formally Executed</option>
                          <option value="DECLINED">DECLINED - Scope Deferred or Rejected</option>
                          <option value="CLOSED">CLOSED - Completed and Invoiced</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-neutral-300 mb-1.5">
                          Internal Notes &amp; Estimation Records (Staff Only):
                        </label>
                        <textarea
                          rows={3}
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="Log site visits, estimated BOQ subtotals, engineer remarks..."
                          className="w-full bg-[#1e2327] border border-neutral-600 rounded p-2 text-xs text-white focus:outline-none focus:border-[#FFC107]"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveQuoteChanges}
                          className="flex-1 py-2 bg-[#FFC107] hover:bg-[#E5A900] text-[#111111] font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Changes</span>
                        </button>

                        <a
                          href={`https://wa.me/${selectedQuote.phoneNumber.replace(/[\s\+]/g, '')}?text=${encodeURIComponent(
                            `Hello ${selectedQuote.fullName}, this is Jenga Construction Limited regarding your quotation request (Ref: ${selectedQuote.referenceNumber}).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs rounded flex items-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Client</span>
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16 text-neutral-400 text-xs">
                    Select a quotation request from the list to inspect details.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Messages */}
        {activeTab === 'messages' && (
          <div className="bg-[#2b3035] rounded-lg border border-neutral-700 overflow-hidden">
            <div className="p-4 border-b border-neutral-700 font-bold text-sm text-white">
              Website General Contact Enquiries ({contactMessages.length})
            </div>

            <div className="divide-y divide-neutral-700">
              {contactMessages.map((msg) => (
                <div key={msg.id} className="p-5 flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{msg.name}</span>
                      <span className="text-neutral-400">&bull; {msg.email}</span>
                      {msg.phone && <span className="text-neutral-400">&bull; {msg.phone}</span>}
                      {msg.isRead ? (
                        <span className="text-[10px] text-neutral-400 bg-neutral-700 px-1.5 py-0.5 rounded">READ</span>
                      ) : (
                        <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded font-bold">UNREAD</span>
                      )}
                    </div>
                    <div className="font-bold text-[#FFC107]">{msg.subject}</div>
                    <p className="text-neutral-300 leading-relaxed pt-1 whitespace-pre-line">{msg.message}</p>
                    <span className="text-[11px] text-neutral-500 block pt-1">
                      Received: {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleMessageRead(msg.id)}
                    className="px-3 py-1.5 bg-[#1e2327] hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded shrink-0 border border-neutral-600 cursor-pointer"
                  >
                    {msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                  </button>
                </div>
              ))}

              {contactMessages.length === 0 && (
                <div className="p-12 text-center text-neutral-400 text-xs">
                  No general contact messages recorded yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Testimonials Moderation */}
        {activeTab === 'testimonials' && (
          <div className="bg-[#2b3035] rounded-lg border border-neutral-700 p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Client Testimonials Moderation &bull; Zero Fabricated Reviews Policy
              </h3>
              <p className="text-xs text-neutral-400">
                In strict adherence to project requirements, unapproved reviews do not display publicly.
              </p>
            </div>

            <div className="space-y-4">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-[#1e2327] border border-neutral-700 p-5 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-white text-sm">{t.clientName}</strong>
                      <span className="text-xs text-neutral-400 ml-2">
                        {t.clientRole} {t.organization ? `· ${t.organization}` : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {t.isApproved ? (
                        <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded">APPROVED</span>
                      ) : (
                        <span className="text-amber-400 font-bold bg-amber-950 px-2 py-0.5 rounded">UNAPPROVED</span>
                      )}
                      {t.isPublished ? (
                        <span className="text-blue-400 font-bold bg-blue-950 px-2 py-0.5 rounded">PUBLISHED</span>
                      ) : (
                        <span className="text-neutral-400 font-bold bg-neutral-800 px-2 py-0.5 rounded">UNPUBLISHED</span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 italic">"{t.content}"</p>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => onApproveTestimonial(t.id, !t.isApproved, !t.isApproved)}
                      className={`px-3 py-1.5 text-xs font-bold rounded cursor-pointer ${
                        t.isApproved
                          ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-200'
                          : 'bg-[#FFC107] hover:bg-[#E5A900] text-[#111111]'
                      }`}
                    >
                      {t.isApproved ? 'Unapprove & Hide' : 'Approve & Publish'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Site Settings Singleton */}
        {activeTab === 'settings' && (
          <div className="bg-[#2b3035] rounded-lg border border-neutral-700 p-6 max-w-3xl">
            <h3 className="text-base font-bold text-white mb-2">
              Site Settings &bull; Company Profile Singleton
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Maps directly to the Django <code className="text-[#FFC107]">SiteSettings</code> singleton database model.
            </p>

            {settingsSaved && (
              <div className="mb-6 p-3 bg-emerald-950 border border-emerald-500 text-emerald-200 rounded text-xs">
                Settings saved successfully to persistent memory!
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-bold uppercase mb-1">Company Name</label>
                <input
                  type="text"
                  value={settingsForm.companyName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                  className="w-full bg-[#1e2327] border border-neutral-600 rounded p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-bold uppercase mb-1">WhatsApp (Intl)</label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    className="w-full bg-[#1e2327] border border-neutral-600 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-bold uppercase mb-1">Local Phone Display</label>
                  <input
                    type="text"
                    value={settingsForm.localWhatsappDisplay}
                    onChange={(e) => setSettingsForm({ ...settingsForm, localWhatsappDisplay: e.target.value })}
                    className="w-full bg-[#1e2327] border border-neutral-600 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-bold uppercase mb-1">Location General</label>
                <input
                  type="text"
                  value={settingsForm.locationGeneral}
                  onChange={(e) => setSettingsForm({ ...settingsForm, locationGeneral: e.target.value })}
                  className="w-full bg-[#1e2327] border border-neutral-600 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-bold uppercase mb-1">Google Maps Embed URL</label>
                <input
                  type="url"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  value={settingsForm.googleMapsEmbedUrl}
                  onChange={(e) => setSettingsForm({ ...settingsForm, googleMapsEmbedUrl: e.target.value })}
                  className="w-full bg-[#1e2327] border border-neutral-600 rounded p-2 text-white"
                />
                <span className="text-[11px] text-neutral-400 mt-1 block">
                  Leave blank until company verified physical coordinates are established.
                </span>
              </div>

              <div>
                <label className="block text-neutral-300 font-bold uppercase mb-1">Business Hours</label>
                <input
                  type="text"
                  value={settingsForm.businessHours}
                  onChange={(e) => setSettingsForm({ ...settingsForm, businessHours: e.target.value })}
                  className="w-full bg-[#1e2327] border border-neutral-600 rounded p-2 text-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#FFC107] hover:bg-[#E5A900] text-[#111111] font-bold text-xs uppercase tracking-wider rounded transition-colors"
                >
                  Save Site Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
