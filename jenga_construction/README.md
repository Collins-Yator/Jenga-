# Jenga Construction Limited — Official Django Website

A modern, robust, and responsive Django web platform for **Jenga Construction Limited**, a premier civil engineering, road, bridge, structural building, and landscaping company based in Nairobi, Kenya.

---

## 1. Company Profile & Project Objectives

- **Company Name:** Jenga Construction Limited
- **Headquarters / Primary Location:** Nairobi, Kenya
- **WhatsApp Contact:** `0792729492` (Local) / `+254792729492` (International Click-to-Chat)
- **Primary Market:** Homeowners, private developers, civil authorities, and commercial property owners in Kenya.
- **Currency:** Kenyan Shillings (KES)
- **Timezone:** `Africa/Nairobi` (EAT - UTC+3)

### Core Objectives:
1. **Lead Generation & Tender Inquiries:** Capture qualified construction leads via a structured quotation request system with automated tracking references (`JCL-YYYYMMDD-XXXX`).
2. **Instant WhatsApp Integration:** Frictionless click-to-chat integration with contextual pre-filled messages across hero banners, service catalogs, and individual project pages.
3. **Disciplined Portfolio Management:** Transparent civil and structural showcases featuring strict demonstration badges until verified company records and site photos are uploaded.
4. **Administrative Triage:** Comprehensive Django Admin with custom status workflows (`NEW`, `CONTACTED`, `IN_PROGRESS`, `QUOTATION_SENT`, `ACCEPTED`, `CLOSED`) and confidential internal notes.

---

## 2. Technology Stack

- **Backend:** Python 3.10+ / 3.12, Django 5.x LTS, Django ORM
- **Database:** SQLite (default local development) & PostgreSQL compatible
- **Security & Integrity:** Django CSRF tokens, honeypot spam protection, Kenyan telephone format validation (`07...`, `01...`, `+254...`), parameterized queries, strict XSS auto-escaping.
- **Frontend:** Responsive semantic HTML5, CSS3 with construction brand palette (`#111111` Black, `#242424` Charcoal, `#FFC107` Construction Yellow, `#E5A900` Hover), modern typography (`Plus Jakarta Sans` & `DM Sans`).
- **Email:** Django Core Mail with Console Backend for local inspection and SMTP support for production.

---

## 3. Directory Structure

```text
jenga_construction/
│
├── manage.py                     # Django CLI utility
├── requirements.txt              # Production & development dependencies
├── .env.example                  # Environment variable blueprint
├── .gitignore                    # Git ignore definitions
├── README.md                     # Comprehensive operations guide
│
├── config/                       # Project configuration root
│   ├── __init__.py
│   ├── settings.py               # Settings with Nairobi TZ & security headers
│   ├── urls.py                   # Master URL routing & custom error handlers
│   ├── wsgi.py                   # WSGI deployment gateway
│   └── asgi.py                   # ASGI asynchronous gateway
│
├── core/                         # Core site pages & company settings
│   ├── models.py                 # SiteSettings singleton model
│   ├── context_processors.py     # Global WhatsApp & company data injector
│   ├── views.py                  # Home, About, Contact, robots.txt, sitemap.xml
│   ├── urls.py
│   ├── admin.py                  # SiteSettings administration
│   ├── tests.py                  # Core page HTTP 200 & singleton tests
│   └── management/commands/
│       └── seed_demo_data.py     # Management command for safe demo seeding
│
├── services/                     # Construction services catalog
│   ├── models.py                 # Service model (Road, Bridge, Building, etc.)
│   ├── views.py                  # service_list & service_detail views
│   ├── urls.py
│   ├── admin.py                  # Service catalog CMS
│   └── tests.py                  # Published vs unpublished access tests
│
├── projects/                     # Portfolio showcase
│   ├── models.py                 # Project & ProjectImage models
│   ├── views.py                  # project_list with filter & project_detail
│   ├── urls.py
│   ├── admin.py                  # Project gallery administration with inlines
│   └── tests.py                  # Portfolio tests & demo flag verification
│
├── enquiries/                    # Quotation requests & contact triage
│   ├── models.py                 # QuoteRequest, ContactMessage, Testimonial
│   ├── forms.py                  # Forms with phone validation & honeypots
│   ├── services.py               # JCL reference number generator & emailers
│   ├── views.py                  # Quote submission, success, & testimonials
│   ├── urls.py
│   ├── admin.py                  # Pipeline management & confidential BOQ notes
│   └── tests.py                  # Form validation, honeypot & resilience tests
│
├── templates/                    # Django HTML Templates
│   ├── base.html                 # Master layout template
│   ├── includes/                 # Reusable partials (navbar, footer, WhatsApp)
│   ├── core/                     # home.html, about.html, contact.html
│   ├── services/                 # service_list.html, service_detail.html
│   ├── projects/                 # project_list.html, project_detail.html
│   ├── enquiries/                # quote_request.html, quote_success.html, ...
│   └── errors/                   # 403.html, 404.html, 500.html
│
├── static/                       # Static assets
│   ├── css/styles.css            # Construction palette & responsive layout
│   └── js/main.js                # Mobile navigation drawer & lightbox
│
└── media/                        # User-uploaded site images
```

---

## 4. Local Setup Instructions for Windows (PowerShell)

### Step 1: Open PowerShell and Navigate to the Project

```powershell
cd jenga_construction
```

### Step 2: Create a Python Virtual Environment

```powershell
py -m venv .venv
```
*(Or `python -m venv .venv`)*

### Step 3: Activate the Virtual Environment

```powershell
.\.venv\Scripts\Activate.ps1
```

