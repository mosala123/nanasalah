'use client';

import { useState, useEffect } from 'react';
import { 
  FaHeart, FaEdit, FaTrash, FaSave, FaTimes, 
  FaStar, FaPlus, FaThumbsUp, FaEnvelope, 
  FaUser, FaCalendarAlt, FaTag, FaCheck, 
  FaSpinner, FaExclamationCircle 
} from 'react-icons/fa';
import { User } from '@supabase/supabase-js';

import { supabase } from '../../lib/supabaseClient';

interface UIMessage {
  id: number;
  senderName: string;
  message: string;
  date: string;
  featured: boolean;
  relationship?: string;
  userEmail?: string;
  likes: number;
}

const relationships = ["ابن/ابنة", "صديق/صديقة", "زميل/زميلة", "جار/جارة", "قريب/قريبة", "أخرى"];

export default function MessagesPage() {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<UIMessage | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMessage, setNewMessage] = useState({
    senderName: '',
    message: '',
    date: new Date().toISOString().split('T')[0],
    featured: false,
    relationship: relationships[0],
    userEmail: '',
  });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    
    if (user) {
      setNewMessage(prev => ({ 
        ...prev, 
        senderName: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
        userEmail: user.email || ''
      }));
    }

    const { data, error } = await supabase
      .from('nana')
      .select('*')
      .order('featured', { ascending: false })
      .order('likes', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
      alert(`حدث خطأ أثناء جلب الرسائل: ${error.message}`);
    } else if (data) {
      const uiData = data.map(item => ({
        id: item.id,
        senderName: item.sender_name,
        message: item.message,
        date: item.date,
        featured: item.featured,
        relationship: item.relationship,
        userEmail: item.user_email,
        likes: item.likes || 0,
      }));
      setMessages(uiData);
    }
    setLoading(false);
  };

  const handleAddMessage = async () => {
    if (!newMessage.senderName.trim() || !newMessage.message.trim()) {
      alert('الرجاء إدخال اسم المرسل ونص الرسالة');
      return;
    }
    setIsProcessing(true);

    const { data, error } = await supabase
      .from('nana')
      .insert([{ 
        sender_name: newMessage.senderName.trim(),
        message: newMessage.message.trim(),
        date: newMessage.date,
        featured: newMessage.featured,
        relationship: newMessage.relationship,
        user_email: newMessage.userEmail || user?.email || '',
        likes: 0,
      }])
      .select()
      .single();

    if (error) {
      alert(`حدث خطأ أثناء إضافة الرسالة: ${error.message}`);
    } else if (data) {
      const newMsg = { 
        ...data, 
        senderName: data.sender_name, 
        userEmail: data.user_email,
        likes: data.likes || 0 
      };
      setMessages([newMsg, ...messages]);
      setNewMessage({
        senderName: user?.user_metadata?.full_name || user?.email?.split('@')[0] || '',
        message: '',
        date: new Date().toISOString().split('T')[0],
        featured: false,
        relationship: relationships[0],
        userEmail: user?.email || ''
      });
      setShowAddForm(false);
      alert('🎉 تم إضافة رسالتك بنجاح، شكراً لمشاركتك!');
    }
    setIsProcessing(false);
  };

  const handleEdit = (message: UIMessage) => {
    setEditingId(message.id);
    setEditForm({ ...message });
  };

  const handleSaveEdit = async () => {
    if (!editForm) return;
    setIsProcessing(true);

    const { data, error } = await supabase
      .from('nana')
      .update({ 
        sender_name: editForm.senderName.trim(),
        message: editForm.message.trim(),
        relationship: editForm.relationship,
      })
      .eq('id', editingId)
      .select()
      .single();

    if (error) {
      alert(`حدث خطأ أثناء التعديل: ${error.message}`);
    } else if (data) {
      const updatedMsg = { 
        ...data, 
        senderName: data.sender_name, 
        userEmail: data.user_email,
        likes: data.likes || 0 
      };
      setMessages(messages.map(m => m.id === editingId ? updatedMsg : m));
      setEditingId(null);
      setEditForm(null);
      alert('✅ تم تحديث الرسالة بنجاح');
    }
    setIsProcessing(false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleDelete = async (id: number) => {
    setIsProcessing(true);
    
    const { error } = await supabase
      .from('nana')
      .delete()
      .eq('id', id);

    if (error) {
      alert(`حدث خطأ أثناء الحذف: ${error.message}`);
    } else {
      setMessages(messages.filter(msg => msg.id !== id));
      setDeleteConfirm(null);
      alert('🗑️ تم حذف الرسالة بنجاح من قاعدة البيانات');
    }
    setIsProcessing(false);
  };

  const confirmDelete = (id: number) => {
    setDeleteConfirm(id);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const toggleFeatured = async (id: number) => {
    const message = messages.find(m => m.id === id);
    if (!message) return;

    const { data, error } = await supabase
      .from('nana')
      .update({ featured: !message.featured })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      alert(`حدث خطأ: ${error.message}`);
    } else if (data) {
      const updatedMsg = { 
        ...data, 
        senderName: data.sender_name, 
        userEmail: data.user_email,
        likes: data.likes || 0 
      };
      setMessages(messages.map(m => m.id === id ? updatedMsg : m));
    }
  };

  const handleLike = async (id: number) => {
    const message = messages.find(m => m.id === id);
    if (!message) return;

    const newLikes = (message.likes || 0) + 1;
    const { error } = await supabase
      .from('nana')
      .update({ likes: newLikes })
      .eq('id', id);

    if (error) {
      alert(`حدث خطأ: ${error.message}`);
    } else {
      setMessages(messages.map(m => m.id === id ? { ...m, likes: newLikes } : m));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-rose-500 to-pink-600 flex items-center justify-center animate-pulse">
              <FaHeart className="text-4xl text-white animate-bounce" />
            </div>
            <div className="absolute -inset-4 border-4 border-rose-200 rounded-full animate-ping"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">جاري تحميل الرسائل</h2>
            <p className="text-gray-600">نحتسي ذكريات المحبة معاً...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-rose-50/30 to-gray-50 font-sans">
      {/* Hero Section */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden rounded-2xl shadow-lg"   style={{
                      backgroundImage: 'linear-gradient(135deg, rgba(217, 119, 6, 0.9), rgba(120, 53, 15, 0.9))',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                  }}>
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600/10 via-pink-600/5 to-rose-600/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8">
             
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-700 via-pink-700 to-rose-700 bg-clip-text text-white">
                رسائل المحبة والوفاء
              </h1>
              <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed">
                كلمات تنبض بالقلب... ذكريات تبقى خالدة... وفاء لا يُنسى
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add Message Section */}
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white to-rose-50 rounded-3xl shadow-xl border border-rose-100 overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="text-right space-y-3">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    شارك بكلمة وفاء
                  </h2>
                  <p className="text-gray-600 max-w-xl">
                    أضف رسالتك لتشاركها مع الجميع وتظل ذكرى طيبة في قلوبنا جميعاً
                  </p>
                </div>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="group relative bg-gradient-to-r from-rose-600 to-pink-700 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 justify-center min-w-[200px] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <FaPlus className="text-lg" />
                  <span>{showAddForm ? 'إغلاق النموذج' : 'إضافة رسالة جديدة'}</span>
                </button>
              </div>

              {showAddForm && (
                <div className="border-t-2 border-dashed border-rose-200 pt-8 mt-8">
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-800 font-semibold mb-3 text-right flex items-center gap-2">
                          <FaUser className="text-rose-500" />
                          اسم المرسل *
                        </label>
                        <input
                          type="text"
                          value={newMessage.senderName}
                          onChange={(e) => setNewMessage({...newMessage, senderName: e.target.value})}
                          className="w-full px-5 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-right transition-all duration-300 placeholder-gray-400"
                          placeholder="اكتب اسمك الكريم هنا..."
                          required
                          disabled={!!user || isProcessing}
                        />
                        {user && (
                          <p className="text-sm text-gray-500 mt-2 text-right">
                            يتم استخدام اسمك المسجل تلقائياً
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-800 font-semibold mb-3 text-right flex items-center gap-2">
                          <FaTag className="text-rose-500" />
                          علاقتك *
                        </label>
                        <select
                          value={newMessage.relationship}
                          onChange={(e) => setNewMessage({...newMessage, relationship: e.target.value})}
                          className="w-full px-5 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-right transition-all duration-300"
                          disabled={isProcessing}
                        >
                          {relationships.map(r => (
                            <option key={r} value={r} className="text-right">{r}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-800 font-semibold mb-3 text-right">
                        نص الرسالة *
                      </label>
                      <textarea
                        value={newMessage.message}
                        onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                        className="w-full px-5 py-4 bg-white rounded-xl border-2 border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 resize-none text-right transition-all duration-300 placeholder-gray-400 leading-relaxed"
                        rows={6}
                        placeholder="اكتب رسالتك هنا... شاركنا مشاعرك وذكرياتك الجميلة..."
                        required
                        disabled={isProcessing}
                      ></textarea>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-100">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={newMessage.featured}
                            onChange={(e) => setNewMessage({...newMessage, featured: e.target.checked})}
                            className="w-6 h-6 rounded-lg border-2 border-gray-300 focus:ring-3 focus:ring-rose-200 checked:bg-rose-600 checked:border-rose-600 appearance-none transition-colors cursor-pointer peer"
                            disabled={isProcessing}
                          />
                          <FaCheck className="absolute inset-0 m-auto text-white text-xs opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <div>
                          <span className="text-gray-800 font-bold group-hover:text-rose-700 transition-colors">
                            طلب تمييز الرسالة
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            سيتم عرض رسالتك في القسم المميز إذا تم قبول الطلب
                          </p>
                        </div>
                      </label>
                      
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setShowAddForm(false)}
                          disabled={isProcessing}
                          className="px-7 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          إلغاء
                        </button>
                        <button
                          onClick={handleAddMessage}
                          disabled={isProcessing}
                          className="group relative bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-emerald-200 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                          {isProcessing ? (
                            <span className="flex items-center gap-2">
                              <FaSpinner className="animate-spin" />
                              جاري الحفظ...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <FaHeart />
                              حفظ الرسالة
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Messages List Section */}
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center py-20 space-y-8">
              <div className="relative">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center">
                  <FaHeart className="text-5xl text-rose-400" />
                </div>
                <div className="absolute -inset-6 border-4 border-rose-50 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-gray-800">كن أول من يكتب رسالة</h3>
                <p className="text-gray-600 text-lg max-w-md mx-auto">
                  لم تتم إضافة أي رسائل بعد. استخدم الزر أعلاه لمشاركة أول كلمة وفاء وكن مصدر إلهام للآخرين.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Featured Messages Section */}
              {messages.filter(m => m.featured).length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl">
                      <FaStar className="text-2xl text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">الرسائل المميزة</h2>
                      <p className="text-gray-600">رسائل مختارة بعناية</p>
                    </div>
                  </div>
                  <div className="grid gap-6">
                    {messages.filter(m => m.featured).map((msg) => (
                      <MessageCard
                        key={msg.id}
                        msg={msg}
                        editingId={editingId}
                        editForm={editForm}
                        isProcessing={isProcessing}
                        deleteConfirm={deleteConfirm}
                        onEdit={handleEdit}
                        onSaveEdit={handleSaveEdit}
                        onCancelEdit={handleCancelEdit}
                        onConfirmDelete={confirmDelete}
                        onCancelDelete={cancelDelete}
                        onDelete={handleDelete}
                        onToggleFeatured={toggleFeatured}
                        onLike={handleLike}
                        onSetEditForm={setEditForm}
                        formatDate={formatDate}
                        isFeaturedSection={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* All Messages Section */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl">
                    <FaHeart className="text-2xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">جميع الرسائل</h2>
                    <p className="text-gray-600">{messages.length} رسالة</p>
                  </div>
                </div>
                <div className="grid gap-6">
                  {messages.map((msg) => (
                    <MessageCard
                      key={msg.id}
                      msg={msg}
                      editingId={editingId}
                      editForm={editForm}
                      isProcessing={isProcessing}
                      deleteConfirm={deleteConfirm}
                      onEdit={handleEdit}
                      onSaveEdit={handleSaveEdit}
                      onCancelEdit={handleCancelEdit}
                      onConfirmDelete={confirmDelete}
                      onCancelDelete={cancelDelete}
                      onDelete={handleDelete}
                      onToggleFeatured={toggleFeatured}
                      onLike={handleLike}
                      onSetEditForm={setEditForm}
                      formatDate={formatDate}
                      isFeaturedSection={false}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer Note */}
      <footer className="px-4 py-8 mt-12 border-t border-rose-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">
            ❤️ كل رسالة هنا هي ذكرى جميلة تبقى خالدة في قلوبنا
          </p>
        </div>
      </footer>
    </main>
  );
}

// Message Card Component
function MessageCard({ 
  msg, 
  editingId, 
  editForm, 
  isProcessing, 
  deleteConfirm,
  onEdit, 
  onSaveEdit, 
  onCancelEdit, 
  onConfirmDelete,
  onCancelDelete,
  onDelete, 
  onToggleFeatured, 
  onLike, 
  onSetEditForm,
  formatDate,
  isFeaturedSection
}: any) {
  const isEditing = editingId === msg.id;
  const isDeleting = deleteConfirm === msg.id;

  return (
    <div className={`relative group ${msg.featured && !isFeaturedSection ? 'opacity-90 hover:opacity-100' : ''}`}>
      {msg.featured && !isFeaturedSection && (
        <div className="absolute -top-3 -right-3 z-10">
          <span className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
            <FaStar className="text-xs" />
            <span>مميزة</span>
          </span>
        </div>
      )}
      
      <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border ${
        msg.featured ? 'border-amber-200' : 'border-gray-100'
      } ${isEditing ? 'ring-2 ring-rose-500 ring-offset-2' : ''} ${isDeleting ? 'ring-2 ring-red-500 ring-offset-2' : ''}`}>
        
        {/* Header with Sender Info */}
        <div className={`p-6 ${msg.featured ? 'bg-gradient-to-r from-amber-50 to-yellow-50' : 'bg-gradient-to-r from-gray-50 to-gray-100'}`}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                  msg.featured 
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500' 
                    : 'bg-gradient-to-r from-rose-500 to-pink-600'
                }`}>
                  <FaUser className="text-xl text-white" />
                </div>
                
                <div className="flex-1 text-right space-y-3">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">{msg.senderName}</h3>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      {msg.relationship && (
                        <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 px-4 py-1.5 rounded-full text-sm font-semibold border border-rose-200">
                          <FaTag className="text-xs" />
                          {msg.relationship}
                        </span>
                      )}
                      
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <FaCalendarAlt className="text-gray-400" />
                        <span>{formatDate(msg.date)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Email - Hidden by default, shown on hover */}
                  {msg.userEmail && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                        <FaEnvelope className="text-gray-400 text-sm" />
                        <span className="text-gray-600 text-sm font-medium">{msg.userEmail}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              
              
              {!isDeleting && (
                <>
                  
                  
                  <button
                    onClick={() => onConfirmDelete(msg.id)}
                    className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-300"
                    title="حذف الرسالة"
                  >
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Delete Confirmation */}
        {isDeleting && (
          <div className="px-6 py-4 bg-red-50 border-b border-red-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-red-700">
                <FaExclamationCircle className="text-xl" />
                <div>
                  <p className="font-bold">تأكيد الحذف</p>
                  <p className="text-sm text-red-600">هل أنت متأكد من حذف هذه الرسالة؟ هذا الإجراء نهائي</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={onCancelDelete}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isProcessing}
                >
                  إلغاء
                </button>
                <button
                  onClick={() => onDelete(msg.id)}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      جاري الحذف...
                    </>
                  ) : (
                    'تأكيد الحذف'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Message Content */}
        <div className="p-6">
          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={editForm?.message || ''}
                onChange={(e) => onSetEditForm({...editForm, message: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-right transition-all duration-300"
                rows={4}
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={onCancelEdit}
                  disabled={isProcessing}
                  className="px-5 py-2.5 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  إلغاء
                </button>
                <button
                  onClick={onSaveEdit}
                  disabled={isProcessing}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-70"
                >
                  {isProcessing ? 'جاري الحفظ...' : 'حفظ التعديلات'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line text-right">
                {msg.message}
              </p>
              
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => onLike(msg.id)}
                  className="group flex items-center gap-3 text-gray-600 hover:text-rose-600 transition-colors"
                >
                  <div className="relative p-2 rounded-lg bg-gray-50 group-hover:bg-rose-50 transition-colors">
                    <FaThumbsUp className="text-lg" />
                    {msg.likes > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                        {msg.likes}
                      </span>
                    )}
                  </div>
                  <span className="font-semibold">أعجبني</span>
                </button>
                
                {msg.likes > 0 && (
                  <div className="flex items-center gap-2 text-rose-700 font-semibold">
                    <span>{msg.likes}</span>
                    <span>إعجاب</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}