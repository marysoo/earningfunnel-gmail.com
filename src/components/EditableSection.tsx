import { useState } from 'react';
import { Edit2, Plus, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageSection, firebaseService } from '../lib/firebaseService';

interface EditableSectionProps {
  section: PageSection;
  isAdmin: boolean;
  children: React.ReactNode;
}

export default function EditableSection({ section, isAdmin, children }: EditableSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PageSection>(section);

  const handleSave = async () => {
    await firebaseService.upsertSection(formData);
    setIsEditing(false);
  };

  if (!isAdmin) return <>{children}</>;

  return (
    <div className="relative group/section border-2 border-transparent hover:border-gold/20 transition-all rounded-3xl">
      <div className="absolute -top-4 -right-4 z-40 opacity-0 group-hover/section:opacity-100 transition-opacity flex gap-2">
        <button 
          onClick={() => setIsEditing(true)}
          className="p-2 bg-zinc-900 border border-gold/50 text-gold rounded-full hover:bg-gold hover:text-white transition-all shadow-xl"
        >
          <Edit2 size={16} />
        </button>
      </div>

      {children}

      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif text-gold">Edit Section</h3>
                <button onClick={() => setIsEditing(false)}><X /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Title</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Subtitle</label>
                  <input 
                    type="text" 
                    value={formData.subtitle || ''}
                    onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Content (Markdown supported)</label>
                  <textarea 
                    rows={8}
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:border-gold outline-none font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Image URL</label>
                  <input 
                    type="text" 
                    value={formData.imageUrl || ''}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:border-gold outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  onClick={handleSave}
                  className="flex-1 py-4 bg-gold text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <Save size={18} /> Save Changes
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-4 border border-zinc-800 rounded-xl font-bold hover:bg-zinc-800 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
