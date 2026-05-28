/**
 * App.js - Pho Ga Ta Landing Page Interaction Logic
 * Handles navigation scroll effects, mobile hamburger menu, menu filtering, 
 * interactive food selection, and booking form validation with custom success modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. SCROLL EFFECTS & ACTIVE NAV LINKS
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  // Shrink navbar background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    highlightActiveNavItem();
  });

  // Highlight active navigation link based on current viewport section
  function highlightActiveNavItem() {
    let scrollPosition = window.scrollY + 200; // Offset for navbar height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          const link = item.querySelector('a');
          if (link && link.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // Smooth scroll for nav links (especially on mobile menu click to close it)
  document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          // Close mobile menu first if open
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          
          window.scrollTo({
            top: targetSection.offsetTop - 70, // Subtract navbar height
            behavior: 'smooth'
          });
        }
      }
    });
  });


  // ==========================================================================
  // 2. MOBILE HAMBURGER MENU
  // ==========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isActive = menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  // ==========================================================================
  // 3. MENU TABS FILTERING
  // ==========================================================================
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuCards = document.querySelectorAll('.menu-card');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Set active tab styling
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      // Filter cards with subtle scale animation
      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });


  // ==========================================================================
  // 4. INTERACTIVE ORDERING (MENU CARD CTA TO FORM)
  // ==========================================================================
  const orderButtons = document.querySelectorAll('.btn-card-order');
  const dishSelect = document.getElementById('form-dish');
  const bookingSection = document.getElementById('dat-ban');
  const formBox = document.getElementById('booking-form-box');

  orderButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const itemName = btn.getAttribute('data-item');

      // 1. Select the dish in dropdown
      if (dishSelect) {
        dishSelect.value = itemName;
      }

      // 2. Smooth scroll to form section
      if (bookingSection) {
        window.scrollTo({
          top: bookingSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }

      // 3. Highlight the form with animation
      if (formBox) {
        setTimeout(() => {
          formBox.style.transform = 'scale(1.03)';
          formBox.style.boxShadow = '0 20px 40px rgba(188, 59, 44, 0.15)';
          formBox.style.borderColor = 'var(--color-red-brick)';
          
          setTimeout(() => {
            formBox.style.transform = 'none';
            formBox.style.boxShadow = '';
            formBox.style.borderColor = '';
          }, 600);
        }, 850);
      }
    });
  });


  // ==========================================================================
  // 5. BOOKING FORM VALIDATION & MODAL SUCCESS
  // ==========================================================================
  const reservationForm = document.getElementById('reservation-form');
  const successModal = document.getElementById('success-modal');
  const modalCloseBtn = document.getElementById('btn-modal-close');
  
  // Modal Data Elements
  const modalValName = document.getElementById('modal-val-name');
  const modalValPhone = document.getElementById('modal-val-phone');
  const modalValTime = document.getElementById('modal-val-time');
  const modalValDish = document.getElementById('modal-val-dish');

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent standard browser submit/reload

      // Fetch input elements
      const nameInput = document.getElementById('form-name');
      const phoneInput = document.getElementById('form-phone');
      const timeInput = document.getElementById('form-time');
      const dishInput = document.getElementById('form-dish');
      const notesInput = document.getElementById('form-notes');

      // Clear previous custom error borders
      [nameInput, phoneInput, timeInput].forEach(input => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
      });

      // Basic Client Side Validation
      let isValid = true;

      // Validate Name (not empty, min 2 characters)
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.style.borderColor = 'var(--color-red-brick)';
        nameInput.style.boxShadow = '0 0 0 3px rgba(188, 59, 44, 0.25)';
        nameInput.focus();
        isValid = false;
        return;
      }

      // Validate Vietnamese Phone Number
      // Regex matches 10-digit phone number starting with 03, 05, 07, 08, 09
      const phoneRegex = /^(03|05|07|08|09|01[2|6|8|9])\d{8}$/;
      const cleanedPhone = phoneInput.value.trim().replace(/\s/g, '');
      if (!phoneRegex.test(cleanedPhone)) {
        phoneInput.style.borderColor = 'var(--color-red-brick)';
        phoneInput.style.boxShadow = '0 0 0 3px rgba(188, 59, 44, 0.25)';
        phoneInput.focus();
        isValid = false;
        alert('Vui lòng nhập số điện thoại Việt Nam hợp lệ (ví dụ: 0905123456)!');
        return;
      }

      // Validate Time (not empty)
      if (!timeInput.value) {
        timeInput.style.borderColor = 'var(--color-red-brick)';
        timeInput.style.boxShadow = '0 0 0 3px rgba(188, 59, 44, 0.25)';
        timeInput.focus();
        isValid = false;
        return;
      }

      if (isValid) {
        // Prepare Order Data Object
        const orderData = {
          name: nameInput.value.trim(),
          phone: cleanedPhone,
          time: timeInput.value,
          dish: dishInput.value || 'Chưa lựa chọn',
          notes: notesInput.value.trim() || 'Không có',
          timestamp: new Date().toLocaleString('vi-VN')
        };

        // 1. Console Log Form Submission Data as requested
        console.log('%c--- ĐƠN ĐẶT BÀN / ĐẶT HÀNG MỚI ---', 'color: #BC3B2C; font-weight: bold; font-size: 1.1rem;');
        console.log('Khách hàng:', orderData.name);
        console.log('Số điện thoại:', orderData.phone);
        console.log('Thời gian đến:', orderData.time);
        console.log('Món ăn đã chọn:', orderData.dish);
        console.log('Ghi chú khách hàng:', orderData.notes);
        console.log('Thời gian đăng ký:', orderData.timestamp);
        console.log('%c----------------------------------', 'color: #BC3B2C; font-weight: bold;');

        // Also trigger standard request output
        console.log("Đơn đã gửi!");

        // 2. Bind data to success Modal details
        if (modalValName) modalValName.textContent = orderData.name;
        if (modalValPhone) modalValPhone.textContent = orderData.phone;
        if (modalValTime) modalValTime.textContent = orderData.time;
        if (modalValDish) modalValDish.textContent = orderData.dish;

        // 3. Open Success Modal
        if (successModal) {
          successModal.classList.add('active');
        }

        // 4. Reset Form
        reservationForm.reset();
      }
    });
  }

  // Close Success Modal Handler
  if (modalCloseBtn && successModal) {
    modalCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    // Close when clicking outside of modal-box (overlay backdrop)
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

});
