'use client';

import { useState, useEffect } from 'react';
import { FaHeart, FaEdit, FaTrash, FaSave, FaTimes, FaStar, FaPlus } from 'react-icons/fa';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import HeroBanner from '../../components/HeroBanner';

// نوع بيانات الرسالة
interface Message {
  id: number;
  senderName: string;
  message: string;
  date: string;
  featured: boolean;
  relationship?: string; // علاقة المرسل (ابن، صديق، زميل، إلخ)
}

export default function MessagesPage() {
  // مصفوفة رسائل فاضية من الأول
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Message>({
    id: 0,
    senderName: '',
    message: '',
    date: new Date().toISOString().split('T')[0],
    featured: false,
    relationship: ''
  });
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMessage, setNewMessage] = useState<Omit<Message, 'id'>>({
    senderName: '',
    message: '',
    date: new Date().toISOString().split('T')[0],
    featured: false,
    relationship: ''
  });

  useEffect(() => {
    // بس نجيب الرسايل المحفوظة في localStorage
    const savedMessages = localStorage.getItem('adminMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // نتأكد إنها مصفوفة
        if (Array.isArray(parsedMessages)) {
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
        // لو في خطأ، نمسح البيانات القديمة
        localStorage.removeItem('adminMessages');
      }
    }
  }, []);

  const saveToLocalStorage = (msgs: Message[]) => {
    localStorage.setItem('adminMessages', JSON.stringify(msgs));
  };

  const handleAddMessage = () => {
    if (!newMessage.senderName.trim()) {
      alert('الرجاء إدخال اسم المرسل');
      return;
    }

    if (!newMessage.message.trim()) {
      alert('الرجاء إدخال نص الرسالة');
      return;
    }

    const messageToAdd: Message = {
      ...newMessage,
      id: Date.now() // نستخدم الوقت الحالي كرقم فريد
    };

    const updatedMessages = [messageToAdd, ...messages];
    setMessages(updatedMessages);
    saveToLocalStorage(updatedMessages);
    
    // إعادة تعيين النموذج
    setNewMessage({
      senderName: '',
      message: '',
      date: new Date().toISOString().split('T')[0],
      featured: false,
      relationship: ''
    });
    setShowAddForm(false);
    
    alert('تم إضافة الرسالة بنجاح!');
  };

  const handleEdit = (message: Message) => {
    setEditingId(message.id);
    setEditForm({ ...message });
  };

  const handleSaveEdit = () => {
    if (!editForm.senderName.trim()) {
      alert('الرجاء إدخال اسم المرسل');
      return;
    }

    if (!editForm.message.trim()) {
      alert('الرجاء إدخال نص الرسالة');
      return;
    }

    const updatedMessages = messages.map(msg =>
      msg.id === editingId ? { ...editForm } : msg
    );
    
    setMessages(updatedMessages);
    saveToLocalStorage(updatedMessages);
    setEditingId(null);
    
    alert('تم تعديل الرسالة بنجاح!');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
      const updatedMessages = messages.filter(msg => msg.id !== id);
      setMessages(updatedMessages);
      saveToLocalStorage(updatedMessages);
      
      alert('تم حذف الرسالة بنجاح!');
    }
  };

  const toggleFeatured = (id: number) => {
    const updatedMessages = messages.map(msg =>
      msg.id === id ? { ...msg, featured: !msg.featured } : msg
    );
    
    setMessages(updatedMessages);
    saveToLocalStorage(updatedMessages);
    
    const message = updatedMessages.find(msg => msg.id === id);
    if (message) {
      alert(message.featured ? 'تم تمييز الرسالة' : 'تم إلغاء تمييز الرسالة');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Hero Banner */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="رسائل المحبة والوفاء"
            subtitle="كلمات من القلب تبقى خالدة"
            
          />
        </div>
      </section>

      {/* Admin Controls */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="text-right">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  إدارة رسائل المحبة
                </h2>
                <p className="text-gray-600">أضف وحرر الرسائل التي تريد عرضها على الموقع</p>
              </div>
              
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <FaPlus /> {showAddForm ? 'إغلاق النموذج' : 'إضافة رسالة جديدة'}
              </button>
            </div>

            {/* Add Message Form */}
            {showAddForm && (
              <div className="border-2 border-dashed border-rose-300 rounded-xl p-6 mb-6 bg-white/50">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-right">
                  إضافة رسالة جديدة
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-right">
                      اسم المرسل *
                    </label>
                    <input
                      type="text"
                      value={newMessage.senderName}
                      onChange={(e) => setNewMessage({...newMessage, senderName: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:outline-none focus:border-rose-500 text-right"
                      placeholder="مثال: الابن الحبيب، الصديق المخلص، الزميل الكريم"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-right">
                      علاقة المرسل (اختياري)
                    </label>
                    <input
                      type="text"
                      value={newMessage.relationship || ''}
                      onChange={(e) => setNewMessage({...newMessage, relationship: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:outline-none focus:border-rose-500 text-right"
                      placeholder="مثال: الابن، الصديق، الزميل، الجار"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-right">
                      نص الرسالة *
                    </label>
                    <textarea
                      value={newMessage.message}
                      onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:outline-none focus:border-rose-500 resize-none text-right"
                      rows={5}
                      placeholder="اكتب الرسالة من القلب... مثال: أمي الغالية، لن أنساك أبداً..."
                      required
                    ></textarea>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newMessage.featured}
                        onChange={(e) => setNewMessage({...newMessage, featured: e.target.checked})}
                        className="w-5 h-5 text-rose-600 rounded focus:ring-rose-500"
                      />
                      <span className="text-gray-700 font-medium">تمييز هذه الرسالة ⭐</span>
                    </label>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setNewMessage({
                            senderName: '',
                            message: '',
                            date: new Date().toISOString().split('T')[0],
                            featured: false,
                            relationship: ''
                          });
                        }}
                        className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        مسح الحقول
                      </button>
                      <button
                        onClick={handleAddMessage}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
                      >
                        حفظ الرسالة
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Stats */}
            <div className="flex flex-wrap items-center justify-between p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-700">{messages.length}</div>
                  <div className="text-sm text-gray-600">إجمالي الرسائل</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-700">{messages.filter(m => m.featured).length}</div>
                  <div className="text-sm text-gray-600">رسائل مميزة</div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mt-2 md:mt-0">
                {messages.length === 0 ? 'ابدأ بإضافة أول رسالة' : 'الرسائل محفوظة تلقائياً'}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Messages Display */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center">
                  <FaHeart className="text-4xl text-rose-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">لا توجد رسائل حالياً</h3>
                <p className="text-gray-600 mb-6">
                  لم تقم بإضافة أي رسائل بعد. استخدم زر "إضافة رسالة جديدة" لإضافة أول رسالة محبة ووفاء.
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
                >
                  إضافة أول رسالة
                </button>
              </div>
            </Card>
          ) : (
            <div className="space-y-8">
              <div className="text-right">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  رسائل المحبة والوفاء
                </h2>
                <p className="text-gray-600">مجموعة الرسائل التي تمت إضافتها</p>
              </div>

              {messages.map((msg) => (
                <Card 
                  key={msg.id} 
                  className={`p-6 animate-fade-in ${msg.featured ? 'ring-2 ring-amber-500 bg-gradient-to-r from-amber-50 to-yellow-50' : ''}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Message Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${msg.featured ? 'bg-gradient-to-r from-amber-500 to-yellow-600' : 'bg-gradient-to-r from-rose-500 to-pink-600'} text-white text-2xl`}>
                        <FaHeart />
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 text-right">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{msg.senderName}</h3>
                            {msg.featured && (
                              <span className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-3 py-1 rounded-full text-sm">
                                <FaStar /> مميزة
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-gray-500">{msg.date}</span>
                            {msg.relationship && (
                              <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm">
                                {msg.relationship}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Admin Actions */}
                        <div className="flex items-center gap-2 mt-4 md:mt-0">
                          <button
                            onClick={() => toggleFeatured(msg.id)}
                            className={`p-2.5 rounded-lg ${msg.featured ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}
                            title={msg.featured ? 'إلغاء التمييز' : 'تمييز الرسالة'}
                          >
                            <FaStar />
                          </button>
                          
                          {editingId === msg.id ? (
                            <>
                              <button
                                onClick={handleSaveEdit}
                                className="p-2.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                                title="حفظ التعديلات"
                              >
                                <FaSave />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="p-2.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                                title="إلغاء التعديل"
                              >
                                <FaTimes />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(msg)}
                                className="p-2.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                title="تعديل الرسالة"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(msg.id)}
                                className="p-2.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                title="حذف الرسالة"
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Edit Form or Message Content */}
                      {editingId === msg.id ? (
                        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                          <div>
                            <label className="block text-gray-700 font-semibold mb-2 text-right">
                              اسم المرسل *
                            </label>
                            <input
                              type="text"
                              value={editForm.senderName}
                              onChange={(e) => setEditForm({...editForm, senderName: e.target.value})}
                              className="w-full px-4 py-2 rounded-lg border-2 border-rose-200 focus:outline-none focus:border-rose-500 text-right"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 font-semibold mb-2 text-right">
                              نص الرسالة *
                            </label>
                            <textarea
                              value={editForm.message}
                              onChange={(e) => setEditForm({...editForm, message: e.target.value})}
                              className="w-full px-4 py-2 rounded-lg border-2 border-rose-200 focus:outline-none focus:border-rose-500 resize-none text-right"
                              rows={4}
                              required
                            ></textarea>
                          </div>
                          <div>
                            <label className="block text-gray-700 font-semibold mb-2 text-right">
                              علاقة المرسل (اختياري)
                            </label>
                            <input
                              type="text"
                              value={editForm.relationship || ''}
                              onChange={(e) => setEditForm({...editForm, relationship: e.target.value})}
                              className="w-full px-4 py-2 rounded-lg border-2 border-rose-200 focus:outline-none focus:border-rose-500 text-right"
                              placeholder="علاقة المرسل"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white p-5 rounded-lg border border-rose-100 shadow-sm">
                          <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
                            {msg.message}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="px-4 md:px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="رسائل تبقى في القلب"
            subtitle="كلمات من الذكريات الجميلة"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📜',
                title: 'كلمات خالدة',
                description: 'الرسائل المكتوبة من القلب تبقى شهادة حية على المشاعر الصادقة والذكريات الغالية',
              },
              {
                icon: '❤️',
                title: 'تعبير عن الوفاء',
                description: 'كل رسالة تحمل في طياتها مشاعر الحب والوفاء والإخلاص للذكرى الطيبة',
              },
              {
                icon: '🕊️',
                title: 'دعاء مستمر',
                description: 'الكلمات الطيبة تظل صدقة جارية ودعاءً مستمراً للمرحومين',
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="p-6 text-center animate-fade-in hover:shadow-xl transition-shadow duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-rose-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}