> **Note on PowerShell Execution Policy:** If you encounter `cannot be loaded because running scripts is disabled on this system`, run PowerShell as Administrator and execute:
> `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Step 4: Install Dependencies

```powershell
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### Step 5: Configure Environment Variables

Copy `.env.example` to `.env`:

```powershell
Copy-Item .env.example .env
```

Review `.env`. By default, it is configured for local SQLite and console email output.

### Step 6: Apply Database Migrations

```powershell
python manage.py migrate
```

### Step 7: (Optional) Seed Initial Demonstration Data

Populate the database with proposed construction disciplines and clearly labelled demonstration portfolio items:

```powershell
python manage.py seed_demo_data
```

### Step 8: Create an Administrative Superuser

```powershell
python manage.py createsuperuser
```
Follow the prompts to configure your username, email, and strong password.

### Step 9: Launch the Development Server

```powershell
python manage.py runserver
```

### Step 10: Access the Application

- **Public Website:** `http://127.0.0.1:8000/`
- **Django Administration Portal:** `http://127.0.0.1:8000/admin/`

---

## 5. Running Automated Tests

Run the full automated test suite covering models, forms, honeypots, SEO, and permission barriers:

```powershell
python manage.py test
```

To run tests for an individual application:

```powershell
python manage.py test enquiries
python manage.py test services
python manage.py test projects
python manage.py test core
```

---

## 6. Demonstration Data Management & Removal

To preserve institutional trust, all sample projects seeded into the database are explicitly flagged as `Demonstration Project — Not Actual Company Work`.

Before launching publicly with verified Jenga client contracts:

```powershell
python manage.py seed_demo_data --clear
```

This safely deletes all demonstration projects and unapproved testimonials without affecting core site settings or real customer quotation submissions.

---

## 7. Email Notification Configuration

### Local Development (Console Backend)
By default, outgoing emails are rendered directly in your terminal. When a client submits a quotation request, you will see the full notification printed to the console without sending actual network packets.

### Production SMTP (e.g., Google Workspace / Office 365 / SendGrid)
Edit `.env` on your production server:

```dotenv
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=info@jengaconstruction.co.ke
EMAIL_HOST_PASSWORD=your-app-password-here
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=Jenga Construction Limited <no-reply@jengaconstruction.co.ke>
COMPANY_CONTACT_EMAIL=info@jengaconstruction.co.ke
```

> **Resilience Guarantee:** In the event that the SMTP server is down or times out, the client's quotation request is **guaranteed to save** in the database. The system catches connection exceptions, logs the error, and presents the reference number to the user.

---

## 8. Google Maps Embed Configuration

In compliance with the project guidelines, no arbitrary street address or fake GPS pin is fabricated. The site displays `Nairobi, Kenya` as general location text.

To configure an official interactive Google Maps iframe:
1. Open [Google Maps](https://www.google.com/maps) and search for Jenga Construction Limited's verified physical premises in Nairobi.
2. Click **Share** &rarr; **Embed a map**.
3. Copy the URL inside the `src="..."` attribute (e.g., `https://www.google.com/maps/embed?pb=...`).
4. Log into `http://127.0.0.1:8000/admin/core/sitesettings/1/change/` and paste the URL into **Google Maps Embed URL**.
5. Save. The map will immediately display on the Contact page.

---

## 9. Pre-Launch Checklist

- [ ] Run `python manage.py seed_demo_data --clear` to remove sample demonstration records.
- [ ] Add genuine company project photos and contracts under **Projects** in Django Admin.
- [ ] Confirm official company physical location and paste Google Maps embed URL.
- [ ] Supply verified public email address in Site Settings.
- [ ] Update `mission_statement` and `vision_statement` from draft to finalized corporate copy.
- [ ] Set `DJANGO_DEBUG=False` in `.env`.
- [ ] Set a strong, unique `DJANGO_SECRET_KEY` in `.env`.
- [ ] Configure production `DJANGO_ALLOWED_HOSTS` with your registered domain name.
- [ ] Configure live SMTP credentials for email dispatch.
- [ ] Run `python manage.py collectstatic` to bundle static assets.

---

## 10. Future Production Deployment Architecture

When deploying Jenga Construction Limited to a public Ubuntu/Linux or Cloud Run server:

1. **WSGI Server:** Gunicorn or uWSGI (`gunicorn config.wsgi:application --bind 0.0.0.0:8000`).
2. **Reverse Proxy:** Nginx handling SSL termination (Let's Encrypt Certbot) and routing traffic to Gunicorn.
3. **Database:** PostgreSQL (`psycopg2-binary` installed, configured via `DATABASE_URL`).
4. **Static Assets:** WhiteNoise or Amazon S3 / Google Cloud Storage for static and media delivery.
5. **Supervisor / Systemd:** Automatic background daemon management and crash recovery.

---

## 11. Troubleshooting Common Issues

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| `Script execution disabled` in PowerShell | Windows execution policy restricts `.ps1` scripts | Run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` in PowerShell. |
| `No module named django` | Virtual environment is not activated | Ensure prompt displays `(.venv)`. Run `.\.venv\Scripts\Activate.ps1`. |
| `OperationalError: no such table` | Migrations have not been applied | Run `python manage.py migrate`. |
| Static CSS/images not updating | Browser cache | Hard-refresh via `Ctrl + F5` or run `python manage.py collectstatic`. |
| Port 8000 already in use | Another service is using port 8000 | Run `python manage.py runserver 8080` instead. |

---

*Developed for Jenga Construction Limited — Nairobi, Kenya.*
