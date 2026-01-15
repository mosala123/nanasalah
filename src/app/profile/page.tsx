'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaSignOutAlt, 
  FaHome, 
  FaEdit, 
  FaSave,
  FaTimes,
  FaCalendar,
  FaShieldAlt,
  FaBell,
  FaCog,
  FaUserCircle,
  FaHistory,
  FaHeart,
  FaStar,
  FaCheckCircle
} from 'react-icons/fa';
import Card from '@/components/Card';
import HeroBanner from '@/components/HeroBanner';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [stats, setStats] = useState({
    orders: 0,
    completed: 0,
    points: 100,
    level: 'مبتدئ'
  });
  
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }
      
      setUser(user);
      setFormData({
        name: user.user_metadata?.name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
      });
      setLoading(false);
    };

    getUser();
  }, [router]);

  const handleUpdate = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name: formData.name,
          phone: formData.phone,
        }
      });

      if (error) throw error;

      // تحديث بيانات المستخدم المحلية
      setUser({
        ...user,
        user_metadata: {
          ...user.user_metadata,
          name: formData.name,
          phone: formData.phone,
        }
      });

      setEditing(false);
      alert('تم تحديث الملف الشخصي بنجاح!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('حدث خطأ أثناء تحديث الملف الشخصي');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleCancel = () => {
    setFormData({
      name: user?.user_metadata?.name || '',
      email: user?.email || '',
      phone: user?.user_metadata?.phone || '',
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700 font-medium">جاري تحميل الملف الشخصي...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Banner */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="ملفي الشخصي"
            subtitle="مرحباً بك في حسابك الشخصي"
           
          />
        </div>
      </section>

      {/* Profile Content */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Card */}
              <Card className="p-6 animate-scale-zoom-in">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                      {user?.user_metadata?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                      <FaEdit className="text-amber-600" />
                    </button>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 text-right">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {editing ? (
                          <div className="flex gap-2">
                            <button
                              onClick={handleUpdate}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                            >
                              <FaSave /> حفظ
                            </button>
                            <button
                              onClick={handleCancel}
                              className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
                            >
                              <FaTimes /> إلغاء
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setEditing(true)}
                            className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700 transition-colors"
                          >
                            <FaEdit /> تعديل الملف
                          </button>
                        )}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {user?.user_metadata?.name || 'مستخدم'}
                        </h2>
                        <p className="text-gray-600">عضو منذ {user?.created_at ? new Date(user.created_at).toLocaleDateString('ar-SA') : 'غير معروف'}</p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 justify-end">
                        {editing ? (
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="flex-1 px-4 py-2 rounded-lg border-2 border-amber-200 focus:outline-none focus:border-amber-500 text-right"
                            placeholder="الاسم الكامل"
                          />
                        ) : (
                          <span className="text-lg font-medium text-gray-800">
                            {user?.user_metadata?.name || 'لم يتم إضافة اسم'}
                          </span>
                        )}
                        <div className="bg-amber-100 p-3 rounded-lg">
                          <FaUser className="text-amber-600" />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 justify-end">
                        <span className="text-lg text-gray-700">
                          {user?.email}
                        </span>
                        <div className="bg-amber-100 p-3 rounded-lg">
                          <FaEnvelope className="text-amber-600" />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 justify-end">
                        {editing ? (
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="flex-1 px-4 py-2 rounded-lg border-2 border-amber-200 focus:outline-none focus:border-amber-500 text-right"
                            placeholder="رقم الهاتف"
                          />
                        ) : (
                          <span className="text-lg text-gray-700">
                            {user?.user_metadata?.phone || 'لم يتم إضافة رقم هاتف'}
                          </span>
                        )}
                        <div className="bg-amber-100 p-3 rounded-lg">
                          <FaPhone className="text-amber-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t pt-6">
                  {[
                    { icon: <FaHistory />, label: 'الطلبات', value: stats.orders, color: 'bg-blue-100 text-blue-600' },
                    { icon: <FaCheckCircle />, label: 'مكتمل', value: stats.completed, color: 'bg-green-100 text-green-600' },
                    { icon: <FaStar />, label: 'النقاط', value: stats.points, color: 'bg-amber-100 text-amber-600' },
                    { icon: <FaShieldAlt />, label: 'المستوى', value: stats.level, color: 'bg-purple-100 text-purple-600' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${stat.color}`}>
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                      <div className="text-gray-600 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-right">إجراءات سريعة</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { icon: <FaBell />, label: 'الإشعارات', color: 'from-blue-500 to-blue-600' },
                    { icon: <FaHeart />, label: 'المفضلة', color: 'from-rose-500 to-rose-600' },
                    { icon: <FaHistory />, label: 'السجل', color: 'from-green-500 to-green-600' },
                    { icon: <FaCog />, label: 'الإعدادات', color: 'from-gray-500 to-gray-600' },
                    { icon: <FaShieldAlt />, label: 'الأمان', color: 'from-purple-500 to-purple-600' },
                    { icon: <FaUserCircle />, label: 'الخصوصية', color: 'from-indigo-500 to-indigo-600' },
                  ].map((action, index) => (
                    <button
                      key={index}
                      className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300`}
                    >
                      <div className="text-2xl">{action.icon}</div>
                      <span className="font-medium">{action.label}</span>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column - Actions & Info */}
            <div className="space-y-8">
              {/* Account Actions */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-right">إدارة الحساب</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => router.push('/')}
                    className="w-full flex items-center justify-between gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <span className="font-bold">العودة للرئيسية</span>
                    <FaHome />
                  </button>
                  
                  <button
                    onClick={() => router.push('/settings')}
                    className="w-full flex items-center justify-between gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <span className="font-bold">الإعدادات</span>
                    <FaCog />
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <span className="font-bold">تسجيل الخروج</span>
                    <FaSignOutAlt />
                  </button>
                </div>
              </Card>

              {/* Account Status */}
              <Card className="p-6 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{stats.level}</div>
                  <div className="text-amber-100 mb-4">مستوى حسابك</div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-200">
                      <div
                        style={{ width: '75%' }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>75%</span>
                      <span>إكمال الملف</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-right">النشاط الأخير</h3>
                <div className="space-y-4">
                  {[
                    { activity: 'تسجيل الدخول', time: 'قبل 5 دقائق', color: 'bg-green-100 text-green-600' },
                    { activity: 'تحديث الملف', time: 'أمس', color: 'bg-blue-100 text-blue-600' },
                    { activity: 'طلب جديد', time: 'منذ 3 أيام', color: 'bg-purple-100 text-purple-600' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${item.color}`}>
                          <FaCalendar />
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-800">{item.activity}</div>
                          <div className="text-sm text-gray-600">{item.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Verification Status */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-right">حالة التحقق</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-medium">✓ البريد الإلكتروني</span>
                    <span className="text-green-500">مؤكد</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-600 font-medium">رقم الهاتف</span>
                    <span className="text-amber-500">غير مؤكد</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">الهوية</span>
                    <span className="text-gray-500">غير مطلوب</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;