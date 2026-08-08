export interface Variant {
  name: string;
  price: string;
  highlights?: string[];
}

export interface CarModel {
  name: string;
  slogan: string;
  heroImage: string;
  startingPrice: string;
  features: Array<{ title: string; description: string; iconName: string }>;
  variants: Variant[];
  specs: {
    engine: string;
    power: string;
    gearbox: string;
  };
  gallery: string[];
}

export interface Consultant {
  name: string;
  title: string;
  phone: string;
  zaloUrl: string;
  avatar: string;
}

// Đây là file giả lập Database / CMS
// Để nhân bản Landing Page cho dự án khác, bạn chỉ cần thay đổi dữ liệu trong file này
export const landingPageData = {
  carModel: {
    name: "Volkswagen Teramont X",
    slogan: "Đỉnh cao thiết kế SUV Thể thao",
    // Dùng ảnh tạm từ Unsplash cho demo
    heroImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop", 
    startingPrice: "1.998.000.000 VNĐ",
    features: [
      { title: "IQ.DRIVE", description: "Hệ thống an toàn chủ động thông minh", iconName: "ShieldCheck" },
      { title: "IQ.LIGHT", description: "Cụm đèn pha LED Matrix tiên tiến", iconName: "Lightbulb" },
      { title: "4MOTION", description: "Hệ dẫn động 4 bánh toàn thời gian", iconName: "Car" },
    ],
    variants: [
      { name: "Luxury", price: "1.998.000.000 VNĐ" },
      { name: "Platinum", price: "2.168.000.000 VNĐ" },
    ],
    specs: {
      engine: "2.0L TSI",
      power: "220 Hp",
      gearbox: "DSG 7 cấp",
    },
    gallery: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2064&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop"
    ]
  } as CarModel,
  
  consultant: {
    name: "Tường Vân",
    title: "Chuyên viên tư vấn kinh doanh Volkswagen",
    phone: "0559 260 268",
    zaloUrl: "https://zalo.me/0559260268",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop"
  } as Consultant,
  
  dealership: {
    name: "Volkswagen Nghệ An",
    address: "Đại lý Volkswagen chuẩn 4S toàn cầu",
    hotline: "0559 260 268",
  }
};
