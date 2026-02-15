// مصفوفة لتخزين الخدمات (تعمل في الذاكرة حالياً لحين ربطها بقاعدة البيانات)
let servicesData = [];

// دالة التنقل بين التبويبات
function switchTab(tabId, clickedButton) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(btn => {
        btn.classList.remove('active');
    });

    const activeTab = document.getElementById(tabId);
    if(activeTab) {
        activeTab.classList.add('active');
        
        const animatedElements = activeTab.querySelectorAll('.animate__animated');
        animatedElements.forEach(el => {
            el.classList.remove('animate__fadeInUp', 'animate__fadeInDown', 'animate__fadeIn');
            void el.offsetWidth; 
            
            if(el.classList.contains('section-title') || el.classList.contains('reports-header')) {
                el.classList.add('animate__fadeInDown');
            } else if (el.classList.contains('sub-nav')) {
                el.classList.add('animate__fadeIn');
            } else {
                el.classList.add('animate__fadeInUp');
            }
        });
    }

    if(clickedButton) {
        clickedButton.classList.add('active');
    }
}

// دالة إضافة خدمة جديدة
function addService() {
    const name = document.getElementById('service-name').value;
    const price = document.getElementById('service-price').value;
    const imgInput = document.getElementById('service-image');
    
    // صورة افتراضية في حال لم يقم باختيار صورة
    let imgSrc = 'https://via.placeholder.com/150?text=بدون+صورة'; 
    
    if(imgInput.files && imgInput.files[0]) {
        imgSrc = URL.createObjectURL(imgInput.files[0]);
    }

    if(name && price) {
        const newService = { name, price, img: imgSrc };
        servicesData.push(newService);
        
        // تفريغ الحقول بعد الإضافة
        document.getElementById('service-name').value = '';
        document.getElementById('service-price').value = '';
        document.getElementById('service-image').value = '';

        // تحديث عرض الخدمات
        renderServices();
        showNotification('تم إضافة الخدمة بنجاح!');
    } else {
        Swal.fire({
            text: 'يرجى إدخال عنوان الخدمة والسعر',
            icon: 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
    }
}

// دالة رسم وتحديث البطاقات في قسم الخدمات وقسم البيع
function renderServices() {
    const servicesList = document.getElementById('services-list');
    const sellGrid = document.getElementById('sell-services-grid');
    
    let html = '';
    servicesData.forEach((srv, index) => {
        html += `
            <div class="service-card" onclick="selectServiceToSell(${index})">
                <img src="${srv.img}" alt="${srv.name}">
                <h4>${srv.name}</h4>
                <p>${srv.price} د.ع</p>
            </div>
        `;
    });

    if(servicesList) servicesList.innerHTML = html;
    if(sellGrid) sellGrid.innerHTML = html;
}

// دالة اختيار الخدمة للبيع (إخفاء البطاقات وإظهار الحقول)
function selectServiceToSell(index) {
    const srv = servicesData[index];
    document.getElementById('sell-services-grid').style.display = 'none';
    document.getElementById('sell-form-container').style.display = 'block';
    
    // وضع اسم وسعر الخدمة في العنوان
    document.getElementById('selected-service-title').innerText = `بيع: ${srv.name} (${srv.price} د.ع)`;
}

// دالة الرجوع من حقول البيع إلى شبكة الخدمات
function showSellGrid() {
    document.getElementById('sell-services-grid').style.display = 'grid';
    document.getElementById('sell-form-container').style.display = 'none';
}

// تعيين التاريخ التلقائي
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    const dateInput = document.getElementById('auto-date');
    if(dateInput) dateInput.value = formattedDate;

    const fromDate = document.getElementById('fromDate');
    const toDate = document.getElementById('toDate');
    
    if(fromDate) fromDate.value = `${yyyy}-${mm}-01`;
    if(toDate) toDate.value = formattedDate;
});

// نظام التنبيهات
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

// دالة تعديل الفاتورة
function editInvoice() {
    Swal.fire({
        title: 'تعديل الفاتورة',
        text: 'تم فتح الفاتورة للتعديل',
        icon: 'info',
        confirmButtonText: 'حفظ التعديلات',
        confirmButtonColor: '#6b46c1'
    });
}

// دالة حذف الفاتورة
function deleteInvoice(btn) {
    Swal.fire({
        title: 'هل أنت متأكد؟',
        text: "لن تتمكن من استرجاع الفاتورة بعد الحذف!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'نعم، احذفها!',
        cancelButtonText: 'إلغاء'
    }).then((result) => {
        if (result.isConfirmed) {
            // إخفاء بطاقة الفاتورة من الواجهة كدليل على الحذف
            const card = btn.closest('.invoice-card');
            if (card) {
                card.style.display = 'none';
            }
            Swal.fire({
                title: 'تم الحذف!',
                text: 'تم حذف الفاتورة بنجاح.',
                icon: 'success',
                confirmButtonColor: '#6b46c1'
            });
        }
    });
}

// دالة تصدير ملف الإكسل (CSV)
function exportExcel() {
    // إنشاء بيانات CSV تدعم اللغة العربية
    let csvContent = "\uFEFF"; // لدعم الترميز العربي في ملفات CSV
    csvContent += "رقم الفاتورة,اسم الزبون,التاريخ,الحالة,المبلغ\n";
    csvContent += "1001,علي محمد,16 فبراير 2026,قيد العمل,0\n";

    // إنشاء رابط وتنزيل الملف
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "تقارير_المبيعات.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('تم تحميل ملف الإكسل بنجاح!');
}

function backupData() {
    Swal.fire({
        title: 'نسخة احتياطية',
        text: 'تم تجهيز النسخة الاحتياطية بنجاح!',
        icon: 'success',
        confirmButtonText: 'حفظ الملف',
        confirmButtonColor: '#6b46c1'
    });
}

function restoreData() {
    Swal.fire({
        title: 'استعادة البيانات',
        text: 'الرجاء اختيار ملف النسخة الاحتياطية.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'اختر ملف',
        cancelButtonText: 'إلغاء',
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444'
    });
}
