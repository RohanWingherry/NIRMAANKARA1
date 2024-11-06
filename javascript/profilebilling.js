function resetTabs() {
    document.getElementById('profileSection').style.display = 'none';
    document.getElementById('billingSection').style.display = 'none';
    document.getElementById('securitySection').style.display = 'none';
    document.getElementById('notificationSection').style.display = 'none';
    
    let tabs = document.querySelectorAll('.tab-head');
    tabs.forEach(tab => {
        tab.classList.remove('tab-active');
    });
}

function showSection(sectionId) {
    resetTabs();
    
    document.getElementById(sectionId).style.display = 'block';
    
    let activeTab = document.getElementById(sectionId.replace('Section', 'Tab'));
    activeTab.classList.add('tab-active');
}

document.getElementById('profileTab').addEventListener('click', function() {
    showSection('profileSection');
});

document.getElementById('billingTab').addEventListener('click', function() {
    showSection('billingSection');
});

document.getElementById('securityTab').addEventListener('click', function() {
    showSection('securitySection');
});

document.getElementById('notificationTab').addEventListener('click', function() {
    showSection('notificationSection');
});

document.addEventListener('DOMContentLoaded', function() {
    showSection('profileSection');
});
