// دالة التنقل بين التبويبات (تم تحسينها لتشمل جميع الأقسام وتعمل بكفاءة)
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
    if(activeTab) {
        activeTab.classList.add('active');
        
        // إعادة تشغيل الأنيميشن
        const animatedElements = activeTab.querySelectorAll('.animate__animated');
        animatedElements.forEach(el => {
            el.classList.remove('animate__fadeInUp', 'animate__fadeInDown', 'animate__fadeIn');
            void el.offsetWidth; // Trigger reflow
            
            if(el.classList.contains('section-title') || el.classList.contains('reports-header')) {
                el.classList.add('animate__fadeInDown');
            } else if (el.classList.contains('sub-nav')) {
                el.classList.add('animate__fadeIn');
            } else {
                el.classList.add('animate__fadeInUp');
            }
        });
    }

    // 4. تفعيل الزر الذي تم النقر عليه
    if(clickedButton) {
        clickedButton.classList.add('active');
    }
}

// تعيين التاريخ التلقائي في قسم "بيع الخدمة" و فلاتر التقارير
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    // تاريخ فاتورة البيع
    const dateInput = document.getElementById('auto-date');
    if(dateInput) dateInput.value = formattedDate;

    // تواريخ التقارير الافتراضية
    const fromDate = document.getElementById('fromDate');
    const toDate = document.getElementById('toDate');
    
    if(fromDate) {
        // نضع تاريخ بداية الشهر كمثال
        fromDate.value = `${yyyy}-${mm}-01`;
    }
    if(toDate) {
        toDate.value = formattedDate;
    }
});

// الميزة رقم 6: نظام التنبيهات باستخدام مكتبة SweetAlert2 الجميلة
function showNotification(message) {
    Swal.fire({
        text: message,
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#fff',
        color: '#6b46c1',
        iconColor: '#22c55e'
    });
}

// الميزة رقم 7: تصدير إلى Excel
function exportExcel() {
    Swal.fire({
        title: 'جاري التصدير...',
        text: 'سيتم تحميل ملف الإكسل قريباً (سيتم تفعيلها مع قاعدة البيانات).',
        icon: 'info',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#6b46c1'
    });
}

// ميزة الإعدادات: تحميل النسخة الاحتياطية
function backupData() {
    Swal.fire({
        title: 'نسخة احتياطية',
        text: 'تم تجهيز النسخة الاحتياطية بنجاح!',
        icon: 'success',
        confirmButtonText: 'حفظ الملف',
        confirmButtonColor: '#6b46c1'
    });
}

// ميزة الإعدادات: استعادة النسخة الاحتياطية
function restoreData() {
    Swal.fire({
        title: 'استعادة البيانات',
        text: 'الرجاء اختيار ملف النسخة الاحتياطية (سيتم تفعيلها مع قاعدة البيانات).',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'اختر ملف',
        cancelButtonText: 'إلغاء',
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444'
    });
}
