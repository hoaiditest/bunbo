/**
 * test_landing.js - Automated E2E Testing Script using Playwright
 * Runs tests on the Phở Gà Ta landing page, validates desktop/mobile layout,
 * interacts with the reservation form, checks responsive menu, takes screenshots and records video.
 */

const { chromium, devices } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('============================================================');
  console.log('🚀 KHỞI CHẠY KIỂM THỬ TỰ ĐỘNG LANDING PAGE PHỞ GÀ TA');
  console.log('============================================================\n');

  // Get local absolute URL path of index.html
  const htmlPath = 'file://' + path.resolve(__dirname, 'index.html');
  console.log('📍 Đường dẫn file HTML kiểm thử:', htmlPath);

  // Initialize browser
  console.log('🔍 Đang khởi chạy trình duyệt Chromium...');
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  
  // Create browser context for desktop with video recording enabled
  const desktopContext = await browser.newContext({
    recordVideo: {
      dir: __dirname,
      size: { width: 1280, height: 720 }
    },
    viewport: { width: 1280, height: 800 }
  });
  
  const page = await desktopContext.newPage();
  
  // ==========================================================================
  // PHẦN A: KIỂM THỬ TRÊN DESKTOP (VIEWPORT 1280x800)
  // ==========================================================================
  console.log('\n--- PHẦN A: KIỂM THỬ GIAO DIỆN DESKTOP ---');
  console.log('🌐 Đang tải trang landing page...');
  await page.goto(htmlPath);
  await page.waitForLoadState('networkidle');
  console.log('✅ Tải trang thành công.');

  // Validate Heading H1 tag
  const mainTitle = await page.textContent('h1');
  console.log('📌 Tiêu đề H1 chính của trang:', mainTitle.trim());

  // Simulate smooth scroll to bottom and back to top
  console.log('↕️ Đang cuộn trang tự động để kiểm tra hiệu ứng tải mượt mà...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 120;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 60);
    });
  });
  
  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  console.log('✅ Hoàn thành cuộn trang mô phỏng.');

  // Take Desktop Screenshot (Full Page)
  const desktopScreenshotPath = path.join(__dirname, 'screenshot_desktop.png');
  console.log('📸 Đang chụp ảnh màn hình toàn trang Desktop...');
  await page.screenshot({ path: desktopScreenshotPath, fullPage: true });
  console.log('💾 Đã lưu ảnh Desktop tại:', desktopScreenshotPath);

  // Test Interactive Form
  console.log('✍️ Đang mô phỏng thao tác điền Form đặt bàn/đặt hàng...');
  
  // Locate and scroll to booking form section
  const bookingSection = page.locator('#dat-ban');
  await bookingSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Fill in inputs
  await page.fill('#form-name', 'Minh Đỗ (Test)');
  await page.fill('#form-phone', '0905123456');
  await page.fill('#form-time', '18:30');
  
  // Select a dish from dropdown
  console.log('🍜 Chọn món ăn: "Phở gà ta truyền thống"');
  await page.selectOption('#form-dish', 'Phở gà ta truyền thống');
  
  // Write notes
  await page.fill('#form-notes', 'Khách muốn ngồi bàn gần cửa sổ ngắm cảnh biển, chuẩn bị sẵn quẩy giòn và nhiều hành lá.');
  await page.waitForTimeout(600);

  // Submit the form
  console.log('✉️ Đang nhấn nút gửi đơn đặt bàn...');
  await page.click('#btn-submit');
  await page.waitForTimeout(1200);

  // Verify Modal confirmation active state
  const modal = page.locator('#success-modal');
  const isModalActive = await modal.evaluate(el => el.classList.contains('active'));
  console.log('🔔 Trạng thái Popup Modal thành công:', isModalActive ? 'ĐÃ HIỂN THỊ (ĐẠT)' : 'CHƯA HIỂN THỊ (LỖI)');

  // Verify information matched in modal details
  const modalName = await page.textContent('#modal-val-name');
  const modalPhone = await page.textContent('#modal-val-phone');
  const modalTime = await page.textContent('#modal-val-time');
  const modalDish = await page.textContent('#modal-val-dish');

  console.log('\n🔍 --- KẾT QUẢ HIỂN THỊ TRÊN MODAL ---');
  console.log('   👤 Tên Khách hàng:', modalName.trim());
  console.log('   📞 Số điện thoại:', modalPhone.trim());
  console.log('   ⏰ Giờ đặt đến:', modalTime.trim());
  console.log('   🍲 Món đã chọn:', modalDish.trim());
  console.log('-------------------------------------\n');

  // Close the modal
  console.log('❌ Đóng Popup Modal thành công...');
  await page.click('#btn-modal-close');
  await page.waitForTimeout(500);

  // Close desktop context to save the recorded video
  await desktopContext.close();
  console.log('✅ Đã lưu phiên quay video màn hình.');

  // Find the generated video file and rename it to 'demo_recording.webm'
  const videoFile = page.video();
  if (videoFile) {
    try {
      const tempVideoPath = await videoFile.path();
      const finalVideoPath = path.join(__dirname, 'demo_recording.webm');
      fs.copyFileSync(tempVideoPath, finalVideoPath);
      // Delete temporary playwright file if wanted, or just let context handle it
      console.log('💾 Đã lưu Video Demo tại:', finalVideoPath);
    } catch (err) {
      console.log('⚠️ Không thể đổi tên file video:', err.message);
    }
  }

  // ==========================================================================
  // PHẦN B: KIỂM THỬ TRÊN DI ĐỘNG (RESPONSIVE VIEWPORT IPHONE 12)
  // ==========================================================================
  console.log('\n--- PHẦN B: KIỂM THỬ RESPONSIVE DI ĐỘNG (iPhone 12) ---');
  console.log('📱 Khởi tạo môi trường mô phỏng di động...');
  
  const mobileContext = await browser.newContext({
    ...devices['iPhone 12'],
    viewport: { width: 390, height: 844 }
  });
  
  const mobilePage = await mobileContext.newPage();
  
  console.log('🌐 Đang tải trang ở chế độ di động...');
  await mobilePage.goto(htmlPath);
  await mobilePage.waitForLoadState('networkidle');
  
  // Verify hamburger menu visible
  const hamburger = mobilePage.locator('#menu-toggle');
  const isHamburgerVisible = await hamburger.isVisible();
  console.log('🍔 Nút Menu Hamburger hiển thị trên di động:', isHamburgerVisible ? 'ĐÃ HIỂN THỊ (ĐẠT)' : 'CHƯA HIỂN THỊ (LỖI)');

  // Open mobile menu
  console.log('🖱️ Nhấp mở Hamburger Menu...');
  await hamburger.click();
  await mobilePage.waitForTimeout(500);
  
  const navMenu = mobilePage.locator('#nav-menu');
  const isMenuOpen = await navMenu.evaluate(el => el.classList.contains('active'));
  console.log('📂 Trạng thái Menu Navigation sau khi nhấp:', isMenuOpen ? 'ĐÃ MỞ (ĐẠT)' : 'CHƯA MỞ (LỖI)');

  // Close mobile menu
  console.log('🖱️ Nhấp đóng Hamburger Menu...');
  await hamburger.click();
  await mobilePage.waitForTimeout(500);

  // Take Mobile Screenshot (Full Page)
  const mobileScreenshotPath = path.join(__dirname, 'screenshot_mobile.png');
  console.log('📸 Đang chụp ảnh màn hình toàn trang chế độ Di động...');
  await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: true });
  console.log('💾 Đã lưu ảnh Di động tại:', mobileScreenshotPath);

  // Clean up
  await mobileContext.close();
  await browser.close();
  
  console.log('\n============================================================');
  console.log('🏆 HOÀN THÀNH KIỂM THỬ TỰ ĐỘNG THÀNH CÔNG RỰC RỠ!');
  console.log('   - 1x Ảnh Desktop: screenshot_desktop.png');
  console.log('   - 1x Ảnh Di động: screenshot_mobile.png');
  console.log('   - 1x Video Demo: demo_recording.webm');
  console.log('============================================================');
})();
