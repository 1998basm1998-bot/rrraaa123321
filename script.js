// دالة التنقل بين التبويبات
function switchTab(tabId, clickedButton) {
    // 1. إخفاء جميع التبويبات
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // 2. إزالة حالة "النشط" من جميع أزرار الشريط السفلي
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(btn => {
        btn.classList.remove('active');
    });

    // 3. إظهار التبويب المطلوب
    const activeTab = document.getElementById(tabId);
    activeTab.classList.add('active');

    // إعادة تشغيل الأنيميشن عند فتح التبويب لجعله يبدو حيوياً
    const animatedElements = activeTab.querySelectorAll('.animate__animated');
    animatedElements.forEach(el => {
        el.classList.remove('animate__fadeInUp', 'animate__fadeInDown', 'animate__fadeIn');
        void el.offsetWidth; // Trigger reflow (خدعة لإعادة تشغيل الأنيميشن)
        
        // إعادة إضافة كلاس الأنيميشن بناءً على الكلاسات الأصلية
        if(el.classList.contains('section-title') || el.classList.contains('reports-header')) {
            el.classList.add('animate__fadeInDown');
        } else if (el.classList.contains('sub-nav')) {
            el.classList.add('animate__fadeIn');
        } else {
            el.classList.add('animate__fadeInUp');
        }
    });

    // 4. تفعيل الزر الذي تم النقر عليه
    clickedButton.classList.add('active');
}

// تعيين التاريخ التلقائي في قسم "بيع الخدمة"
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('auto-date');
    if(dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
});

/* ملاحظة لبرمجة العمليات الحسابية مستقبلاً (للتقارير):
يمكنك جلب مصفوفة (Array) الفواتير من Firebase، 
ثم عمل حلقة تكرار (Loop) لجمع إجمالي المبيعات لوضعه في "رصيد الصندوق"،
وطرح التكاليف لمعرفة "صافي الربح" وتحديث عناصر الـ HTML التي تحمل الكلاسات:
.total-sales 
.net-profit
*/
