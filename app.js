const express = require('express');
const path = require('path');

const app = express();

// --- Core setup ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Static files ---
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// --- Defaults available in every view ---
app.use((req, res, next) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  res.locals.siteName = 'Your Site Name';
  res.locals.baseUrl = baseUrl;
  res.locals.defaultImage = '/assets/images/og-default.jpg';
  next();
});

// Helper to build SEO payload per page
function meta(req, {
  title = 'Untitled',
  desc = '',
  keywords = '',
  image = null,
  url = null
} = {}) {
  const pageUrl = url || `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  return {
    pageTitle: `${title} | Your Site Name`,
    pageDescription: desc,
    pageKeywords: keywords,
    pageImage: image || '/assets/images/og-default.jpg',
    pageUrl
  };
}

// ------------------ ROUTES ------------------

// Home
app.get('/', (req, res) => {
  res.render('index', meta(req, {
    title: 'Home',
    desc: 'Explore academic programs, internship opportunities, modern facilities, and more.',
    keywords: 'education, academic programs, internship, facilities, university',
    image: '/assets/images/home-banner.jpg',
    url: `${res.locals.baseUrl}/`
  }));
});

// About Us
app.get('/about-us', (req, res) => {
  res.render('about-us', meta(req, {
    title: 'About Us',
    desc: 'Learn about our mission, vision, leadership, and organizational values.',
    keywords: 'about us, mission, vision, leadership, organization',
    image: '/assets/images/about-banner.jpg'
  }));
});

// Structure
app.get('/structure', (req, res) => {
  res.render('structure', meta(req, {
    title: 'Organizational Structure',
    desc: 'See our organizational structure and departments.',
    keywords: 'organizational structure, departments, governance',
    image: '/assets/images/structure-banner.jpg'
  }));
});

// Academic
app.get('/academic', (req, res) => {
  res.render('academic', meta(req, {
    title: 'Academic Programs',
    desc: 'Browse our academic programs, curriculum highlights, and admission info.',
    keywords: 'academic programs, curriculum, admission, education',
    image: '/assets/images/academic-banner.jpg'
  }));
});

// Internship
app.get('/internship', (req, res) => {
  res.render('internship', meta(req, {
    title: 'Internship',
    desc: 'Discover internship pathways, partner organizations, and application timelines.',
    keywords: 'internship, partners, application, career, experience',
    image: '/assets/images/internship-banner.jpg'
  }));
});

// Facilities
app.get('/facilities', (req, res) => {
  res.render('facilities', meta(req, {
    title: 'Facilities',
    desc: 'Tour our libraries, labs, classrooms, and student spaces.',
    keywords: 'facilities, campus, library, lab, classroom',
    image: '/assets/images/facilities-banner.jpg'
  }));
});

// Contact Us
app.get('/contact-us', (req, res) => {
  res.render('contact-us', meta(req, {
    title: 'Contact Us',
    desc: 'Get in touch for admissions, programs, or general inquiries.',
    keywords: 'contact, address, phone, email, inquiry',
    image: '/assets/images/contact-banner.jpg'
  }));
});

// 404 (keep last)
app.use((req, res) => {
  res.status(404).render('404', meta(req, {
    title: 'Page Not Found (404)',
    desc: 'The page you’re looking for doesn’t exist or has been moved.',
    keywords: '404, not found',
    image: '/assets/images/404-banner.jpg',
    url: `${res.locals.baseUrl}${req.originalUrl}`
  }));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
