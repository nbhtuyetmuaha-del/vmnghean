'use server'

import { client } from '@/sanity/lib/client';

export async function sendContactToTelegram(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const address = formData.get('address') as string;
  const variant = formData.get('variant') as string;
  const carSlug = formData.get('carSlug') as string;

  if (!name || !phone) {
    return { success: false, message: 'Vui lòng điền đủ Họ tên và Số điện thoại!' };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  let chatId = process.env.TELEGRAM_CHAT_ID;

  // Lấy ChatID riêng của xe này từ Sanity nếu có
  if (carSlug) {
    const carData = await client.fetch(`*[_type == "carModel" && slug.current == "${carSlug}"][0]{telegramChatId}`);
    if (carData?.telegramChatId) {
      chatId = carData.telegramChatId;
    }
  }

  if (!token || !chatId) {
    console.error('Thiếu cấu hình Telegram Bot Token hoặc Chat ID trong biến môi trường.');
    return { success: false, message: 'Lỗi cấu hình hệ thống máy chủ.' };
  }

  const message = `
🚗 **CÓ KHÁCH HÀNG MỚI ĐĂNG KÝ TƯ VẤN!** 🚗

👤 **Khách hàng:** ${name}
📞 **Số điện thoại:** ${phone}
📍 **Địa chỉ:** ${address || 'Không cung cấp'}
🚘 **Quan tâm:** ${variant || 'Tư vấn chung'}

🕒 **Thời gian:** ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
`;

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Lỗi khi gửi Telegram:', errorData);
      return { success: false, message: 'Lỗi khi gửi thông báo tới hệ thống Telegram.' };
    }

    // 2. Bắn dữ liệu sang Google Sheets (Nếu có URL Webhook)
    const sheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (sheetWebhook) {
      try {
        await fetch(sheetWebhook, {
          method: 'POST',
          // Sử dụng text/plain để tránh lỗi CORS Preflight từ trình duyệt nếu chạy client, nhưng chạy trên Server thì application/json vẫn ok.
          // Tuy nhiên Apps Script thường dễ nhận application/json khi gọi từ backend.
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            address: address || '',
            variant: variant || 'Tư vấn chung'
          })
        });
      } catch (sheetError) {
        console.error('Lỗi khi gửi Google Sheets:', sheetError);
        // Không báo lỗi cho người dùng vì Telegram đã gửi thành công
      }
    }

    return { success: true, message: 'Gửi thành công! Chúng tôi sẽ liên hệ lại sớm nhất.' };
  } catch (error) {
    console.error('Lỗi ngoại lệ khi gọi Telegram API:', error);
    return { success: false, message: 'Hệ thống đang bận, vui lòng thử lại sau.' };
  }
}
