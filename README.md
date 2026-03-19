# MAISON DE KARABS - Luxury Fashion Website

A premium, elegant PHP website for Maison De Karabs luxury fashion brand.

## 🌟 Features

- **Luxury Design**: Premium ivory/cream color palette with gold accents
- **Responsive**: Fully responsive design for all devices
- **Smooth Animations**: Fade-in effects and smooth transitions
- **Multiple Pages**: Home, Shop, Styling Services, About, Contact, Consultation
- **PHP Backend**: Built with PHP for dynamic functionality
- **Modern UI**: Clean, minimal, Chanel-inspired aesthetic

## 📁 Project Structure

```
maison-de-karabs/
├── assets/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   └── main.js            # JavaScript interactions
│   └── images/               # Image assets folder
│       ├── products/         # Product images
│       ├── services/         # Service images
│       └── about/            # About page images
├── includes/
│   ├── header.php            # Site header & navigation
│   └── footer.php            # Site footer
├── index.php                 # Homepage
├── shop.php                  # Products shop page
├── styling-services.php      # Services page
├── about.php                 # About us page
├── contact.php               # Contact page
├── consultation.php          # Consultation booking page
└── README.md                 # This file
```

## 🎨 Color Palette

- **Ivory**: #F5F3EE (Main background)
- **Cream**: #FAF8F3 (Alternate background)
- **Gold**: #C6A75E (Primary accent)
- **Black**: #1A1A1A (Text & headers)
- **Champagne**: #F3E9DC (Section backgrounds)
- **White**: #FFFFFF (Cards & contrast)

## 🚀 Getting Started

### Prerequisites

- PHP 7.4 or higher
- Local server (XAMPP, WAMP, MAMP, or similar)
- Modern web browser

### Installation

1. **Clone or copy the project** to your local server directory:
   ```
   For XAMPP: C:\xampp\htdocs\maison-de-karabs
   For WAMP: C:\wamp\www\maison-de-karabs
   ```

2. **Add placeholder images**: Add your product and service images to:
   - `assets/images/hero-image.jpg` (Hero section)
   - `assets/images/about-brand.jpg` (About section)
   - `assets/images/products/` (Product images)
   - `assets/images/services/` (Service images)
   - `assets/images/about/` (About page images)

3. **Start your local server**:
   - For XAMPP: Start Apache from XAMPP Control Panel
   - For WAMP: Start all services from WAMP menu

4. **Access the website**:
   ```
   http://localhost/maison-de-karabs/
   ```

## 📄 Pages

### Homepage (index.php)
- Hero section with call-to-actions
- About the brand
- Services overview
- Featured collection
- Fashion advice tips
- Client testimonials
- CTA section

### Shop (shop.php)
- Product filtering
- Product grid with hover effects
- Product categories
- "Load More" functionality

### Styling Services (styling-services.php)
- Detailed service descriptions
- Service packages (Essentials, Complete, Premium)
- Pricing information
- Client testimonials

### About (about.php)
- Brand story
- Company values
- Philosophy
- What we do

### Contact (contact.php)
- Contact form
- Business information
- Location map
- FAQ section

### Consultation (consultation.php)
- Booking form
- Service selection
- What to expect
- Consultation policies

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `assets/css/style.css`:
```css
:root {
    --color-ivory: #F5F3EE;
    --color-gold: #C6A75E;
    /* etc. */
}
```

### Adding Products
Products are currently static HTML. To make them dynamic:
1. Create a MySQL database
2. Add database connection in a new `config.php`
3. Update `shop.php` to fetch from database

### Form Processing
Forms currently use placeholder action URLs. To enable:
1. Create `process-contact.php` for contact form
2. Create `process-consultation.php` for consultation form
3. Add PHP mailer or database storage logic

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Dependencies

- Google Fonts: Playfair Display & Montserrat
- No other external dependencies

## 🔐 Security Notes

For production deployment:
- Validate all form inputs
- Sanitize user data
- Use prepared statements for database queries
- Enable HTTPS
- Add CSRF protection to forms
- Implement rate limiting

## 📝 Future Enhancements

- [ ] Backend database integration
- [ ] User authentication system
- [ ] Shopping cart functionality
- [ ] Payment gateway integration
- [ ] Admin panel for content management
- [ ] Email notification system
- [ ] Product search functionality
- [ ] Customer reviews system

## 📞 Support

For questions or support, contact:
- Email:Belkarabs@gmail.com
- Phone: +1 (212) 555-1234

## 📄 License

© 2026 Maison De Karabs. All rights reserved.

---

**Built with elegance and purpose** ✨
